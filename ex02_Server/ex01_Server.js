/* 
 그동안 우리는 서버를 사용하기 위해 live server를 사용해 왔다!
그러나 이제부터는 우리가 직접 server 생성해서 사용해 보자! 
*/

/* 
 서버 생성시 필수 조건
 1. http 모듈 => 웹 브라우저에서 요청과 응답을 처리해주는 모듈 (core)
 2. 포트 번호 => 다른 사용중인 포트 번호와는 중복되면 안됨
 3. createServer 함수 내 콜백함수
   => 누군가가 내 서버에 접근을 하면 내가 어떤 일을 할 건지 알려주는 기능
*/


// http 모듈 불러오기
const http = require('http')

// http를 통해 필요한 작업 불러오기
// http.createServer(콜백함수).listen(포트번호);
http

// 콜백함수 : 사용자의 대기를 기다리는 함수
.createServer((req, res)=>{
    console.log('서버 접근 완료')

    // 서버에 접속된 IP 주소 확인해보기!
    //console.log('ip : ', req.socket.remoteAddress)

    // IP 주소를 조금 더 깔끔하게 가져와 보자!
    const ogIp = req.socket.remoteAddress
    
    if(ogIp.startsWith('::ffff:')){
        const ip = ogIp.substring(7)
        console.log('ip : ', ip)

        if(ip == "192.168.219.182"){
            res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
            res.write('<h1>凸</h1>')
            res.end()   
        }
        else if (ip == "192.168.219.42"){
            res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
            res.write('감사합니다')
            res.end()   
        }
        else{
            // 서버에 접속한 사용자에게 보일 수 있는 응답(res) 처리!
            // res.writehead( , {''}) : 한글화 인코딩 작업
            res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
            res.write('<h1>凸.凸</h1>')
            res.end()   // 응답에 대한 종료
        }
    }
})

// 포트번호 : 포트번호 설정 후 사용자의 요청 대기 시작
.listen(3000, ()=>{
    console.log('3000번 포트에서 서버연결을 기다리는중...')
})
