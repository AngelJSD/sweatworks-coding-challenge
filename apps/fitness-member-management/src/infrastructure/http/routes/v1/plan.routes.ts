import { Router } from "express";
import { dataSource } from "../../../../typeorm-setup";
import { PlanRepository } from "../../../persistance/repositories/plan.respository";
import { ListPlans } from "../../../../application/listPlans";
import { FindPlanById } from "../../../../application/findPlanById";
import { PlanController } from "../../controllers/plan.controller";

const plansRouter = Router();

const planRepository = new PlanRepository(dataSource);
const listPlans = new ListPlans(planRepository);
const findPlanById = new FindPlanById(planRepository);
const planController = new PlanController(listPlans, findPlanById);

plansRouter.get("/list", (req, res) => planController.getAll(req, res));
plansRouter.get("/:id", (req, res) => planController.getById(req, res));

export { plansRouter };
