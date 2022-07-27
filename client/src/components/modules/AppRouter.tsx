import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { activateRoutes, authRoutes, chatRoutes } from "../../routes";
import { PageLoader } from "..";
import { AuthActionCreators } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Box } from "@mui/material";

const AppRouter: FC = () => {
  const { isLoading, isAuth } = useAppSelector((state) => state.auth);
  const { isActivated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(AuthActionCreators.checkAuth());
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuth) {
    return (
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#f8f2ff",
        }}
      >
        <Routes>
          {authRoutes.map((route) => {
            return <Route key={route.path} {...route} />;
          })}
        </Routes>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f8f2ff",
      }}
    >
      {isActivated ? (
        <Routes>
          {chatRoutes.map((route) => {
            return <Route key={route.path} {...route} />;
          })}
        </Routes>
      ) : (
        <Routes>
          {activateRoutes.map((route) => {
            return <Route key={route.path} {...route} />;
          })}
        </Routes>
      )}
    </Box>
  );
};

export default AppRouter;
