const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;
const users = require("../MOCK_DATA.json");
const mongoose = require("mongoose");
const { error } = require("console");

//schema


//Middleware - plugin
app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
    fs.appendFile("log.txt",
        `${Date.now()}: ${req.method} PATH: ${req.path} from IP: ${req.ip}\n`
        ,(err,data)=>{
            next();
        }
    );
});

app.get("/api/users",(req,res)=>{
    return res.json(users);
});

app.get("/users",(req,res)=>{
    const html = `
    <ul>
        ${users.map(user => `<li> ${user.first_name} </li>`).join("")}
    </ul>
    `;

    res.send(html);
});

app
    .route("/api/users/:id")
    .get((req,res)=>{
        const id=Number(req.params.id);
        const user = users.find((user)=> user.id===id);
        return res.json(user);
    })
    .patch((req,res)=>{
        const id = Number(req.params.id);
        const body = res.body;
        const userIndex = users.findIndex((user)=> user.id===id);
        if(userIndex === -1){
            res.status(404).send({status: "error", message:"id not found"});
        }
        const updatedUser = {...users[userIndex], ...body};
        users[userIndex] = updatedUser;

    })
    .delete((req,res) => {

    });

app.post("/api/users", async (req,res) => {
    const body = req.body;
    if(!body||!body.first_name||!body.last_name||!body.email|| !body.gender || !body.ip_address){
        return res.status(400).json("All fields are required");
    }

    //creates user
    
    const result = await users.create({
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