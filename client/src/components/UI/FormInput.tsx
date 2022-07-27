import { FC } from "react";
import { styled, TextField, TextFieldProps } from "@mui/material";

const AppFormInput = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "#ce93d8 ",
    "&.Mui-focused": {
      color: "#ce93d8 ",
    },
    "&.Mui-error": {
      color: "red",
    },
  },
  "& .MuiOutlinedInput-input": { color: "#8e24aa" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e6cdeb",
    },
    "&:hover fieldset": {
      borderColor: "#ce93d8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ba68c8",
    },
  },
});

const FormInput: FC<TextFieldProps> = (props) => {
  return (
    <AppFormInput
      sx={{ marginBottom: "10px" }}
      {...props}
      fullWidth
      variant="outlined"
    />
  );
};

export default FormInput;
