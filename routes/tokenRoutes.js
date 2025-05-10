const express = require('express');

const {tokenChecker} = require('../controller/tokenController');

const router = express.Router();

router.get('/',tokenChecker);

module.exports = router;