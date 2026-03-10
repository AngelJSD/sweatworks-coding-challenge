import { Request, Response } from "express";

import { ZodError } from "zod";
import { ListPlans } from "../../../application/listPlans";
import { FindPlanById } from "../../../application/findPlanById";

export class PlanController {
  constructor(
    private readonly listPlans: ListPlans,
    private readonly findPlanById: FindPlanById,
  ) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const plans = await this.listPlans.execute();
      res.status(200).json(plans);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const plan = await this.findPlanById.execute(id);
      
      if (!plan) {
        res.status(404).json({ message: "Plan not found" });
        return;
      }
      
      res.json(plan);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}