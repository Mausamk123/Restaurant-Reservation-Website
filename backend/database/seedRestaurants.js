import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });
//const Restaurant = require("../models/restaurantSchema");
//import "./dbConnection.js";
import { dbConnection } from "./dbConnection.js";
import {Restaurant} from "../models/restaurantSchema.js"
// Add sample restaurants
const sampleRestaurants = [
  {
    name: "The Gourmet Kitchen",
    location: "Downtown",
    cuisine: "Italian",
    image: "/dinner1.jpeg",
    icon: "🍝"
  },
  {
    name: "Pizza Palace",
    location: "Uptown",
    cuisine: "Pizza",
    image: "/dinner2.png",
    icon: "🍕"
  },
  {
    name: "Sushi World",
    location: "Midtown",
    cuisine: "Japanese",
    image: "/dinner3.png",
    icon: "🍣"
  },
  {
    name: "Burger Barn",
    location: "Suburbs",
    cuisine: "American",
    image: "/dinner4.png",
    icon: "🍔"
  },
  {
    name: "Curry House",
    location: "Old Town",
    cuisine: "Indian",
    image: "/dinner5.png",
    icon: "🍛"
  },
  {
    name: "Taco Fiesta",
    location: "Downtown",
    cuisine: "Mexican",
    image: "/dinner6.png",
    icon: "🌮"
  },
  {
    name: "Green Leaf",
    location: "Uptown",
    cuisine: "Vegetarian",
    image: "/breakfast1.png",
    icon: "🥗"
  },
  {
    name: "Dragon Express",
    location: "Midtown",
    cuisine: "Chinese",
    image: "/lunch1.png",
    icon: "🥡"
  },
  {
    name: "Seafood Shack",
    location: "Suburbs",
    cuisine: "Seafood",
    image: "/hero2.png",
    icon: "🦞"
  },
  {
    name: "Bakery Bliss",
    location: "Old Town",
    cuisine: "Bakery",
    image: "/hero1.png",
    icon: "🥐"
  }
];
dbConnection();
const seedRestaurants = async () => {
  try {
    await Restaurant.deleteMany({});
    await Restaurant.insertMany(sampleRestaurants);
    console.log("Sample restaurants seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedRestaurants();
