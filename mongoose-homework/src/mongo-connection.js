import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); 

const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL = "mongodb+srv://gogomongo:gogomongo123@cluster0.5nl27cc.mongodb.net/?retryWrites=true&w=majority"

export const mongo_connection = async () => {
    try {
        
        await mongoose.connect(MONGO_URL, {
            dbName: "food_app"
        })

        console.log("Connected to Mongo database.")

    } catch (error) {
        throw new Error("Connection to Mongo database failed.")
    }
};