const express = require('express')
const { listUser } = require('../controllers/user')
const { authCheck, adminCheck } = require('../middlewars/authCheck')
const router = express.Router()





// http://localhost:5001/api/user

//user
router.get('/users',authCheck, adminCheck, listUser)
router.post('/change-status', )
router.post('/change-role', )
//cart 
router.post('/user/cart', )
router.get('/user/cart', )
router.delete('/user/cart', )

router.post('user/address')


router.post('user/order')
router.get ('user/order')

module.exports = router