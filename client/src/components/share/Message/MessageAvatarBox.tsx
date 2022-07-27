import styled from "styled-components";
import { IOwnMessage } from "../../../interfaces";

export const MessageAvatarBox = styled.div<IOwnMessage>`
  display: flex;
  align-items: flex-end;
  margin: ${(props) => (props.isOwnMessage ? "0 0 0 15px" : "0 15px 0 0")};
  padding-bottom: 20px;
`;
