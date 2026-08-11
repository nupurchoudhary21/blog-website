require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const Blog = require("./models/blog")

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");


const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL).then(e => console.log("MongoDB connected")).catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use(cors({
    origin: "https://blog-website-xlem.onrender.com",
    credentials:true,
}));

app.get("/", (req,res) => {
    res.json({
        message: "running"
    })
})

app.use("/user" , userRoute);
app.use("/blog" , blogRoute);



app.get("/user/signup" , (req, res) => {
    res.json({
        message:"signup"
    })
})

app.listen(PORT , ()=> console.log(`Server Started at PORT: ${PORT}`));