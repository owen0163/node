const express = require('express')
const { authCheck } = require('../middlewars/authCheck')
const { changeOrderStatus, getOrderStatus } = require('../controllers/admin')
const router = express.Router()




router.put('/admin/order-status',authCheck, changeOrderStatus )

router.get('/admin/orders', authCheck, getOrderStatus)


module.exports = router