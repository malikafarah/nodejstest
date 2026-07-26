const User = require("../models/user");

async function handleGetAllUsers(req,res) {
    const allDBUsers = await User.find({})
    return res.json(allDBUsers);
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({"error": "User not found"});
    return res.json(user);
}

async function handleUpdateUserById(req,res) {
    await User.findByIdAndUpdate(req.params.id, {last_name: "Lee"})
    return res.json({"msg": "success"});
}

async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({"msg": "User deleted successfully"});
}

async function handleCreateNewUser(req,res) {
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
    return res.status(201).json({
        "message": "success",
        "id": result._id
    });
}

module.exports={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleCreateNewUser,
    handleDeleteUserById,
}