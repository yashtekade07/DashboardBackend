import express from 'express'
import { config } from 'dotenv';
import callEntry from "./routes/callEntryRoutes.js";


config({
    path:"./config/config.env",
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended:true,  // otherwise we cannot access req.body;
}))

app.use("/api",callEntry);


export default app;