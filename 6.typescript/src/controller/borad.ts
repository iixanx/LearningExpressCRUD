import express from "express";

const boardRouter = express();

boardRouter.post("/");
boardRouter.get("/");
boardRouter.get("/:id");
boardRouter.patch("/:id");
boardRouter.delete("/:id");

export default boardRouter;
