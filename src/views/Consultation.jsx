"use client";

import React, { useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { Box, Container, Grid, Typography } from '@mui/material';
import manan from '../images/manan_sir.jpg'
import headerBg from '../images/bg/consultation.jpg'
import NextImage from '../components/NextImage';

const Consultation = () => {
    const widgetContainerRef = useRef(null);
    

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://widget.simplybook.me/v2/widget/widget.js";
        script.onload = () => {
            if (window.SimplybookWidget) {
                new window.SimplybookWidget({
                    "widget_type": "iframe",
                    "url": "https://rebrandgurus.simplybook.me",
                    "theme": "tender",
                    "theme_settings": {
                        "sb_base_color": "#8B9C8C",
                        "timeline_hide_unavailable": "1",
                        "hide_past_days": "0",
                        "timeline_show_end_time": "0",
                        "timeline_modern_display": "as_slots",
                        "display_item_mode": "block",
                        "booking_nav_bg_color": "#8B9C8C",
                        "body_bg_color": "#1b1f25",
                        "sb_review_image": "",
                        "dark_font_color": "#1b1f25",
                        "light_font_color": "#ffffff",
                        "btn_color_1": "#2E5E53",
                        "sb_company_label_color": "#ffffff",
                        "hide_img_mode": "0",
                        "show_sidebar": "1",
                        "sb_busy": "#c7b3b3",
                        "sb_available": "#d6ebff",
                        "hide_header": true,  
                        "hide_footer": true 
                    },
                    "timeline": "modern",
                    "datepicker": "top_calendar",
                    "is_rtl": false,
                    "app_config": {
                        "clear_session": 0,
                        "allow_switch_to_ada": 0,
                        "predefined": []
                    },
                    "container_id": "sbw_e20iks"
                });
            } else {
                console.error('SimplybookWidget is not defined.');
            }
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <>
            <PageHeader title="Consultation" backgroundImg={headerBg} />
            <Box sx={{ py: 8 }}>
                <Container>
                    <Grid container spacing={5}>
                        <Grid item md={6}>
                            <Typography component='h2' variant='h3' sx={{mb:3}} >Manan Vashisht Sharma</Typography>
                            <NextImage
                                alt='Manan Vashisht Sharma'
                                className='img-fluid'
                                src={manan}
                                width={700}
                                height={831}
                                sizes="(max-width: 899px) 100vw, 50vw"
                                style={{ borderRadius:'15px' }}
                            />
                            <Typography sx={{mt:3}}>Manan Vashisht is not a consultant by  profession however by experience. That's the kind of consulting you need. Tested, proven and verified time and over again. He doesn't consult by the books but by the need of the hour. Understanding the criticalities and mid frame of a business and business owners, he provides long term vision for one and only purpose, ROI- Return on investment. Simple in conversing and diversified in Business acumen, Manan is an easy going yet assertive kingmaker and you won't be disappointed once shook hands with him..</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <div id="sbw_e20iks" ref={widgetContainerRef}></div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Consultation;
