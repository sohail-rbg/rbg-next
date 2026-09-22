"use client";

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { flushSync } from 'react-dom'
// import { DotButton, PrevButton, NextButton } from "./EmblaCarouselButtons";

import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NextImage from './NextImage';

const TWEEN_FACTOR = 1.2

const EmblaCarousel = (props) => {
  const {
    slides,
    options,
    sliderImage,
    autoPlay = false,
    autoPlayDelay = 5000,
  } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [tweenValues, setTweenValues] = useState([])

 
  const onScroll = useCallback(() => {
    if (!emblaApi) return

    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      return diffToTarget * (-1 / TWEEN_FACTOR) * 100
    })
    setTweenValues(styles)
  }, [emblaApi, setTweenValues])

  useEffect(() => {
    if (!emblaApi) return

    const handleScroll = () => {
      flushSync(() => onScroll())
    }

    onScroll()
    emblaApi.on('scroll', handleScroll)
    emblaApi.on('reInit', onScroll)

    return () => {
      emblaApi.off('scroll', handleScroll)
      emblaApi.off('reInit', onScroll)
    }
  }, [emblaApi, onScroll])

  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || !autoPlay) return undefined

    const timer = window.setInterval(() => {
      emblaApi.scrollNext()
    }, autoPlayDelay)

    return () => window.clearInterval(timer)
  }, [autoPlay, autoPlayDelay, emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
            
              <div className="embla__parallax">
              <ParallaxBanner
              className="embla__parallax__layer"
              style={{
                ...(tweenValues.length && {
                  transform: `translateX(${tweenValues[index]}%)`,
                  aspectRatio: "2 / 1.2"
                })
              }}
              >
               
                  
                    <ParallaxBannerLayer
                      className="embla__slide__img embla__parallax__img"
                      speed={-15}
                      scale={[1, 1.1]}
                      opacity={[0.9, 1]}
                    >
                      <NextImage
                        src={sliderImage[index]}
                        alt=""
                        fill
                        sizes="100vw"
                        priority={index === 0}
                      />
                    </ParallaxBannerLayer>
                  </ParallaxBanner>
              </div>
            </div>
          ))}
        </div>
        
        <Stack direction="row"  className='teamBtnGroup serviceSliderButtonGroup crouselGroupNav'>
          <IconButton  className='prev_arrow arrowBtn' color="primary" onClick={scrollPrev}>
              <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton  className='next_arrow arrowBtn' color="primary"  onClick={scrollNext}>
              <ArrowForwardIosIcon />
          </IconButton>
      </Stack>
       
      </div>
    </div>
  )
}

export default EmblaCarousel
