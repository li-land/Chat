import styled, { css } from "styled-components";
import { IOwnMessage } from "../../../interfaces";
import { animateStyle } from "../../../styles/animate";

export const MessageBubble = styled.div<IOwnMessage>`
  position: relative;
  display: inline-block;
  background: ${(props) => (props.isOwnMessage ? "#7986cb" : "#9575cd")};
  box-shadow: 0 3px 15px rgba(150, 150, 150, 0.5);
  border-radius: ${(props) =>
    props.isOwnMessage ? "12px 12px 0 12px" : "12px 12px 12px 0"};
  padding: 15px;
  color: #ede7f6;
  text-align: left;
  line-height: 1.5;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  overflow: hidden;
  animation: ${css`
    ${animateStyle.bounce} 1s ease
  `};
`;
