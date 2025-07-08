const mongoose = require('mongoose');
const Seed = require('../models/Seed'); // adjust path if needed
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  const types = ["Vegetable", "Grain", "Fruit", "Oilseed"];
  const seasons = ["Kharif", "Rabi", "Zaid"];
  const names = [
    "Tomato Supreme", "Golden Maize", "Hybrid Rice", "Premium Wheat",
    "Chili Blaze", "Sugarcane Boost", "Mango Gold", "Banana X",
    "Cotton King", "Okra Max", "Sunflower Shine", "Pea Plus",
    "Lentil Star", "Cabbage Fresh", "Onion Swift", "Carrot Bright",
    "Brinjal Pro", "Groundnut Nutri", "Mustard Green", "Spinach Pure",
    "Pumpkin Grow", "Pomegranate Red", "Cucumber Cool", "Garlic Shield",
    "Ginger RootX", "Millet Mix", "Corn Spark", "Soybean Rich",
    "Papaya Strong", "Apple Valley", "Peanut Classic", "Cauliflower Crisp",
    "Bottle Gourd", "Watermelon Bold", "Black Gram Boost"
  ];

  const seeds = names.map((name, i) => ({
    name,
    type: types[i % types.length],
    price: Math.floor(Math.random() * 200) + 100, // ₹100–₹299
    season: seasons[i % seasons.length],
    date: new Date(Date.now() - Math.random() * 1e10) // random past date
  }));

  await Seed.insertMany(seeds);
  console.log("✅ 35 Seeds inserted successfully");
  mongoose.disconnect();
})
.catch(err => {
  console.error("❌ Insertion failed:", err);
});