import { Post } from "../../../../domain/entity/Post";
import { IPostRepository } from "../../../../domain/repositories/IPostRepository";
import { PostDTO } from "../../../../domain/repositories/PostDTO";
import { PostModal } from "../models/PostSchema";

export class MongoPostRepository implements IPostRepository {

    async getAllPosts(): Promise<Post[]> {
       const postDoc =  await PostModal.find();

       if(postDoc.length) return [];

       const Posts = postDoc.map((p) => new Post(
        p._id.toString(),
        p.title,
        p.content,
        p.likes!,
        p.timestamp,
        p.author
       ))

       return Posts;
    }

    async getPostById(id: string): Promise<Post | null> {
        const postDoc = await PostModal.findById(id);

        if(!postDoc) return null;

        return new Post(
            postDoc._id.toString(),
            postDoc.title,
            postDoc.content,
            postDoc.likes!,
            postDoc.timestamp,
            postDoc.author
        )
    }

    async save(post: Omit<PostDTO, "id">): Promise<void> {
        const newPost = new PostModal({
            title:post.title,
            content:post.content,
            likes:post.likes,
            timestamp:post.timestamp,
            author:post.author
        });

        await newPost.save();
    }

    async like(id: string): Promise<number> {
        const updateDoc = await PostModal.findByIdAndUpdate(id,{$inc:{ likes:1 }},{new:true}).lean();

        if(!updateDoc) {
            throw new Error("Post Not Found");
        }
        
        return updateDoc.likes!
    }

    async unlike(id: string): Promise<number> {
        const updateDoc = await PostModal.findByIdAndUpdate(id,{$inc:{ likes:-1 }},{new:true}).lean();

        if(!updateDoc) {
            throw new Error("Post Not Found");
        }
        
        return updateDoc.likes!
    }

    async delete(id: string): Promise<void> {
        const deleteDoc = await PostModal.findByIdAndDelete(id);
    }

    async update(post: PostDTO): Promise<Post | null> {
        const updateDoc = await PostModal.findByIdAndUpdate(post.id,post,{new:true}).lean();

        if(!updateDoc) {
            throw new Error("Post Not Found");
        }

        return new Post( 
            updateDoc._id.toString(),
            updateDoc.title,
            updateDoc.content,
            updateDoc.likes!,
            updateDoc.timestamp,
            updateDoc.author 
        )
    }
}