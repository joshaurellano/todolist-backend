const express = require('express');
const {addTask,getTask,getAllTask,getTaskByUser,updateTask,deleteTask} = require('../controller/taskController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/',authenticateToken,addTask);
router.get('/:id',authenticateToken,getTask);
router.get('/',authenticateToken,getAllTask);
router.get('/user/:id',authenticateToken,getTaskByUser);
router.put('/:id',authenticateToken,updateTask);
router.delete('/:id',authenticateToken,deleteTask)

module.exports = router