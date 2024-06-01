// npm i express cors dotenv
const express = require('express'); // 
const cors = require('cors'); // cors 설정을 위해 사용하는 모듈
const dotenv = require('dotenv'); // 환경변수 설정 시 사용하는 모듈

dotenv.configDotenv({
    path: '../.env'
}); // 환경변수 설정 (env 파일 환경변수 사용을 위해서는 필수!)

const PORT = process.env.PORT ?? 8000 // env 파일에 PORT를 가져오는데 없으면 8000번을 사용

const app = express();

app.use(express.json()) // json 사용 설정
app.use(express.urlencoded({ extended: false })) // url 해석 모듈 결정
app.use(cors({ // cors 설정
    origin: '*', // origin 설정 : request를 보내는 origin의 주소 설정
    method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // 접근 가능한 메소드 설정
    credentials: true // credential 설정 : 사용자 인증이 필요한 리소스 접근 시 true 설정
}))

app.use('/', (req, res) => {
    res.status(200).json({
        "server" : "OK!"
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`) // 포트 연결 시 연결되어 있는 포트 확인
})