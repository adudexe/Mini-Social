import { Post } from "../entity/Post";


export class User{
    constructor(
        public id:string,
        public name:string,
        public email:string,
        public password:string,
        public posts: Post[] = [] // initilizes with empty array 'donno will this cause an error'
    ){}

    deletePost(id:string){
        this.posts = this.posts.filter((post) => post.id != id )
    }

    addPost(post:Post){
        this.posts.push(post);
    }
}