export const getFormattedAvatarName = (name: string): string => {
  return name.trim().split(" ").length > 1
    ? `${name.trim().split(" ")[0][0].toUpperCase()}${name
        .trim()
        .split(" ")[1][0]
        .toUpperCase()}`
    : `${name.trim().split(" ")[0][0].toUpperCase()}`;
};
