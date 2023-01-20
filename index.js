import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import videoRoutes from "./routes/videocall.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

//import routes here
app.use('/users', authRoutes);
app.use('/posts', postRoutes);
app.use('/videocall', videoRoutes);

//enter mongo url here
const CONNECTION_URL = process.env.CONN_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, ()=> console.log(`Server running on Port: ${PORT}`)))
.catch((error)=> console.log(`${error} did not connect`));