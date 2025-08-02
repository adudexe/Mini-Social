import { Post } from "../entity/Post";

export interface UserDTO{
    id?:string,
    name:string,
    email:string,
    password:string,
    posts?:Post[] //Array of posts
}