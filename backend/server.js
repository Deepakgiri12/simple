import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
const PORT = process.env.PORT ;

app.use("/api/auth", authRoutes);
app.use("/api/orders",orderRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});