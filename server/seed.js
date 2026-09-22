// Run with: node seed.js
// Populates the database with sample products for local testing.
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";
import mongoose from "mongoose";

dotenv.config();

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Over-ear Bluetooth headphones with noise cancellation.",
    price: 59.99,
    image: "/images/headphones.jpg",
    category: "Electronics",
    countInStock: 15,
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with breathable mesh.",
    price: 45.0,
    image: "/images/shoes.jpg",
    category: "Footwear",
    countInStock: 25,
  },
  {
    name: "Ceramic Coffee Mug",
    description: "12oz ceramic mug, dishwasher and microwave safe.",
    price: 9.99,
    image: "/images/mug.jpg",
    category: "Home",
    countInStock: 50,
  },
  {
    name: "Backpack",
    description: "Water-resistant backpack with laptop compartment.",
    price: 34.5,
    image: "/images/backpack.jpg",
    category: "Accessories",
    countInStock: 20,
  },
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(sampleProducts);
  console.log("Sample products inserted");
  mongoose.connection.close();
};

seed();
