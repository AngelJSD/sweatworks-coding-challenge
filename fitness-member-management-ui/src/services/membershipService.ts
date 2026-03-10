export class MembershipService {
  private constructor() {}

  static create(): MembershipService {
    return new MembershipService();
  }

  static createNull(): MembershipService {
    return new MembershipService();
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
}
