const express = require('express')
const router = express.Router()
const path = require('path')
const file_path = path.join(__dirname, '..', 'public')

router.get('/', (req, res)=>{
    console.log('메뉴 페이지')
    res.sendFile(file_path + '/menu.html')
})

module.exports = router