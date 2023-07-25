import mongoose from "mongoose";

const seeMovieUserSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        Movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: true,
        },
        date_see: {
            type: Date,
        },
        state: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("SeeMovieUser", seeMovieUserSchema);