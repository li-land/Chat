import styled from "styled-components";

interface DialogItemBoxProps {
  isSelectedDialog: boolean;
}
export const DialogItemBox = styled.div<DialogItemBoxProps>`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelectedDialog ? "#ede7f6" : "#fff")};
  &:hover {
    background-color: ${(props) =>
      props.isSelectedDialog ? "#ede7f6" : "#eceff1"};
  }
`;
