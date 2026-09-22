"use client";

import React from "react";
import EastIcon from "@mui/icons-material/East";
import CustomButton from "../../../components/CustomButton";
import NextImage from "../../../components/NextImage";

const shorten = (text = "", limit = 168) => {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).trim()}…`;
};

const ServiceCard = ({ data, index = 1, total = 6 }) => {
  const label = String(index).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");
  const image = data?.sliderImage?.[0] || data?.bgImage;

  return (
    <div
      className="stackCard__body"
      style={{ "--card-accent": data?.bgColor || "var(--primary)" }}
    >
      <span className="stackCard__media" aria-hidden="true">
        {image && (
          <NextImage
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="stackCard__img"
          />
        )}
        <span className="stackCard__scrim" />
        <span className="stackCard__accent" />
      </span>

      <span className="stackCard__num" aria-hidden="true">
        {label}
      </span>

      <div className="stackCard__inner">
        <span className="stackCard__eyebrow">
          <i aria-hidden="true" />
          {`Service ${label} / ${totalLabel}`}
        </span>
        <h3>{data?.title}</h3>
        <p className="stackCard__text">{shorten(data?.description)}</p>
        <CustomButton
          component="a"
          margin="26px 0 0"
          link={`/service/${data?.slug}`}
          endIcon={<EastIcon />}
        >
          Explore Now
        </CustomButton>
      </div>
    </div>
  );
};

export default ServiceCard;
