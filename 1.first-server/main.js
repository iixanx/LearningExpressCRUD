const http = require('http'); // http 모듈 불러오기

/**
 * http 모듈의 createServer라는 함수를 할당
 */
const server = http.createServer((req, res) => { // req = request, res = response
    res.writeHead(200); // 200번 상태코드를 응답
    res.end('hello'); // 'hello'라는 문자열 반환
})

/**
 *  포트 연결
 */
server.listen(8080, () => { // 매개변수가 없는 화살표 함수
    console.log(`Server is listening on 8080`) // 서버가 포트에 연결될 경우 해당 메시지 출력
})

// 실행 : node main.js
// 접속 : localhost:8080