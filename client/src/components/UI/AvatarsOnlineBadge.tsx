import { FC, ReactNode } from "react";
import { Badge as MUIBadge, styled } from "@mui/material";

interface AvatarsOnlineBadgeProps {
  isOnline: boolean;
  children?: ReactNode;
}

const Badge = styled(MUIBadge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: "9px",
    height: "9px",
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

export const AvatarsOnlineBadge: FC<AvatarsOnlineBadgeProps> = ({
  children = null,
  isOnline = false,
}) => {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      invisible={!isOnline}
    >
      {children}
    </Badge>
  );
};

export default AvatarsOnlineBadge;
