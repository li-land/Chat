import styled from "styled-components";
import { IOwnMessage } from "../../../../interfaces";

interface MessageAudioBubbleProgressBarProps extends IOwnMessage {
  progress: number;
}

export const MessageAudioBubbleProgressBar = styled.div<MessageAudioBubbleProgressBarProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.progress}%`};
  height: 100%;
  background: ${(props) => (props.isOwnMessage ? "#b39ddb" : "#ede7f6")};
  opacity: 0.4;
  z-index: 1;
`;
