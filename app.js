require("dotenv").config();
const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

async function connectionDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/library");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
}

connectionDB();

app.use("/api", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Library Server Running on port ${PORT}`));
