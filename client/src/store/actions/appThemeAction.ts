export enum AppThemeEnum {
  CHANGE_APP_THEME = "CHANGE_APP_THEME",
}

export type AppThemeAction = {
  type: AppThemeEnum.CHANGE_APP_THEME;
};

export const changeAppTheme = (): AppThemeAction => ({
  type: AppThemeEnum.CHANGE_APP_THEME,
});
