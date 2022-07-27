import styled from "styled-components";
import { IOwnMessage } from "../../../interfaces";

export const MessageImagesBox = styled.div<IOwnMessage>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) =>
    props.isOwnMessage ? "flex-end" : "flex-start"};
`;
