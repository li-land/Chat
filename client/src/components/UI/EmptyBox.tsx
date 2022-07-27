import { FC, ReactElement } from "react";
import { Box, Typography } from "@mui/material";

interface EmptyBoxProps {
  text: string;
  children?: ReactElement;
}

const EmptyBox: FC<EmptyBoxProps> = ({ text = "", children = null }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {children}
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "14px",
          letterSpacing: "0.8px",
          color: "#b39ddb",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default EmptyBox;
