"use client";

import { Box, Container } from "@mui/material";
import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";

const ErrorMessage = (props) => {
  return (
    <>
      <Box sx={{ py: 8 }}>
        <Container>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ x: -0, y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{
                type: "spring",
                duration: 2,
              }}
            >
              <Alert variant={props.variant} severity={props.type}>
                {props.text}
              </Alert>
            </motion.div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ErrorMessage;
ErrorMessage.defaultProps = {
  type: "error",
  text: "This is an error Alert.",
  variant: "filled",
};
