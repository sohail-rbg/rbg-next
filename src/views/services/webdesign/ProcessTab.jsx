"use client";

import { Box, Grid } from "@mui/material";
import React, { useRef } from "react";
// import Box from "../components/Box/Box";
// import ScrollSpy from "../components/src";
import ScrollSpy from "react-ui-scrollspy";

const ProcessTab = (props) => {
  const parentScrollContainerRef = useRef(null);

  const onPress = (e) => {
    e.preventDefault();
    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      var headerOffset = 20;
      var elementPosition = target.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Box className="">
        <Grid container>
          <Grid item
            xs={4}
            style={{ backgroundColor: "green" }}
          >
            <Box className="">
              <Box
                className="position-fixed"
                
              >
                <h1 className="mb-5">Example Heading</h1>
                <a onClick={(e) => onPress(e)} href={"#section-1"}>
                  <Box
                    style={{ textAlign: "Box" }}
                    data-to-scrollspy-id="section-1"
                    className="ss-item-demo-2"
                  >
                    Section 1
                  </Box>
                </a>
                <a onClick={(e) => onPress(e)} href={"#section-2"}>
                  <Box
                    data-to-scrollspy-id="section-2"
                    className="ss-item-demo-2 text-Box"
                  >
                    Section 2
                  </Box>
                </a>
                <a onClick={(e) => onPress(e)} href={"#section-3"}>
                  <Box
                    data-to-scrollspy-id="section-3"
                    className="ss-item-demo-2 text-Box"
                  >
                    Section 3
                  </Box>
                </a>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={8} >
            <Box
              ref={parentScrollContainerRef}
              // style={{
              //   position: "relative",
              //   overflowY: "scroll",
              //   height: "50vh",
              // }}
            >
              <ScrollSpy
                // parentScrollContainerRef={parentScrollContainerRef}
                activeClass="ss-active-demo-2"
                offsetBottom={100}
                scrollThrottle={80}
                useBoxMethod
              >
                <Box id="section-1" backgroundColor="orange" height="100vh">
                  <p>Section 1</p>
                </Box>
                <Box id="section-2" backgroundColor="brown" height="100vh">
                  <p>Section 2</p>
                </Box>
                <Box id="section-3" backgroundColor="blue" height="100vh">
                  <p>Section 3</p>
                </Box>
              </ScrollSpy>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProcessTab;
