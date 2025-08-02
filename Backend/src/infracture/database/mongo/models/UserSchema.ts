import mongoose from "mongoose";
import { postSchema } from "./PostSchema";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    posts:[postSchema],
})

export const UserModal = mongoose.model("User",userSchema);