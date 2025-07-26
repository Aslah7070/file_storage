//* libraries and packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { env } from "./configs/env.configs";
import { connectDb } from "./configs/mongo.config";
import { auth } from "./routes/auth.routes";
const app = express();
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);


app.use(express.json());
app.use("/api/auth",auth)

app.use(express.urlencoded({ extended: true }));




connectDb();
    


app.listen(env.PORT, () => console.log(`Server started at ${env.PORT} `));

  