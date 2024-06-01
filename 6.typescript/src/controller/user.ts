import express from "express";

const userRouter = express();

userRouter.post("/signup");
userRouter.get("/");
userRouter.get("/:id");
userRouter.patch("/:id");
userRouter.delete("/:id");

export default userRouter;
