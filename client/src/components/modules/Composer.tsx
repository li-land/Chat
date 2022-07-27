import { ChangeEvent, KeyboardEvent, FC, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import PanoramaIcon from "@mui/icons-material/Panorama";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IEmojiData } from "emoji-picker-react";
import { ChatInput, EmojiPicker, PreviewImage, Tooltip } from "..";
import { socket } from "../../api";
import { DialogsActionCreators } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Composer: FC = () => {
  const [textMessage, setTextMessage] = useState<string>("");
  const [isShownEmojiPicker, setIsShownEmojiPicker] = useState<boolean>(false);
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id } = useAppSelector((state) => state.user);
  const { selectedDialog } = useAppSelector((state) => state.dialogs);
  const dispatch = useAppDispatch();

  const handleEmojiAdd = (emojiObj: IEmojiData): void => {
    setTextMessage(textMessage + emojiObj.emoji);
  };

  const handleInputChange = (value: string): void => {
    setTextMessage(value);
    socket.emit("client:typing_message", {
      userId: id,
      dialogId: selectedDialog.id,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = e.target.files;
    if (files) {
      const filesArray: File[] = Array.from(files);
      const URLFilesArray: string[] = filesArray.map((file: File): string => {
        return URL.createObjectURL(file);
      });
      setPreviewImages([...URLFilesArray]);
      setUploadFiles(files);
    }
  };

  const sendMessage = (): void => {
    if (selectedDialog.id === 0) return;
    else if (!textMessage && !uploadFiles) return;
    const formData = new FormData();
    formData.append("dialogId", selectedDialog.id.toString());
    formData.append("userId", id.toString());
    formData.append("text", textMessage);
    if (uploadFiles && uploadFiles.length > 0) {
      for (let i = 0; i < uploadFiles.length; i++)
        formData.append("images", uploadFiles[i]);
    }
    dispatch(DialogsActionCreators.createMessage(formData));
    setTextMessage("");
    setPreviewImages([]);
    setUploadFiles(null);
  };

  const handleKeyEnter = (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendVoice = async (): Promise<void> => {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      let recorder: MediaRecorder = new MediaRecorder(stream);

      if (recorder) {
        recorder.onstart = (): void => {
          setIsRecording(true);
        };
        recorder.onstop = (): void => {
          setIsRecording(false);
        };
        recorder.ondataavailable = (e: BlobEvent): void => {
          if (recorder.state === "inactive") {
            if (selectedDialog.id === 0) return;
            const file: File = new File([e.data], "audio/webm", {
              type: "audio/webm",
            });

            const formData: FormData = new FormData();
            formData.append("dialogId", selectedDialog.id.toString());
            formData.append("userId", id.toString());
            formData.append("voice", file);
            dispatch(DialogsActionCreators.createVoiceMessage(formData));
          }
        };
        recorder.start();
        setMediaRecorder(recorder);
      }
    } catch (e) {
      console.log("error getting stream", e);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <input
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
            type={"file"}
            multiple
            accept={".jpeg,.jpg,.png,.gif"}
          />
          <PanoramaIcon sx={{ color: "#b0bec5" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            setIsShownEmojiPicker(!isShownEmojiPicker);
          }}
        >
          <EmojiEmotionsIcon sx={{ color: "#b0bec5" }} />
        </IconButton>
        {isShownEmojiPicker && <EmojiPicker handleEmojiAdd={handleEmojiAdd} />}
        <ChatInput
          handleKeyEnter={handleKeyEnter}
          value={textMessage}
          handleInputChange={handleInputChange}
          type="text"
        >
          <NotesIcon sx={{ color: "#b0bec5" }} />
        </ChatInput>
        <Tooltip title="Удерживайте для записи" placement="top">
          <IconButton
            onMouseDown={sendVoice}
            onMouseUp={() => {
              mediaRecorder?.stop();
              setMediaRecorder(undefined);
            }}
          >
            <KeyboardVoiceIcon sx={{ color: "#b0bec5" }} />
          </IconButton>
        </Tooltip>

        <IconButton onClick={sendMessage}>
          <SendIcon sx={{ fontSize: "24px", color: "#9575cd" }} />
        </IconButton>
      </Box>
      {previewImages.length >= 1 && (
        <Box
          sx={{
            minHeight: "150px",
            display: "flex",

            flexWrap: "wrap",
            overflowY: "scroll",
          }}
        >
          {previewImages.map((fileURL: string) => {
            return <PreviewImage key={fileURL} fileURL={fileURL} />;
          })}
          <Box>
            <Tooltip title="Удалить изображения" placement="right">
              <IconButton
                onClick={() => {
                  setPreviewImages([]);
                  setUploadFiles(null);
                }}
              >
                <DeleteForeverIcon sx={{ color: "#f8bbd0" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Composer;
