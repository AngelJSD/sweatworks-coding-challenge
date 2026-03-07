import { Router } from "express";
import { membersRouter } from "./member.routes";

const v1Router = Router();
v1Router.use("/members", membersRouter);

export { v1Router };
