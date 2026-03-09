const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    console.log('서버 접근')
    // 기본 경로가 요청 되면 템플릿 엔진을 사용하여 페이지를 응답
    res.render('main', {nick : '병근'})
})

router.get('/mypage', (req, res)=>{
    console.log('마이 페이지')
    res.render('mypage')
})

module.exports = router