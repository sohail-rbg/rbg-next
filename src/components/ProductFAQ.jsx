"use client";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const accordionData = [
  {
    id: "panel1",
    question: "What can I expect during the consultation?",
    answer: "During the consultation, we will discuss your website goals, challenges, and specific needs. Our CEO will provide tailored advice, technical guidance, and actionable strategies to enhance your web presence."
  },
  {
    id: "panel2",
    question: "What do I need to prepare before the consultation?",
    answer: "It’s helpful to have a list of questions, any relevant website information, and specific goals you want to achieve."
  },
  {
    id: "panel3",
    question: "What is included in the branding kit?",
    answer: "The branding kit includes a custom logo, color palette, typography guide, business card design, social media graphics, and comprehensive brand guidelines."
  },
  {
    id: "panel4",
    question: " How do I download the fonts after purchase?",
    answer: "After purchase, you will receive a download link via email, giving you immediate access to your selected fonts."
  },
];

const ProductFAQ = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {accordionData.map((data) => (
        <Accordion
          key={data.id}
          expanded={expanded === data.id}
          onChange={handleChange(data.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${data.id}bh-content`}
            id={`${data.id}bh-header`}
          >
            <Typography sx={{ color: "text.secondary", fontSize: '18px' }}>
              {data.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {data.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default ProductFAQ;
