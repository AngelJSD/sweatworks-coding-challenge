import { useQuery } from "@tanstack/react-query";
import { useServices } from "../contexts/servicesContext";
import { Membership } from "../schemas/membership.schema";


export function useGetAllMembershipsByMemberId(memberId: string | undefined) {
  const { membershipService } = useServices();

  return useQuery<Array<Membership>>({
    queryKey: ['memberships', memberId],
    queryFn: async () => membershipService.getAllMembershipsByMemberId(memberId),
    enabled: memberId !== undefined,
  });
}
