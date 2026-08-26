import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "API funcionando",
  });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;
