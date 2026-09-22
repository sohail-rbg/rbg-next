"use client";

import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import SectionHeading from '../../components/SectionHeading'
import EastIcon from '@mui/icons-material/East';

import builtwithVideo from '../../videos/builtwith.mp4'
import CustomButton from '../../components/CustomButton'

const BuiltWithUs = () => {
  return (
    <>
        <Box component={'section'} id='buildwithrbg' className='builtWithSec'  sx={{pt:6, pb:8}}>
           <Container>
            <Grid container justifyContent={'center'} >
                <Grid item md={8} align="center" >
                    <SectionHeading align="center" title={`Need help with crafting a strong brand message?`} subtitle="What's Next" padding={'40px 0 20px'} />
                    <CustomButton margin="-60px 0 0" align="center" component={'a'} link={'/contact-us'} endIcon={<EastIcon />}>{'Contact Us'}</CustomButton>
                    
                </Grid>
            </Grid>
           </Container>
           
                    <Box
                        component="video"
                        src={builtwithVideo}
                        autoPlay
                        loop
                        muted
                        
                        
                    />
        </Box>
    </>
  )
}

export default BuiltWithUs