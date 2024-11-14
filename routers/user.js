const express = require('express')
const { listUser, changeStatus, changeRole, userCart, getUserCart, emptyCart, saveAddress, saveOrder, getOrder } = require('../controllers/user')
const { authCheck, adminCheck } = require('../middlewars/authCheck')
const router = express.Router()





// http://localhost:5001/api/

//user
router.get('/users',authCheck, adminCheck, listUser)
router.post('/change-status' ,authCheck, adminCheck , changeStatus )
router.post('/change-role' ,authCheck, adminCheck, changeRole )
//cart 
router.post('/user/cart' ,authCheck , userCart )
router.get('/user/cart' ,authCheck, getUserCart )
router.delete('/user/cart' ,authCheck, emptyCart )

router.post('/user/address' ,authCheck , saveAddress )


router.post('/user/order',authCheck, saveOrder )
router.get ('/user/order',authCheck, getOrder )

module.exports = router