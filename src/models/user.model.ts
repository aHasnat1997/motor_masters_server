import { Schema, model } from "mongoose";
import { IUser, IUserMethods, IUserName } from "../interfaces/user.interface";
import { isEmail, isCharacterString } from "../utils/validation";
import bcrypt from 'bcrypt';
import config from "../config";

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
const userSchema = new Schema<IUser, IUserMethods>({
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
    password: {
        type: String,
        required: [true, 'User password is required']
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
    phone: {
        type: String,
        required: [true, 'User phone is required'],
        unique: true,
        trim: true
    },
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
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

// user password hashed
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
    next();
})

// clear response json
userSchema.methods.toJSON = function () {
    const userJSON = this.toObject();
    const deleteFields = ['isActive', 'isDeleted', '__v', 'password'];
    deleteFields.forEach(d => delete userJSON[d]);
    return userJSON
};

userSchema.static('userPasswordMatch', async function userPasswordMatch(plainPass: string, hashedPass: string) {
    return await bcrypt.compare(plainPass, hashedPass);
});

// user model
export const UserModel = model<IUser, IUserMethods>('user', userSchema);