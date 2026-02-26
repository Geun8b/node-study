// 1. 서버 설정 코드 영역
const express = require('express')
const app = express()
const path = require('path')

// 이미지를 가져올때 사용
app.use(express.static(__dirname + '/public'))

// 2. url 링크를 담당할 코드 영역
// 메인경로에 접속 할 수 있는 구조 만들기
app.get('/', (req, res)=>{
    console.log('서버 접근 완료다!!')
    res.sendFile(path.join(__dirname, 'public', 'ex02_.html'))
})

// get방식의 요청을 받을 수 있는 구조 생성
app.get('/getKeyword', (req, res)=>{
    console.log('사용자가 검색을 요청했습니다!', req.query.keyword)
})

app.set('port', process.env.PORT || 3000)

// 3. express 포트를 통해 구동하는 코드 영역
app.listen(app.get('port'), ()=>{
    console.log(app.get('port') + '포트에서 대기중이다!!')
})