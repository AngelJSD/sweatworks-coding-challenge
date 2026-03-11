import { MemberService } from "./memberService";
import { MembershipService } from "./membershipService";
import { PlanService } from "./planService";

export interface ServicesContainer {
  memberService: MemberService;
  membershipService: MembershipService;
  planService: PlanService;
}

export const createServicesContainer = (): ServicesContainer => ({
  memberService: MemberService.create(),
  membershipService: MembershipService.create(),
  planService: PlanService.create(),
});

export const createNullServicesContainer = (nullData: any = {}): ServicesContainer => ({
  memberService: MemberService.createNull(nullData.memberService),
  membershipService: MembershipService.createNull(),
  planService: PlanService.createNull(),
})
