import { getFreshResponse } from "../helpers/testHelper";

export type MembershipServiceNullData = {
  getAllMembershipsByMemberId?: Promise<any> | any;
  createMembership?: Promise<any> | any;
  cancelMembership?: Promise<any> | any;
}

export class MembershipService {
  private constructor() {}

  static create(): MembershipService {
    return new MembershipService();
  }

  static createNull(data: MembershipServiceNullData = {}): MembershipService {
    const membershipService = new MembershipService();
    
    membershipService.getAllMembershipsByMemberId = async () => {
      if (data.getAllMembershipsByMemberId !== undefined) {
        return data.getAllMembershipsByMemberId instanceof Promise
          ? getFreshResponse(await data.getAllMembershipsByMemberId)
          : getFreshResponse(data.getAllMembershipsByMemberId);
      }
      return Promise.resolve({});
    }

    membershipService.createMembership = async () => {
      if (data.createMembership !== undefined) {
        return data.createMembership instanceof Promise
          ? getFreshResponse(await data.createMembership)
          : getFreshResponse(data.createMembership);
      }
      return Promise.resolve({});
    }

    membershipService.cancelMembership = async () => {
      if (data.cancelMembership !== undefined) {
        return data.cancelMembership instanceof Promise
          ? getFreshResponse(await data.cancelMembership)
          : getFreshResponse(data.cancelMembership);
      }
      return Promise.resolve({});
    }

    return membershipService;
  }

  async createMembership(data: any) {
    const res = await fetch(
      `http://localhost:3000/api/v1/memberships/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      throw new Error("Error adding a new plan to a member");
    }
    return res.json();
  }

  async getAllMembershipsByMemberId(memberId: string | undefined) {
    if (memberId === undefined) {
      throw new Error("Error memberId is undefined");
    }

    const res = await fetch(
      `http://localhost:3000/api/v1/memberships/:memberId`.replace(':memberId', memberId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Error getting memberships by memberId");
    }
    return res.json();
  }

  async cancelMembership(data: any) {
    const res = await fetch(
      `http://localhost:3000/api/v1/memberships/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      throw new Error("Error canceling the membership");
    }
    return res.json();
  }
}
