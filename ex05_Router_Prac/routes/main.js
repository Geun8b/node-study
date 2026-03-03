const express = require('express')
const router = express.Router()
const path = require('path')
const file_path = path.join(__dirname, '..', 'public')

router.get('/', (req, res)=>{
    console.log('메인 서버 접근')
    res.sendFile(`${file_path}/main.html`)
})


module.exports = router