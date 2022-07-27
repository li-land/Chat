import { AppThemeAction, AppThemeEnum } from "../actions/appThemeAction";

export interface AppThemeState {
  isDarkTheme: boolean;
}

const initialState: AppThemeState = { isDarkTheme: false };

export const appThemeReducer = (
  state = initialState,
  action: AppThemeAction
): AppThemeState => {
  switch (action.type) {
    case AppThemeEnum.CHANGE_APP_THEME:
      return { ...state, isDarkTheme: !state.isDarkTheme };
    default:
      return state;
  }
};
