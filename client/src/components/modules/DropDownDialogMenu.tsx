import { FC, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { DialogsActionCreators } from "../../store/actions";

const DropDownDialogMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { selectedDialog } = useAppSelector((state) => state.dialogs);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const showDropMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const closeDropMenu = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={showDropMenu}>
        <MoreHorizIcon sx={{ color: "#b39ddb" }} />
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
            if (
              window.confirm("Вы действительно хотите удалить этот диалог?")
            ) {
              dispatch(DialogsActionCreators.deleteDialog(selectedDialog.id));
            }
          }}
          sx={{ color: "#f8bbd0", justifyContent: "center" }}
        >
          <DeleteForeverIcon sx={{ color: "#f8bbd0", marginRight: "10px" }} />
          Удалить диалог
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropDownDialogMenu;
