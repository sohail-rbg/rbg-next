"use client";

import { Box, Container } from "@mui/material";
import React from "react";
import ContactForm from "./contact/ContactForm";

const Contact = () => {
  return (
    <>
      <Box component="section" className="contactPage">
        <Container>
          <ContactForm />
        </Container>
      </Box>
    </>
  );
};

export default Contact;
