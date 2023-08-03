const express = require('express')
const Route =  express.Router()
const User = require('../models/userModel')
const middleware = require('../middleware/middleware')

Route.get("/signup/:username",middleware,async (req,res)=>{
    User.findOne({username:req.params.username})
    .then(output =>{
        res.json({
            userData:output
        })
    })
  
})

//update
Route.put("/signup/:username",async (req,res,next)=>{
    User.findOneAndUpdate({username:req.params.username},{
        $set:{
            username:req.body.username,
            email: req.body.email,
            password : req.body.password
        }
    })
    .then(output =>{
        res.json({
            dataUpdate:output
        })
    })
  
})


Route.delete("/signup/:username",async (req,res,next)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    User.deleteOne({username:req.params.username})
    .then(result=>{
        res.json({
            msg:"user deleted"

        })
    })
})
module.exports = Route