import express from "express";
import cors from 'cors'
import connectDB from "./utils/connectDB.js";
import restaurantRoutes from './routes/restaurantRoutes.js'
const app = express()

app.use(express.json())

app.use(cors({
    origin: "*"
  }))


app.use("/api", restaurantRoutes)

  const PORT = 3000 || process.env.port

  connectDB();

  app.listen(PORT, () => console.log(`Server up and running on ${PORT}`))