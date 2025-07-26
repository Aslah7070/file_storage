
import  { model, Schema } from "mongoose";
import {IUser}from "shared/types"

export interface IUserModel extends Omit<IUser, "_id"> {}

 const userSchema = new Schema( 
  {
    username:        { type: String, required: true, unique: true },
    email:           { type: String, required: true, unique: true },
    password:        { type: String, required: true },
    status:          { type: String, enum: ["active", "blocked"], default: "active" },
    profilePicture:  { type: String, default: "" },
    isDelete:        { type: Boolean, default: false }
  },
  { timestamps: true }
)
const User = model("User", userSchema);
export default User;