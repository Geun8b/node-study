const express = require('express')
const app = express()

// 모든 주소(출처)에 대해서 통신 할 수 있게 허용
const cors = require('cors')
app.use(cors())

// DB연결 모듈 가져오기
const conn = require('./config/db')

// body 데이터 사용 (post 방식)
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// get 방식 = req.query / post 방식 = req.body
'http://localhost:3001/join'
app.post('/join', (req, res)=>{
    console.log('Node 서버 접근완료')
    console.log(req.body)

    // 변수에 담기
    let id=req.body.id
    let pw=req.body.pw
    let nick=req.body.nick

    let sql='insert into nodejs_member values(?,?,?)'
    conn.query(sql, [id, pw, nick], (err, rows) => {
        // 회원가입 성공 => 1
        // rows.affectedRows : 영향을 받은 행의 갯수
        if(rows.affectedRows > 0){
            res.send(1)
        }
        // 회원가입 실패 => 0
        else{
            res.send(0)
        }
    })
})

'http://localhost:3001/login'
    
app.post('/login', (req, res)=>{
    console.log('Node 서버 접근완료')
    console.log(req.body)

    // 변수에 담기
    let id=req.body.id
    let pw=req.body.pw

    let sql='SELECT ID, PW, NICK FROM NODEJS_MEMBER WHERE ID=? AND PW=?'
    conn.query(sql, [id, pw], (err, rows) => {
        // 로그인 성공 => 1
        // rows.affectedRows : 영향을 받은 행의 갯수
        if(rows.affectedRows > 0){
            res.send(1)
        }
        // 로그인 실패 => 0
        else{
            res.send(0)
        }
    })

})

app.listen(3001)