import express from "express"

import userRoutes from "./routes/userRoutes"

const app = express();

app.use('/api/users', userRoutes)

const port = 8000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})