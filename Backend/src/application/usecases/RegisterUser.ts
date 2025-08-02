import { IUserReopository } from "../../domain/repositories/IUserRepository";
import { UserDTO } from "../../domain/repositories/UserDTO";
import bcrypt from 'bcrypt';

export class RegisterUser{
    constructor(private UserRepsitory:IUserReopository ){}

    async execute(data:UserDTO){
        const { name,email,password } = data;
        const existingUser = await this.UserRepsitory.getUserByEmail(email);

        if(email){
            throw new Error("Email Already Exists");
        }

        const hashedPassword = await bcrypt.hash(password,12);

        await this.UserRepsitory.save({ name,email,password:hashedPassword });

        return { message:"Registrered Succefully" };
    }
}