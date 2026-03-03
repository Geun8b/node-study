// 1. 서버 설정 코드 영역
const express = require('express')
const app = express()
const path = require('path')

// 4) post의 데이터를 꺼내와 해석하기 위한 미드웨어 추가
app.use(express.urlencoded({extended:true}))

// 이미지를 가져올때 사용
app.use(express.static(__dirname + '/public'))

// 2. url 링크를 담당할 코드 영역
// 1) 메인경로에 접속 할 수 있는 구조 만들기
app.get('/', (req, res)=>{
    console.log('서버 접근 완료다!!')
    res.sendFile(path.join(__dirname, 'public', 'ex02_.html'))
})

// 2) get방식의 요청을 받을 수 있는 구조 생성
app.get('/getKeyword', (req, res)=>{
    console.log('사용자가 검색을 요청했습니다!', req.query.keyword)

    //웹브라우저에 응답 연결하기
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
    res.write('<p>' + req.query.keyword + '를 검색했습니다. </p>')
    res.end()
})

// 3)post방식의 요청을 받을 수 있는 구조 생성
// => 데이터를 가져오기 위한 미들웨어을 추가해줘야 한다.
app.post('/postLogin', (req, res)=>{
    console.log('로그인 시도', req.body)

    // 로그인 로직을 만들어 응답해 보자
    // public 폴더 loginS.html / loginF.html
    // ID: admin ,PW: 1234/ 로그인 성공시 => loginS.html로 응답
    // 로그인 정보가 틀렸을 경우 => loginF.html로 응답

    // req.body.id , req.body.pw
    // console.log()로 확인
    console.log(req.body.id)
    console.log(req.body.pw)

    // 성공 확인 및 주소 보내기
    // js의 ==은 값만 비교 ===은 값과 함께 타입까지 비교
    // res.sendFile(path.join(__direname, 'public', '주소.html'))
        if ((req.body.id == 'admin') && (req.body.pw == '1234')){
        console.log('로그인을 성공했습니다')
        res.sendFile(path.join(__dirname, 'public', 'loginS.html'))
    } else {
    // 실패 확인 및 주소 보내기
    // res.sendFile(path.join(__direname, 'public', '주소.html'))
        console.log('로그인에 실패했습니다')
        res.sendFile(path.join(__dirname, 'public', 'loginF.html'))
    }
})

/* 위 3번 if, else 간소화 (console은 확인용이라 사용 안해도 괜찮음)
        if (req.body.id === 'admin' && req.body.pw === '1234'){
            res.sendFile(path.join(__dirname, 'public', 'loginS.html'))
        }else{
            res.sendFile(path.join(__dirname, 'public', 'loginF.html'))
        }
*/

app.set('port', process.env.PORT || 3000)

// 3. express 포트를 통해 구동하는 코드 영역
app.listen(app.get('port'), ()=>{
    console.log(app.get('port') + '포트에서 대기중이다!!')
})
