import { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "@mui/material";
import { authPageRoutes } from "../routes";

const AuthPage: FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Routes>
        {authPageRoutes.map((route) => {
          return <Route key={route.path} {...route} />;
        })}
      </Routes>
    </Box>
  );
};

export default AuthPage;
