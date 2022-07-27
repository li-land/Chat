import { FC } from "react";
import EmailIcon from "@mui/icons-material/AlternateEmailSharp";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Button } from "../components";
import { AuthActionCreators } from "../store/actions";
import { useAppDispatch, useAppSelector } from "../hooks";

const AlertActivatePage: FC = () => {
  const { email } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "0 20px",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          //  padding: "50px 30px",
          //  boxShadow: "0px 0px 10px 0px rgba(195, 195, 195, 0.3)",
          textAlign: "center",
        }}
      >
        <EmailIcon
          sx={{ width: "70px", height: "70px", marginBottom: "40px" }}
          color="primary"
        />
        <Typography
          sx={{
            fontSize: "20px",
            marginBottom: "20px",
          }}
          variant="h2"
        >
          Активируйте аккаунт
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "100",
            lineHeight: "1.5",
            textAlign: "center",
            color: "#808080",
            marginBottom: "50px",
          }}
          variant="subtitle1"
          component="p"
        >
          На Вашу почту {email} было отправлено письмо с ссылкой для активации
          аккаунта
        </Typography>
        <Button
          sx={{ fontSize: "12px", width: "190px" }}
          variant="contained"
          onClick={() => {
            dispatch(AuthActionCreators.setAuth(false));
          }}
        >
          Вернутся назад
        </Button>
      </Box>
    </Box>
  );
};

export default AlertActivatePage;
