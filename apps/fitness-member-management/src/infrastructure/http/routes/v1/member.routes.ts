import { Router } from "express";
import { MemberRepository } from "../../../persistance/repositories/member.repository";
import { CreateMember } from "../../../../application/createMember";
import { MemberController } from "../../controllers/member.controller";
import { dataSource } from "../../../../typeorm-setup";

const membersRouter = Router();

const memberRepository = new MemberRepository(dataSource);
const createMember = new CreateMember(memberRepository);
const memberController = new MemberController(createMember);

membersRouter.post("/create", (req, res) => memberController.create(req, res));

export { membersRouter };
