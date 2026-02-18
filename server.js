import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "expence-tracker-omega-rust.vercel.app",
      "https://expenzo.dhirajprajapati.in",
    ],
    credentials: true,
  }),
);

app.get("/get", (req, res) => {
  res.send("Hiii...");
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
