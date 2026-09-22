import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import { ParallaxBanner } from "react-scroll-parallax";

import overviewImg from "../../../images/services/seo/services/overview.jpg";
import strategyImg from "../../../images/services/seo/services/strategy.jpg";
import seoImg from "../../../images/services/seo/services/seo.jpg";
import keywordImg from "../../../images/services/seo/services/keyword.jpg";
import contentImg from "../../../images/services/seo/services/content.jpg";
import offpageImg from "../../../images/services/seo/services/off_page.jpg";
import testingImg from "../../../images/services/seo/services/testing.jpg";
import reportingImg from "../../../images/services/seo/services/reporting.jpg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      className={`verTabContent`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pl: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ServicesSeo = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const SeoServiceData = [
    {
      id: 0,
      title: "Overview",
      image: overviewImg,
      description: `<p>With our professional SEO services in the USA, you’ll get an all-in-one SEO solution that includes:                </p>
        <ul>
            <li>SEO audit</li>
            <li>SEO strategy
            </li>
            <li>On-page, off-page, and technical SEO optimizations
            </li>
            <li>Dedicated account manager, plus access to subject matter experts
            </li>
            <li>Return on investment (ROI) tracking for online and offline conversions
            </li>
            <li>And more
            </li>
        </ul>
        <p>Over the past five years, our USA SEO agency has helped our clients earn more than $6 billion in revenue — which is just one reason 91% of businesses continue to partner with us after 12 months.


        </p>`,
    },
    {
      id: 1,
      title: "Custom Strategy",
      image: strategyImg,
      description: `Your business. Your goals. Your industry. Your custom SEO strategy. That’s what you get with ReBrand Gurus. The best part? You’ll receive a dedicated account manager with experience in your industry.


      `,
    },
    {
      id: 2,
      title: "SEO Optimizations",
      image: seoImg,
      description: `You get more than a dedicated account manager with ReBrand Gurus — you get a complete SEO team. Give your SEO team the thumbs-up and they’ll complete all your SEO optimizations, from on-page to off-page to technical SEO, for you.


      `,
    },
    {
      id: 3,
      title: "Keyword Research",
      image: keywordImg,
      description: `Drive bottom-line results with keywords that capture and convert traffic. You can also power your keyword strategy with our USA SEO marketing company’s client-exclusive tech and lead scoring tool.


      `,
    },
    {
      id: 4,
      title: "Content Creation",
      image: contentImg,
      description: `Forget working with multiple agencies for SEO. With our services, it’s all in-house. Get SEO content, from blog posts to sales copy, that represents your brand and speaks to your audience.


      `,
    },
    {
      id: 5,
      title: "Off-page SEO",
      image: offpageImg,
      description: `Put off-page SEO on easy mode with the help of our in-house earned media team. Attract backlinks from trusted websites in your industry and start dominating search results.


      `,
    },
    {
      id: 6,
      title: "Testing",
      image: testingImg,
      description: `Keep ahead of competitors with proactive testing, which can help your business’s SEO and even CRO. For even more conversion-related testing, you can take advantage of our in-house CRO team.


      `,
    },
    {
      id: 7,
      title: "Reporting",
      image: reportingImg,
      description: `<p>Get regular reports focusing on the metrics that matter most to your business, like:</p>
      <ul>
      <li>Sales</li>
      <li>Leads</li>
      <li>Traffic</li>
      <li>Rankings</li>
      <li>And more</li>
      </ul>
      <p>With our client-exclusive marketing platform, it’s also easy to measure SEO’s return on investment and bottom-line impact.</p>`,
    },
  ];

  return (
    <>
      <Box
        sx={{ flexGrow: 1, display: "flex", pb: 9, pt: 3 }}
        className={"seoServiceTabWrp customVerTab"}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            border: 1,
            bgcolor: "rgba(250, 250, 250, 0.08)",
            borderColor: "rgba(255, 255, 255, 0.09)",
          }}
        >
          {SeoServiceData.map((tabItm) => (
            <Tab
              key={tabItm.id}
              label={tabItm.title}
              {...a11yProps(tabItm.id)}
            />
          ))}
        </Tabs>
        {SeoServiceData.map((tabconItem) => (
          <TabPanel key={tabconItem.id} value={value} index={tabconItem.id}>
            {value === tabconItem.id && (
              <div className="seriveTabContentBox">
                <div className="seriveTabContentBox_top">
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{
                      type: "spring",
                      duration: 2,
                    }}
                    className="st_headingBox"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    {tabconItem.image && (
                      <ParallaxBanner
                        layers={[
                          { image: tabconItem.image, speed: -20 },
                          {
                            speed: -15,
                            children: (
                              <div className="seoTabTitle">
                                <h3>{tabconItem.title}</h3>
                              </div>
                            ),
                          },
                        ]}
                        className="aspect-img"
                      />
                    )}
                    {!tabconItem.image && (
                      <div className="seoTabTitle">
                        <h3>{tabconItem.title}</h3>
                      </div>
                    )}
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{
                    type: "spring",
                    delay: 0.6,
                    duration: 2,
                  }}
                  dangerouslySetInnerHTML={{ __html: tabconItem.description }}
                ></motion.div>
              </div>
            )}
          </TabPanel>
        ))}
      </Box>
    </>
  );
};

export default ServicesSeo;
