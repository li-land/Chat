import { AxiosResponse } from "axios";
import { http } from "../api";
import { IDialogsItem, IMessage, IUser } from "../interfaces";

export default class ChatService {
  static fetchUserDialogs(
    userId: string
  ): Promise<AxiosResponse<IDialogsItem[]>> {
    return http.get<IDialogsItem[]>(`/dialog/all/${userId}`);
  }
  static fetchDialogMessages(
    dialogId: string
  ): Promise<AxiosResponse<IMessage[]>> {
    return http.get<IMessage[]>(`/dialog/${dialogId}`);
  }
  static fetchOtherUsers(userId: string): Promise<AxiosResponse<IUser[]>> {
    return http.get<IUser[]>(`/user/all/${userId}`);
  }
  static startDialog(
    user1_id: string,
    user2_id: string,
    text: string
  ): Promise<AxiosResponse<IDialogsItem>> {
    return http.post<IDialogsItem>(`/dialog/create`, {
      user1_id,
      user2_id,
      text,
    });
  }
  static deleteDialog(dialogId: string): Promise<void> {
    return http.get(`/dialog/delete/${dialogId}`);
  }
  static createMessage(formData: FormData): Promise<AxiosResponse<IUser[]>> {
    return http({
      method: "post",
      url: `/message/create`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  static createVoiceMessage(
    formData: FormData
  ): Promise<AxiosResponse<IUser[]>> {
    return http({
      method: "post",
      url: `/message/create-voice`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  static setIsReadedMessages(userId: string, dialogId: string): Promise<void> {
    return http.post(`/message/set-readed/`, {
      userId,
      dialogId,
    });
  }
}
