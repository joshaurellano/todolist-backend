const express = require('express');
const {getUser,getAllUser,editUsername,editPassword,deleteUser} = require('../controller/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id',authenticateToken,getUser);
router.get('/',authenticateToken,getAllUser);
router.put('/:id/update/username',authenticateToken,editUsername);
router.put('/:id/update/password',authenticateToken,editPassword);
router.delete('/:id',authenticateToken,deleteUser);

module.exports = router;
