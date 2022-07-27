export default interface IUser {
  id: number;
  username: string;
  avatar: string;
  isOnline: boolean;
  email?: string;
  isActivated?: boolean;
}
