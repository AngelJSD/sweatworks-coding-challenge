import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServices } from "../contexts/servicesContext";
import { CancelMembershipInput, CreateMembershipInput, Membership } from "../schemas/membership.schema";

export function useCreateMembership() {
  const { membershipService } = useServices();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({data}: {data: CreateMembershipInput; onSuccess?: () => void}) => membershipService.createMembership(data),
    onSuccess: (_data, {onSuccess}) => {
      queryClient.invalidateQueries({ queryKey: ['memberships'] });
      onSuccess?.();
    }
  });
}

export function useGetAllMembershipsByMemberId(memberId: string | undefined) {
  const { membershipService } = useServices();

  return useQuery<Array<Membership>>({
    queryKey: ['memberships', memberId],
    queryFn: async () => membershipService.getAllMembershipsByMemberId(memberId),
    enabled: memberId !== undefined,
  });
}

export function useCancelMembership() {
  const { membershipService } = useServices();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({data}: {data: CancelMembershipInput; onSuccess?: () => void}) => membershipService.cancelMembership(data),
    onSuccess: (_data, {onSuccess}) => {
      queryClient.invalidateQueries({ queryKey: ['memberships'] });
      onSuccess?.();
    }
  });
}
