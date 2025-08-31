import mongoose from "mongoose";

const uri = "mongodb+srv://mausam:74JDDHCkSRSeg3KN@cluster0.vkwmzir.mongodb.net/restaurant";

mongoose.connect(uri, {
  dbName: "restaurant",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB!");
  process.exit(0);
})
.catch((err) => {
  console.error("❌ Connection error:", err);
  process.exit(1);
});
