"use client";

import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const VideoModal = ({ open, handleClose, videoUrl }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none',
          maxWidth: '90%',
          width: '900px',
          borderRadius:'20px'
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 2 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="iframe"
          width="100%"
          height="500px"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></Box>
      </Box>
    </Modal>
  );
};

export default VideoModal;
