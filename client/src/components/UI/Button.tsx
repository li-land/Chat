import { FC } from "react";
import { Button as MUIButton, ButtonProps, styled } from "@mui/material";

const AppButton = styled(MUIButton)<ButtonProps>({
  padding: "0 40px",
  fontSize: "14px",
  fontWeight: "400",
  height: "50px",
  marginBottom: "20px",
  backgroundColor: "#7e57c2",
  boxShadow: "0 3px 15px rgba(150, 150, 150, 0.5)",
  "&:hover": {
    backgroundColor: "#9575cd",
    boxShadow: "0 3px 15px rgba(150, 150, 150, 0.5)",
  },
});

const Button: FC<ButtonProps> = (props) => {
  return (
    <AppButton {...props} fullWidth>
      {props.children}
    </AppButton>
  );
};

export default Button;
