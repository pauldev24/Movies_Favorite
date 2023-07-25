import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const con = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB esta en linea");
    } catch (error) {
        console.error(error);
    }
};