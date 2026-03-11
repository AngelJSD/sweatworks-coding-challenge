import { Router } from "express";

import { dataSource } from "../../../../typeorm-setup";
import { MembershipRepository } from "../../../persistance/repositories/membership.repository";
import { CreateMembership } from "../../../../application/createMembership";
import { FindAllMembershipsByMemberId } from "../../../../application/findAllMembershipsByMemberId";
import { MembershipController } from "../../controllers/membership.controller";
import { CancelMembership } from "../../../../application/cancelMembership";

const membershipsRouter = Router();

const membershipRepository = new MembershipRepository(dataSource);
const createMembership = new CreateMembership(membershipRepository);
const findAllMembershipsByMemberId = new FindAllMembershipsByMemberId(membershipRepository);
const cancelMembership = new CancelMembership(membershipRepository);
const membershipController = new MembershipController(createMembership, findAllMembershipsByMemberId, cancelMembership);

membershipsRouter.post("/create", (req, res) => membershipController.create(req, res));
membershipsRouter.get("/:id", (req, res) => membershipController.getAllMembershipsByMemberId(req, res));
membershipsRouter.post("/cancel", (req, res) => membershipController.cancel(req, res));

export { membershipsRouter };
