import { IUser } from ".";

export default interface IDialogsItem {
  id: number;
  user: IUser;
  lastMessage: string;
  updatedAt: string;
  unreadedMessages: number;
}
