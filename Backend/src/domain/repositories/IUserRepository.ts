import { User } from "../entity/User";
import { UserDTO } from "./UserDTO";

export interface IUserReopository{
    getUserById(id:string): Promise<User | null>;
    getUserByEmail(email:string): Promise<User | null>;
    save(user:UserDTO): Promise<void>;
    delete(id:string): Promise<void>;
}
