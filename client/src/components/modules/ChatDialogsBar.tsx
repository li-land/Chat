import { FC, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  BlocksHeader,
  DialogsList,
  ChatInput,
  Tooltip,
  Modal,
  DialogAddForm,
  Avatar,
  DropDownAccountMenu,
} from "..";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { DialogsActionCreators } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../hooks";

const ChatDialogsBar: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isShownModal, setIsShownModal] = useState<boolean>(false);
  const { username, avatar } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleCloseModal = (): void => {
    setIsShownModal(false);
    dispatch(DialogsActionCreators.setSelectedUserId(0));
  };
  const handleInputChange = (value: string) => {
    dispatch(DialogsActionCreators.setSearchInputValue(value));
    setSearchValue(value);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "320px",
        boxShadow: "5px 0 15px rgba(150, 150, 150, 0.1)",
        position: "relative",
        zIndex: 5,
      }}
    >
      <BlocksHeader>
        <Box sx={{ display: "flex", alignItems: "center", padding: "7px 0" }}>
          <Avatar username={username} src={avatar} />
          <Typography
            sx={{
              fontWeight: "500",
              marginLeft: "15px",
              color: "#546e7a",
            }}
          >
            {username}
          </Typography>
          <Box sx={{ position: "absolute", right: "10px" }}>
            <DropDownAccountMenu />
          </Box>
        </Box>
      </BlocksHeader>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 10px 0 15px",
          marginTop: "20px",
        }}
      >
        <ChatIcon sx={{ color: "#9575cd" }} fontSize="large" />
        <Typography
          sx={{
            flexGrow: 1,
            fontWeight: "500",
            color: "#b39ddb",
            marginLeft: "12px",
          }}
        >
          Список диалогов
        </Typography>
        <Tooltip title="Добавить диалог" placement="right">
          <IconButton
            onClick={() => {
              setIsShownModal(!isShownModal);
            }}
            sx={{ color: "#b39ddb" }}
          >
            <AddCircleOutlineOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Modal
          title={"Выберите собеседника:"}
          modalControls={{ isShownModal, handleCloseModal }}
        >
          <DialogAddForm handleCloseModal={handleCloseModal} />
        </Modal>
      </Box>
      <ChatInput
        value={searchValue}
        handleInputChange={handleInputChange}
        type="search"
      >
        <ManageSearchIcon sx={{ color: "#b0bec5" }} />
      </ChatInput>
      <DialogsList />
    </Box>
  );
};

export default ChatDialogsBar;
