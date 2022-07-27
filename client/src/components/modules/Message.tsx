import { FC } from "react";
import {
  Avatar,
  MessageAudioBubble,
  MessageAvatarBox,
  MessageBubble,
  MessageContent,
  MessageDate,
  MessageImage,
  MessageImagesBox,
  MessageWrapper,
} from "..";
import { IMessage } from "../../interfaces";
import { getFormattedLastDateDistanceToNow } from "../../utils";

const Message: FC<IMessage> = (props) => {
  const { username = "", avatar = "" } = props.user;
  const {
    text = "",
    updatedAt = "",
    imagesURL = [],
    audioURL = "",
    isOwn = false,
  } = props;

  return (
    <MessageWrapper isOwnMessage={isOwn}>
      <MessageAvatarBox isOwnMessage={isOwn}>
        <Avatar src={avatar} username={username} />
      </MessageAvatarBox>
      <MessageContent isOwnMessage={isOwn}>
        {text && <MessageBubble isOwnMessage={isOwn}>{text}</MessageBubble>}
        {audioURL && (
          <MessageAudioBubble audioUrl={audioURL} isOwnMessage={isOwn} />
        )}
        {imagesURL && imagesURL.length >= 1 && (
          <MessageImagesBox isOwnMessage={isOwn}>
            {imagesURL.length > 1 ? (
              imagesURL.map((image, index) => {
                return (
                  <MessageImage
                    isOwnMessage={isOwn}
                    key={index}
                    src={image}
                    alt={image}
                  />
                );
              })
            ) : (
              <MessageImage
                alone={true}
                isOwnMessage={isOwn}
                src={imagesURL[0]}
                alt={imagesURL[0]}
              />
            )}
          </MessageImagesBox>
        )}
        {updatedAt && (
          <MessageDate isOwnMessage={isOwn}>
            {getFormattedLastDateDistanceToNow(updatedAt)}
          </MessageDate>
        )}
      </MessageContent>
    </MessageWrapper>
  );
};

export default Message;
