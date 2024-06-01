import express from "express";
import boardRouter from "./borad";
import userRouter from "./user";

const router = express();

router.use("/user", userRouter);
router.use("/board", boardRouter);

export default router;