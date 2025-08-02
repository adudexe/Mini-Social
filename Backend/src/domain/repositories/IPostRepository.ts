import { Post } from "../entity/Post";
import { PostDTO } from "./PostDTO";

export interface IPostRepository{
    getAllPosts(): Promise<Post[]>;
    getPostById(id:string): Promise<Post | null>;
    save(post:Omit<PostDTO, 'id'>): Promise<void>;
    like(id:string):Promise<number>;
    unlike(id:string):Promise<number>;
    delete(id:string): Promise<void>;
    update(post:PostDTO): Promise<Post | null>;
}