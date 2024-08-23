const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./controller/index");
const { sequelize } = require("./model");

dotenv.configDotenv();

const PORT = Number(process.env.PORT ?? 8000);

const app = express();
app.use(express.json()); // json 사용 설정
app.use(express.urlencoded({ extended: false })); // url 해석 모듈 결정
app.use(
  cors({
    // cors 설정
    origin: "*", // origin 설정 : request를 보내는 origin의 주소 설정
    method: ["GET", "POST", "PATCH", "PUT", "DELETE"], // 접근 가능한 메소드 설정
    credentials: true, // credential 설정 : 사용자 인증이 필요한 리소스 접근 시 true 설정
  })
);

app.use("/", router);

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`); // 포트 연결 시 연결되어 있는 포트 확인

  await sequelize
    .sync({ force: false })
    .then(() => {
      console.log(`DB has initted`);
    })
    .catch((err) => {
      console.error(err);
    });
});
