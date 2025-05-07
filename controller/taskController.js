const pool = require('../config/database');

const addTask = async (req, res) => {
    const {task_name,user_id} = req.body;
    
    try{
        const[add_task] = await pool.query(`INSERT INTO user_tasks(task_name,user_id) VALUES(?,?)`,[task_name,user_id]);

        return res.status(201).json({
            message:'Task successfully added'
        })
    } catch(error){
        console.error(error)
        return res.status(500).json({
            error:'There was an error adding the task'
        })
    }
}
const getTask = async (req,res) => {
    const{id} = req.params;

    try {
        const [get_task] = await pool.query(`SELECT * FROM user_tasks WHERE task_id = ?`,[id]);
        if(get_task.length === 0) {
            return res.status(404).json({
                error:'Task is not available'
            })
        }
        return res.status(200).json({
            message:get_task[0]
        })
    } catch (error) {
        //console.error(error)
        return res.status(500).json({
            error:'There was a problem getting the task'
        })
    }
}
const getAllTask = async (req,res) => {
    try {
        const [getAll_task] = await pool.query(`SELECT * FROM user_tasks`);
        if(getAll_task.length === 0) {
            return res.status(404).json({
                error:'No task available'
            })
        }
        return res.status(200).json({
            message:getAll_task
        })
    } catch (error) {
        //console.error(error)
        return res.status(500).json({
            error:'There was a problem getting all the task'
        })
    }
}
const getTaskByUser = async (req,res) => {
    const{id} = req.params;

    try {
        const [user_exist] = await pool.query(`SELECT user_id,username,created_at,updated_at FROM user_account WHERE user_id = ?`,[id]);
        if(user_exist.length === 0){
            return res.status(404).json({
                error:'User does not exist'
            })
        }
        const [get_taskByUser] = await pool.query(`SELECT * FROM user_tasks WHERE user_id = ?`,[id]);
        if(get_taskByUser.length === 0) {
            console.log('No task available')
        }
        return res.status(200).json({
            message:get_taskByUser
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error:'There was a problem getting all the task'
        })
    }
}
const updateTask = async (req,res) => {
    const{id} = req.params;
    const {task_name} = req.body;
    try{
        const[edit_task] = await pool.query(`UPDATE user_tasks SET task_name = ? WHERE task_id = ?`,[task_name,id]);
        if(edit_task.affectedRows === 0) {
            return res.status(404).json({
                error:'Task not avaialable'
            })
        }
        return res.status(200).json({
            message:'Task update succesful'
        })
    } catch(error){
        console.error(error);
        return res.status(500).json({
            error:'There was an error updating the task'
        })
    }
}
const deleteTask = async (req,res) => {
    const {id} = req.params;
    try {
        const[remove_task] = await pool.query(`DELETE FROM user_tasks WHERE task_id = ?`,[id]);
        return res.status(200).json({
            message:'Task removed successfully'
        })
    } catch(error){
        //console.error(error)
        return res.status(500).json({
            error:'There was an error removing the task'
        })
    }
}
module.exports = {addTask,getTask,getAllTask,getTaskByUser,updateTask,deleteTask}