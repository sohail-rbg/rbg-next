"use client";

import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import WebServiceTab from "./webdesign/WebServiceTab";

import { AnimatedParagraph } from "../../ThemeModule";

// import './webdesign/style.css'
import ServiceCTA from "./ServiceCTA";
import SkillsWebDesign from "./webdesign/SkillsWebDesign";
import ProcessWebDesign from "./webdesign/ProcessWebDesign";
import ClientLogos from "./ClientLogos";
import { ScrollTop } from "../../components/ScrollTop";

import BeforeAfterDesign from "./webdesign/BeforeAfterDesign";
import WebDesignHero from "./webdesign/WebDesignHero";

import ba_img_01 from '../../images/services/webdesign/portfolio/yatch.png'
import ba_img_02 from '../../images/services/webdesign/portfolio/consulting.png'
import ba_img_03 from '../../images/services/webdesign/portfolio/dtcs.png'
import Testimonials from "./Testimonials"; 
import ServiceFAQS from "./ServiceFAQS";

import customWebsiteImg from "../../images/services/webdesign/services/customWebsite.jpg";
import uiImg from "../../images/services/webdesign/services/ui.jpg";
import ecommerceImg from "../../images/services/webdesign/services/ecommerce.jpg";
import cmsImg from "../../images/services/webdesign/services/cms.jpg";
import hostingImg from "../../images/services/webdesign/services/hosting.jpg";


import { gql } from "graphql-request";
import Hygraph from "../../GraphqlClient";
import { ServicesPageData } from "../../Data";


const beforeAfter = [
  {
    img:ba_img_01,
    title:'Yatch Life',
    website:''
  },
  {
    img:ba_img_02,
    title:'WH Consulting',
    website:''
  },
  {
    img:ba_img_03,
    title:'DTCS',
    website:''
  }
]


const accordionData = [
  {
    id: "panel1",
    question: "What are website redesign services?",
    answer: `<p>Website redesign services are design solutions that aim to update, modify and improve the experience of an existing website</p>
    <p>Agencies will provide redesign services to website owners to tackle current customer pain points and target digital opportunities, ultimately transforming their digital presence.</p>`
  },
  {
    id: "panel2",
    question: "How much do website redesign services cost?",
    answer: `<p>The cost of website redesign services varies depending on the size and requirements of the project.</p>
    <p>A complete set of custom website redesign services, from design and development to website maintenance services, will cost much more than a smaller website refresh, for instance.</p>`
  },
  {
    id: "panel3",
    question: "How can I tell if my existing website needs a web redesign?",
    answer: `<p>First impressions count. In fact, it takes just 7 seconds for a consumer to make up their mind about your product or services.</p>
    <p><strong>Do you believe that your website will win them over in these initial phases?</strong></p>
    <p>Even the slightest user experience inconvenience, such as a slow loading speed, or user interface issue, such as poor color contrasts or a lack of white space, can cause a user to bounce from your website.</p>
    <p>So, unless you’re absolutely sure that your website ticks all of the consumer satisfaction boxes, it’s time to invest in website redesign services.</p>`
  },
  
];

const webServiceTabData = [
  {
    id:0,
    featuredImg: customWebsiteImg,
    bgColor:'#8B9C8C',
    title: 'Custom Website Design',
    color:'#000',
    Description:`<ul>
    <li><strong>Tailored Solutions:</strong> Designing a website from scratch to meet the specific needs and branding of the client.</li>
    <li><strong>Unique Aesthetics:</strong> Creating unique layouts, graphics, and interfaces that align with the client’s brand identity.</li>
    <li><strong>Responsive Design:</strong> Ensuring the website is fully functional and aesthetically pleasing across various devices, including desktops, tablets, and smartphones.</li>
    </ul>`
  },
  {
    id:1,
    featuredImg: uiImg,
    bgColor:'#2E5E53',
    title: 'UI/UX Design',
    Description:`<ul>
    <li><strong>User Interface (UI) Design:</strong> Focusing on the look and feel of the website, including buttons, icons, and layout.</li>
    <li><strong>User Experience (UX) Design:</strong> Enhancing the overall experience of the users by improving the usability, accessibility, and interaction of the website.</li>
    <li><strong>Prototyping and Wireframing:</strong> Creating blueprints and mock-ups to visualize and test the layout before final development.</li>
    </ul>`
  },
  {
    id:2,
    featuredImg: ecommerceImg,
    bgColor:'#214E44',
    title: 'E-commerce Solutions',
    Description:`<ul>
    <li><strong>Online Store Design:</strong> Developing user-friendly and secure online storefronts with product pages, shopping carts, and checkout processes.</li>
    <li><strong>Payment Gateway Integration:</strong> Integrating various payment methods to facilitate smooth transactions.</li>
    <li><strong>Inventory Management Systems:</strong> Providing tools for managing stock, orders, and customer data.</li>
    </ul>`
  },
  {
    id:3,
    featuredImg: cmsImg,
    bgColor:'#26433C',
    title: 'Content Management Systems (CMS)',
    Description:`<ul>
    <li><strong>Custom CMS Development:</strong>  Building tailored content management systems for easy website updates and maintenance.</li>
    <li><strong>Popular CMS Integration:</strong> Implementing popular CMS platforms like WordPress, Joomla, or Drupal, allowing clients to manage their own content.</li>
    </ul>`
  },
  {
    id:4,
    featuredImg: hostingImg,
    bgColor:'#0E322A',
    title: 'Hosting and Maintenance',
    Description:`<ul>
    <li><strong>Hosting Solutions:</strong> Offering reliable web hosting services to ensure the website is always accessible.
    </li>
    <li><strong>Domain Management:</strong> Assisting with domain registration, renewal, and management.</li>
    <li><strong>Technical Support:</strong> Providing ongoing technical support to address any issues or bugs that arise.</li>
    </ul>`
  }
]

const WebDesignContent = () => {
  const [clients, setClients] = useState([]);
  const service = ServicesPageData.services[0];

  useEffect(() => {
    const fetchPosts = async () => {
      const query = gql`
        query MyQuery {
          portfolios ( where: {websiteLogo: {}, typeOfService_some: {slug: "web-development"}}) {
            websiteUrl
            title
            websiteLogo {
              url
            }
          }
        }
      `;
      try {
        const data = await Hygraph.request(query);

        const shuffled = data.portfolios.sort(() => 0.5 - Math.random());
        const maxClients = Math.min(shuffled.length, 20);
        const evenCount = maxClients % 2 === 0 ? maxClients : maxClients - 1; 
        const randomClients = shuffled.slice(0, evenCount);
        setClients(randomClients);
        
      } catch (error) {
        console.error("Error fetching client logos:", error);
      } finally {
         
      }
    };

    fetchPosts();
  }, []);
  
  return (
    <>
      <WebDesignHero service={service} />

      <div className="wdxRibbon" aria-hidden="true">
        <div className="wdxRibbon__track">
          {[...Array(6)].map((_, index) => (
            <span className="wdxRibbon__word" key={index}>
              {service.title}
              <i aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      <Box component="section" className="webdesignContentWrp wdPage">
        <Box className="aboutWebDesignSec wdxIntro">
          <span className="wdxIntro__orb" aria-hidden="true" />
          <AnimatedParagraph>
            Elevate your online brand with ReBrand Gurus expert website
            redesign services. Our team of award-winning designers specializes
            in revitalizing websites across industries.
          </AnimatedParagraph>
          <AnimatedParagraph>
            Whether you’re looking to enhance your B2C, B2B, or eCommerce
            platform, our custom redesign strategies focus on improving
            aesthetics, functionality and user experience. At ReBrand Gurus, we
            prioritize driving measurable results for your brand. Our strategic
            approach aims to boost search engine rankings, increase website
            traffic and strengthen your industry reputation. Partner with us to
            breathe new life into your digital presence and make a lasting
            impact on your target audience.
          </AnimatedParagraph>
        </Box>

        <WebServiceTab webServiceTabData={webServiceTabData} />
        <SkillsWebDesign />
        <ProcessWebDesign />
        <BeforeAfterDesign beforeAfter={beforeAfter} />
        <ClientLogos clientLogo={clients} />
        <Testimonials />
        <ServiceCTA />
        <ServiceFAQS accordionData={accordionData} />
      </Box>

      <div className="wdxFloat">
        <ScrollTop />
      </div>
    </>
  );
};

export default WebDesignContent;
