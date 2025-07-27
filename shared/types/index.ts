import { Types } from "mongoose";

export interface IUser{
    _id:Types.ObjectId,
    username:string,
    email:string,
    password:string,
    status:"active"|"blocked",
    profilePicture:string,
    createdAt:Date,
    updatedAt:Date,
    isDelete:boolean
}

 export interface IUserModel extends Document ,Omit<IUser,"_id">{}


export interface IFile  {
 _id:Types.ObjectId,
  filename: string;
  originalName: string;
  size: number;
  url: string;
  contentType: string;
  user: Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

