import { MemberService } from "./memberService";
import { MembershipService } from "./membershipService";

export interface ServicesContainer {
  memberService: MemberService;
  membershipService: MembershipService;
}

export const createServicesContainer = (): ServicesContainer => ({
  memberService: MemberService.create(),
  membershipService: MembershipService.create(),
});

export const createNullServicesContainer = (nullData: any = {}): ServicesContainer => ({
  memberService: MemberService.createNull(nullData.memberService),
  membershipService: MembershipService.createNull(),
})
