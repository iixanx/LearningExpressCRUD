// npm i @types/express @types/cors --force
import express from 'express' // const express = require('express');
import cors from 'cors'
import { configDotenv } from 'dotenv'

configDotenv(); // 환경변수 설정을 해주는 함수

const app = express();
const port: Number = Number(process.env.PORT) || 8000; //

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}))
app.use(express.json()) // 
app.use(express.urlencoded({ extended: true })) //

app.use('/', (req, res) => { // '/' -> localhost:8080/
    res.status(200).json({ // 응답 객체의 status 값에 200을 추가, json 값에 객체를 추가
        "server" : "OK!"
    })
})

app.listen(port, () => { // 
    console.log(`Server has initted on port ${port}!`)
})