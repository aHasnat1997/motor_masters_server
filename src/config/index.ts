import dotenv from 'dotenv';
// import path from 'path';

dotenv.config();

export default {
    port: process.env.PORT,
    devDB: process.env.DEV_DB_URL
}