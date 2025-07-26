import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../configs/env.configs";

type Payloads={
  email:string,
  type:string
}
let JWT_SECRET=env.JWT_ACCESS_SECRET||"your_jwt_secret_key"


export const generateRefreshToken = async(userId: string, expiresIn:string) => {
    const options: SignOptions = {
        expiresIn: expiresIn  as unknown as number,
      };
    return jwt.sign({ id: userId }, JWT_SECRET, options);
  
};

export const generateToken = async(userId: string,payload:Payloads,expiresIn:string) => {
    const options: SignOptions = {
        expiresIn: expiresIn  as unknown as number,
      };
    return jwt.sign({ id: userId,...payload }, JWT_SECRET, options);
  
}; 

