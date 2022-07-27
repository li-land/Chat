import { FC, useRef } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { MessageBubble, MessageAudioBubbleProgressBar } from "../../..";
import { IOwnMessage } from "../../../../interfaces";
import { useAudioElement } from "../../../../hooks";
import { convertTime } from "../../../../utils";

interface MessageAudioBubbleProps extends IOwnMessage {
  audioUrl: string;
}

const MessageAudioBubble: FC<MessageAudioBubbleProps> = ({
  isOwnMessage,
  audioUrl,
}) => {
  const audioRef = useRef(new Audio(audioUrl));
  const [isPlayingAudio, progress, audioCurrentTime] =
    useAudioElement(audioRef);

  const togglePlay = () => {
    if (!isPlayingAudio) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <MessageBubble isOwnMessage={isOwnMessage}>
      <MessageAudioBubbleProgressBar progress={progress} />
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: "2",
        }}
      >
        <Box sx={{ position: "absolute", right: "-4px", top: "-8px" }}>
          <RecordVoiceOverIcon />
        </Box>
        <IconButton onClick={togglePlay}>
          {!isPlayingAudio ? (
            <PlayCircleIcon
              sx={{ fontSize: "36px", color: "#ede7f6" }}
              color={"inherit"}
            />
          ) : (
            <PauseCircleIcon
              sx={{ fontSize: "36px", color: "#ede7f6" }}
              color={"inherit"}
            />
          )}
        </IconButton>
        <Typography sx={{ fontSize: "12px", color: "#ede7f6" }}>
          {convertTime(audioCurrentTime)}
        </Typography>
      </Box>
    </MessageBubble>
  );
};

export default MessageAudioBubble;
