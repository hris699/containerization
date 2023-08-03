const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

let checkToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    // const token = req.cookies.access_token
    // console.log(token)   
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        if (token) {
            jwt.verify(token, "secretkey", (err, payload) => {
                if (err) {
                    return res.json({
                        status: false,
                        msg: "Invalid token",
                    });
                } else {
                    req.payload = payload;
                    next();
                }
            });
        }
    } else {
        return res.json({
            status: false,
            msg: "Token not provided",
        });
    }
};

module.exports = checkToken;
