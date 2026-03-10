// 사용자의 데이터만 관리하는 용도로 사용 (로그인, 회원가입, 탈퇴, ...)

const express = require('express')
const router = express.Router()


// DB에 필요한 모듈 불러오기
const conn = require('../config/db')


// 회원가입 기능 만들기
router.post('/join', (req, res) => {
    console.log('회원가입 기능', req.body)
    // DB에 데이터 전달 작업
    let { id, pw, nick } = req.body
    console.log('id', id)

    // ** 회원가입 중복검사를 해보자
    // SELECT 문을 이용해서 같은 ID가 없는 경우에만 회원가입을 허가
    // => 만약 중복된 아이디가 있다면? "사용 할 수 없는 ID입니다."
    // (팝업창 + 회원가입 페이지)
    // => 중복된 아이디가 없다면? 회원가입 로직을 그대로 사용해서
    // (회원가입 + 메인페이지)

    // 1. 중복검사를 하는 sql문 작성 (sql2)
    let sql2 = "SELECT ID FROM NODEJS_MEMBER WHERE ID =?"

    // 2. DB연동을 진행
    conn.query(sql2, [id], (err, rows) => {
        console.log('rows', rows)

        if (rows.length == 0) {
            // **** 회원가입 로직 시작


            // 1. sql 문장이 필수로 필요하다
            // 2. 전달할 데이터 값
            // 3. DB에 작업을 진행한 후 처리 할 콜백 함수
            let sql = "INSERT INTO NODEJS_MEMBER VALUES(?, ?, ?)"
            conn.query(sql, [id, pw, nick], (err, rows) => {
                console.log('회원가입 완료', rows)

                if (rows) {
                    // 회원가입이 잘 처리 됐다면
                    res.redirect('/')
                } else {
                    // 회원가입이 처리되지 않았다면
                    res.send(`
                        <script>
                            alert('다시 시도 해주세요')
                            window.location.href='/join'
                        </script>
                    `)
                }
            })
            // **** 회원가입 로직 끝
        } else {
            // 회원가입 불가
            res.send(`<script>
                alert("회원가입을 다시 해주세요")
                window.location.href="/join"
            </script>`)
        }
    })
})
// 3. rows 값에 어떤 값이 넘어오는지 console에 출력
//      => 캡쳐해서 단톡방에 업로드

/* 내 정답
let sql = "SELECT ID FROM NODEJS_MEMBER WHERE ID=? AND PW=? AND NICK=?"
conn.query(sql, [id, pw, nick], (err, rows)=>{
    console.log('rows', rows)
    console.log(rows.length)

    if(rows.length > 0){
        // 회원가입 성공
        res.send(`<script>
            alert("회원가입을 다시 해주세요")
            window.location.href="/join"
        </script>`)

    }else{
        res.redirect('/')
        </script>`)

    }
})
})
*/

// 로그인 기능
// - 주소 : /user/login
// - login.html 에서 넘긴 자료를 이곳에서 받아서 DB에 검색, 조회
router.post('/login', (req, res) => {
    console.log('로그인 기능', req.body)
    let { id, pw } = req.body

    // DB연동 시작
    let sql = "SELECT ID FROM NODEJS_MEMBER WHERE ID=? AND PW=?"
    conn.query(sql, [id, pw], (err, rows) => {
        console.log('rows', rows)
        if (rows.length > 0) {
            // 로그인 성공
            res.redirect('/')
        } else {
            // 로그인 실패
            res.send(`<script>
                    alert("아이디와 비밀번호를 다시 확인해주세요.")
                    window.locatiion.href="/login"
                </script>`)
        }
    })
})



// 회원 탈퇴 기능
router.post('/delete', (req, res) => {
    console.log('탈퇴 기능', req.body)

    let { id, pw } = req.body
    let sql = "DELETE FROM NODEJS_MEMBER WHERE ID=? AND PW=?"
    conn.query(sql, [id, pw], (err, rows) => {
        console.log('탈퇴 rows', rows)
        if(rows.affectedRows > 0){
            // 탈퇴 성공
            res.redirect('/')
        }else{
            // 탈퇴 실패
            res.send(`<script>
                    alert("정보가 일치하지 않습니다.")
                    window.location.href="/delete"
                </script>`)
        }
    })
})


// 검색 기능
router.get('/select', (req, res) => {
    console.log('회원 검색', req.query)
    let sql = "SELECT ID, NICK FROM NODEJS_MEMBER WHERE ID=?"
    conn.query(sql, [req.query.id], (err, rows)=>{
        console.log('회원검색', rows)

        if(rows.length > 0){
            // 검색데이터 있다.
            res.render('select', {rows : rows}) // 데이터 홈페이지 표시
        }else{
            // 검색데이터 없다.
            res.send(`<script>
                    alert("없는 회원 정보입니다.")
                    window.location.href="/"
                    </script>`)
        }
    })

})


// 전체 검색 기능
router.get('/selectAll', (req, res) => {
    console.log('회원 전체 검색', req.query)
    let sql = "SELECT ID, NICK FROM NODEJS_MEMBER"
    conn.query(sql, (err, rows)=>{
        console.log('전체 검색', rows)
        res.render('select', {rows : rows})  // 데이터 홈페이지 표시
    })

})
module.exports = router
