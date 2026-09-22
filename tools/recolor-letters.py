#!/usr/bin/env python3
"""Re-tint the RBG letter artwork into the brand palette.

The originals (src/images/r.png|b.png|g.png) are left untouched. Each letter is
decoded (8-bit palette + tRNS), its alpha is kept, and the colour is rebuilt as
a vertical mint -> emerald gradient modulated by the letter's own luminance so
the shading survives. Output is written as RGBA PNG next to the originals.

Usage: python3 tools/recolor-letters.py
"""
import os, struct, zlib, sys

SRC_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "images")
OUT_DIR = os.path.join(SRC_DIR, "brandinfo")

# mint -> sage -> deep emerald, matching .biCard__mark in home.css
RAMP = [(178, 199, 180), (104, 138, 122), (23, 66, 56)]


def lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def ramp(t):
    t = max(0.0, min(1.0, t))
    if t < 0.5:
        return lerp(RAMP[0], RAMP[1], t / 0.5)
    return lerp(RAMP[1], RAMP[2], (t - 0.5) / 0.5)


def paeth(a, b, c):
    p = a + b - c
    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
    if pa <= pb and pa <= pc:
        return a
    if pb <= pc:
        return b
    return c


def decode_png(path):
    data = open(path, "rb").read()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", f"{path}: not a PNG"
    pos, idat, plte, trns = 8, b"", None, None
    w = h = depth = ctype = None
    while pos < len(data):
        (length,) = struct.unpack(">I", data[pos : pos + 4])
        ctype_name = data[pos + 4 : pos + 8]
        chunk = data[pos + 8 : pos + 8 + length]
        if ctype_name == b"IHDR":
            w, h, depth, ctype, comp, filt, interlace = struct.unpack(">IIBBBBB", chunk)
            assert depth == 8 and interlace == 0, "only 8-bit non-interlaced supported"
        elif ctype_name == b"PLTE":
            plte = [tuple(chunk[i : i + 3]) for i in range(0, len(chunk), 3)]
        elif ctype_name == b"tRNS":
            trns = list(chunk)
        elif ctype_name == b"IDAT":
            idat += chunk
        elif ctype_name == b"IEND":
            break
        pos += 12 + length

    raw = zlib.decompress(idat)
    assert ctype in (3, 6), "expected a palette or RGBA image"
    bpp = 1 if ctype == 3 else 4
    stride = w * bpp
    rows, prev = [], bytearray(stride)
    p = 0
    for _ in range(h):
        ftype = raw[p]
        p += 1
        line = bytearray(raw[p : p + stride])
        p += stride
        for i in range(stride):
            a = line[i - bpp] if i >= bpp else 0
            b = prev[i]
            c = prev[i - bpp] if i >= bpp else 0
            if ftype == 1:
                line[i] = (line[i] + a) & 0xFF
            elif ftype == 2:
                line[i] = (line[i] + b) & 0xFF
            elif ftype == 3:
                line[i] = (line[i] + (a + b) // 2) & 0xFF
            elif ftype == 4:
                line[i] = (line[i] + paeth(a, b, c)) & 0xFF
            elif ftype != 0:
                raise ValueError(f"unknown filter {ftype}")
        rows.append(bytes(line))
        prev = line
    return w, h, rows, plte, trns, ctype


def encode_rgba(path, w, h, pixels):
    """pixels: list of rows, each a bytearray of RGBA bytes."""
    raw = b"".join(b"\x00" + bytes(row) for row in pixels)

    def chunk(tag, payload):
        return (
            struct.pack(">I", len(payload))
            + tag
            + payload
            + struct.pack(">I", zlib.crc32(tag + payload) & 0xFFFFFFFF)
        )

    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )
    open(path, "wb").write(png)


def recolor(name):
    src = os.path.join(SRC_DIR, f"{name}.png")
    w, h, rows, palette, trns, _ctype = decode_png(src)
    out_rows = []
    for y, row in enumerate(rows):
        t = y / max(1, h - 1)
        base = ramp(t)
        line = bytearray()
        for x in range(w):
            idx = row[x]
            alpha = trns[idx] if trns and idx < len(trns) else 255
            if alpha == 0:
                line += b"\x00\x00\x00\x00"
                continue
            r, g, b = palette[idx]
            lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0
            # keep the letter's own shading, mapped with real contrast
            shade = 0.55 + 0.78 * lum
            rr = min(255, round(base[0] * shade))
            gg = min(255, round(base[1] * shade))
            bb = min(255, round(base[2] * shade))
            line += bytes((rr, gg, bb, alpha))
        out_rows.append(line)

    os.makedirs(OUT_DIR, exist_ok=True)
    dst = os.path.join(OUT_DIR, f"{name}.png")
    encode_rgba(dst, w, h, out_rows)
    return dst, w, h, os.path.getsize(dst)


def main():
    for name in ("r", "b", "g"):
        dst, w, h, size = recolor(name)
        print(f"{name}.png -> {os.path.relpath(dst)}  {w}x{h}  {size/1024:.1f} KB")

    # self-check: corners transparent, letter interior tinted
    w, h, rows, _pal, _trns, ctype = decode_png(os.path.join(OUT_DIR, "r.png"))
    assert ctype == 6 and w == 400 and h == 495, f"unexpected output {ctype} {w}x{h}"
    assert rows[0][:4] == b"\x00\x00\x00\x00", "corner should be transparent"
    stem = None
    for y in range(h):
        if rows[y][40 * 4 + 3] > 200:  # left stem of the R
            stem = tuple(rows[y][40 * 4 : 40 * 4 + 4])
            break
    assert stem, "no opaque stem pixel found"
    r, g, b, a = stem
    assert g >= r and g >= b, f"stem should sit in the green family, got {stem}"
    print(f"self-check: output is RGBA, corner transparent, stem pixel {stem}")


if __name__ == "__main__":
    main()
