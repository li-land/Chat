import { combineReducers } from "redux";
import { appThemeReducer } from "./appThemeReducer";
import { authReducer } from "./authReducer";
import { dialogsReducer } from "./dialogsReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  dialogs: dialogsReducer,
  appTheme: appThemeReducer,
});
