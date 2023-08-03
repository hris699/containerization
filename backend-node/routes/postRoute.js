const express = require('express')
const Route =  express.Router()
const Post = require('../models/postModel')
const middleware = require('../middleware/middleware')
//Create Post//
Route.post("/posts",middleware,async (req,res,next)=>{
  
            const post = new Post({
                username: req.payload.details.username,
                title: req.body.title,
                description : req.body.description
            })
            post.save()
            .then(result =>{
                console.log(result)
                res.json({
                status: 'ok',
                newPost:result
            })
            })
            .catch(err=>{
                console.log(err)
            })
        
    })

    //Get Post//
    Route.get("/posts/:id",middleware,async (req,res,next)=>{
        Post.findById(req.params.id)
        .populate("comments")
        .then(output =>{
            res.json({
                PostData:output,
                
            })
        })
      
    })
    //Get all posts//
    Route.get("/posts",async (req,res,next)=>{
        Post.find()
        .then(output =>{
            res.json({
                PostData:output
            })
        })
      
    })

    //Update Post//
    Route.put("/posts/:id",middleware,async (req,res,next)=>{
        try{
            const post = await Post.findById(req.params.id)
            if (post.username === req.body.username){
                try{
                Post.findOneAndUpdate(req.params.id,{
                    $set: {
                    username: req.payload.details.username,
                    title: req.body.title,
                    description : req.body.description
                    }
                },
                {new:true})
                .then(output =>{
                    res.json({
                        dataUpdate:output
                    })
                })  
            }catch (err){
                res.status(500).json(err)
            }
        } else{
            res.json("You can update only your post")
        } 
    } catch(err){
        res.json(err)
    }
        
})
// Delete Post//

Route.delete("/posts/:id",middleware,async (req,res,next)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    Post.deleteOne({_id:req.params.id})
    .then(result=>{
        res.json({
            msg:"post deleted",
            result
        })
    })
})


module.exports = Route