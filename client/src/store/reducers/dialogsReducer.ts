import { DialogsActions, DialogsEnum } from "../actions/dialogsAction";
import { IDialogsItem, IMessage } from "../../interfaces";

export interface DialogsState {
  dialogsList: IDialogsItem[];
  searchInputValue: string;
  selectedDialog: IDialogsItem;
  currentDialogMessages: IMessage[];
  selectedUserId: number;
  isLoadingDialogs: boolean;
  isLoadingMessages: boolean;
  error: string;
}

const initialState: DialogsState = {
  dialogsList: [],
  searchInputValue: "",
  selectedDialog: {
    id: 0,
    lastMessage: "",
    updatedAt: "",
    user: { avatar: "", id: 0, username: "", isOnline: false },
    unreadedMessages: 0,
  },
  currentDialogMessages: [],
  selectedUserId: 0,
  isLoadingDialogs: false,
  isLoadingMessages: false,
  error: "",
};

export const dialogsReducer = (
  state = initialState,
  action: DialogsActions
): DialogsState => {
  switch (action.type) {
    case DialogsEnum.SET_DIALOGS_LOADING:
      return { ...state, isLoadingDialogs: action.payload };
    case DialogsEnum.SET_MESSAGES_LOADING:
      return { ...state, isLoadingMessages: action.payload };
    case DialogsEnum.SET_DIALOGS_ERROR:
      return { ...state, error: action.payload };
    case DialogsEnum.SET_SEARCH_INPUT_VALUE:
      return { ...state, searchInputValue: action.payload };
    case DialogsEnum.SET_SELECTED_DIALOG:
      return { ...state, selectedDialog: action.payload };

    case DialogsEnum.SET_CURRENT_DIALOG_MESSAGES:
      return { ...state, currentDialogMessages: action.payload };

    case DialogsEnum.SET_SELECTED_USER_ID:
      return { ...state, selectedUserId: action.payload };
    case DialogsEnum.SET_DIALOGS_LIST:
      return { ...state, dialogsList: action.payload };
    case DialogsEnum.SOCKET_TOGGLE_SELECTED_DIALOG_STATUS:
      return {
        ...state,
        selectedDialog: {
          ...state.selectedDialog,
          user: {
            ...state.selectedDialog.user,
            isOnline: !state.selectedDialog.user.isOnline,
          },
        },
      };
    case DialogsEnum.SOCKET_TOGGLE_DIALOG_STATUS:
      return {
        ...state,
        dialogsList: state.dialogsList.map((dialog) =>
          dialog.id === action.payload.id
            ? {
                ...action.payload,
                user: {
                  ...action.payload.user,
                  isOnline: !action.payload.user.isOnline,
                },
              }
            : dialog
        ),
      };
    case DialogsEnum.SOCKET_ADD_MESSAGE:
      return {
        ...state,
        currentDialogMessages: [...state.currentDialogMessages, action.payload],
      };
    case DialogsEnum.SOCKET_ADD_DIALOG:
      return {
        ...state,
        dialogsList: [action.payload, ...state.dialogsList],
      };
    case DialogsEnum.SOCKET_DELETE_DIALOG:
      return {
        ...state,
        dialogsList: state.dialogsList.filter(
          (dialog) => dialog.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
