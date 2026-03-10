import { Request, Response } from "express";

import { ZodError } from "zod";
import { CreateMembership } from "../../../application/createMembership";
import { FindAllMembershipsByMemberId } from "../../../application/findAllMembershipsByMemberId";

export class MembershipController {
  constructor(
    private readonly createMembership: CreateMembership,
    private readonly findAllMembershipsByMemberId: FindAllMembershipsByMemberId,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const membership = await this.createMembership.execute(req.body);
      res.status(201).json(membership);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getAllMembershipsByMemberId(req: Request, res: Response): Promise<void> {
    try {
      const memberId = req.params.id;
      const memberships = await this.findAllMembershipsByMemberId.execute(memberId);
      
      if (!memberships) {
        res.status(404).json({ message: "No memberships found for member" });
        return;
      }
      
      res.json(memberships);
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
