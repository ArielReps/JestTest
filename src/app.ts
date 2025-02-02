import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { message } from "./controllers/someStuff";
import { connectDB } from "./config/db";
import userRouter from "./routes/userRouter";
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? ".env.test" : ".env",
});
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
connectDB();

// Routes
app.use("/message",message)
// Error handling middleware
app.use("/users",userRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app