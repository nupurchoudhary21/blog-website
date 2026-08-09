const { Router } = require("express");
const multer = require("multer");
const path = require("path")

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage })


router.get("/:id", async(req, res)=>{
  try{
    const blog = await Blog.findById(req.params.id).populate("createdBy");

    const comments = await Comment.find({
      blogId: req.params.id,
    }).populate("createdBy");

    res.json({
      blog, 
      comments,
    });
  } catch(err){
    res.status(500).json({
      message: err.message,
    })
  }
});

router.get("/" , async (req,res) =>{
  try{
    const blogs = await Blog.find().populate("createdBy");
    res.json( blogs);
  } catch(err){
    res.status(500).json({
      message: err.message,
    });
  }
})


router.post("/comment/:blogId", async (req, res) => {
  try {
          if (!req.user) {
        return res.status(401).json({
          message: "Please login first",
        });
      }
    const comment = await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


router.post("/" , upload.single("coverImage") , async (req, res) => {
  try{ 
  const { title, body } = req.body
  const blog = await  Blog.create({
body,
title,
createdBy: req.user._id,
coverImageURL: req.file
  ? `/uploads/${req.file.filename}`
  : "",
    });

    return res.status(201).json({
      message: "Blog added successfully",
      blog,
    });
  } catch(err){
    res.status(500).json({
      message: err.message,
    });
  }
})


module.exports = router;