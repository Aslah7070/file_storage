import { IUserModel } from "shared/types";



export interface IUserRepository{
   create(user: IUserModel): Promise<IUserModel>;

}