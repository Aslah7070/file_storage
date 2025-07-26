import { IUserModel } from "shared/types";

export interface IAuthService {
  register(userData: IUserModel): Promise<{
    message: string;
    user: any;
    token: string;
    refreshToken: string;
  }>;
}