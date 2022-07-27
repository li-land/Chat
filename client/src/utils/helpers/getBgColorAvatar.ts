export const getBgColorAvatar = (name: string): string => {
  let hash: number = 0;
  let i: number;

  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color: string = "#";

  for (i = 0; i < 3; i += 1) {
    const value: number = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};
