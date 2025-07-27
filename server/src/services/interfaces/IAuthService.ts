import { IUser, IUserModel } from "shared/types";

export interface IAuthService {
  register(userData: IUserModel): Promise<{
    statuscode:number
    message: string;
    user: IUser;
    token: string;
    refreshToken: string;
    success:boolean
  }>;
  login(userData:IUserModel):Promise<{
     statuscode:number
    message:string,
    user:IUser,
    token:string,
    refreshToken: string;
     success:boolean
  }>
  logout(userId:string):Promise<{
    statuscode:number,
    message:string,
    success:boolean
  }>
  //  uploadFile(userId:string,files: Express.Multer.File[]):Promise<{
  //   statuscode:number,
  //   message:string,
  //   success:boolean
  // }>
}