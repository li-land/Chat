import styled from "styled-components";
import { IOwnMessage } from "../../../interfaces";

export const MessageDate = styled.p<IOwnMessage>`
  font-size: 10px;
  color: #90a4ae;
  font-weight: 100;
  text-align: ${(props) => (props.isOwnMessage ? "right" : "left")};
`;
