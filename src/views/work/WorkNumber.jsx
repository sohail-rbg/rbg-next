"use client";

import { Box, Container } from "@mui/material";
import React from "react";
import NumberBox from "./NumberBox";
import { AnimatePresence } from "framer-motion"
import { PortfolioData } from "../../Data";

const WorkNumber = () => {
    // const numberBoxLeft = `rotate:" -45deg", x: "-100%"`
    // const numberBoxRight = `rotate:" 45deg", x: "100%"`
    
  return (
    <Box component="section" sx={{ py: 5 }}>
      <Container>
        <Box className="work__achieve_box_grid">
        <AnimatePresence>
        {
            PortfolioData.number.map((work_num )=>(
                <NumberBox key={work_num.id} work_num={work_num} />
            ))
        }
        
          </AnimatePresence>

        </Box>
      </Container>
    </Box>
  );
};

export default WorkNumber;
