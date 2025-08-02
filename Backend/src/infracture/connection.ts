import mongoose from "mongoose";

export const connectDatabase = async () => { 
    const uri = process.env.MONGODB_URI;
    
    if(!uri){
        throw new Error("Uri Not defined in .env");
    }

    try{
        await mongoose.connect(uri);
        console.log("Database Successfully Connected");
    }catch(err){
        console.log("Error in database connection",err);
        process.exit(1)
    }
}
