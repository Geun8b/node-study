// express 꼭 불러오기
const express = require('express')
const app = express()
const path = require('path')
const file_path = path.join(__dirname, '..', 'public')

// 라우팅 관련 기술이 들어오는 영역!
const mainRouter = require('./routes/main')
const userRouter = require('./routes/user')
const menuRouter = require('./routes/menu')

app.use('/', mainRouter)
app.use('/user', userRouter)
app.use('/menu', menuRouter)


// 포트번호 3000으로 기본 셋팅 진행!
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), ()=>{
    console.log(app.get('port') + '포트에서 대기중!!')
})


