const express = require('express');

const {tokenChecker,logout} = require('../controller/tokenController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',tokenChecker);
router.post('/logout',authenticateToken,logout);

module.exports = router;