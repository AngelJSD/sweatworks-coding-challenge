import { Router } from "express";

import { dataSource } from "../../../../typeorm-setup";
import { MembershipRepository } from "../../../persistance/repositories/membership.repository";
import { CreateMembership } from "../../../../application/createMembership";
import { FindAllMembershipsByMemberId } from "../../../../application/findAllMembershipsByMemberId";
import { MembershipController } from "../../controllers/membership.controller";

const membershipsRouter = Router();

const membershipRepository = new MembershipRepository(dataSource);
const createMembership = new CreateMembership(membershipRepository);
const findAllMembershipsByMemberId = new FindAllMembershipsByMemberId(membershipRepository);
const membershipController = new MembershipController(createMembership, findAllMembershipsByMemberId);

membershipsRouter.post("/create", (req, res) => membershipController.create(req, res));
membershipsRouter.get("/:id", (req, res) => membershipController.getAllMembershipsByMemberId(req, res));

export { membershipsRouter };
