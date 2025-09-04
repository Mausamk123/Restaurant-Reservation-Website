import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const FoodItem = mongoose.model("FoodItem", foodItemSchema);


