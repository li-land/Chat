import styled, { css } from "styled-components";
import { IOwnMessage } from "../../../../interfaces";
import { animateStyle } from "../../../../styles/animate";

export const MessageTypingBubbleBox = styled.div<IOwnMessage>`
  display: flex;
  background: ${(props) => (props.isOwnMessage ? "#7986cb" : "#9575cd")};
  box-shadow: 0 5px 5px rgba(50, 115, 255, 0.1);
  border-radius: ${(props) =>
    props.isOwnMessage ? "12px 12px 0 12px" : "12px 12px 12px 0"};
  padding: 12px;
  animation: ${css`
    ${animateStyle.increase} 1.5s infinite ease-out
  `};
`;
