import { Router } from "express";
import { membersRouter } from "./member.routes";
import { membershipsRouter } from "./membership.routes";
import { plansRouter } from "./plan.routes";

const v1Router = Router();
v1Router.use("/members", membersRouter);
v1Router.use("/memberships", membershipsRouter);
v1Router.use("/plans", plansRouter);

export { v1Router };
