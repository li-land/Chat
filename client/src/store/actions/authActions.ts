import { AuthService } from "../../services";
import { AppDispatch } from "../../hooks/useAppDispatch";
import { UserActionCreators } from "./userActions";
import jwt_decode from "jwt-decode";
import { IUser } from "../../interfaces";

export enum AuthEnum {
  SET_AUTH = "SET_AUTH",
  SET_AUTH_LOADING = "SET_AUTH_LOADING",
  SET_AUTH_ERROR = "SET_AUTH_ERROR",
}

type SetAuthAction = {
  type: AuthEnum.SET_AUTH;
  payload: boolean;
};
type SetLoadingAction = {
  type: AuthEnum.SET_AUTH_LOADING;
  payload: boolean;
};
type SetErrorAction = {
  type: AuthEnum.SET_AUTH_ERROR;
  payload: string;
};
export type AuthActions = SetAuthAction | SetLoadingAction | SetErrorAction;

export const AuthActionCreators = {
  setAuth: (isAuth: boolean): SetAuthAction => ({
    type: AuthEnum.SET_AUTH,
    payload: isAuth,
  }),
  setLoading: (payload: boolean): SetLoadingAction => ({
    type: AuthEnum.SET_AUTH_LOADING,
    payload,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthEnum.SET_AUTH_ERROR,
    payload: error,
  }),
  login:
    (email: string, password: string): any =>
    async (dispatch: AppDispatch) => {
      dispatch(AuthActionCreators.setLoading(true));
      try {
        const response = await AuthService.login(email, password);
        localStorage.setItem("token", response.data.accessToken);
        dispatch(AuthActionCreators.setAuth(true));
        const userData: IUser = await jwt_decode(response.data.accessToken);
        dispatch(UserActionCreators.setUserData(userData));
      } catch (e: any) {
        dispatch(AuthActionCreators.setError(e.response?.data?.message));
      } finally {
        dispatch(AuthActionCreators.setLoading(false));
      }
    },
  registration:
    (username: string, email: string, password: string): any =>
    async (dispatch: AppDispatch) => {
      dispatch(AuthActionCreators.setLoading(true));
      try {
        const response = await AuthService.registration(
          username,
          email,
          password
        );
        localStorage.setItem("token", response.data.accessToken);
        dispatch(AuthActionCreators.setAuth(true));
        const userData: IUser = await jwt_decode(response.data.accessToken);
        dispatch(UserActionCreators.setUserData({ ...userData, avatar: "" }));
      } catch (e: any) {
        dispatch(AuthActionCreators.setError(e.response.data.message));
      } finally {
        dispatch(AuthActionCreators.setLoading(false));
      }
    },

  logout: (): any => async (dispatch: AppDispatch) => {
    localStorage.clear();
    dispatch(AuthActionCreators.setAuth(false));
    await AuthService.logout();
  },

  checkAuth: (): any => async (dispatch: AppDispatch) => {
    dispatch(AuthActionCreators.setLoading(true));
    try {
      const response = await AuthService.checkAuth();
      dispatch(AuthActionCreators.setAuth(true));
      const userData: IUser = await jwt_decode(response.data.accessToken);
      dispatch(UserActionCreators.setUserData(userData));
    } catch (e: any) {
      dispatch(AuthActionCreators.setError(e.response?.data?.message));
    } finally {
      dispatch(AuthActionCreators.setLoading(false));
    }
  },
};
