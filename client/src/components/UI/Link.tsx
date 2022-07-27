import { FC } from "react";
import { Link as ReactLink } from "react-router-dom";
import styled from "styled-components";

interface LinkProps {
  to: string;
  children: string;
}

const AppLink = styled(ReactLink)`
  color: #ce93d8;
  &:hover {
    color: #ba68c8;
  }
`;

const Link: FC<LinkProps> = (props) => {
  return <AppLink {...props} />;
};

export default Link;
