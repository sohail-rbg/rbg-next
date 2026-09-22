"use client";

// export const LOGO = '../logo.png';
import { motion } from "framer-motion";


import {  createTheme } from '@mui/material/styles';


// const PROJECT_ID = "8355c9dca27740c4b22e5661116c18c3";

export const endpointURL = `/api/hygraph`


export const PortalUrl = "https://wp.rebrandgurus.com/"
const font =  "'Space Grotesk', sans-serif";
const fontHeading =  'Recoleta';

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#0e191d',
        dark: '#1D1D1D',
        bg_0: '#121212',
        bg_1: '#171717',
        bg_2: '#222',
        bg_3: '#111',
      },
      primary: {
        light: '#8B9C8C',
        main: '#2E5E53',
        dark: '#8b9c8c',
        contrastText: '#D7D7D7',
        
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
      
    },
    shape : {
      borderRadiusSearch :'50px',
    },
    typography: {
        fontFamily: font,
        h1: {
            fontFamily: fontHeading,
            '@media (min-width:960px)': {
              fontSize: '6rem', 
            },
            
        },
        h2: {
            fontFamily: fontHeading,
            '@media (max-width:600px)': {
              fontSize: '2.5rem', 
            },
            '@media (min-width:960px)': {
              fontSize: '4rem', 
            },
        },
        h3: {
            fontFamily: fontHeading,
            '@media (max-width:600px)': {
              fontSize: '1.9rem', 
            },
            '@media (min-width:960px)': {
              fontSize: '2.4rem', 
            },
            '@media (min-width:1024px)': {
              fontSize: '2.8rem', 
            },
            '@media (min-width:1199px)': {
              fontSize: '3rem', 
            },
            '@media (min-width:1300px)': {
              fontSize: '3.5rem', 
            },
        },
        h4: {
            fontFamily: fontHeading,
        },
        h5: {
            fontFamily: fontHeading,
        },
        h6: {
            fontFamily: fontHeading,
        },    
    },
    components: {
        MuiButton: {
            variants: [
                {
                  props: { variant: 'roundBtn' },
                  style: {
                    backgroundColor: 'transparent', 
                    color: '#fff', 
                    lineHeight:'normal',
                    fontSize:'16px',
                    borderRadius:'100%',
                    border:'0px solid #fff',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#000', 
                        borderColor:'transparent'
                    },
                  },
                },
            ],
        }
    }
  });



  export  const AnimatedParagraph = ({ children }) => {
    return (
      <motion.p  initial={{ y: 100, opacity: 0 }}
      whileInView={{ x: -0, y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{
        type: "spring",
        duration: 2,
      }}>
        {children}
      </motion.p>
    );
  };
