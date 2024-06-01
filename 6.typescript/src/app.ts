import express from "express";
import cors, { CorsOptions } from "cors";
import { configDotenv } from "dotenv";
import router from "./controller";

configDotenv();
const port: Number = Number(process.env.PORT!) ?? 8080;
const corsOptions: CorsOptions = {
  origin: "localhost",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
