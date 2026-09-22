"use client";

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Animations
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

// Styled Components
const MainContainer = styled(Box)({
  // minHeight: '100vh',
  // background: 'linear-gradient(to bottom right, #fce7f3, #ffe4e6, #fee2e2)',
  // padding: '48px 16px',
});

const EmailCard = styled(Box)({
  maxWidth: '672px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  overflow: 'hidden',
  position: 'relative',
});

const FloatingHeart = styled(Box)(({ delay = '0s', top, left, right, bottom, size = '48px' }) => ({
  position: 'absolute',
  top,
  left,
  right,
  bottom,
  fontSize: size,
  pointerEvents: 'none',
  animation: `${delay === '0s' ? pulse : bounce} 2s ease-in-out infinite`,
  animationDelay: delay,
  zIndex: 1,
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 10,
  padding: '32px 48px',
  '@media (min-width: 768px)': {
    padding: '48px',
    
  },
  '@media (max-width: 767px)': {
    padding: '20px',
    
  },
});

const HeaderSection = styled(Box)({
  textAlign: 'center',
  marginBottom: '32px',
  paddingBottom: '24px',
  borderBottom: '4px solid #fbcfe8',
});

const HighlightedWord = styled('span')(({ color }) => ({
  color: color,
  position: 'relative',
  display: 'inline-block',
}));

const WavyUnderline = styled('svg')({
  position: 'absolute',
  bottom: '-8px',
  left: 0,
  width: '100%',
});

const ProblemsList = styled(Box)({
  marginBottom: '32px',
  background: 'linear-gradient(to right, #fce7f3, #ffe4e6)',
  borderRadius: '16px',
  padding: '24px',
});

const ProblemItem = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  marginBottom: '11px',
  '&:last-child': {
    marginBottom: 0,
  },
  '& .heart-icon': {
    fontSize: '24px',
    marginTop: '-6px',
    transition: 'transform 0.3s ease',
  },
  '&:hover .heart-icon': {
    transform: 'scale(1.25)',
  },
});

const PunchlineBox = styled(Box)({
  background: 'linear-gradient(to right, #ef4444, #ec4899)',
  color: '#ffffff',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '32px',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const QuoteBox = styled(Box)({
  backgroundColor: '#fce7f3',
  borderLeft: '4px solid #ec4899',
  borderRadius: '0 12px 12px 0',
  padding: '20px',
  fontStyle: 'italic',
});

const CTASection = styled(Box)({
  background: 'linear-gradient(to bottom right, #fce7f3, #ffe4e6, #fecaca)',
  borderRadius: '16px',
  padding: '32px',
  marginBottom: '32px',
  border: '2px solid #fbcfe8',
});

const SingleButton = styled('span')({
  display: 'inline-block',
  backgroundColor: '#ec4899',
  color: '#ffffff',
  padding: '8px 16px',
  borderRadius: '8px',
  fontWeight: 'bold',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'rotate(2deg)',
  },
});

const WhatsAppButton = styled(Button)({
  backgroundColor: '#22c55e',
  color: '#ffffff',
  fontWeight: 'bold',
  padding: '16px 32px',
  borderRadius: '9999px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  textTransform: 'none',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  margin: '0 auto',
  maxWidth: '384px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#16a34a',
    transform: 'scale(1.05)',
  },
});

const SignatureSection = styled(Box)({
  textAlign: 'center',
  marginBottom: '24px',
});

const PSBox = styled(Box)({
  backgroundColor: '#fee2e2',
  border: '1px solid #fecaca',
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'center',
});

const WaveDecoration = styled(Box)({
  width: '100%',
  height: '16px',
  background: 'linear-gradient(to right, #f9a8d4, #fca5a5, #f9a8d4)',
});

export default function ValentineEmail() {
  return (
    <MainContainer>
      <EmailCard>
        {/* Decorative hearts */}
        <FloatingHeart top="40px" left="40px" size="60px" delay="0s">💕</FloatingHeart>
        <FloatingHeart top="80px" right="64px" size="40px" delay="0.5s">💝</FloatingHeart>
        <FloatingHeart bottom="128px" left="64px" size="50px" delay="1s">💗</FloatingHeart>
        <FloatingHeart bottom="192px" right="80px" size="30px" delay="1.5s">💖</FloatingHeart>

        {/* Main content */}
        <ContentWrapper>
          {/* Header */}
          <HeaderSection>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#db2777', 
                fontWeight: 500, 
                mb: 1,
                letterSpacing: '0.05em',
              }}
            >
              Hi there,
            </Typography>
            <Typography 
              variant="h3" 
              component="h1"
              sx={{ 
                // fontWeight: 'bold', 
                color: '#1f2937',
                fontSize: { xs: '2.25rem', md: '3rem' },
                lineHeight: 1.2,
              }}
            >
              Is your website{' '}
              <HighlightedWord color="#ec4899">
                single
                <WavyUnderline height="8" viewBox="0 0 100 8">
                  <path d="M0 4 Q25 0, 50 4 T100 4" stroke="#ec4899" strokeWidth="3" fill="none"/>
                </WavyUnderline>
              </HighlightedWord>
              {' '}or{' '}
              <HighlightedWord color="#ef4444">
                taken
                <WavyUnderline height="8" viewBox="0 0 100 8">
                  <path d="M0 4 Q25 8, 50 4 T100 4" stroke="#ef4444" strokeWidth="3" fill="none"/>
                </WavyUnderline>
              </HighlightedWord>
              ?
            </Typography>
          </HeaderSection>

          <Typography variant="h6" sx={{ color: '#374151', mb: 3, fontWeight: 500 }}>
            Because if it's…
          </Typography>

          {/* Problems list */}
          <ProblemsList>
            {[
              'Getting visitors but no commitments',
              'Being ghosted by leads',
              'Looking "nice" but not converting'
            ].map((item, index) => (
              <ProblemItem key={index}>
                <span className="heart-icon">💔</span>
                <Typography variant="body1" sx={{ color: '#374151', fontSize: '1.125rem', flex: 1 }}>
                  {item}
                </Typography>
              </ProblemItem>
            ))}
          </ProblemsList>

          {/* Punch line */}
          <PunchlineBox>
            <Typography variant="h5" >
              …it might be taken, but in a toxic relationship.
            </Typography>
          </PunchlineBox>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ color: '#374151', fontSize: '1.125rem', mb: 3 }}>
              At <span style={{ fontWeight: 'bold', color: '#db2777' }}>Rebrand Gurus</span>, we help brands break up with outdated,
              underperforming websites, and build ones worth committing to.
            </Typography>
            
            <QuoteBox>
              <Typography variant="body1" sx={{ color: '#1f2937' }}>
                Think of it as relationship counseling…{' '}
                <em style={{ fontWeight: 600, fontStyle: 'normal', color: '#be185d' }}>but for your brand</em>.
              </Typography>
            </QuoteBox>

            <Typography variant="body1" sx={{ color: '#374151', fontSize: '1.125rem', mt: 3 }}>
              If you're curious whether your website is helping or hurting
              your growth, let's talk.
            </Typography>
          </Box>

          {/* CTA Section */}
          <CTASection>
            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1f2937', mb: 2 }}>
              Reply with <SingleButton>"SINGLE"</SingleButton> and we will
              take a look.
            </Typography>
            
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#4b5563', mb: 3 }}>
              Prefer WhatsApp? Message us and we will respond fast.
            </Typography>

            {/* WhatsApp Button */}
            <WhatsAppButton
              href="https://api.whatsapp.com/send/?phone=15129523367&text=Hi+Rebrand+Gurus%2C+my+website+might+be+single.+Can+you+take+a+look%3F&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon sx={{ fontSize: 24 }} />
              <span>Chat on WhatsApp</span>
            </WhatsAppButton>
          </CTASection>

          {/* Signature */}
          <SignatureSection>
            <Typography variant="body1" sx={{ color: '#374151', fontSize: '1.125rem', mb: 0.5 }}>
              Happy Valentine's,
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#db2777' }}>
              ReBrand Gurus
            </Typography>
          </SignatureSection>

          {/* P.S. */}
          <PSBox>
            <Typography variant="body2" sx={{ color: '#374151', fontStyle: 'italic' }}>
              <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>P.S.</span> Roses fade. A high-converting website doesn't. 🌹
            </Typography>
          </PSBox>
        </ContentWrapper>

        {/* Bottom decorative wave */}
        <WaveDecoration />
      </EmailCard>
    </MainContainer>
  );
}
