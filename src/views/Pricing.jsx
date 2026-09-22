"use client";

import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Tabs, Tab, Typography, Container, Grid } from "@mui/material";
import seoPlans from "./pricing/SeoPricingData";
import CustomButton from "../components/CustomButton";
import SectionHeading from "../components/SectionHeading";
import { motion } from "framer-motion";

const durations = ["1", "3", "6", "12"];
const getOfferText = (plan, duration) => {
  // Check if plan or required data is missing
  if (!plan || !plan.monthly || !plan.durations) return "NO OFFER";

  // Get prices
  const monthlyPrice = plan.monthly;
  const durationPrice = plan.durations[duration];

  // Check if prices exist
  if (!monthlyPrice || !durationPrice) return "NO OFFER";

  const months = parseInt(duration, 10);

  // Calculate discount
  const expectedTotal = monthlyPrice * months;
  const discount = ((expectedTotal - durationPrice) / expectedTotal) * 100;

  // Return formatted discount
  return discount > 0 ? `SAVE ${Math.round(discount)}%` : "";
};

const Pricing = () => {
  const [selectedDuration, setSelectedDuration] = useState("3");

  const handleTabChange = (event, newValue) => {
    setSelectedDuration(durations[newValue]);
  };

  const getHighlightedCardIndex = (duration) => {
    switch (duration) {
      case "1":
        return 3;
      case "3":
        return 1;
      case "6":
        return 2;
      case "12":
        return 0;
      default:
        return -1;
    }
  };

  return (
    <>
      <Box component={"section"} className="pricingPage" pb={4}>
        <Container>
          <span className="wd-skill-shape-1"></span>
          <span className="wd-skill-shape-2"></span>
          <span className="wd-skill-shape-3"></span>
          <Box sx={{ py: 4 }}>
            <Grid container justifyContent={"center"}>
              <Grid xs={6}>
                <SectionHeading
                  title="Choose the Perfect Plan for Your Business"
                  subtitle="SEO Pricing"
                  align={"center"}
                />
              </Grid>
            </Grid>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{
                type: "spring",
                duration: 2,
              }}
            >
              <Box
                className="tabNavBox tabNavBox2"
                sx={{ display: "flex", justifyContent: "center", mb: 6 }}
              >
                <Tabs
                  value={durations.indexOf(selectedDuration)}
                  onChange={handleTabChange}
                >
                  {durations.map((duration, index) => (
                    <Tab
                      key={index}
                      label={
                        <Box textAlign="center">
                          <Typography fontWeight={"600"} variant="body1">
                            {duration}{" "}
                            {parseInt(duration) === 1 ? "Month" : "Months"}
                          </Typography>
                          <Typography variant="caption" color="#fff">
                            {/* Use the first plan as reference for tab labels */}
                            {seoPlans.length > 0
                              ? getOfferText(seoPlans[0], duration)
                              : "NO OFFER"}
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </Tabs>
              </Box>
            </motion.div>
            <Grid container spacing={1}>
              {seoPlans.map((plan, index) => {
                const isHighlighted =
                  index === getHighlightedCardIndex(selectedDuration);
                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box
                      className={`pricing-card ${
                        isHighlighted ? "highlighted" : ""
                      }`}
                    >
                      {isHighlighted && (
                        <div className="recommended-badge">RECOMMENDED</div>
                      )}
                      <Box className="priceInnerBox">
                        <Box className="priceHeaderBox">
                          <Typography
                            component="h3"
                            align="center"
                            fontSize="60px"
                          >
                            {plan.name}
                          </Typography>
                          <Box className="pricing_price" align="center">
                            ${plan.durations[selectedDuration].toLocaleString()}
                            <strong>Price</strong>
                          </Box>
                          <Box textAlign="center" className="whiteBtn" mb={0}>
                            <CustomButton
                              margin="0 0 0"
                              component4={"a"}
                              link={"#"}
                              endIcon={<EastIcon />}
                            >
                              Choose Plan
                            </CustomButton>
                          </Box>
                          <Box textAlign={"center"} mt={2}>
                            <Typography
                              variant="body2"
                              sx={{ color: "#fff", fontSize: "18px" }}
                            >
                              <strong>{plan.keywords}</strong> Keywords
                            </Typography>
                          </Box>
                        </Box>

                        {Object.entries(plan.features).map(
                          ([section, items], idx) => (
                            <Box
                              key={idx}
                              style={{ marginTop: "20px" }}
                            >
                              <Typography
                                fontWeight={"600"}
                                fontSize={"1.3"}
                                lineHeight={"1.4"}
                                variant="subtitle1"
                              >
                                {section}
                              </Typography>
                              <List
                                dense
                                disablePadding
                                sx={{
                                  //   p: 2,
                                  //   backgroundColor: "rgba(255, 255, 255, 0.01)",
                                  borderRadius: 2,
                                }}
                              >
                                {" "}
                                {items.map((feature, i) => (
                                  <ListItem key={i} disableGutters>
                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                      {feature.available ? (
                                        <CheckIcon
                                          sx={{
                                            color: "green",
                                            fontSize: "20px",
                                          }}
                                        />
                                      ) : (
                                        <CloseOutlinedIcon
                                          sx={{
                                            color: "gray",
                                            fontSize: "15px",
                                          }}
                                        />
                                      )}
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography
                                          variant="body2"
                                          sx={{
                                            textDecoration: feature.available
                                              ? "default"
                                              : "line-through",
                                            color: feature.available
                                              ? "#fff"
                                              : "text.secondary",
                                          }}
                                        >
                                          {feature.label}
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          )
                        )}
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Pricing;
