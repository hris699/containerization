const express = require("express");
const Route = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SignUp//
Route.post("/signup", async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err,
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                password: hash,
            });
            user
                .save()
                .then((result) => {
                    console.log(result);
                    res.json({
                        status: "ok",
                        newUser: result,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
});

////Login////
Route.post("/login", async (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: "user does not exits",
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: "Incorrect password",
                    });
                }
                if (result) {
                    const details = {
                        username: user[0].username,
                        email: user[0].email,
                    };
                    jwt.sign(
                        { details },
                        "secretkey",
                        { expiresIn: "10d" },
                        (err, token) => {
                            res.json({
                                details,
                                token,
                            });
                            res.cookie("access_token",token)
                        }
                    );
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "invalid token",
            });
        });
});

module.exports = Route;
