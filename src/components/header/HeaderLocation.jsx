"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';

const options = [
  {
    icon: 'SLC', 
    label: 'Salt Lake City',
    sub: 'Utah',
    image:
      'https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg',
  },
  {
    icon: 'VA', 
    label: 'Stafford',
    sub: 'Virginia',
    image:
      'https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg',
  },
  {
    icon: 'WY', 
    label: 'Sheridan',
    sub: 'Wyoming',
    image:
      'https://66.media.tumblr.com/5af3f8303456e376ceda1517553ba786/tumblr_o4986gakjh1qho82wo1_1280.jpg',
  },
  {
    icon: 'UAE', 
    label: 'Dubai',
    sub: 'United Arab Emirates',
    image:
      'https://66.media.tumblr.com/5516a22e0cdacaa85311ec3f8fd1e9ef/tumblr_o45jwvdsL11qho82wo1_1280.jpg',
  },
  {
    icon: 'ENG', 
    label: 'Leeds',
    sub: 'New York',
    image:
      'https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmrkok5sr33i707lqpi410oot',
  },
];

const HeaderLocation = () => {
  const [active, setActive] = useState(0);

  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <Box className="options">
      {options.map((opt, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`option ${index === active ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${opt.image})`,
          }}
        >
            <div class="shadow"></div>
          <div className="label">
            <div className="icon">{opt.icon}</div>
            {index === active && (
              <div className="info">
                <div className='main'>{opt.label}</div>
                <div className='sub'>{opt.sub}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </Box>
  );
};

export default HeaderLocation;
