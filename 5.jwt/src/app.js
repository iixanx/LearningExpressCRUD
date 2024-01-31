const express = require('express');
const cors = require('cors');
const { configDotenv } = require('dotenv');

const router = require('./router/index');
const { sequelize } = require('./model');
const { redisCli } = require('./redis');

configDotenv();
const port = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(cors({
    origin: 'localhost',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use('/', router);

app.listen(port, async () => {
    console.log(`Server has initted on ${port}!`)

    await redisCli.connect()

    sequelize.sync({ force: false })
        .then(() => {
            console.log(`DB has initted`);
        })
        .catch(err => {
            console.error(err);
        })
});