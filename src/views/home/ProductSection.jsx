"use client";

import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import bgPattern from '../../images/bg_p_2.png'
import SectionHeading from '../../components/SectionHeading'
import ProductFAQ from '../../components/ProductFAQ'
import PackageBox from '../../components/PackageBox'
// import { Repeat } from '@mui/icons-material'

const ProductSection = () => {

    const bgImage = {
        backgroundImage: `url(${bgPattern})`,
        backgroundSize: 'auto',
        backgroundPosition: 'left -70px',
        backgroundRepeat:'no-repeat',
        backgroundAttachment:'fixed'
      };

  return (
    <>
        <Box
            component='section'
            className='sectionWrp'
            style={bgImage}
            bgcolor='#262525'
        >
            <Container>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 5 }}
                >
                    <Grid item xs={12} md={6}>
                        <SectionHeading
                            title='Affordable Pricing. - Checkout Now'
                            subtitle='Best Pricing' 
                        />
                        <ProductFAQ />
                    </Grid>
                    <Grid item xs={12}  md={6}>
                        <PackageBox
                            title='One-on-One Strategy Consultation'
                            description={`Unlock the full potential of your website with our personalized one-on-one consultation service. Whether you're starting from scratch or looking to improve an existing site with our CEO. Book a session today and take the first step towards a superior web presence.`}
                            price='$150<span> /Hour</span>'
                            type='Hourly'
                            className='dark'
                            badge='Best Value'
                            url='/consultation'
                            btnText={'Book Now'}
                        />
                        <PackageBox
                            title='Complete Branding Kit'
                            description={`Establish a cohesive and professional brand identity with our complete branding kit. This package includes everything you need to create a strong, memorable brand. Perfect for startups and rebranding projects. Order your branding kit today and stand out in the market.`}
                            price='$299'
                            // type='Monthly'
                            className='color'
                            btnText={'Coming Soon'}
                        />
                        <PackageBox
                            title='Premium Fonts Collection'
                            description={`Enhance your designs with our premium fonts collection. Choose from a variety of professionally crafted fonts to match any style or project: Upgrade your typography game for just $1 per font. Explore our collection and find the perfect typeface for your next project.`}
                            price='$1<span> /Font</span>'
                            type='Yearly'
                            className='light'
                            btnText={'Coming Soon'}
                        />
                    </Grid>

                </Grid>
            </Container>
        
        </Box>
    </>
  )
}

export default ProductSection