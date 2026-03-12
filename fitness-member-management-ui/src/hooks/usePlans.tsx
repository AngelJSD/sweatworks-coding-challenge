import { useQuery } from "@tanstack/react-query";
import { useServices } from "../contexts/servicesContext";
import { Plan } from "../schemas/plan.schema";

export function useGetAllPlans() {
  const { planService } = useServices();
  return useQuery<Array<Plan>>({
    queryKey: ['plans'],
    queryFn: async () => planService.getAllPlans(),
  });
}
