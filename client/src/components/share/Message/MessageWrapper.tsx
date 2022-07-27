import styled from "styled-components";
import { IOwnMessage } from "../../../interfaces";

export const MessageWrapper = styled.div<IOwnMessage>`
  display: flex;
  flex-direction: ${(props) => (props.isOwnMessage ? "row-reverse" : "row")};
  margin-bottom: 25px;
`;
