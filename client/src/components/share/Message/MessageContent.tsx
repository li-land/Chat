import styled from "styled-components";
import { IOwnMessage } from "../../../interfaces";

export const MessageContent = styled.div<IOwnMessage>`
  text-align: ${(props) => (props.isOwnMessage ? "right" : "left")};
  max-width: 440px;
`;
