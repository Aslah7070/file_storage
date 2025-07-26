import User from "../../models/user.models";
import { comparePassword, hashPassword } from "../../utils/bcrypt.utils";
import {
  generateRefreshToken,
  generateToken,
} from "../../utils/generate.token.utils";
import { toObjectId } from "../../utils/objectId.utils";
import { Types } from "mongoose";
import { IUser, IUserModel } from "shared/types";

export class AuthService {async register(  userData: IUserModel): Promise<{
    message: string;
    user: IUser;
    token: string;
    refreshToken: string;
    success:boolean 
    statuscode:number
  }> {
    const { username, email, password } = userData;
  

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return {
          success:false,
          statuscode:400,
          message: "user already exists",
          user: null as unknown as IUser,
          token: "",
          refreshToken: ""
        }
    }

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) throw new Error("password hashing failed");
    const user = new User({
      email,
      password: hashedPassword,
      username: username,
    });

    await user.save();
    const payload = {
      email,
      type: "user",
    };
    const verifiedId = toObjectId((user._id as Types.ObjectId).toString());
    const token = await generateToken(verifiedId.toString(), payload, "7d");

    const refreshToken = await generateRefreshToken(
      verifiedId.toString(),
      "7d"
    );
    if (!refreshToken) throw new Error("refresh token generation failed");
    if (!token) throw new Error("token generation failed");
 
    return {
         statuscode:201,
        success:true,
      message: "User registered successfully",
      user: user as IUser,
      token,
      refreshToken,
    };
  }

  async login( userData: IUserModel): Promise<{ 
     message: string;
    user: IUser;
    token: string;
    refreshToken: string;
    success:boolean
    statuscode:number}> {
        const { email, password } = userData;
    const user = await User.findOne({ email });

    if (!user) {
      return {
        success:false,
        statuscode:404,
        message:"user not found",
        user:null as unknown as IUser,
         token:"",
         refreshToken:""
    };
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        return {
        success:false,
        statuscode:400,
        message:"Invalid password",
        user:null as unknown as IUser,
         token:"",
         refreshToken:""
    };
    }

    const payload = {
      email: user.email,
      type: "user",
    };

    const verifiedId = toObjectId((user._id as Types.ObjectId).toString());

    const token = await generateToken(verifiedId.toString(), payload, "7d");
    const refreshToken = await generateRefreshToken(
      verifiedId.toString(),
      "7d"
    );

    if (!token || !refreshToken) {
      throw new Error("Token generation failed");
    }

    return {
         statuscode:200,
        success:true,
      message: "Login successfully",
      user: user as IUser,
      token,
      refreshToken,
    };
  }

  async logout(userId:string):Promise<{
    statuscode:number,
    message:string,
    success:boolean
  }>{
    return {
      statuscode: 200,
      message: "Logout successful",
      success: true,
    };
  }


}
