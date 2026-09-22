"use client";

import React from "react";
import { motion } from "framer-motion";
import EastIcon from "@mui/icons-material/East";

import CustomButton from "../../../components/CustomButton";
import NextImage from "../../../components/NextImage";

const iconSpots = [
  { initial: { top: "50%", left: "50%" }, final: { top: "10%", left: "10%" } },
  { initial: { top: "20%", left: "70%" }, final: { top: "25%", left: "85%" } },
  { initial: { top: "80%", left: "60%" }, final: { top: "85%", left: "95%" } },
  { initial: { top: "90%", left: "20%" }, final: { top: "95%", left: "10%" } },
  { initial: { top: "5%", left: "90%" }, final: { top: "10%", left: "85%" } },
  { initial: { top: "80%", left: "80%" }, final: { top: "85%", left: "85%" } },
  { initial: { top: "40%", left: "10%" }, final: { top: "45%", left: "12%" } },
  { initial: { top: "60%", left: "25%" }, final: { top: "65%", left: "15%" } },
  { initial: { top: "70%", left: "80%" }, final: { top: "75%", left: "100%" } },
  { initial: { top: "30%", left: "40%" }, final: { top: "35%", left: "85%" } },
];

const shorten = (text = "", limit = 190) => {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).trim()}…`;
};

const ServiceCard = ({ data, index = 1, total = 6 }) => {
  const icons = (data?.icons || []).slice(0, iconSpots.length);
  const label = String(index).padStart(2, "0");
  const totalCount = String(total).padStart(2, "0");

  return (
    <div className="stackCard__body">
      <span
        className="stackCard__tint"
        style={{ "--card-accent": data?.bgColor || "#2E5E53" }}
        aria-hidden="true"
      />
      <span className="stackCard__accent" aria-hidden="true" />
      <span className="stackCard__num" aria-hidden="true">
        {label}
      </span>
      <span className="stackCard__sheen" aria-hidden="true" />

      {icons.length > 0 && (
        <div className="stackBodyIcons" aria-hidden="true">
          {icons.map((icon, iconIndex) => {
            const spot = iconSpots[iconIndex % iconSpots.length];
            return (
              <motion.div
                key={icon?.id ?? iconIndex}
                className="stackBodyIcons__tile"
                initial={spot.initial}
                animate={spot.final}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: iconIndex * 0.2,
                }}
                style={{
                  top: spot.initial.top,
                  left: spot.initial.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <NextImage
                  alt=""
                  loading="lazy"
                  src={icon?.src}
                  width={120}
                  height={120}
                />
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="stackCard__panel">
        <div className="serviceCardContent">
          <span className="stackCard__tag">
            <i aria-hidden="true" />
            {`Service ${label} / ${totalCount}`}
          </span>
          <h3>{data?.title}</h3>
          <p className="serviceCardContent__desc">{shorten(data?.description)}</p>
          <CustomButton
            component="a"
            margin="28px 0 0"
            link={`/service/${data?.slug}`}
            endIcon={<EastIcon />}
          >
            Explore Now
          </CustomButton>
        </div>
      </div>

      <span className="stackCard__veil" aria-hidden="true" />
      <span className="stackCard__line" aria-hidden="true" />
    </div>
  );
};

export default ServiceCard;
