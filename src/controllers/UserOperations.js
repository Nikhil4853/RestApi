const userModel = require("../models/UserModel")
const multer = require('multer');
const bcryptjs = require("bcryptjs");

// get (find) all user from db 
const getAllUser = async (req, res) => {
    console.log("getll all user run")
    const userData = await userModel.find();
    res.status(200).json({ success: true, userData });
};



// secure password
const securePassword = async (password) => {
    try {
        const spassword = await bcryptjs.hash(password, 10);
        console.log("passrod secure")
        return spassword;
    } catch (error) {
        res.status(400).send(error.message)
    }
}
// post (register) new user in db 
const register = async (req, res) => {
console.log("register run");
if(validateEmail(req.body.email)){
    try {
        const spassword = await securePassword(req.body.password);
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: spassword,
            image: req.file.filename
        })
            const result=await user.save();
            let modifiedResult = result.toObject();
            delete modifiedResult.password;
            res.status(200).json(modifiedResult);
        
      
    } catch (error) {
        res.status(400).send(error)
    }
}else{
    res.status(400).send("email is not valid")
}
    

};

// login user
const login=async(req, res)=>{
    try {
        if(req.body.password && req.body.email){
            const userData = await userModel.findOne( {email:req.body.email}).select("-password");
            console.log(userData);
            if(userData){
                res.json(userData);
            }else{
                res.send("No user found");
            }
        }else{
            res.send("password and email must be required");    
        } 
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
module.exports = { getAllUser, register ,login};