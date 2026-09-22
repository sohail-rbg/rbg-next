"use client";

import { Box, Button, Stack, Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";

import { motion } from "framer-motion";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ColorizeSharpIcon from "@mui/icons-material/ColorizeSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import SmilryImage from "../../images/smiley.gif";
import NextImage from "../../components/NextImage";

import { ReactSketchCanvas } from "react-sketch-canvas";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const ContactForm = () => {
  const myRef = useRef();

  const [color, setColor] = useState("#FF9776");
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  function changeColor(evt) {
    setColor(evt.currentTarget.value);
  }

  const handleClear = () => {
    if (myRef.current) {
      myRef.current.clearCanvas();
    }
  };

  const sketchStyle = {
    border: "none",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    setFormStatus("");
    setIsSending(true);

    try {
      const dataUrl = myRef.current
        ? await myRef.current.exportImage("png")
        : "";
      const base64Image = dataUrl ? dataUrl.split(",")[1] : "";

      const response = await fetch("/api/contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          attachment: base64Image,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send email.");
      }

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      if (myRef.current) {
        myRef.current.clearCanvas();
      }
      setFormStatus("Thanks, we received your message and will reply soon.");
    } catch (error) {
      console.error("Contact form error:", error);
      setFormStatus("Sorry, your message could not be sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  };


  return (
    <>
      <Box className="formWrp">
        <Box component="form" className="formBox" onSubmit={sendEmail} method="post">
          <motion.div
            className="formtopBox"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{
              duration: 1,
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12} md={7.2}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    // duration: 1,
                    delay: 1.4,
                  }}
                  className="messageBoxWrp"
                >
                  <Box className="messageBox_header">
                    Yay! Emails! <br />
                    Please type your message below, or send me an email at{" "}
                    <BootstrapTooltip
                      placement="top"
                      title="Copy to clipboard ?"
                    >
                      <a href="mailto:info@rebrandgurus.com">
                        info@rebrandgurus.com
                      </a>
                    </BootstrapTooltip>
                    .
                  </Box>
                  <Box className="messageBoxContent">
                    <Typography
                      sx={{ marginTop: "20px" }}
                      fontSize="30px"
                      component="h3"
                      variant="h3"
                    >
                      Hey Gurus, 
                      <NextImage
                        className="smileyIcon"
                        src={SmilryImage}
                        alt=""
                        width={48}
                        height={48}
                      />
                    </Typography>
                    <textarea
                      id="contact-message"
                      className="messageInput"
                      autoFocus
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </Box>
                </motion.div>
              </Grid>
              <Grid item  xs={12} md={4.8} className="p-relative">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  exit={{ height: 0 }}
                  transition={{
                    type: "spring",
                    duration: 1,
                    delay: 1.2,
                  }}
                  className="verticleLine"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    // duration: 1,
                    delay: 1.4,
                  }}
                  className="skectchBox"
                >
                  <Box className="sketchText">
                    Live life on the edge, spice up your message with a drawing:
                  </Box>
                  <ReactSketchCanvas
                    ref={myRef}
                    width="100%"
                    style={sketchStyle}
                    height="100%"
                    strokeWidth={5}
                    strokeColor={color}
                    canvasColor="transparent"
                    clearCanvas
                  />
                  <Stack
                    direction="row"
                    spacing={1}
                    className="steckOptionIcon"
                  >
                    <Tooltip
                      title="Choose Your Color"
                      className="colorPickerIcon"
                    >
                      <IconButton component="label" htmlFor="favcolor">
                        <ColorizeSharpIcon />
                        <input
                          type="color"
                          id="favcolor"
                          name="favcolor"
                          value={color}
                          onChange={(evt) => changeColor(evt)}
                          className="colorPicker"
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Clear" className="clearBtn">
                      <IconButton onClick={handleClear}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
          <Box className="formBottomBox">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{
                duration: 1,
              }}
              className="inputBoxWrp"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  delay: 1.4,
                }}
                className="form_b_input email"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="inputBox"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                exit={{ height: 0 }}
                transition={{
                  type: "spring",
                  duration: 1,
                  delay: 1.2,
                }}
                className="verticleLine"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  delay: 1.4,
                }}
                className="form_b_input p-relative name"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  className="inputBox"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{
                duration: 1,
              }}
              className="form_bottonBox"
            >
              <Button
                className="submitButton"
                endIcon={<SendIcon />}
                type="submit"
                disabled={isSending}
                
              >
                {isSending ? "Sending..." : "Send Message"}
              </Button>
              {formStatus && <p className="formStatus">{formStatus}</p>}
            </motion.div>
          </Box>
        </Box>

        
      </Box>
    </>
  );
};

export default ContactForm;
