import React from 'react';
import { Grid, Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { green, red } from "@mui/material/colors";

import rbgLogo from '../../../images/rbg.png'
import SectionHeading from '../../../components/SectionHeading';
import NextImage from '../../../components/NextImage';

const iconStyle = {}; // Define your icon style here

const compareData = [
  {
    id: 1,
    title: 'ReBrand Gurus',
    status:'active',
    logo: rbgLogo,
    listItem: [
      { id: 0, text: 'Dedicated account manager with an in-house team to develop and implement assets', availability: 'yes' },
      { id: 1, text: 'All-in-one platform for optimizing, measuring, and reporting SEO’s ROI', availability: 'yes' },
      { id: 2, text: 'Built from your business objectives, market changes, and overall marketing efforts', availability: 'yes' },
      { id: 3, text: 'In-house project management software, 24/7 help desk, and direct client phone line', availability: 'yes' }
    ]
  },
  {
    id: 2,
    title: 'Typical SEO Agency',
    logo: '',
    listItem: [
      { id: 0, text: 'Dedicated account manager that’ll need your time to develop and implement assets', availability: 'yes' },
      { id: 1, text: 'Third-party toolkit for tracking SEO’s performance with subscription costs passed to you', availability: 'no' },
      { id: 2, text: 'Copy-and-paste checklist for optimizing your site and (hopefully) delivering results', availability: 'no' },
      { id: 3, text: 'Regular, but unreliable when site issues happen, and you need help now', availability: 'yes' }
    ]
  },
  {
    id: 3,
    title: 'In-house SEO',
    logo: '',
    listItem: [
      { id: 0, text: 'One or more team members searching for the time to optimize 200+ ranking factors', availability: 'no' },
      { id: 1, text: 'Free and paid tools for auditing, monitoring, and measuring rankings and traffic', availability: 'no' },
      { id: 2, text: 'S.M.A.R.T. goals, but difficult to achieve with limited resources, time, and skillsets', availability: 'yes' },
      { id: 3, text: 'Varied with documentation gaps leading to project delays and wasted budget.', availability: 'no' }
    ]
  }
];

const renderListItem = (item) => (
  <ListItem key={item.id}>
    <ListItemIcon sx={iconStyle}>
      {item.availability === 'yes' ? (
        <CheckCircleTwoToneIcon sx={{ color: green["A400"] }} />
      ) : (
        <CancelTwoToneIcon sx={{ color: red["A400"] }} />
      )}
    </ListItemIcon>
    <ListItemText primary={item.text} />
  </ListItem>
);

const CompareSection = () => {
  return (
    <>
    <Box component={'section'} sx={{py:6}}>

   <SectionHeading title={'Unlock a 25% Greater Marketing ROI'} align="center" />
    <Grid container spacing={2}>
      {compareData.map((data) => (
        <Grid item xs={12} md={4} key={data.id}>
          <Box  className={`compareBox ${data.status === 'active' ? 'active' : ''}`}>
          {data.logo ? (
            <Box className="cm_logo">
              <NextImage
                src={data.logo}
                alt={data.title}
                width={640}
                height={263}
                sizes="(max-width: 767px) 70vw, 300px"
                style={{ width: '100%' }}
              />
            </Box>
          ) : (
            <Box className="cm_logo">
              <Typography variant='h5' align='center' component={'h3'}>{data.title}</Typography>
            </Box>
          )}
            <Box className="cm_content">
              <List>
                {data.listItem.map(renderListItem)}
              </List>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
    </Box>
    </>
  );
};

export default CompareSection;
