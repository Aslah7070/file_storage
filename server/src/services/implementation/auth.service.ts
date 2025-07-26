import User from "@/models/user.models";
import { hashPassword } from "@/utils/bcrypt.utils";
import { generateRefreshToken, generateToken } from "@/utils/generate.token.utils";
import { toObjectId } from "@/utils/objectId.utils";
import { Types } from "mongoose";
import { IUser, IUserModel } from "shared/types";



export class AuthService{
  async register(userData: IUserModel): Promise<{ message: string; user: IUser; token: string; refreshToken: string }> {
    const { username, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already in use");

     const hashedPassword=await hashPassword(password)
     if(!hashedPassword)throw new Error("password hashing failed")
  const user = new User({
      email,
      password: hashedPassword,
      username: username
    });
  
    await user.save();
  const payload = {
      email,
      type: "user", 
  };
  const verifiedId = toObjectId((user._id as Types.ObjectId).toString());
  const token = await generateToken(verifiedId.toString(), payload, "7d");

   const refreshToken = await generateRefreshToken(verifiedId.toString(), "7d");
   if (!refreshToken) throw new Error("refresh token generation failed");
    if (!token) throw new Error("token generation failed");
 
    return {
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        status: user.status,
        profilePicture: user.profilePicture,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isDelete: user.isDelete,
      },
      token,
      refreshToken
    };
  }
}