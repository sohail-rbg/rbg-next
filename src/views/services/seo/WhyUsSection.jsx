"use client";

import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import SectionHeading from "../../../components/SectionHeading";
import { AnimatedParagraph } from "../../../ThemeModule";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { motion } from "framer-motion";
import { useStickyBox } from "react-sticky-box";
const WhyUsSection = () => {
  const stickyRef = useStickyBox({ offsetTop: 20, offsetBottom: 20 });

  const numberBox = [
    {
      id: 1,
      number: "91%",
      title: "Retention Rate",
      desc: "Industry average: 50%",
      tooltipText: [
        {
          // title: "Why is our retention rate so high?",
          desc: "Achieving a 91% client retention rate indicates that we are effectively managing client satisfaction, engagement, and loyalty. It's crucial to continue nurturing these positive aspects while also seeking feedback for areas where further improvement may be possible. Rebrand is one of the very few companies who can boast of this kind of retention, Dont believe us? Call us and we will prove it by working for you.. ",
        },
      ],
    },
    {
      id: 2,
      number: "90%",
      title: "Client satisfaction score",
      desc: "Industry average: 72%",
      tooltipText: [
        {
          // title: "Why is our satisfaction score so high?",
          desc: `Having a CSAT score above 90% , RBG indicates strong customer loyalty and satisfaction, which can lead to increased customer retention, positive word-of-mouth referrals, and ultimately, business growth. At Rebrandgurus we  maintain these high standards by continuously monitoring customer feedback, addressing any areas for improvement, and adapting to evolving customer expectations.`,
        },
      ],
    },
    {
      id: 3,
      number: "100+",
      title: "Higher NPS® score than",
      desc: "Industry average: 16",
      tooltipText: [
        {
          // title: "Why is our NPS so high?",
          desc: `At RBG,  Net Promoter Score (NPS) is above 100, that is actually  unusual because NPS typically ranges from -100 to +100. However, since our NPS score above 100 in terms of the percentage of promoters (customers who are highly likely to recommend your product or service) and that is true in our case.`,
        },
      ],
    },
  ];

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip placement="top" arrow {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.primary.light,
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 280,
      fontSize: theme.typography.pxToRem(12),
      border: `1px solid ${theme.palette.primary.light}`,
      padding: "20px",
    },
    [`& .MuiTooltip-arrow`]: { color: theme.palette.primary.light },
  }));

  return (
    <>
      <Box
        component={"section"}
        sx={{ py: 8 }}
        bgcolor={"#000"}
        className="whyUsSection"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} ref={stickyRef}>
            <SectionHeading
              title="What do services include?
                    "
              subtitle="RBG SEO"
              padding="0 0 10px"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedParagraph>
              We Serve your business in a nontraditional way when its comes
              specifically to SEO. Seo is all about content management and we
              create, re create and redefine content as per customers target
              audience. The sole purpose of SEO is to bring the prospect to the
              website and to regenerate more interest in the client to keep
              working with us. Our service focuses only on ROI generation
              directly or indirectly managing and developing some amazing
              content management strategies. We dont promise, We deliver..
            </AnimatedParagraph>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="cubeBoxWrp">
              {numberBox.map((cBox) => (
                <div className="cubeBox_item" key={cBox.id}>
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography
                          color="inherit"
                          component={"h6"}
                          variant="h6"
                        >
                          {cBox.tooltipText[0].title}
                        </Typography>
                        <Typography
                          color="inherit"
                          dangerouslySetInnerHTML={{
                            __html: cBox.tooltipText[0].desc,
                          }}
                        ></Typography>
                      </React.Fragment>
                    }
                  >
                    <motion.div
                      initial={{ y: 100, opacity: 0, scale: 0.7 }}
                      whileInView={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 100, opacity: 0, scale: 0.7 }}
                      transition={{
                        type: "spring",
                        duration: 2,
                      }}
                      className="cubeBox"
                    >
                      <div className="cube_number">{cBox.number}</div>
                      <div className="cube_title">{cBox.title}</div>
                      <div className="cube_description">{cBox.desc}</div>
                    </motion.div>
                  </HtmlTooltip>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default WhyUsSection;
