// 기본적으로 필요한 거 가져오기
const express = require('express')
const app = express()

// 라우터 불러오기
const indexRouter = require('./routes/index')

// ** Nunjucks 사용법 **
// 1. npm i nunujucks chokidar (터미널에 실행)
// 2. 해당 기능 불러오기
const nunjucks = require('nunjucks')
// 3. view엔진을 html 확장자로 사용하겠다 하는 설정
app.set('view engine', 'html')
// 4. nunjucks 사용에 대한 설정
// => 필요한 파일들만 html로 변환해서 사용하겠다.(정적 or 동적)
//  - 1번째 인자 : 사용 할 폴더명 지정
//  - 2번째 인자 : nunjucks 옵션 객체
//    -> express : express가 담긴 객체를 연결해서 사용하겠다라는 의미
//    -> watch : html파일의 변경을 바로 인지하고 렌더링 할 수 있도록 연결 하겠다는 의미
nunjucks.configure('views',{
    express : app,
    watch : true
})

// 라우터 실행
app.use('/', indexRouter)

// 포트번호 설정
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), ()=>{
    console.log(app.get('port') + '포트에서 대기중!!')
})

