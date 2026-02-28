require("dotenv").config();
const express = require("express");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());

const mongoose = require('mongoose');
// DB connection 
async function connectionDB(){
    try{
        await mongoose.connect("mongodb://localhost:27017/library",);
        console.log('connected');
    }catch(error){
        console.log(error);
    }
}
connectionDB();

app.use("/api", bookRoutes);

app.listen(process.env.PORT, () => console.log("Library Server Running"));
