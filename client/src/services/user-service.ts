import { AxiosPromise } from "axios";
import { http } from "../api";

export default class UserService {
  static changeAvatar(userId: string, formData: FormData): AxiosPromise<void> {
    return http({
      method: "post",
      url: `/user/change-avatar/${userId}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
