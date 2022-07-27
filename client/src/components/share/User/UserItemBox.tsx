import styled from "styled-components";

interface UserItemBoxProps {
  isSelectedUser?: boolean;
}
export const UserItemBox = styled.div<UserItemBoxProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 4px;
  background-color: ${(props) => (props.isSelectedUser ? "#ede7f6" : "#fff")};
  &:hover {
    background-color: ${(props) =>
      props.isSelectedUser ? "#ede7f6" : "#eceff1"};
  }
`;
