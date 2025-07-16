import mongoose from "mongoose";

export async function connectToDB() {
    try {
        //connecting  with DB
        await mongoose.connect(process.env.MONGO_CONNECTION);
    }
    catch (error) {
        console.log(error)
    }
}