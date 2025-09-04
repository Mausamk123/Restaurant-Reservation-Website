import express from "express";
import { getFoodItems } from "../controller/foodItemController.js";

const router = express.Router();

router.get("/", getFoodItems);

export default router;


