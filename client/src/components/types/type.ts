
export interface User {
    _id: string;
    username?: string;
    email: string;
    password: string;
    repassword?:string;
    profilePicture?:string,
    captcha?:boolean
 
  }
   export interface Registerresponse{
    otp:boolean
    success:boolean
    message:string
    user:User
    email:string
  }
  

  export interface IFile  {
 _id:string,
  filename: string;
  originalName: string;
  size: number;
  url: string;
  contentType: string;
  user: User;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface FileResponse{
    success:boolean
    message:string
    file:IFile
  }