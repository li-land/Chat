import { keyframes } from "styled-components";

export const animateStyle = {
  increase: keyframes`
	50% {
	  transform: scale(1.1);
	}
 `,
  blink: keyframes`
  	50% {
  	  opacity: 1;
  	}
   `,
  bounce: keyframes`
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.2,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-30px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-5px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }
   `,
};
