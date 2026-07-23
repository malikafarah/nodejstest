const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const { error } = require("console");

mongoose.connect("mongodb://127.0.0.1:27017/nodetest")
.then(()=>console.log("MongoDB connected"))
.catch((err)=> console.log("Mongo Error: ",err));
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

//Middleware - plugin
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req,res,next)=>{
    fs.appendFile("log.txt",
        `${Date.now()}: ${req.method} PATH: ${req.path} from IP: ${req.ip}\n`
        ,(err,data)=>{
            next();
        }
    );
});

app.get("/api/users",async (req,res)=>{
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
});

app.get("/users", async (req,res)=>{
    const allDBUsers = await User.find({});
    const html = `
    <ul>
        ${allDBUsers.map((user) => `<li> ${user.first_name} -- ${user.email} </li>`).join("")}
    </ul>
    `;

    res.send(html);
});

app
    .route("/api/users/:id")
    .get(async (req,res)=>{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({"error": "User not found"});
        return res.json(user);
    })
    .patch(async (req,res)=>{
        await User.findByIdAndUpdate(req.params.id, {last_name: "Lee"})
        return res.json({"msg": "success"});
    })
    .delete(async(req,res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({"msg": "User deleted successfully"});
    });

app.post("/api/users", async (req,res) => {
    const body = req.body;
    if(!body||!body.first_name||!body.last_name||!body.email|| !body.gender || !body.ip_address){
        return res.status(400).json("All fields are required");
    }

    //creates user
    
    const result = await User.create({
        first_name : body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        ip_address: body.ip_address,
    });

    return res.status(201).json({"message": "success"});

});

app.listen(PORT,() => {
    console.log("Server Started");
});