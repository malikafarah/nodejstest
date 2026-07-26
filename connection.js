const mongoose = require("mongoose");

async function connectMongoDB(url){
    mongoose.connect(url)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=> console.log("Mongo Error: ",err));
};

module.exports = {
    connectMongoDB,
};