"use client";


import { createExpoIn, reversed } from "@popmotion/easing";



//Banner Image Trail on hover
import img1 from '../../../images/banner/1.png'
import img2 from '../../../images/banner/2.png'
import img3 from '../../../images/banner/3.png'
import img4 from '../../../images/banner/4.png'
import img5 from '../../../images/banner/5.png'
import img6 from '../../../images/banner/6.png'
import img7 from '../../../images/banner/7.png'
import img8 from '../../../images/banner/8.png'
import img9 from '../../../images/banner/9.png'
import img10 from '../../../images/banner/10.png'

// Version of Greensock's Quad ease out
export const powerOut4 = reversed(createExpoIn(4));

// Center images using transforms
export const center = (_, generated) =>
  `translate(-50%, -50%) ${generated}`;

// Emulate slightly different image ratios by randomly generating size
const generateNumber = (base, range) => {
  return base - range / 2 + Math.round(Math.random() * range);
};
export const generateSize = () => ({
  height: generateNumber(312, 70),
  width: generateNumber(250, 50)
});

// export const colors = Array.from(placeholderColors);
// 9 tiles (was 28): same visual effect, a third of the DOM and animation work.
export const colors = [img1, img2, img3, img4, img5, img6, img7, img8, img9]
// console.log(colors)
