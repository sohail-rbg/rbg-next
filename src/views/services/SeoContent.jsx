"use client";

// import { Box } from '@mui/material'
import React, { useState, useEffect } from "react";
import WhyUsSection from "./seo/WhyUsSection";
import ServicesSeo from "./seo/ServicesSeo";
import Testimonials from "./Testimonials";
import ServiceCTA from "./ServiceCTA";
import ServiceFAQS from "./ServiceFAQS";
import ClientLogos from "./ClientLogos";


import CompareSection from "./seo/CompareSection";



import { gql } from "graphql-request";
import Hygraph from "../../GraphqlClient";

const SeoContent = () => {

  const [clients, setClients] = useState([]);      

  useEffect(() => {
    const fetchPosts = async () => {
      const query = gql`
        query MyQuery {
          portfolios ( where: {websiteLogo: {}}) {
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



  const accordionData = [
    {
      id: "panel1",
      question: "What is SEO and why is it important for my business?",
      answer: `<p>SEO, or Search Engine Optimization, is the practice of improving your website's visibility on search engines like Google. It's important for your business because higher visibility means more traffic to your website, which can lead to more leads, sales, and growth. At ReBrand Gurus, we use proven SEO strategies to help your business rank higher in search results, attract more visitors, and ultimately achieve your online marketing goals.</p>`,
    },
    {
      id: "panel2",
      question: "How long does it take to see results from SEO?",
      answer: `<p>SEO is a long-term investment and results typically take time to manifest. While some improvements can be seen within the first few months, it generally takes 6 to 12 months to see significant results. This timeframe can vary depending on your industry, the competitiveness of your keywords, and the current state of your website. ReBrand Gurus focuses on sustainable, long-term growth through ethical SEO practices to ensure lasting results.</p>`,
    },
    {
      id: "panel3",
      question: "What SEO services does ReBrand Gurus offer?",
      answer: `<p>ReBrand Gurus offers a comprehensive range of SEO services to improve your website's search engine ranking and online presence. Our services include keyword research, on-page optimization, technical SEO, content creation, link building, local SEO, and analytics tracking. We tailor our strategies to meet the unique needs of your business, ensuring the most effective approach for your specific goals.</p>`,
    },
    {
      id: "panel4",
      question: " How do you measure the success of an SEO campaign?",
      answer: `<p>We measure the success of an SEO campaign using various key performance indicators (KPIs). These include organic traffic growth, keyword rankings, conversion rates, bounce rates, and the overall return on investment (ROI). At ReBrand Gurus, we provide detailed monthly reports that outline your website's performance, allowing you to see the tangible benefits of our SEO efforts. Our goal is to ensure transparency and keep you informed about the progress of your campaign.</p>`,
    },
  ];

  return (
    <>
      <WhyUsSection />
      <ServicesSeo />
      <Testimonials />
      <CompareSection />
      <ClientLogos clientLogo={clients} />
      <ServiceCTA />
      <ServiceFAQS accordionData={accordionData} />
    </>
  );
};

export default SeoContent;
