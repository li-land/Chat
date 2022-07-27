import { FC, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import {
  BlocksHeader,
  StatusColorDot,
  Messages,
  EmptyBox,
  BoxLoader,
  Composer,
  DropDownDialogMenu,
} from "..";
import socket from "../../api/socket";
import { IMessage } from "../../interfaces";
import { store } from "../../store";
import { DialogsActionCreators } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import bgLight from "../../assets/jpg/bg-chat-window-light.jpg";
import selectDialogSVG from "../../assets/svg/select-dialog.svg";

const ChatDialogWindow: FC = () => {
  const { selectedDialog, currentDialogMessages, isLoadingMessages } =
    useAppSelector((state) => state.dialogs);
  const dispatch = useAppDispatch();
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(DialogsActionCreators.fetchDialogMessages(selectedDialog.id));
  }, [selectedDialog.id]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }
  }, [currentDialogMessages]);

  useEffect(() => {
    const socketAddMessage = (message: IMessage): void => {
      if (store.getState().dialogs.selectedDialog.id === message.dialogId) {
        dispatch(DialogsActionCreators.socketAddMessage(message));
      }
    };
    socket.on("server:new_message", socketAddMessage);
    return () => {
      socket.off("server:new_message", socketAddMessage);
    };
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BlocksHeader>
        <Box sx={{ height: "100%", position: "relative" }}>
          {selectedDialog.id !== 0 && (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.8px",
                  color: "#455a64",
                }}
              >
                {selectedDialog.user.username}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <StatusColorDot isOnline={selectedDialog.user.isOnline} />
                <Typography
                  sx={{
                    marginLeft: "5px",
                    fontSize: "12px",
                    color: "#cfd8dc",
                    fontWeight: "300",
                  }}
                >
                  {selectedDialog.user.isOnline ? "В сети" : "Не в сети"}
                </Typography>
              </Box>
            </Box>
          )}
          {selectedDialog.id !== 0 && (
            <Box
              sx={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <DropDownDialogMenu />
            </Box>
          )}
        </Box>
      </BlocksHeader>
      <Box
        sx={{
          position: "relative",
          padding: "10px",
          flexGrow: 1,
          overflowY: "scroll",
          backgroundImage: `url(${bgLight})`,
        }}
        ref={messagesRef}
      >
        {isLoadingMessages ? (
          <BoxLoader loadingText="Загрузка сообщений..." />
        ) : selectedDialog.id !== 0 ? (
          <Messages currentDialogMessages={currentDialogMessages} />
        ) : (
          <EmptyBox text="Выберите диалог">
            <img src={selectDialogSVG} alt="Выберите диалог" />
          </EmptyBox>
        )}
      </Box>
      <Composer />
    </Box>
  );
};

export default ChatDialogWindow;
