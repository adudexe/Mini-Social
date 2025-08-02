import express, { urlencoded } from "express";
import { connectDatabase } from "./infracture/connection";
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { userRouter } from "./presentation/routes";


dotenv.config()
const app = express();

app.use(morgan('dev'));
app.use(urlencoded({ extended:true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors(
    // origin: //Frontend link,
    // credential:true
));

app.use("/",userRouter);

connectDatabase();



app.listen(3000,() => {
    console.log("Listening on port 3000");
    console.log(`https://localhost:3000`)
})