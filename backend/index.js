import express from "express"
import mongoose from "mongoose";
import "dotenv/config"
import cors from "cors"
import { connectToDB } from "./config/db.js";
import detailsRouter from "./routes/detailsRoutes.js";

const port = process.enc.PORT;
const app = express();

await connectToDB();

const corsOption = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}

app.use(cors(corsOption))
app.use(express.json())

app.use("/api/details", detailsRouter)

// app.post("/api/details/add", async (req, res) => {
//     try {
//         console.log(req.body)
//         const dataToAdd = new DetailModel(req.body)
//         await dataToAdd.save()
//         res.status(200).send("Data Added")
//     } catch (error) {
//         console.log(error)
//         res.status(500).send("There is an error", error.message);
//     }
// })

app.listen(port, () => {
    console.log("server has started at port " + port)
})