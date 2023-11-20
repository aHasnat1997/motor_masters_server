import mongoose from "mongoose";
import app from "./app"
import config from "./config"


(async function main() {
    try {
        // mongoDB connection
        await mongoose.connect(config.devDB as string);
        console.log('Connected to DB 🔌');

        // server running
        app.listen(config.port, () => {
            console.log(`Server on 🔥 port: ${config.port}`)
        })
    } catch (error) {
        console.log(error);
    }
})();