import { FC, useEffect, useState } from "react";
import _ from "lodash";
import { Box } from "@mui/material";
import { socket } from "../../api";
import { BoxLoader, DialogsItem, EmptyBox } from "..";
import { store } from "../../store";
import { DialogsActionCreators } from "../../store/actions";
import { IDialogsItem, IUser } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import emptyDialogsListSVG from "../../assets/svg/empty-dialogs-list.svg";

type socketNewDialog = {
  dialog: {
    id: number;
    lastMessage: string;
    updatedAt: string;
    isOnline: boolean;
  };
  user1: IUser;
  user2: IUser;
};
type socketUnreadedMessages = {
  dialogId: string;
  lastMessage: string;
  unreadedMessagesLength: string;
};

const DialogsList: FC = () => {
  const [dialogs, setDialogs] = useState<IDialogsItem[]>([]);
  const { dialogsList, searchInputValue, isLoadingDialogs } = useAppSelector(
    (state) => state.dialogs
  );

  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(DialogsActionCreators.fetchUserDialogs(id)).then(() =>
      setDialogs(store.getState().dialogs.dialogsList)
    );
    const socketAddDialog = (dialogData: socketNewDialog): void => {
      if (dialogData.user1.id === id) {
        dispatch(
          DialogsActionCreators.socketAddDialog({
            ...dialogData.dialog,
            user: dialogData.user2,
            unreadedMessages: 0,
          })
        );
      } else {
        dispatch(
          DialogsActionCreators.socketAddDialog({
            ...dialogData.dialog,
            user: dialogData.user1,
            unreadedMessages: 0,
          })
        );
      }
    };
    const socketDeleteDialog = (dialogId: string): void => {
      const dialog: IDialogsItem | undefined = store
        .getState()
        .dialogs.dialogsList.find((dialog) => dialog.id === Number(dialogId));

      if (!dialog) {
        return;
      } else {
        dispatch(DialogsActionCreators.socketDeleteDialog(Number(dialogId)));
      }
      if (store.getState().dialogs.selectedDialog.id === Number(dialogId)) {
        DialogsActionCreators.setSelectedDialog({
          id: 0,
          lastMessage: "",
          updatedAt: "",
          user: { avatar: "", id: 0, username: "", isOnline: false },
          unreadedMessages: 0,
        });
      }
    };
    const socketSetOnlineStatus = (userId: string): void => {
      if (id === Number(userId)) return;
      const userDialog: IDialogsItem | undefined = store
        .getState()
        .dialogs.dialogsList.find(
          (dialog) => dialog.user.id === Number(userId)
        );
      if (!userDialog) return;
      if (!userDialog.user.isOnline) {
        dispatch(DialogsActionCreators.socketToggleDialogStatus(userDialog));
      }
      if (
        store.getState().dialogs.selectedDialog.user.id === Number(userId) &&
        !store.getState().dialogs.selectedDialog.user.isOnline
      ) {
        dispatch(DialogsActionCreators.socketToggleSelectedDialogStatus());
      }
    };
    const socketSetOfflineStatus = (userId: string): void => {
      if (id === Number(userId)) return;
      const userDialog: IDialogsItem | undefined = store
        .getState()
        .dialogs.dialogsList.find(
          (dialog) => dialog.user.id === Number(userId)
        );
      if (!userDialog) return;
      if (userDialog.user.isOnline) {
        dispatch(DialogsActionCreators.socketToggleDialogStatus(userDialog));
      }
      if (
        store.getState().dialogs.selectedDialog.user.id === Number(userId) &&
        store.getState().dialogs.selectedDialog.user.isOnline
      ) {
        dispatch(DialogsActionCreators.socketToggleSelectedDialogStatus());
      }
    };
    const socketSetUnreadedMessages = (
      unreadedMessagesData: socketUnreadedMessages
    ): void => {
      if (
        store.getState().dialogs.selectedDialog.id ===
        Number(unreadedMessagesData.dialogId)
      ) {
        return;
      } else {
        const changedDialogs = store
          .getState()
          .dialogs.dialogsList.map((dialog) => {
            if (dialog.id === Number(unreadedMessagesData.dialogId)) {
              return {
                id: dialog.id,
                user: {
                  id: dialog.user.id,
                  username: dialog.user.username,
                  avatar: dialog.user.avatar,
                  isOnline: dialog.user.isOnline,
                },
                lastMessage: unreadedMessagesData.lastMessage,
                updatedAt: dialog.updatedAt,
                unreadedMessages: Number(
                  unreadedMessagesData.unreadedMessagesLength
                ),
              };
            } else {
              return dialog;
            }
          });
        console.log(changedDialogs);
        dispatch(DialogsActionCreators.setDialogs(changedDialogs));
      }
    };
    socket.on("server:new_dialog", socketAddDialog);
    socket.on("server:delete_dialog", socketDeleteDialog);
    socket.on("server:user_online", socketSetOnlineStatus);
    socket.on("server:user_offline", socketSetOfflineStatus);
    socket.on("server:unreaded_messages", socketSetUnreadedMessages);
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    setDialogs(dialogsList);
  }, [dialogsList]);

  useEffect(() => {
    if (!searchInputValue) {
      setDialogs(dialogsList);
    } else {
      setDialogs(
        dialogsList.filter((dialog) =>
          dialog.user.username
            .toLowerCase()
            .includes(searchInputValue.toLowerCase())
        )
      );
    }
  }, [searchInputValue]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "scroll",
      }}
    >
      {isLoadingDialogs ? (
        <BoxLoader loadingText="Загрузка диалогов..." />
      ) : dialogs.length ? (
        _.sortBy(dialogs, (dialog) => -Date.parse(dialog.updatedAt)).map(
          (dialogData) => {
            return <DialogsItem key={dialogData.id} {...dialogData} />;
          }
        )
      ) : (
        <EmptyBox text="Список диалогов пуст">
          <img src={emptyDialogsListSVG} alt="Диалогов нет" />
        </EmptyBox>
      )}
    </Box>
  );
};

export default DialogsList;
