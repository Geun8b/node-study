const express = require('express')
const router = express.Router()
const path = require('path')
const file_path = path.join(__dirname, '..', 'public')

router.get('/', (req, res)=>{
    console.log('유저 페이지')
    res.sendFile(file_path + '/user.html')
})

module.exports = router