const express = require("express");
const Route = express.Router();
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const middleware = require("../middleware/middleware");

//Create Comment//
Route.post("/posts/:id/comment", middleware, async (req, res, next) => {
  const newComment = new Comment({
    comment: req.body.comment,
    author: req.payload.details.username,
  });
  newComment.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      Post.findById(req.params.id, (err, post) => {
        if (err) {
          console.log(err);
        } else {
          console.log(req.body.comment);
          post.comments.push(result);
          post.save();
        }
      });
      res.json({
        status: 200,
        newComment: result,
      });
    }
  });
});

module.exports = Route;
