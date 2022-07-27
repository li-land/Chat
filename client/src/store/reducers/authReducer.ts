import { AuthActions, AuthEnum } from "../actions/authActions";

export interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: "",
};

export const authReducer = (
  state = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AuthEnum.SET_AUTH:
      return { ...state, isAuth: action.payload };
    case AuthEnum.SET_AUTH_LOADING:
      return { ...state, isLoading: action.payload };
    case AuthEnum.SET_AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
