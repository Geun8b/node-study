// config에 대한 구성, 설정 할 수 있는 파일
// 데이터베이스에 대한 기본 설정
// mysql에 대한 설정 작업 필요함

// 1. mysql2 모듈설치
// - 터미널 입력 : npm i mysql2

// 2. 모듈 가져오기
const mysql = require('mysql2')

// 3. DB 정보를 기재하기
const conn = mysql.createConnection({
    host : "localhost",
    port : "3306",
    database : "NODEJS",
    password : "1234",
    user : "root"
})

conn.connect()
console.log('DB 연결 완료')

module.exports = conn