import express from "express"
import mongoose from "mongoose";
import "dotenv/config"
import cors from "cors"

const port = 4000;
const app = express();

//connecting  with DB
mongoose.connect(process.env.MONGO_CONNECTION);
const DetailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    dob: { type: String },
    gender: { type: String },
    guardianName: { type: String },
    guardianPhone: { type: Number },
    localAddress: { type: String },
    permanentAddress: { type: String },
    status: { type: String },
    qualification: { type: String },
    year: { type: String },
    college: { type: String },
    course: { type: String },
    source: { type: String },

});
const DetailModel = mongoose.model("detail", DetailSchema)



const corsOption = {
    origin: "http://localhost:5173"
}

app.use(cors(corsOption))
app.use(express.json())

app.post("/api/details/add", async (req, res) => {
    try {
        console.log(req.body)
        const dataToAdd = new DetailModel(req.body)
        await dataToAdd.save()
        res.status(200).send("Data Added")
    } catch (error) {
        console.log(error)
        res.status(500).send("There is an error", error.message);
    }
})

app.listen(port, () => {
    console.log("server has started at port" + port)
})