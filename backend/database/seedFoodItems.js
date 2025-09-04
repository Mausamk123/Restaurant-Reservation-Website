import dotenv from "dotenv";
import mongoose from "mongoose";
import { FoodItem } from "../models/foodItemSchema.js";
dotenv.config({ path: "../config/config.env" });

const uri = process.env.MONGO_URI || process.env.DB_URI || "";

const items = [
  { title: "Pancakes", category: "breakfast", image: "/breakfast1.png", price: 149, description: "Fluffy pancakes with syrup" },
  { title: "Veg Sandwich", category: "breakfast", image: "/sandwich.png", price: 129, description: "Fresh veggie sandwich" },
  { title: "Margherita Pizza", category: "lunch", image: "/dinner3.png", price: 299, description: "Classic cheese pizza" },
  { title: "Pasta Alfredo", category: "lunch", image: "/dinner2.png", price: 249, description: "Creamy Alfredo pasta" },
  { title: "Grilled Salmon", category: "dinner", image: "/dinner1.jpeg", price: 399, description: "Salmon with herbs" },
  { title: "Steak", category: "dinner", image: "/dinner6.png", price: 499, description: "Juicy grilled steak" },
  { title: "Veg. Mania Burger", category: "lunch", image: "/lunch1.png", price: 199, description: "Loaded veggie burger with lettuce" },
  { title: "Mexican Patty Sandwich", category: "lunch", image: "/sandwich.png", price: 179, description: "Mexican patty with veggies" },
  { title: "Turkish Cuisine Pizza", category: "dinner", image: "/dinner4.png", price: 349, description: "Turkish-style pizza with toppings" },
  { title: "Classic Club Sandwich", category: "lunch", image: "/lunch1.png", price: 229, description: "Italian veg sandwich classic" }
];
async function run() {
  try {
    if (!uri) throw new Error("Missing MONGO_URI in env");
    await mongoose.connect(uri, { dbName: "restaurant" });
    await FoodItem.deleteMany({});
    await FoodItem.insertMany(items);
    console.log("Seeded food items");
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();


