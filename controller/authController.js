const pool = require('../config/database');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    const {username, password} = req.body;

    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const[save_user] = await pool.query(`INSERT INTO user_account(username,password) VALUES(?,?)`,[username,hashedPassword]);

        return res.status(201).json({
            message:'User succesfully registered',
            id:save_user.insertId,
            username:username
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error:'There was an error adding the user'
        })
    }
}

const login = async(req,res) => {
    const {username,password} = req.body;
    try{
        const [user_login] = await pool.query(`SELECT user_id, username, password FROM user_account WHERE username = ?`,[username]);
        if(user_login.length === 0){
            return res.status(400).json({
                error:'Username not found'
            })
        }
        const user = user_login[0];
        //after finding the username verify if the password is correct
        const checkPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!checkPasswordCorrect){
            return res.status(400).json({
                error:'Password Incorrect'
            })
        }
        //if correct proceed to token generating
        
        const token = jwt.sign({
            user_id: user.user_id,
            username:user.username
        }, process.env.JWT_SECRET,{expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME});

        res.cookie('token',token,{
            maxAge:900000,
            httpOnly:true
        })

        return res.status(200).json({
            message:'Login successful',
            // token:token
        });
       
    } catch (error){
        console.error(error)
        return res.status(500).json({
            status:'Error',
            message:'There was an error processing your request for login'
        })
    }
}

module.exports = {register,login}