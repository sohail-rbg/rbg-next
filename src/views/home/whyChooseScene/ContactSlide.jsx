"use client";

import React from 'react'
import SectionHeading from '../../../components/SectionHeading'
import { Box, Button, Container } from '@mui/material'
import EastIcon from '@mui/icons-material/East';
import { HomePageData } from '../../../Data';
import { Link } from 'react-router-dom';


const ContactSlide = () => {
  

  return (
    <>
       <Container maxWidth="md">
            <SectionHeading
                    align='center'
                    titleFontSize='80px'
                    subtitle={HomePageData.whyChooseUs.slideThree.subTitle}
                    title={HomePageData.whyChooseUs.slideThree.title}
                />
                <Box 
                align={'center'}
                >
                <Button
                  sx={{ mt: 0, align: 'center',}} 
                  variant="roundBtn" 
                  endIcon={<EastIcon />}
                  component={Link}
                  to={'contact-us'}
                >
                {HomePageData.whyChooseUs.slideThree.button.text}
                  </Button>
                  </Box>
       </Container>
    </>
  )
}

export default ContactSlide