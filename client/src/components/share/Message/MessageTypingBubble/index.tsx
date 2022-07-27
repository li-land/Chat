import { FC } from "react";
import {
  Avatar,
  MessageAvatarBox,
  MessageContent,
  MessageTypingBubbleBox,
  MessageTypingBubbleDot,
  MessageWrapper,
} from "../../..";
import { getNumbersArrayBefore } from "../../../../utils";

interface MessageTypingBubbleProps {
  avatar: string;
  username: string;
}

const MessageTypingBubble: FC<MessageTypingBubbleProps> = (props) => {
  const { avatar = "", username = "" } = props;
  return (
    <MessageWrapper isOwnMessage={false}>
      <MessageAvatarBox isOwnMessage={false}>
        <Avatar src={avatar} username={username} />
      </MessageAvatarBox>
      <MessageContent isOwnMessage={false}>
        <MessageTypingBubbleBox isOwnMessage={false}>
          {getNumbersArrayBefore(3).map((number) => (
            <MessageTypingBubbleDot key={number} num={number} />
          ))}
        </MessageTypingBubbleBox>
      </MessageContent>
    </MessageWrapper>
  );
};

export default MessageTypingBubble;
