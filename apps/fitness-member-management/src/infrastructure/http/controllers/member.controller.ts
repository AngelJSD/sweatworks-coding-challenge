import { Request, Response } from "express";

import { ZodError } from "zod";
import { CreateMember } from "../../../application/createMember";
import { ListMembers } from "../../../application/listMembers";
import { FindMemberById } from "../../../application/findMemberById";

export class MemberController {
  constructor(
    private readonly createMember: CreateMember,
    private readonly listMembers: ListMembers,
    private readonly findMemberById: FindMemberById,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const member = await this.createMember.execute(req.body);
      res.status(201).json(member);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const members = await this.listMembers.execute();
      res.status(200).json(members);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const member = await this.findMemberById.execute(id);
      
      if (!member) {
        res.status(404).json({ message: "Member not found" });
        return;
      }
      
      res.json(member);
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