import styled from "styled-components";

interface StatusColorDotProps {
  isOnline: boolean;
}

export const StatusColorDot = styled.div<StatusColorDotProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.isOnline ? "#81c784" : "#ec407a")};
`;
