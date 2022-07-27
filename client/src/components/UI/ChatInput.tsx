import { ChangeEvent, KeyboardEvent, FC, ReactElement } from "react";
import { InputAdornment, styled, TextField as MUIInput } from "@mui/material";

interface ChatInputProps {
  value: string;
  type: "search" | "text";
  children?: ReactElement;
  handleInputChange: (value: string) => void;
  handleKeyEnter?: (e: KeyboardEvent) => void;
}

const Input = styled(MUIInput)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#cfd8dc",
      opacity: "0.4",
    },
    "&:hover fieldset": {
      borderColor: "#cfd8dc",
      opacity: "0.7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#cfd8dc",
      opacity: "0.3",
    },
  },
  width: "100%",
  margin: "10px 0",
  color: "#455a64",
  padding: "0 10px ",
});

const ChatInput: FC<ChatInputProps> = ({
  value = "",
  type = "text",
  handleInputChange,
  handleKeyEnter,
  children = null,
}) => {
  return (
    <Input
      type="text"
      placeholder={
        type == "search" ? "Поиск диалога" : "Введите текст сообщения..."
      }
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{children}</InputAdornment>
        ),
      }}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e.target.value);
      }}
      onKeyDown={handleKeyEnter}
    />
  );
};

export default ChatInput;
