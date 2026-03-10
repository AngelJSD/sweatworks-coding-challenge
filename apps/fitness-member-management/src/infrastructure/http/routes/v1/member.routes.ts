import { Router } from "express";
import { MemberRepository } from "../../../persistance/repositories/member.repository";
import { CreateMember } from "../../../../application/createMember";
import { MemberController } from "../../controllers/member.controller";
import { dataSource } from "../../../../typeorm-setup";
import { ListMembers } from "../../../../application/listMembers";
import { FindMemberById } from "../../../../application/findMemberById";

const membersRouter = Router();

const memberRepository = new MemberRepository(dataSource);
const createMember = new CreateMember(memberRepository);
const listMembers = new ListMembers(memberRepository);
const findMemberById = new FindMemberById(memberRepository);
const memberController = new MemberController(createMember, listMembers, findMemberById);

membersRouter.post("/create", (req, res) => memberController.create(req, res));
membersRouter.get("/list", (req, res) => memberController.getAll(req, res));
membersRouter.get("/:id", (req, res) => memberController.getById(req, res));

export { membersRouter };
