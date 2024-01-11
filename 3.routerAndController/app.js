// Packages
const express = require('express'); // express를 불러와서 express 변수에 할당
const dotenv = require('dotenv');
const cors = require('cors'); // cors 설정
const path = require('path'); // path 설정

// Routers
const router = require('./router/index.js'); // index.js 파일의 라우터에 연결

// Setting
dotenv.config({
    path: path.join(__dirname, ".env") // 생략 가능, ".env"에 ".env.dev" 등을 담아 환경변수를 자유롭게 설정 가능하다
}); // 환경변수 설정
const app = express();
const port = process.env.PORT || 8000 // env 파일에 있는 포트 번호 환경설정을 가져오거나 8000번을 사용

app.use(cors({ // cors 내의 옵션을 객체로 따로 빼서 사용할 수도 있다
    origin: '*', // 모든 origin을 허용, 'true'를 써도 된다
    method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // 허용하는 HTTP Method
    credential: true, // 다른 도메인에 요청을 보낼때 인증정보를 담아 보낼지 결정할 수 있는 옵션
					// origin이 *일 경우 credential을 true로 설정하여도 영향이 없다고 한다
}));
app.use(express.json()); // json 파싱 설정
app.use(express.urlencoded({extended: false})); // url 인코딩 설정, body-parser 설치할 필요 없음

// extended 옵션을 false로 설정할 경우 querystring 모듈 사용
// querystring 모듈은 object를 상속받지 않으므로 object의 다양한 함수 사용이 불가능해짐

// extended 옵션을 true로 설정할 경우 qs 모듈 사용
// qs 모듈은 object를 상속받아 toString(), hasOwnProperty() 등의 함수 사용이 가능
// 단 qs 모듈은 npm i qs 등의 명령을 통해 별도의 설치가 필요한 라이브러리


app.use('/', router); // / 이하로 연결되는 모든 엔드포인트를 라우터로 이관시킴

app.listen(port, () => { // 포트 연결
	console.log(`Server has initted on port ${port}!`);
})