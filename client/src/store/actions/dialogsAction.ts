import { ChatService } from "../../services";
import { AppDispatch } from "../../hooks/useAppDispatch";
import { IDialogsItem, IMessage } from "../../interfaces";
import { UserActionCreators } from "./userActions";

export enum DialogsEnum {
  SET_DIALOGS_LIST = "SET_DIALOGS_LIST",
  SET_SELECTED_DIALOG = "SET_SELECTED_DIALOG",
  SOCKET_TOGGLE_DIALOG_STATUS = "SOCKET_TOGGLE_DIALOG_STATUS",
  SOCKET_TOGGLE_SELECTED_DIALOG_STATUS = "SOCKET_TOGGLE_SELECTED_DIALOG_STATUS",
  SET_CURRENT_DIALOG_MESSAGES = "SET_CURRENT_DIALOG_MESSAGES",
  SOCKET_ADD_DIALOG = "SOCKET_ADD_DIALOG",
  SOCKET_DELETE_DIALOG = "SOCKET_DELETE_DIALOG",
  SOCKET_ADD_MESSAGE = "SOCKET_ADD_MESSAGE",
  SET_SELECTED_USER_ID = "SET_SELECTED_USER_ID",
  SET_DIALOGS_LOADING = "SET_DIALOGS_LOADING",
  SET_MESSAGES_LOADING = "SET_MESSAGES_LOADING",
  SET_DIALOGS_ERROR = "SET_DIALOGS_ERROR",
  SET_SEARCH_INPUT_VALUE = "SET_SEARCH_INPUT_VALUE",
}
type SetDialogsLoadingAction = {
  type: DialogsEnum.SET_DIALOGS_LOADING;
  payload: boolean;
};

type SetMessagesLoadingAction = {
  type: DialogsEnum.SET_MESSAGES_LOADING;
  payload: boolean;
};
type SetErrorAction = {
  type: DialogsEnum.SET_DIALOGS_ERROR;
  payload: string;
};
type SetDialogsAction = {
  type: DialogsEnum.SET_DIALOGS_LIST;
  payload: IDialogsItem[];
};
type SocketAddDialogAction = {
  type: DialogsEnum.SOCKET_ADD_DIALOG;
  payload: IDialogsItem;
};
type SocketDeleteDialogAction = {
  type: DialogsEnum.SOCKET_DELETE_DIALOG;
  payload: number;
};

type SetSelectedDialogAction = {
  type: DialogsEnum.SET_SELECTED_DIALOG;
  payload: IDialogsItem;
};
type SocketToggleSelectedDialogStatusAction = {
  type: DialogsEnum.SOCKET_TOGGLE_SELECTED_DIALOG_STATUS;
};
type SocketToggleDialogStatusAction = {
  type: DialogsEnum.SOCKET_TOGGLE_DIALOG_STATUS;
  payload: IDialogsItem;
};
type SetCurrentDialogMessagesAction = {
  type: DialogsEnum.SET_CURRENT_DIALOG_MESSAGES;
  payload: IMessage[];
};
type SocketAddMessageAction = {
  type: DialogsEnum.SOCKET_ADD_MESSAGE;
  payload: IMessage;
};
type SetSelectedUserIdAction = {
  type: DialogsEnum.SET_SELECTED_USER_ID;
  payload: number;
};
type SetSearchInputAction = {
  type: DialogsEnum.SET_SEARCH_INPUT_VALUE;
  payload: string;
};

export type DialogsActions =
  | SetDialogsAction
  | SocketAddDialogAction
  | SocketDeleteDialogAction
  | SetDialogsLoadingAction
  | SetMessagesLoadingAction
  | SetErrorAction
  | SetSelectedDialogAction
  | SocketToggleSelectedDialogStatusAction
  | SocketToggleDialogStatusAction
  | SetCurrentDialogMessagesAction
  | SocketAddMessageAction
  | SetSelectedUserIdAction
  | SetSearchInputAction;

export const DialogsActionCreators = {
  setDialogsLoading: (payload: boolean): SetDialogsLoadingAction => ({
    type: DialogsEnum.SET_DIALOGS_LOADING,
    payload,
  }),
  setMessagesLoading: (payload: boolean): SetMessagesLoadingAction => ({
    type: DialogsEnum.SET_MESSAGES_LOADING,
    payload,
  }),
  setError: (error: string): SetErrorAction => ({
    type: DialogsEnum.SET_DIALOGS_ERROR,
    payload: error,
  }),
  setSelectedDialog: (dialog: IDialogsItem): SetSelectedDialogAction => {
    localStorage.setItem("selectedDialogId", dialog.id.toString());
    return {
      type: DialogsEnum.SET_SELECTED_DIALOG,
      payload: dialog,
    };
  },
  socketToggleDialogStatus: (
    dialog: IDialogsItem
  ): SocketToggleDialogStatusAction => {
    return {
      type: DialogsEnum.SOCKET_TOGGLE_DIALOG_STATUS,
      payload: dialog,
    };
  },
  socketToggleSelectedDialogStatus:
    (): SocketToggleSelectedDialogStatusAction => {
      return {
        type: DialogsEnum.SOCKET_TOGGLE_SELECTED_DIALOG_STATUS,
      };
    },
  setCurrentDialogMessages: (
    messages: IMessage[]
  ): SetCurrentDialogMessagesAction => {
    return {
      type: DialogsEnum.SET_CURRENT_DIALOG_MESSAGES,
      payload: messages,
    };
  },
  setSelectedUserId: (id: number): SetSelectedUserIdAction => {
    return {
      type: DialogsEnum.SET_SELECTED_USER_ID,
      payload: id,
    };
  },
  setDialogs: (response: IDialogsItem[]): SetDialogsAction => ({
    type: DialogsEnum.SET_DIALOGS_LIST,
    payload: response,
  }),
  setSearchInputValue: (value: string): SetSearchInputAction => ({
    type: DialogsEnum.SET_SEARCH_INPUT_VALUE,
    payload: value,
  }),
  socketAddDialog: (dialogData: IDialogsItem): SocketAddDialogAction => ({
    type: DialogsEnum.SOCKET_ADD_DIALOG,
    payload: dialogData,
  }),
  socketDeleteDialog: (dialogId: number): SocketDeleteDialogAction => ({
    type: DialogsEnum.SOCKET_DELETE_DIALOG,
    payload: dialogId,
  }),
  socketAddMessage: (message: IMessage): SocketAddMessageAction => ({
    type: DialogsEnum.SOCKET_ADD_MESSAGE,
    payload: message,
  }),
  fetchUserDialogs:
    (userId: number): any =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(DialogsActionCreators.setDialogsLoading(true));
        const response = await ChatService.fetchUserDialogs(userId.toString());
        dispatch(DialogsActionCreators.setDialogs(response.data));
      } catch (e: any) {
        dispatch(DialogsActionCreators.setError(e.response.data.message));
      } finally {
        dispatch(DialogsActionCreators.setDialogsLoading(false));
      }
    },
  fetchDialogMessages:
    (dialogId: number): any =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(DialogsActionCreators.setMessagesLoading(true));
        const response = await ChatService.fetchDialogMessages(
          dialogId.toString()
        );
        dispatch(DialogsActionCreators.setCurrentDialogMessages(response.data));
      } catch (e: any) {
        dispatch(DialogsActionCreators.setError(e.response.data.message));
      } finally {
        dispatch(DialogsActionCreators.setMessagesLoading(false));
      }
    },
  startDialog:
    (user_id: number, user2_id: number, text: string): any =>
    async (dispatch: AppDispatch) => {
      try {
        if (!text) {
          return;
        }
        const response = await ChatService.startDialog(
          user_id.toString(),
          user2_id.toString(),
          text
        );
        dispatch(DialogsActionCreators.setSelectedDialog(response.data));
      } catch (e: any) {
        dispatch(DialogsActionCreators.setError(e.response.data.message));
      }
    },
  deleteDialog:
    (dialogId: number): any =>
    async (dispatch: AppDispatch) => {
      try {
        await ChatService.deleteDialog(dialogId.toString());
        dispatch(
          DialogsActionCreators.setSelectedDialog({
            id: 0,
            lastMessage: "",
            updatedAt: "",
            user: { avatar: "", id: 0, username: "", isOnline: false },
            unreadedMessages: 0,
          })
        );
      } catch (e: any) {
        dispatch(DialogsActionCreators.setError(e.response.data.message));
      }
    },
  createMessage:
    (formData: FormData): any =>
    async (dispatch: AppDispatch) => {
      try {
        await ChatService.createMessage(formData);
      } catch (e: any) {
        dispatch(DialogsActionCreators.setError(e.response.data.message));
      }
    },
  createVoiceMessage:
    (formData: FormData): any =>
    async (dispatch: AppDispatch) => {
      try {
        await ChatService.createVoiceMessage(formData);
      } catch (e: any) {
        dispatch(DialogsActionCreators.setError(e.response.data.message));
      }
    },
  setIsReadedMessages:
    (userId: number, dialogId: number): any =>
    async (dispatch: AppDispatch) => {
      try {
        await ChatService.setIsReadedMessages(
          userId.toString(),
          dialogId.toString()
        );
      } catch (e: any) {
        dispatch(DialogsActionCreators.setError(e.response.data.message));
      }
    },
};
