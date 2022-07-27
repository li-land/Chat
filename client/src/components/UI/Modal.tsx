import { FC, ReactElement } from "react";
import { Box, IconButton, Modal as MUIModal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalUsersProps {
  title: string;
  children: ReactElement;
  modalControls: {
    isShownModal: boolean;
    handleCloseModal: () => void;
  };
}

const Modal: FC<ModalUsersProps> = (props) => {
  const { title = "", children = null } = props;
  const { isShownModal = false, handleCloseModal } = props.modalControls;
  return (
    <MUIModal
      open={isShownModal}
      onClose={() => {
        handleCloseModal();
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "450px",
          maxHeight: "400px",
          borderRadius: "5px",
          boxShadow: "0 0 60px rgba(179, 157, 219 , 0.3)",
          backgroundColor: "#ffffff",
          padding: "20px 10px",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            right: "10px",
            top: "11px",
            color: "#b0bec5",
          }}
          onClick={() => {
            handleCloseModal();
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          sx={{
            color: "#90a4ae",
            fontSize: "14px",
            fontWeight: "300",
            letterSpacing: "0.5px",
            margin: " 0 0 10px 20px",
          }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </MUIModal>
  );
};

export default Modal;
