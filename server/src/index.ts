import express from "express";
import "dotenv/config";

import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import likeRoutes from "./routes/likeRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

// middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/like", likeRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
