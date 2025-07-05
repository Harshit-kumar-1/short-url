const express = require('express');
const router = express.Router();
const { handleUserLogin, handleUserSignup } = require('../controllers/user');

router.post('/login', handleUserLogin);
router.post("/", handleUserSignup);

module.exports = router;