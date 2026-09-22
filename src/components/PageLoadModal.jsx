"use client";

import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SpinWheel from "./SpinWheel";

const PageLoadModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000); // Open modal after 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose} // Close the modal when clicking outside
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "0%",
            left: "0%",
            width: "100%",
            height: "100vh",
            outline: "none",
            backgroundColor: "rgb(0 0 0 / 47%)",
            display: "flex",
            border: 0,
            p: 1,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#fff",
              // boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                color:'rgb(46 94 83 / 99%)'
              },
              zIndex: 10,
            }}
          >
            <CloseIcon  sx={{fontSize:30}}/>
          </IconButton>

          {/* Modal Content */}
          <SpinWheel />
        </Box>
      </Modal>
    </div>
  );
};

export default PageLoadModal;
