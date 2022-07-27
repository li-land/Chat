import { FC, ReactElement } from "react";
import { Box } from "@mui/material";

interface BlockHeaderProps {
  children: ReactElement;
}
const BlocksHeader: FC<BlockHeaderProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "60px",
        boxShadow: "0 2px 5px rgba(150, 150, 150, 0.1)",
        padding: "0 10px",
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
};

export default BlocksHeader;
