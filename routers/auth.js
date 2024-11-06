const express = require('express')
const router = express.Router()

const { register, login, currentUser } = require('../controllers/auth')

// http://localhost:5001/api/register
router.post('/register', register)
// http://localhost:5001/api/login
router.post('/login', login)
// http://localhost:5001/api/
router.post('/current-user', currentUser)
// http://localhost:5001/api/
router.post('/current-admin', currentUser)



module.exports = router