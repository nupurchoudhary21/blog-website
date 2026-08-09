
const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.post("/signin" , async(req , res) => {
   const { email, password } = req.body;
    try {
        
   const token =  await User.matchPasswordAndGenerateToken(email , password);
   return res.cookie("token" , token, {
    httpOnly: true, 
   })
   .status(200)
   .json({
    message:"login successful",
    token,});
   } catch(err){
    res.json({
        message: err.message
    })
   }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message:"Logout successful"
    });
});

router.post("/signup" , async (req, res) => {
    const { fullName , email , password } = req.body;
    await User.create({
    fullName,
    email,
    password,
    });
    return res.status(201).json({
        message:"User created successfully"
    });
});


router.get("/me",(req,res)=>{
    if(!req.user) {
        return res.status(401).json({
            message: "Not authenticated"
        });
    }
    return res.status(200).json({
        user:req.user
    });
});

module.exports = router;