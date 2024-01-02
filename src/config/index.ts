import dotenv from 'dotenv';
// import path from 'path';

dotenv.config();

export default {
    port: process.env.PORT,
    devDB: process.env.DEV_DB_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_forgot_secret: process.env.JWT_FORGOT_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    jwt_forgot_expires_in: process.env.JWT_FORGOT_EXPIRES_IN
}