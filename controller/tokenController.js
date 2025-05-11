const express = require('express');
const jwt = require('jsonwebtoken');

const tokenChecker = async(req,res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            error:'Login first'
        })
    }
    try {
        const user = jwt.verify(token,process.env.JWT_SECRET);
        res.send({
            user_id:user.user_id,
            username:user.username
        })
    } catch (error) {
        return res.status(403).json({
            error:error
        })
    }
}
module.exports = {tokenChecker}