// npm i @types/express @types/cors
import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'

configDotenv();

const app = express();
const port: Number = Number(process.env.PORT) || 8000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', (req, res) => {
    res.status(200).json({
        "server" : "OK!"
    })
})

app.listen(port, () => {
    console.log(`Server has initted on port ${port}!`)
})