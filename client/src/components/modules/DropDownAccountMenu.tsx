import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import {
  Divider,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Switch,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthActionCreators, UserActionCreators } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../hooks";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#ede7f6" : "#ede7f6",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#9575cd",
    width: 30,
    height: 30,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#ede7f6" : "#ede7f6",
    borderRadius: 20 / 2,
  },
}));

const DropDownAccountMenu: FC = () => {
  const [uploadAvatar, setUploadAvatar] = useState<FileList | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { id } = useAppSelector((state) => state.user);
  const open = Boolean(anchorEl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uploadAvatar && uploadAvatar.length === 1) {
      const formData = new FormData();
      formData.append("avatar-image", uploadAvatar[0]);
      dispatch(UserActionCreators.changeAvatar(id, formData));
      setAnchorEl(null);
    }
  }, [uploadAvatar]);

  const showDropMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const closeDropMenu = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={showDropMenu}>
        <SettingsIcon sx={{ color: "#b39ddb" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeDropMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: 47,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            fileInputRef.current?.click();
          }}
          sx={{ color: "#90a4ae", justifyContent: "center" }}
        >
          <input
            ref={fileInputRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUploadAvatar(e.target.files);
            }}
            hidden
            type={"file"}
            accept={".jpeg,.jpg,.png,.gif"}
          />
          <AccountCircleIcon sx={{ color: "#b0bec5", marginRight: "10px" }} />
          Изменить аватар
        </MenuItem>
        <Divider variant="middle" />
        <MenuItem
          onClick={() => {
            dispatch(AuthActionCreators.logout());
          }}
          sx={{ color: "#90a4ae", justifyContent: "center" }}
        >
          <LogoutIcon sx={{ color: "#b0bec5", marginRight: "10px" }} />
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropDownAccountMenu;
