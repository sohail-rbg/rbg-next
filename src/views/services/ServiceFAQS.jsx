"use client";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Container } from "@mui/material";
import SectionHeading from "../../components/SectionHeading";


const ServiceFAQS = ({accordionData }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box component={"section"} className="serviceFaqSection">
      <Container>
        <SectionHeading title="FAQs" />
        <Box className="serviceFaqList">
          {accordionData.map((data) => (
            <Accordion
              key={data.id}
              expanded={expanded === data.id}
              onChange={handleChange(data.id)}
              className="serviceFaqAccordion"
              elevation={0}
              disableGutters
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${data.id}bh-content`}
                id={`${data.id}bh-header`}
                className="serviceFaqSummary"
              >
                <Typography component="h3" className="serviceFaqQuestion">
                  {data.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="serviceFaqDetails">
                <Typography
                  component="div"
                  className="serviceFaqAnswer"
                  dangerouslySetInnerHTML={{ __html: data.answer }}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceFAQS;
