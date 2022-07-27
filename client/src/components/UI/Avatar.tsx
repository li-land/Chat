import { FC } from "react";
import { Avatar as MUIAvatar } from "@mui/material";
import { getBgColorAvatar, getFormattedAvatarName } from "../../utils";

interface AvatarProps {
  username: string;
  src?: string;
  isOnline?: boolean;
}

const Avatar: FC<AvatarProps> = ({ src = "", username = "" }) => {
  return src ? (
    <MUIAvatar alt={username} src={src} />
  ) : (
    <MUIAvatar
      alt={username}
      sx={{ bgcolor: getBgColorAvatar(username) }}
      children={getFormattedAvatarName(username)}
    />
  );
};

export default Avatar;
