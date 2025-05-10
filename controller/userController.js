const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const getUser = async (req,res) => {
    const {id} = req.params;

    try{
        const [get_user] = await pool.query(`SELECT user_id,username,created_at,updated_at FROM user_account WHERE user_id = ?`,[id])

        if(get_user.length === 0) {
            return res.status(404).json({
                error:'User not found'
            })
        }
        return res.status(200).json({
            message:get_user[0]
        })
         
    } catch(error) {
            console.error(error)
            return res.status(500).json({
                error:'There was an error getting the user info'
            })
         }
}
const getAllUser = async (req,res) => {
    try{
        const [getAll_user] = await pool.query(`SELECT user_id,username,created_at,updated_at FROM user_account`)

        if(getAll_user.length === 0) {
            return res.status(404).json({
                error:'No user found'
            })
        }
        return res.status(200).json({
            message:getAll_user
        })
         
    } catch(error) {
            console.error(error)
            return res.status(500).json({
                error:'There was an error getting all users'
            })
         }
}
const editUsername = async (req,res) => {
    const {id} = req.params;
    const {username} = req.body;

    try {
        const [updateUsername] = await pool.query(`UPDATE user_account SET username = ? WHERE user_id = ?`,[username,id])
        if(updateUsername.affectedRows === 0){
            return res.status(400).json({
                error:'Please check your details'
            })
        }
        return res.status(200).json({
            message:'Username successfully updated'
        })

    } catch (error) {
        //console.error(error);
         return res.status(500).json({
            error:'There was an error updating your username'
        })
    }
}
const editPassword = async (req,res) => {
    const {id} = req.params;
    const {password} = req.body;

    try {
        saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltrounds);
        const [updatePass] = await pool.query(`UPDATE user_account SET password = ? WHERE user_id = ?`,[hashedPassword,id])
        if(updatePass.affectedRows === 0){
            return res.status(400).json({
                error:'Please check your details'
            })
        }
        return res.status(200).json({
            message:'Password successfully updated'
        })

    } catch (error) {
        console.error(error);
         return res.status(500).json({
            error:'There was an error updating your password'
        })
    }
}
const deleteUser = async (req,res) => {
    const {id} = req.params;
    try {
        const [delete_account] = await pool.query(`DELETE FROM user_account WHERE user_id = ?`,[id])
        return res.status(200).json({
            message:'User successfully removed'
        })

    } catch (error) {
        //console.error(error);
         return res.status(500).json({
            error:'There was an error removing the user'
        })
    }
}
module.exports = {getUser,getAllUser,editUsername,editPassword,deleteUser}