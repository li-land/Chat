import { IUser } from ".";

export default interface IMessage {
  id: number;
  text: string;
  imagesURL: string[] | null;
  audioURL: string | null;
  updatedAt: string;
  dialogId: number;
  user: IUser;
  isOwn: boolean;
}
