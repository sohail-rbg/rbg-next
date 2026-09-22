"use client";

import React from "react";
import { Box } from "@mui/material";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
import NextImage from "../../components/NextImage";

const ClientLogos = ({ clientLogo }) => {
  const logo_index = clientLogo.length % 2 === 0 ? "even" : "odd";

  const logoBoxAni = {
    delay: logo_index === "even" ? 1 : 0,
    duration: 2,
    type: "spring",
    repeatType: "reverse",
  };
  // console.log(clientLogo)

  return (
    <>
      <Box className="clientLogoWrp" sx={{ py: 8 }} bgcolor={'#000'}>
        <SectionHeading title="Brands we’ve worked with" subtitle="Partners of Joy" align="center" />
        <Marquee className="cl_box_wrp">
          {clientLogo.map((logo_item) => (
            <motion.div
              key={logo_item.title}
              className="cl_item"
              initial={{ opacity: 0, y: "-100px", x: "100px" }}
              whileInView={{ opacity: 1, y: "0", x: "0" }}
              transition={logoBoxAni}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {logo_item.websiteLogo.url ? (
                <Box
                  component="a"
                  href={logo_item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cl_box_inner"
                >
                  <NextImage
                    src={logo_item.websiteLogo.url}
                    className="img-fluid"
                    alt={`${logo_item.title}`}
                    width={240}
                    height={160}
                  />
                </Box>
              ) : (
                <Box component="div" className="cl_box_inner">
                  <NextImage
                    src={logo_item.websiteLogo.url}
                    className="img-fluid"
                    alt={`${logo_item.title}`}
                    width={240}
                    height={160}
                  />
                </Box>
              )}
            </motion.div>
          ))}
        </Marquee>
      </Box>
    </>
  );
};

export default ClientLogos;
