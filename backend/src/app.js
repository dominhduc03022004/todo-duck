import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import routerAuth from "./routes/auth";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/auth", routerAuth);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});
