import { MemberService } from "./memberService";

export interface ServicesContainer {
  memberService: MemberService;
}

export const createServicesContainer = (): ServicesContainer => ({
  memberService: MemberService.create(),
});

export const createNullServicesContainer = (nullData: any = {}): ServicesContainer => ({
  memberService: MemberService.createNull(nullData.memberService),
})
