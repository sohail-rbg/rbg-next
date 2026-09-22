"use client";


import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { Box, Container, Grid, Typography } from "@mui/material";
import gsap from "gsap";
import bgFeatureImage from "../images/parters.jpg";
import bgLogo from "../images/logo_with_bg.png";
import { AnimatedParagraph } from "../ThemeModule";
import NextImage from "../components/NextImage";
// import CustomButton from "../components/CustomButton";

// import worker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjs.GlobalWorkerOptions.workerSrc = worker;



const images = [
  "https://picsum.photos/id/1015/300/500",
  "https://picsum.photos/id/1016/300/500",
  "https://picsum.photos/id/1018/300/500",
  "https://picsum.photos/id/1020/300/500",
  "https://picsum.photos/id/1084/300/500",
  "https://picsum.photos/id/1074/300/500",
  "https://picsum.photos/id/1044/300/500",
  "https://picsum.photos/id/1019/300/500",
  "https://picsum.photos/id/1025/300/500",
  "https://picsum.photos/id/1029/300/500",
];

const MergersAndAcquisitions = () => {
  const groupRef = useRef(null);
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const pdfRef = useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open && pdfRef.current) {
      gsap.fromTo(pdfRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  }, [open]);
  useEffect(() => {
    const waitForImages = () => {
      const imgPromises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      return Promise.all(imgPromises);
    };

    waitForImages().then(() => {
      initAnimation();
    });

    const initAnimation = () => {
      const cards = gsap.utils.toArray(".cardNew");
      const count = cards.length;
      const radius = window.innerWidth > 850 ? 250 : 180;
      const sliceAngle = (2 * Math.PI) / count;

      gsap.set(cards, {
        x: (i) => radius * Math.cos(sliceAngle * i - Math.PI / 4),
        y: (i) => radius * Math.sin(sliceAngle * i - Math.PI / 4),
        rotation: (i) => (i + 1) * (360 / count),
      });

      const timeline = gsap.timeline();

      timeline
        .set(cards, { opacity: 0, scale: 0, x: 0, y: 0 })
        .to(cards, {
          stagger: 0.15,
          opacity: 1,
          scale: 1,
          duration: 1,
          x: (i) => radius * Math.cos(sliceAngle * i - Math.PI / 4),
          y: (i) => radius * Math.sin(sliceAngle * i - Math.PI / 4),
          rotation: (i) => (i + 1) * (360 / count),
        })
        .to(
          groupRef.current,
          {
            rotation: -360 - 90,
            duration: 3,
            ease: "power4.out",
          },
          0
        )
        .from(
          ".fadeEffect",
          {
            opacity: 0,
            filter: "blur(60px)",
            duration: 1,
          },
          1
        )
        .to(cards, {
          repeat: -1,
          duration: 2,
          onRepeat: () => {
            gsap.to(cards[Math.floor(Math.random() * count)], {
              rotateY: "+=180",
            });
          },
        })
        .to(
          containerRef.current,
          {
            rotation: "-=360",
            duration: 20,
            ease: "none",
            repeat: -1,
          },
          0
        );
    };
  }, []);
  return (
    <>
      <Box
        className="ma_hero_section"
        sx={{
          overflow: "hidden",
          textAlign: "center",
          backgroundImage: `url(${bgFeatureImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box className="scene">
          <Box
            ref={containerRef}
            className="container"
            sx={{ position: "relative", width: "100%", height: "500px" }}
          >
            <Box
              ref={groupRef}
              className="group"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {images.map((img, index) => (
                <Box
                  key={index}
                  className="cardNew"
                  sx={{ position: "absolute" }}
                >
                  <Box
                    className="card__img"
                    sx={{
                      width: 120,
                      height: 180,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "12px",
                      backgroundImage: `url(${img})`,
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="our_logo fadeEffect">
            <NextImage
              src={bgLogo}
              alt="ReBrand Gurus"
              width={250}
              height={250}
              style={{
                width: "250px",
                height: " 250px",
                borderRadius: "100%",
              }}
            />
          </Box>
        </Box>
        <Box className="ma_hero_headings fadeEffect">
          <Typography className="" sx={{ fontSize: "30px" }} variant="h2">
            Mergers & Acquisitions
          </Typography>
          <Typography variant="h5">
            Unlocking Value Through Integration and Innovation
          </Typography>
        </Box>
      </Box>
      <Box component={"section"}>
        <Container>
          <Box align="center" className="about_subHeading" sx={{ py: 10 }}>
            <Typography component="h2" variant="h3" lineHeight="1.2">
              At ReBrand Gurus, we specialize in guiding businesses through{" "}
              <Box component="span" className="gradient_text">
                seamless mergers
              </Box>{" "}
              and{" "}
              <Box component="span" className="gradient_text">
                acquisitions
              </Box>
              . From{" "}
              <Box component="span" className="gradient_text">
                strategy to integration
              </Box>
              , our expert team ensures value-driven outcomes, helping you grow,
              adapt, and thrive in today’s competitive landscape. Trust us to{" "}
              <Box component="span" className="gradient_text">
                lead the transition
              </Box>
              .
            </Typography>
          </Box>
          <Box pb={8}>
            <Box sx={{
                padding:'40px',
                borderRadius:'20px',
                background:"#006EEF"
            }}>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <Box className="ma_partner_content">
                            <NextImage 
                                className="ma_partner_logo img-fluid"
                                src={`https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmah0i9vage9407mx3r3bf2j8`}
                                alt="Programea"
                                style={{
                                    maxWidth:'300px',
                                    marginBottom:'20px'
                                }}


                            />
                            <Typography variant="h4">Programea is a Digital Transformation
                            and consulting firm</Typography>
                            <AnimatedParagraph>We help Technology and Marketing Leaders succeed in their
role, with our proven Digital Experience, Custom Development
and Cloud transformation solutions.</AnimatedParagraph>
                            <AnimatedParagraph>Our mission as a technology partner is to take over full
responsibility for turning your boldest technological ideas into
end-to-end solutions</AnimatedParagraph>
                           
                            <Box
                            component={'button'}
                            onClick={handleOpen}
                                    margin={'15px 0 0'}
                                    className="button button--atlas"
                                  >
                                    <span>
                                    Know More 
                                    </span>
                                    <div className="marquee" aria-hidden="true">
                                      <div className="marquee__inner">
                                        <span>Know More</span>
                                        <span>Know More</span>
                                        <span>Know More</span>
                                        <span>Know More</span>
                                      </div>
                                    </div>
                                  </Box>
                            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent ref={pdfRef} style={{ height: '80vh', overflow: 'auto' }}>
          
          <Box
            component={'iframe'}
            src='https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmah1nsswhr7p07mxjgdxwhm8'
            sx={{
                width:'100%',
                height:'100%'
            }}
          />
        </DialogContent>
      </Dialog>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <NextImage 
                        src={`https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmah1ycpfi17b07mxtr3umjz3`}
                        alt="Programea digital transformation"
                        style={{
                            borderRadius:'13px'
                        }}
                        className="ma_parner_image img-fluid" />

                        
                    </Grid>
                </Grid>

            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MergersAndAcquisitions;
