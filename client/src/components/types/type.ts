
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