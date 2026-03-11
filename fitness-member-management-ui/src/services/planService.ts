export class PlanService {
  private constructor() {}

  static create(): PlanService {
    return new PlanService();
  }

  static createNull(): PlanService {
    return new PlanService();
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