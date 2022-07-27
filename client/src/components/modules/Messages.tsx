import { FC, useEffect, useState } from "react";
import socket from "../../api/socket";
import { EmptyBox, Message, MessageTypingBubble } from "..";
import { store } from "../../store";
import { IDialogsItem, IMessage, IUser } from "../../interfaces";
import { useAppSelector } from "../../hooks";
import emptyDialogSVG from "../../assets/svg/empty-dialog.svg";

interface MessagesProps {
  currentDialogMessages: IMessage[];
}
const Messages: FC<MessagesProps> = ({ currentDialogMessages = [] }) => {
  const [typingUserData, setTypingUserData] = useState<IUser | null>(null);
  const { id } = useAppSelector((state) => state.user);

  useEffect(() => {
    const setTypingUser = (userId: number): void => {
      if (userId === id) return;
      const selectedDialog: IDialogsItem =
        store.getState().dialogs.selectedDialog;
      if (userId === selectedDialog.user.id) {
        setTypingUserData({
          id: selectedDialog.user.id,
          username: selectedDialog.user.username,
          avatar: selectedDialog.user.avatar,
          isOnline: selectedDialog.user.isOnline,
        });
      }
      setTimeout((): void => {
        setTypingUserData(null);
      }, 1000);
    };
    socket.on("server:set_typing_bubble", setTypingUser);
    return () => {
      socket.off("server:set_typing_bubble", setTypingUser);
    };
  }, []);

  return (
    <>
      {currentDialogMessages.length ? (
        currentDialogMessages.map((messageData) => {
          return (
            <Message
              key={messageData.id}
              {...messageData}
              isOwn={messageData.user.id === id}
            />
          );
        })
      ) : (
        <EmptyBox text="Диалог пуст">
          <img src={emptyDialogSVG} alt="Диалог пуст" />
        </EmptyBox>
      )}
      {typingUserData && <MessageTypingBubble {...typingUserData} />}
    </>
  );
};

export default Messages;
