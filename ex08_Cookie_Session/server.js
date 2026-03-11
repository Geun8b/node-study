const express = require('express');
const app = express();

const mainRouter = require('./routes/mainRouter');
const cookieRouter = require('./routes/cookieRouter');
const sessionRouter = require('./routes/sessionRouter');

// view 미들웨어 셋팅
const nunjucks = require('nunjucks');
app.set('view engine', 'html');
nunjucks.configure('views', {
    express : app,
    watch : true
});

// 쿠키 셋팅
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// 세션 셋팅
const session = require('express-session'); // 세션의 기능
const fileStore = require('session-file-store')(session); // 세션의 저장소

// 세션 미들웨어
app.use(session({
    secret : 'secret',          // 세션을 암호화 할때 사용하는 키
    resave : false,             // 세션에 수정 사항이 없어도 계속 저장 할 건지에 대한 여부
    saveUninitialized : false,  // 초기화 되지 않은 세션에 대해 저장 할 건지에 대한 여부
    store : new fileStore({     // 어디에 저장 할 것인가
        path : './sessions',    // 세션파일이 저장 될 폴더 경로
        logFn : function(){}    // 로그 출력을 원하지 않는 경우 비어있는 함수
    }),             
    cookie : {                  // 쿠키에 대한 정보 값
        httpOnly : true,        // 클라이언트에서 쿠키에 접근하는 것을 방지
        secure : false,         // HTTP 환경일때는 false, HTPS 환경일때는 true(현재는 개발 환경이라서 HTTP 환경)
        maxAge : 3600000        // 세션 유효 기간 (ms 단위)
    }
}));


app.use('/', mainRouter);
app.use('/cookie', cookieRouter);
app.use('/session', sessionRouter);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중...')
});