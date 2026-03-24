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

app.post('/login', (req, res)=>{
    let id = req.body.id
    let pw = req.body.pw

    let sql = 'select * from nodejs_member where id=? and pw=?'

    conn.query(sql, [id, pw], (err, rows)=>{
        if(rows.length > 0){
            // 성공했을때 => 1
            res.send(1)
        }// 실패 했을때 => 0
        else{
            res.send(0)
        }
    })
})


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


app.listen(3001)