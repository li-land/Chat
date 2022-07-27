import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface BoxLoaderProps {
  loadingText: string;
}

const BoxLoader: FC<BoxLoaderProps> = ({ loadingText = "" }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <CircularProgress sx={{ color: "#b39ddb" }} />
      <Typography
        sx={{
          fontWeight: "300",
          letterSpacing: "1px",
          color: "#b39ddb",
          marginTop: "5px",
        }}
      >
        {loadingText}
      </Typography>
    </Box>
  );
};
export default BoxLoader;
