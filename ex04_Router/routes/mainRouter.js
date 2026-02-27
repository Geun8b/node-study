// 인기 스포츠 페이지를 여는 라우팅만 모아두는 파일

// 1. 필요한 모듈 불러오기 (라우터 모듈)
// '..' 
const express = require('express')
const router = express.Router()
const path = require('path')
const file_path = path.join(__dirname, '..', 'public')

// 2. 메인 페이지를 연결하기 위한 작업 시작
router.get('/', (req, res)=>{
    console.log('인기 스포츠 페이지')
    res.sendFile(file_path + '/main.html')
})


// 3. 만들어진 기능을 추출하기 위한 작업 (반드시 사용!!)
module.exports = router