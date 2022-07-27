import { AxiosResponse } from "axios";
import { http } from "../api";
import { IAuthResponse } from "../interfaces";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return http.post<IAuthResponse>("auth/login", {
      email,
      password,
    });
  }
  static async registration(
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return http.post<IAuthResponse>("auth/registration", {
      username,
      email,
      password,
    });
  }
  static async logout(): Promise<void> {
    return http.get("auth/logout");
  }
  static async deleteAccount(id: string): Promise<void> {
    return http.get(`user/delete/${id}`);
  }
  static async checkAuth(): Promise<AxiosResponse<IAuthResponse>> {
    return http.get<IAuthResponse>("auth/refresh");
  }
}
