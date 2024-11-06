const express = require('express')
const { create, list, remove } = require('../controllers/category')
const router = express.Router()

// http://localhost:5001/api/category
router.post('/category', create)
router.get('/category', list)
router.delete('/category/:id', remove)







module.exports = router