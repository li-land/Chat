import { UserActions, UserEnum } from "../actions/userActions";

export interface UserState {
  id: number;
  username: string;
  email: string;
  avatar: string;
  isActivated: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  id: 0,
  username: "",
  email: "",
  avatar: "",
  isActivated: false,
  isLoading: false,
  error: "",
};

export const userReducer = (
  state = initialState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case UserEnum.SET_USER_DATA:
      return { ...state, ...action.payload };
    case UserEnum.SET_USER_LOADING:
      return { ...state, isLoading: action.payload };
    case UserEnum.SET_USER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
