"use client";

import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import EastIcon from '@mui/icons-material/East';

import backgroundVideo from '../videos/404.mp4'
import CustomButton from '../components/CustomButton'

const Page404 = () => {
  return (
    <>
      <Box component={'section'} className='page_404'>
        <Box className='video_404_wrp'>
        <Box
            component="video"
            className="about_bg_video"
            src={backgroundVideo}
            autoPlay
            loop
            muted
          />
        </Box>
        <Container>
         
            <Grid container>
              <Grid item xs={4}>
              <Box className='content_404' textAlign={'center'}>
                <h1><span>404</span> Page Not Found</h1>
                <CustomButton margin="20px 0 0" component={'a'} link={'/'} endIcon={<EastIcon />}>{'Back to Home'}</CustomButton>
                </Box>
              </Grid>
              <Grid item xs={8}>
              </Grid>
            </Grid>
          
        </Container>
        
      </Box>
    </>
  )
}

export default Page404