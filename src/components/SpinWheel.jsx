"use client";

import { Box, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import bgImage from "../images/vday.jpg";
import ValentineEmail from "./valentine-email";

const SpinWheel = () => {
  const [result, setResult] = useState("");
  const [email, setEmail] = useState(""); // Store email address
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Track button disabled state
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closedUntilKey = "spinWheelClosedUntil";

  // Show popup 5 seconds after page load
  useEffect(() => {
    const closedUntil = Number(localStorage.getItem(closedUntilKey) || "0");
    if (Date.now() < closedUntil) {
      return undefined;
    }

    const timerId = setTimeout(() => {
      setIsModalVisible(true);
    }, 5000);

    return () => clearTimeout(timerId);
  }, []);

  // Regular expression for validating email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Update email input state and validate email
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setIsButtonDisabled(!emailRegex.test(emailValue)); // Disable button if email is invalid
  };

  const handleClose = () => {
    const twoHoursMs = 2 * 60 * 60 * 1000;
    localStorage.setItem(
      closedUntilKey,
      String(Date.now() + twoHoursMs)
    );
    setIsModalVisible(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult("Thanks! We will email you the Valentine offer.");
    setTimeout(() => {
      const form = document.getElementById("sib-form");
      if (form) {
        form.submit();
      }
    }, 1000);
  };

  return (
    <>
    {isModalVisible && (
      <Modal
        open={isModalVisible}
        onClose={handleClose}
        aria-labelledby="valentine-offer-title"
        aria-describedby="valentine-offer-description"
      >
        <Box className="modalWrp">
          <Box className="modalBgWrp">

            <Box className=" ">
              <Box className="offerModalTextWrp">
                <button
                  type="button"
                  className="modalClose"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  ×
                </button>
               <div  style={{display:'none'}}>
                <TextField
                  id="email-input"
                  label="Enter Your Email"
                  variant="outlined"
                  className="offerInput"
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                  sx={{ marginBottom: "16px" }}
                />

                {/* Claim Now Button */}
                <button
                  className="button  button--atlas"
                  onClick={handleSubmit}
                  disabled={isButtonDisabled} // Disable button if email is invalid
                >
                  <span>
                    Get My Offer <EastIcon />
                  </span>
                  <div className="marquee" aria-hidden="true">
                    <div className="marquee__inner">
                      <span>Get My Offer</span>
                      <span>Get My Offer</span>
                      <span>Get My Offer</span>
                      <span>Get My Offer</span>
                    </div>
                  </div>
                </button>

                <Box className="invisibleForm">
                  <form
                    id="sib-form"
                    method="POST"
                    action="https://49a27dce.sibforms.com/serve/MUIFAC-_k6qlhyFKil7ZIe5uC4ymmUo5qo1ro3GnuoYdROw2E8D92xBVGZNHr8WpQgkNmddsFdtIbFXfo02M71zaQl_15YVJ89FMaqDliPTZHOvNfC-b0RGGhdRM7Xi479wbCqZwh-f4z5JMN9rV1LjekOSmcZf3dIYeAMC20HPjVkn0P4YXot_6B71u4pITE0jDU2AOvcxJCrl5"
                    data-type="subscription"
                    onSubmit={handleSubmit}
                  >
                    <div style={{ padding: "8px 0" }}>
                      <input
                        className="input"
                        type="text"
                        id="EMAIL"
                        name="EMAIL"
                        autoComplete="off"
                        data-required="true"
                        value={email}
                        required
                      />
                    </div>
                    <div style={{ padding: "8px 0" }}>
                      <input
                        className="input"
                        maxLength="200"
                        type="text"
                        id="OFFER"
                        name="OFFER"
                        autoComplete="off"
                        placeholder="OFFER"
                        data-required="true"
                        required
                        value={result}
                      />
                    </div>
                    <div style={{ padding: "8px 0" }}>
                      <button form="sib-form" type="submit">
                        Get My Offer
                      </button>
                    </div>

                    <input
                      type="text"
                      name="email_address_check"
                      value=""
                      className="input--hidden"
                    />
                    <input type="hidden" name="locale" value="en" />
                  </form>
                </Box>
</div>
                <ValentineEmail />
                 
              </Box>

            </Box>
            
          </Box>
        </Box>
      </Modal>
    )}
     
    </>
  );
};

export default SpinWheel;

