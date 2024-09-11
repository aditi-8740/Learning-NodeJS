const express = require('express');
const router = express.Router();
const{ handleUserSignUp,
       handleUserLogIn
} = require('../controllers/user')

// SIGN-UP Route
router.post('/', handleUserSignUp )

router.post('/login',handleUserLogIn)

module.exports = router;