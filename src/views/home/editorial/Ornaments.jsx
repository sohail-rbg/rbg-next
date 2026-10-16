import React from "react";

/** Thin typographic divider with an optional centred ornament. */
export function Rule({ symbol, className = "" }) {
  if (!symbol) return <hr className={`ed-rule ${className}`} />;
  return (
    <div className={`ed-rule ed-rule--ornament ${className}`}>
      <span className="ed-rule__symbol" aria-hidden="true">
        {symbol}
      </span>
    </div>
  );
}

/** Big roman numeral that hangs in the margin at the head of a chapter. */
export function ChapterHead({ numeral, kicker, title, standfirst }) {
  return (
    <div className="ed-chapter__head">
      <span className="ed-roman" aria-hidden="true">
        {numeral}
      </span>
      <div className="ed-chapter__headings">
        <p className="ed-kicker">{kicker}</p>
        <h2 className="ed-chapter__title">{title}</h2>
        {standfirst ? <p className="ed-standfirst">{standfirst}</p> : null}
      </div>
    </div>
  );
}

/** Framed image with a caption, in the manner of a printed plate. */
export function Figure({ image, alt = "", ratio = "3 / 2", caption, className = "" }) {
  return (
    <figure className={`ed-figure ${className}`}>
      <div className="ed-figure__frame" style={{ aspectRatio: ratio }}>
        {image}
      </div>
      {caption ? <figcaption className="ed-figure__caption">{caption}</figcaption> : null}
    </figure>
  );
}
