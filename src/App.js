"use client";

import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./ThemeModule";
import AnimatedCursor from "react-animated-cursor";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SpinWheel from "./components/SpinWheel";
import Home from "./views/Home";
import AboutUs from "./views/AboutUs";
import Contact from "./views/Contact";
import Portfolio from "./views/Portfolio";
import Blog from "./views/Blog";
import SinglePost from "./views/blog/SinglePost";
import ServiceDetailsLayout from "./views/services/ServiceDetailsLayout";
import SeoContent from "./views/services/SeoContent";
import WebDesignContent from "./views/services/WebDesignContent";
import ServicePage from "./views/ServicePage";
import Consultation from "./views/Consultation";
import Page404 from "./views/Page404";
import ComingSoon from "./views/ComingSoon";
import PageLayout from "./views/PageLayout";
import Pricing from "./views/Pricing";
import NewSeo from "./views/NewSeo";
// import MergersAndAcquisitions from "./views/MergersAndAcquisitions";


const services = [
  {
    id: "0",
    slug: "web-design",
    title: "Web Design",
    content: <WebDesignContent />,
  },
  {
    id: "1",
    slug: "seo",
    title: "SEO",
    content: <SeoContent />,
  },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          hasBlendMode={true}
          innerStyle={{
            backgroundColor: "var(--cursor-color)",
            zIndex:10000
          }}
          outerStyle={{
            border: "3px solid var(--cursor-color)",
            zIndex:10000
          }}
        />
        <div className="body-bg"></div>
        <BrowserRouter> 
        <ScrollToTop />

          <Header />
          {/* <SpinWheel /> */}
          <div className="mainContentWrp">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about-us" element={<AboutUs />} />
              <Route exact path="/contact-us" element={<Contact />} />
              <Route exact path="/portfolio" element={<Portfolio />} />
              <Route exact path="/blog" element={<Blog />} />
              <Route exact path="/services" element={<ServicePage />} />
              <Route exact path="/consultation" element={<Consultation />} />
              <Route exact path="/pricing" element={<Pricing />} />
              <Route exact path="/new-seo" element={<NewSeo />} />
              {/* <Route exact path="/mergers-and-acquisitions" element={<MergersAndAcquisitions />} /> */}
              <Route exact path="/coming-soon" element={<ComingSoon />} />
              <Route path="*" element={<Page404 />} />
              <Route exact path="/:slug" element={<PageLayout />} />
              <Route path="/blog/:postId" element={<SinglePost />} />
              {services.map((service) => (
                <Route
                  key={service.id}
                  exact
                  path={`/service/${service.slug}`}
                  element={<ServiceDetailsLayout id={service.id} content={service.content} />}
                />
              ))}
            </Routes>
          </div>
        
        <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
