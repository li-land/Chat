import { FC, useState } from "react";
import { Box, IconButton } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import SendIcon from "@mui/icons-material/Send";
import { ChatInput, UsersList } from "..";
import { DialogsActionCreators } from "../../store/actions";
import { IDialogsItem } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface DialogAddFormProps {
  handleCloseModal: () => void;
}
const DialogAddForm: FC<DialogAddFormProps> = ({ handleCloseModal }) => {
  const [textMessage, setTextMessage] = useState<string>("");
  const { selectedUserId, dialogsList } = useAppSelector(
    (state) => state.dialogs
  );
  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleInputChange = (value: string): void => {
    setTextMessage(value);
  };

  const createNewDialog = (): void => {
    if (selectedUserId === 0) {
      return;
    }
    const dialogExists: IDialogsItem | undefined = dialogsList.find(
      (dialog) => dialog.user.id === selectedUserId
    );
    if (dialogExists) {
      dispatch(DialogsActionCreators.setSelectedDialog(dialogExists));
      handleCloseModal();
    } else {
      if (textMessage) {
        dispatch(
          DialogsActionCreators.startDialog(id, selectedUserId, textMessage)
        );
        handleCloseModal();
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <UsersList />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          position: "relative",
        }}
      >
        <ChatInput
          value={textMessage}
          handleInputChange={handleInputChange}
          type="text"
        >
          <NotesIcon sx={{ color: "#b0bec5" }} />
        </ChatInput>
        <IconButton onClick={createNewDialog}>
          <SendIcon sx={{ fontSize: "24px", color: "#9575cd" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DialogAddForm;
