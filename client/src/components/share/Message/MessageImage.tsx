import styled, { css } from "styled-components";
import { IOwnMessage } from "../../../interfaces";
import { animateStyle } from "../../../styles/animate";

interface AloneImageProps extends IOwnMessage {
  alone?: boolean;
}

export const MessageImage = styled.img<AloneImageProps>`
  width: ${(props) => (props.alone ? "180px" : "100px")};
  height: ${(props) => (props.alone ? "180px" : "100px")};
  object-fit: cover;
  border-radius: 8px;
  &:not(:last-child) {
    margin: ${(props) => (props.alone ? "0 0 8px 5px" : "0 5px 8px 0")};
  }
  margin-top: 0;
  margin-bottom: 8px;
  animation: ${css`
    ${animateStyle.bounce} 1s ease
  `};
`;
