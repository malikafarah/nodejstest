const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
    },
    ip_address:{
        type: String,
    },
},
{
    timestamps:true,
});

const User = mongoose.model("User", userSchema);

// exporting
module.exports = User;