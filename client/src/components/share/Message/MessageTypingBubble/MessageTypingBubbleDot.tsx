import styled, { css } from "styled-components";
import { animateStyle } from "../../../../styles/animate";

interface MessageTypingBubbleDotProps {
  num: number;
}
export const MessageTypingBubbleDot = styled.span<MessageTypingBubbleDotProps>`
  height: 12px;
  width: 12px;
  margin: 0 2px;
  background-color: #ffffff;
  display: block;
  border-radius: 50%;
  opacity: 0.4;
  animation: ${(props) =>
    css`
      ${animateStyle.blink} 1s infinite ${props.num * 0.3333}s
    `};
`;
