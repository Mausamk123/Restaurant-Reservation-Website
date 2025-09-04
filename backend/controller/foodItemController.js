import { FoodItem } from "../models/foodItemSchema.js";

export const getFoodItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const items = await FoodItem.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, items });
  } catch (error) {
    next(error);
  }
};


