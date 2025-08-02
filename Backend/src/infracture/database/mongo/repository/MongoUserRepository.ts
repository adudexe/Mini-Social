import { User } from "../../../../domain/entity/User";
import { Post } from "../../../../domain/entity/Post";
import { UserModal } from "../models/UserSchema";
import { IUserReopository } from "../../../../domain/repositories/IUserRepository";
import { UserDTO } from "../../../../domain/repositories/UserDTO";



export class MongoUserRepository implements IUserReopository{
    
    async getUserByEmail(email: string): Promise<User | null> {
        const userDoc = await UserModal.findOne({ email }).lean();

        if(!userDoc) return null;


        const posts = userDoc.posts?.map((p) =>
            new Post(
                p._id.toString(), 
                p.title, 
                p.content, 
                p.likes!, 
                p.timestamp, 
                p.author
            )
        ) || [];

        return new User(
        userDoc._id.toString(),
        userDoc.name!,
        userDoc.email!,
        userDoc.password!, 
        posts
        );
    }

    async getUserById(id: string): Promise<User | null> {
        const userDoc = await UserModal.findById(id).lean();

        if(!userDoc) return null;

        const posts = userDoc.posts.map( p => new Post(
            p._id.toString(),
            p.title,
            p.content,
            p.likes!,
            p.timestamp,
            p.author
        )) || [];

        return new User( 
            userDoc._id.toString(),
            userDoc.name!,
            userDoc.email!,
            userDoc.password!,
            posts
        )
    }

    async save(user: UserDTO): Promise<void> {
        const newUser = new UserModal({
            name:user.name,
            email:user.email,
            password:user.password,
            //Post will be automatically created
        })
        await newUser.save();
    }

    async delete(id: string): Promise<void> {
        const deleteUser = await UserModal.findByIdAndDelete(id);
    }

}