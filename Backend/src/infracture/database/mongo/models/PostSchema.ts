import mongoose from "mongoose"

export const postSchema = new mongoose.Schema({
    title:{ type:String, required:true },
    content:{ type:String, required:true },
    likes:{ type:Number, requried:true },
    timestamp:{ type:Date, required:true },
    author:{ type:String, required:true },
})

export const PostModal = mongoose.model("Posts",postSchema);