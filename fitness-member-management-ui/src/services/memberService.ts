export type MemberServiceNullData = {
  createMember?: Promise<any> | any;
}

export const getFreshResponse = (response: any): any => {
  return JSON.parse(JSON.stringify(response));
};

export class MemberService {
  private constructor() {}

  static create(): MemberService {
    return new MemberService();
  }

  static createNull(data: MemberServiceNullData = {}): MemberService {
    const memberService = new MemberService();

    memberService.createMember = async () => {
      if (data.createMember !== undefined) {
        return data.createMember instanceof Promise
          ? getFreshResponse(await data.createMember)
          : getFreshResponse(data.createMember);
      }
      return Promise.resolve({})
    }

    return memberService;
  }

  async createMember(data: any) {
    const res = await fetch(
      `http://localhost:3000/api/v1/members/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      throw new Error("Error creating a new member");
    }
    return res.json();
  }
}
