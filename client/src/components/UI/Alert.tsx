import { FC, useState } from "react";
import { Alert as MUIAlert, styled } from "@mui/material";

interface AlertProps {
  children: string;
}

const AppAlert = styled(MUIAlert)({
  position: "absolute",
  top: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 30px",
  color: "#f06292",
  fontSize: "14px",
  fontWeight: "500",
  backgroundColor: "#fce4ec",
  border: "1px solid #f8bbd0",
  boxShadow: "0 3px 15px rgba(255, 220, 220, 0.5)",
});

const Alert: FC<AlertProps> = ({ children }) => {
  const [isShown, setIsShown] = useState<boolean>(true);
  setTimeout(() => {
    setIsShown(false);
  }, 2000);
  return <>{isShown && <AppAlert severity="error">{children}</AppAlert>}</>;
};

export default Alert;
