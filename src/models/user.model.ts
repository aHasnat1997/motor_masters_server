import { Schema, model } from "mongoose";
import { IUser, IUserName } from "../interfaces/user.interface";
import { isEmail, isCharacterString } from "../utils/validation";

// user name schema
const userNameSchema = new Schema<IUserName>({
    firstName: {
        type: String,
        required: [true, 'User first name is required'],
        trim: true,
        validate: {
            validator: (v: string) => isCharacterString(v),
            message: 'only string and no empty string'
        }
    },
    lastName: {
        type: String,
        required: [true, 'User last name is required'],
        trim: true,
        validate: {
            validator: (v: string) => isCharacterString(v),
            message: 'only string and no empty string'
        }
    }
})

// user schema
const userSchema = new Schema<IUser>({
    name: { type: userNameSchema, required: [true, 'User name is required'] },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: (v: string) => isEmail(v),
            message: value => `${value.value} is not a valid Email`
        }
    },
    dateOfBarth: {
        type: String,
        required: [true, 'User date of barth is required'],
        trim: true
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: 'Gender must be "male", "female" or "other". But you put {VALUE}'
        },
        required: [true, 'User gender is required']
    },
    photo: { type: String, trim: true },
    phone: { type: String, trim: true },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin']
        },
        default: 'user',
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
})

// user model
export const UserModel = model<IUser>('user', userSchema);