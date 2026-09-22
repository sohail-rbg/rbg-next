"use client";

import React, { useState, useEffect } from "react";
// import HomeBanner from "./home/HomeBanner";
import USPSection from "./home/USPSection";
import HomeAbout from "./home/HomeAbout";
import WhyChooseUs from "./home/WhyChoose";
import HomeTeam from "./home/HomeTeam";
import BrandInfo from "./home/BrandInfo";
import HowWeWork from "./home/HowWeWork";
// import ProductSection from "./home/ProductSection";
import HeroSection from "./home/HeroSection";
import PortfolioHome from "./home/PortfolioHome";
import ClientLogos from "./services/ClientLogos";
// import HomePortfio from "./home/HomePortfio";
// import TrailImages from "./home/homeBanner/banner";

// import Snowfall from "../components/Snowfall"
import { gql } from "graphql-request";
import Hygraph from "../GraphqlClient";  

// import { PortfolioData } from "../Data";
// import WeeklyDrop from "./home/WeeklyDrop";
import Weekly from "./home/weekly";
// import HeartEffect from "../components/HeartEffect";

const Home = () => {

  const [clients, setClients] = useState([]);

  // const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchPosts = async () => {
      const query = gql`
        query MyQuery {
          portfolios (where: {websiteLogo: {}}) {
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
        const randomClients = shuffled.slice(0, 20); 
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
      <HeroSection />
      <USPSection />
      <HomeAbout />
      <Weekly />
      <WhyChooseUs />
      <HomeTeam />
      <BrandInfo />

      <PortfolioHome />
      <ClientLogos clientLogo={clients} />
      <HowWeWork />
      {/* <ProductSection /> */}
    
      
    </>
  );
};

export default Home;
