import { getFreshResponse } from "../helpers/testHelper";

export type PlanServiceNullData = {
  getAllPlans?: Promise<any> | any;
}

export class PlanService {
  private constructor() {}

  static create(): PlanService {
    return new PlanService();
  }

  static createNull(data: PlanServiceNullData = {}): PlanService {
    const planService = new PlanService();

    planService.getAllPlans = async () => {
      if (data.getAllPlans !== undefined) {
        return data.getAllPlans instanceof Promise
          ? getFreshResponse(await data.getAllPlans)
          : getFreshResponse(data.getAllPlans);
      }
      return Promise.resolve({});
    }

    return planService;
  }

  async getAllPlans() {
    const res = await fetch(
      `http://localhost:3000/api/v1/plans/list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Error getting all plans");
    }
    return res.json();
  }
}