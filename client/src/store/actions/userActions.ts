import { ChatService, UserService } from "../../services";

import { AppDispatch } from "../../hooks/useAppDispatch";
import { IUser } from "../../interfaces";

export enum UserEnum {
  SET_USER_DATA = "SET_USER_DATA",
  TOGGLE_ONLINE_STATUS = "TOGGLE_ONLINE_STATUS",
  SET_USER_LOADING = "SET_USER_LOADING",
  SET_USER_ERROR = "SET_USER_ERROR",
}

type SetUserDataAction = {
  type: UserEnum.SET_USER_DATA;
  payload: IUser;
};
type ToggleOnlineStatus = {
  type: UserEnum.TOGGLE_ONLINE_STATUS;
};
type SetLoadingAction = {
  type: UserEnum.SET_USER_LOADING;
  payload: boolean;
};
type SetErrorAction = {
  type: UserEnum.SET_USER_ERROR;
  payload: string;
};

export type UserActions =
  | SetUserDataAction
  | ToggleOnlineStatus
  | SetLoadingAction
  | SetErrorAction;

export const UserActionCreators = {
  setLoading: (payload: boolean): SetLoadingAction => ({
    type: UserEnum.SET_USER_LOADING,
    payload,
  }),
  setError: (error: string): SetErrorAction => ({
    type: UserEnum.SET_USER_ERROR,
    payload: error,
  }),
  setUserData: (payload: IUser): SetUserDataAction => ({
    type: UserEnum.SET_USER_DATA,
    payload,
  }),
  toggleOnlineStatus: (): ToggleOnlineStatus => ({
    type: UserEnum.TOGGLE_ONLINE_STATUS,
  }),
  fetchOtherUsers:
    (userId: number): any =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(UserActionCreators.setLoading(true));
        const response = await ChatService.fetchOtherUsers(userId.toString());
        return response.data;
      } catch (e: any) {
        dispatch(UserActionCreators.setError(e.response.data.message));
      } finally {
        dispatch(UserActionCreators.setLoading(false));
      }
    },
  changeAvatar:
    (userId: number, formData: FormData): any =>
    async (dispatch: AppDispatch) => {
      try {
        await UserService.changeAvatar(userId.toString(), formData);
        alert("Аватар успешно изменен");
      } catch (e: any) {
        dispatch(UserActionCreators.setError(e.response.data.message));
      }
    },
};
