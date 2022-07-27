import { FC } from "react";
import { Divider, Typography } from "@mui/material";
import { Avatar, UserItemBox } from "..";
import { DialogsActionCreators } from "../../store/actions";
import { IUser } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";

const UserItem: FC<IUser> = (props) => {
  const { id = 0, username = "", avatar = "" } = props;
  const { selectedUserId } = useAppSelector((state) => state.dialogs);
  const dispatch = useAppDispatch();
  return (
    <>
      <UserItemBox
        isSelectedUser={selectedUserId === id}
        onClick={() => {
          dispatch(DialogsActionCreators.setSelectedUserId(id));
        }}
      >
        <Avatar username={username} src={avatar} />
        <Typography
          sx={{
            marginLeft: "15px",
            color: "#455a64",
          }}
        >
          {username}
        </Typography>
      </UserItemBox>
      <Divider />
    </>
  );
};

export default UserItem;
