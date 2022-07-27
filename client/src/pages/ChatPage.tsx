import { FC, useEffect } from "react";
import { Box } from "@mui/material";
import socket from "../api/socket";
import { ChatDialogWindow, ChatDialogsBar } from "../components";
import { useAppSelector } from "../hooks";

const ChatPage: FC = () => {
  const { id } = useAppSelector((state) => state.user);
  useEffect(() => {
    localStorage.removeItem("login-email");
    localStorage.removeItem("register-email");
    localStorage.removeItem("register-username");
    socket.emit("client:chat_connected", id);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "1200px",
        height: "100%",
        paddingBottom: "5px",
        margin: "0 auto",
        borderRadius: "10px",
        boxShadow: "0 0 60px rgba(179, 157, 219 , 0.3)",
        backgroundColor: "#ffffff",
      }}
    >
      <ChatDialogsBar />
      <ChatDialogWindow />
    </Box>
  );
};

export default ChatPage;
