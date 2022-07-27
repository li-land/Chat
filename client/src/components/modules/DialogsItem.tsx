import { FC, useEffect, useRef } from "react";
import { Box, Divider } from "@mui/material";
import { Avatar, AvatarsOnlineBadge, DialogItemBox, MessageDate } from "..";
import { DialogsActionCreators } from "../../store/actions";
import { IDialogsItem } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFormattedLastDate } from "../../utils";
import { socket } from "../../api";
import { store } from "../../store";

const DialogsItem: FC<IDialogsItem> = (props) => {
  const { username = "", avatar = "", isOnline = false } = props.user;
  let {
    id = 0,
    lastMessage = "",
    updatedAt = "",
    unreadedMessages = 0,
  } = props;

  const { dialogsList } = useAppSelector((state) => state.dialogs);
  const dispatch = useAppDispatch();
  const dialogItemRef = useRef<HTMLDivElement>(null);
  const selectedDialogId: number | undefined = Number(
    localStorage.getItem("selectedDialogId")
  );
  useEffect(() => {
    if (selectedDialogId && selectedDialogId !== 0) {
      const dialogData: IDialogsItem | undefined = dialogsList.find(
        (dialog) => dialog.id === selectedDialogId
      );
      if (!dialogData) {
        dispatch(
          DialogsActionCreators.setSelectedDialog({
            id: 0,
            lastMessage: "",
            updatedAt: "",
            user: { avatar: "", id: 0, username: "", isOnline: false },
            unreadedMessages: 0,
          })
        );
        return;
      }
      dispatch(
        DialogsActionCreators.setSelectedDialog({
          ...dialogData,
          unreadedMessages: 0,
        })
      );
      dispatch(
        DialogsActionCreators.setDialogs(
          dialogsList.map((dialog) => {
            if (dialog.id === selectedDialogId) {
              return {
                id: dialog.id,
                user: {
                  id: dialog.user.id,
                  username: dialog.user.username,
                  avatar: dialog.user.avatar,
                  isOnline: dialog.user.isOnline,
                },
                lastMessage: dialog.lastMessage,
                updatedAt: dialog.updatedAt,
                unreadedMessages: 0,
              };
            } else {
              return dialog;
            }
          })
        )
      );
      return;
    } else {
      dispatch(
        DialogsActionCreators.setSelectedDialog({
          id: 0,
          lastMessage: "",
          updatedAt: "",
          user: { avatar: "", id: 0, username: "", isOnline: false },
          unreadedMessages: 0,
        })
      );
    }
  }, [selectedDialogId]);

  useEffect(() => {
    if (selectedDialogId === id && dialogItemRef.current) {
      dialogItemRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      <DialogItemBox
        onClick={() => {
          dispatch(
            DialogsActionCreators.setSelectedDialog({
              id,
              lastMessage,
              updatedAt,
              user: { avatar, id, username, isOnline },
              unreadedMessages: 0,
            })
          );
          dispatch(
            DialogsActionCreators.setIsReadedMessages(
              store.getState().user.id,
              store.getState().dialogs.selectedDialog.id
            )
          );
        }}
        isSelectedDialog={selectedDialogId === id}
        ref={dialogItemRef}
      >
        <Box sx={{ marginRight: "10px" }}>
          <AvatarsOnlineBadge isOnline={isOnline}>
            <Avatar username={username} src={avatar} />
          </AvatarsOnlineBadge>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <Box
              sx={{
                fontWeight: "400",
                color: "#455a64",
              }}
            >
              {username}
            </Box>
            <MessageDate>{getFormattedLastDate(updatedAt)}</MessageDate>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "192px",
                height: "20px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                color: "#90a4ae",
                fontWeight: "100",
              }}
            >
              {lastMessage}
            </Box>
            {unreadedMessages !== 0 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "#b39ddb",
                  color: "#fff",
                  fontSize: "10px",
                }}
              >
                {unreadedMessages! > 10 ? "+9" : unreadedMessages}
              </Box>
            )}
          </Box>
        </Box>
      </DialogItemBox>
      <Divider />
    </>
  );
};

export default DialogsItem;
