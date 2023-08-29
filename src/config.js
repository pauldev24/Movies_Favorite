import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

export const PORT = process.env.PORT;
//instalar dotenv

export const MONGODB_URI = process.env.MONGODB_URI;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const FRONTEND_URL = process.env.FRONTEND_URL;

export const URL_MOVIES_SEARCH = process.env.URL_MOVIES_SEARCH;

