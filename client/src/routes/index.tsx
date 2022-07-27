import { Navigate } from "react-router-dom";
import { AlertActivatePage, AuthPage, ChatPage } from "../pages";
import { LoginForm, RegisterForm } from "../components";
import { IRoute } from "../interfaces";

export enum RouteNames {
  HOST = "/",
  AUTH = "/auth",
  AUTH_PAGE = "/auth/*",
  LOGIN = "/login",
  REGISTRATION = "/registration",
  ACTIVATE_PAGE = "/activate",
  CHAT_PAGE = "/chat/*",
  CHAT = "/chat",
  NOT_FOUND = "*",
}

export const authRoutes: IRoute[] = [
  { path: RouteNames.AUTH_PAGE, element: <AuthPage /> },
  { path: RouteNames.HOST, element: <Navigate to={RouteNames.AUTH} /> },
  {
    path: RouteNames.NOT_FOUND,
    element: <Navigate to={RouteNames.AUTH} />,
  },
];

export const authPageRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, element: <LoginForm /> },
  { path: RouteNames.REGISTRATION, element: <RegisterForm /> },
  {
    path: RouteNames.NOT_FOUND,
    element: <Navigate to={`${RouteNames.AUTH}${RouteNames.LOGIN}`} />,
  },
];

export const activateRoutes: IRoute[] = [
  { path: RouteNames.ACTIVATE_PAGE, element: <AlertActivatePage /> },
  {
    path: RouteNames.NOT_FOUND,
    element: <Navigate to={RouteNames.ACTIVATE_PAGE} />,
  },
];

export const chatRoutes: IRoute[] = [
  { path: RouteNames.CHAT_PAGE, element: <ChatPage /> },
  {
    path: RouteNames.NOT_FOUND,
    element: <Navigate to={RouteNames.CHAT} />,
  },
];
