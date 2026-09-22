"use client";

import { Box, Avatar } from "@mui/material";
import React, { useRef } from "react";
import Slider from "react-slick"; // Assuming you're using a React slider library like react-slick
import QuoteImg from "../../images/texure/quote.svg";

import audrey from '../../images/testimonial/audrey.png'
import brett from '../../images/testimonial/Brett_kogel.jpg'
import ken from '../../images/testimonial/ken.png'
import NextImage from "../../components/NextImage";

const testimonials = [
  {
    title: "Audrey Stout",
      job: "CEO",
      image:audrey,
      quote:
        "Working with Rebrand Gurus on the development of my site has been a blessing.  Rarely in business these days can you team up with a creative business group that listens so closely to your vision, embraces that vision and assists in transforming it to reality.  They have shown a deep level of commitment and dedication to this project, always making themselves available to my questions and concerns immediately.  I trust them, can rely on them and look forward to a long-term ongoing web maintenance and development planning relationship.  A truly rare gem in the business world today.",
    },
{
    title: "Brett Kogel",
      job: "CEO",
      image:brett,
      quote:
        "I had an amazing experience with ReBrand group. They were extremely attentive to detail, provided a quick turnaround, and had excellent communication throughout the process. I am not the type to write a review as a favor, but our experience was genuinely exceptional. This is my company's fifth website in the past 15 years, and I can honestly say that this experience far exceeded the previous ones. The group wasn't just composed of designers and developers; they also had a deep understanding of SEO and how each aspect of the website would impact our search engine optimization. I would highly recommend them to everyone",
    },
{
    title: "Ken Waters",
      job: "CEO",
      image:ken,
      quote:
        `Manan and Sarah are amazing! The refresh to the website was 180 degrees and something I couldn't imagine. The attention to detail and quality of their services is 5 stars! The team was very patient during the implementation to the going live. I am very happy to have a business partner who cares about the end result.  I highly suggest you have Manan and team review you website and allow them to provide an intro refresh. They will not disappoint. ReBrand Gurus will change how you do business. Forever. Thank you!`,
    },
];

const Testimonials = () => {
  
  const sliderRef = useRef(null);

  const settings = {
    autoplay: false,
    autoplaySpeed: 1000,
    speed: 600,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    appendDots: (dots) => (
      <Box> 
        <ul>{dots}</ul>  
      </Box>
    ),
    customPaging: (i) => (
      <Box className="testimonial_dot_box">
        <Box className="testimonial_thumb_box">
          <Avatar
            alt={testimonials[i].title}
            sx={{ width: 64, height: 64 }}
            src={testimonials[i].image}
          />
        </Box>
        <Box className="testimonial_cnt_box">
          <h3 className="testimonial-user-title">{testimonials[i].title}</h3>
          <p className="testimonial-user-designation">{testimonials[i].job}</p>
        </Box>
      </Box>
    ),
  };
  return (
    <Box component={"section"} bgcolor={"#000"} position={"relative"} py={8}>
      <Slider className="testimonial-slider" {...settings} ref={sliderRef}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-slide">
            <div className="testimonial_box">
              <div className="testimonial_box-inner">
                <div className="testimonial_box-top">
                  <div className="testimonial_box-icon">
                    <i className="fas fa-quote-right"></i>
                  </div>
                  <div className="testimonial_box-text">
                    <p>{testimonial.quote}</p>
                    <NextImage
                      src={QuoteImg}
                      className="img-fluid"
                      alt="Quote Icon"
                      width={80}
                      height={80}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Testimonials;
