import DetailModel from "../models/detailsModel.js"

export async function addDetails(req,res) {
    try {
        console.log(req.body)
        const dataToAdd = new DetailModel(req.body)
        await dataToAdd.save()
        res.status(200).send("Data Added")
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message });
    }
}