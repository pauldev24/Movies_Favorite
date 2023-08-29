import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        sinopsis: {
            type: String,
            required: true,
        },
        img_url: {
            type: String,
            required: false,
        },
        genero: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("Movie", movieSchema);