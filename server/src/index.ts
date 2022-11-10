import express from "express";

import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import likeRoutes from "./routes/likeRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/auth", authRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
