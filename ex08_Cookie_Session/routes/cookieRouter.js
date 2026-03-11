/* 쿠키 (cookie) : 클라이언트 브라우저에 저장되는 정보
- 쿠키는 서버의 자원을 전혀 사용하지 않고, 클라이언트의 자원인 브라우저를 사용함
- 놀이공원에서 자유이용권을 손님만 가지고 다니는 개념
- 쿠키는 브라우저에 저장이 되기 때문에 브라우저를 종료하더라도 그 기록이 남아있음
*/

const express = require('express');
const router = express.Router();

// 쿠키 저장 : 관리자 => 사용자에게 자유이용권을 전달 (res사용)
// (서버에서 응답 해주는 것 이기에 res 사용)
// 1. 쿠키 저장하기
router.get('/setCookie', (req, res)=>{
    console.log('setCookie');

    // res.cookie(key, value) 형태로 저장
    res.cookie('nick', 'BG')

    // 쿠키의 만료 설정 (초), 3000 = 3초
    res.cookie('age', '30', {maxAge : 3000})

    // 시간으로 만료 설정 (초*분*시간*일)
    res.cookie('name', 'ByeongGeun', {expires : new Date(Date.now() + 60*60*24*3)})

    res.redirect('/')
});

// 2. 쿠키 값 확인하기
router.get('/getCookie', (req, res)=>{
    // 쿠키 확인 : "자유이용권 보여주세요" 사용자 => 관리자
    // (서버에 요청 하는 것 이기에 req 사용)
    console.log('쿠키 값 확인하기', req.cookies.nick)
    console.log('쿠키 값 확인하기', req.cookies.age)
    console.log('쿠키 값 확인하기', req.cookies.name)
    res.redirect('/')
});

// 3. 쿠키 값 삭제하기
router.get('/clearCookie', (req, res)=>{
    // 쿠키 삭제 : 자유이용권을 관리자가 뺏는 거 => 사용자 (res 사용)
    // (서버에서 응답 해주는 것 이기에 res 사용)
    res.clearCookie('nick')
    res.redirect('/')
})


module.exports = router;