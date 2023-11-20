import { Schema, model } from "mongoose";
import { IUser, IUserName } from "../interfaces/user.interface";

// user name schema
const userNameSchema = new Schema<IUserName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
})

// user schema
const userSchema = new Schema<IUser>({
    name: { type: userNameSchema, required: true },
    email: { type: String, required: true },
    dateOfBarth: { type: String, required: true },
    gender: { type: String, required: true },
    photo: { type: String },
    phone: { type: String }
})

// user model
export const UserModel = model<IUser>('user', userSchema);