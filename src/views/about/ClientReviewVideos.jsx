"use client";

import { Box, Container } from '@mui/material'
import React, { useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import SectionHeading from '../../components/SectionHeading'
import VideoModal from './VideoModal';
//Images
import sectionDevider from '../../images/divider-2.webp'
import testi_1 from '../../images/testimonial/client_1.jpg'
import testi_2 from '../../images/testimonial/client_2.jpg'
import testi_3 from '../../images/testimonial/client_3.jpg'
import testi_4 from '../../images/testimonial/client_4.jpg'
import testi_5 from '../../images/testimonial/client_5.jpg'
import testi_6 from '../../images/testimonial/client_6.jpg'
import NextImage from '../../components/NextImage';

const Testimonial = [{
    id: '0',
    featuredImage: testi_1,
    title: 'Ashley Remington',
    websiteName: 'www.need-deed.com',
    path: 'https://www.youtube.com/embed/5dAjJuGu6Sk'

},
{
    id: '1',
    featuredImage: testi_2,
    title: 'Toni Attell',
    websiteName: 'www.attell.com',
    path: 'https://www.youtube.com/embed/FMk6Q3WIngs'

},
{
    id: '2',
    featuredImage: testi_3,
    title: 'Joseph Jeanmarie',
    websiteName: 'www.letherebelightelectric.com',
    path: 'https://www.youtube.com/embed/Ay9WMVEL58U'

},
{
    id: '3',
    featuredImage: testi_4,
    title: 'James H. Kelly',
    websiteName: 'www.jharoldkellystories.com',
    path: 'https://www.youtube.com/embed/f4jB4hwmV9I'

}
,{
    id: '4',
    featuredImage: testi_5,
    title: 'Grace Lewis',
    websiteName: 'www.gracelewiscpa.com',
    path: 'https://www.youtube.com/embed/4XJvvXnlGTw'

}
,{
    id: '5',
    featuredImage: testi_6,
    title: 'Philip & David',
    websiteName: 'http://dglawnyc.com/',
    path: 'https://www.youtube.com/embed/nWrXSinRXMQ'

}
]

const ClientReviewVideos = () => {
    const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');

  const handleOpen = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVideo('');
  };
  return (
    <>
        <Box className="about_testimoial_wrp" bgcolor='#13181d' id='testimonialSec' component='section' sx={{py:10}}>
            <Box className='startBgImgWrp' sx={{backgroundImage:`url(${sectionDevider})`}}  ></Box>
            <Container>
                <SectionHeading 
                    title="The Potential of RBG"
                    subtitle="Testimonial"
                    align="center"
                />
                <Box className='testi_video_wrp'>
                    {
                        Testimonial.map((testiItem)=>{
                            return (
                                <Box className='test_v_item' key={testiItem.id}>
                                    <Box 
                                        className="ct_v_inner"
                                        onClick={() => handleOpen(testiItem.path)}
                                    >
                                        
                                        <Box 
                                            
                                            className="ct_v_feaaturedImg" 
                                            >
                                            <Box className="gradient__border"></Box>
                                            <NextImage
                                                className='img-fluid'
                                                src={testiItem.featuredImage}
                                                alt={testiItem.title}
                                            />
                                            <Box className="VideoIcon">
                                                <PlayArrowIcon />
                                            </Box>
                                        </Box>
                                        <Box className="ct_v_content">
                                            <h5>{testiItem.websiteName}</h5>
                                            <h3>{testiItem.title}</h3>
                                        </Box>
                                    </Box>
                                </Box>
                               
                            )
                        })
                    }
                    
                </Box>
            </Container>
        </Box>
        <VideoModal
            open={open}
            handleClose={handleClose}
            videoUrl={selectedVideo}
        />
    </>
  )
}

export default ClientReviewVideos
