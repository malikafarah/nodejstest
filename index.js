const express = require("express");
const {connectMongoDB} = require("./connection");

const {logReqRes} = require("./middlewares")
const userRouter = require('./routes/user');

const app = express();
const PORT = 5000;

const { error } = require("console");

//Middleware - plugin
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(logReqRes("log.txt"));

app.use("/user",userRouter);

app.listen(PORT,() => {
    console.log("Server Started");
});