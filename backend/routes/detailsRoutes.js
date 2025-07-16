import { Router } from "express";
import { addDetails } from "../controllers/detailsController.js";

const detailsRouter = Router();

detailsRouter.post("/add", addDetails)

export default detailsRouter;