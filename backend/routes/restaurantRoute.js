import express from "express";
import {Restaurant} from "../models/restaurantSchema.js"
const router = express.Router();

// GET /api/v1/restaurants?search=&cuisine=
router.get("/", async (req, res) => {
  try {
    const { search = "", cuisine = "" } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }
    if (cuisine) {
      query.cuisine = { $regex: cuisine, $options: "i" };
    }
    const restaurants = await Restaurant.find(query);
    res.json({ restaurants });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
