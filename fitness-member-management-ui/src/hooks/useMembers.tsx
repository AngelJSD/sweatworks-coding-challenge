import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServices } from "../contexts/servicesContext";
import { CreateMemberInput, Member } from "../schemas/member.schema";

export function useCreateMember() {
  const { memberService } = useServices();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({data}: {data: CreateMemberInput; onSuccess?: () => void}) => memberService.createMember(data),
    onSuccess: (_data, {onSuccess}) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      onSuccess?.();
    }
  });
}

export function useGetAllMembers() {
  const { memberService } = useServices();
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => memberService.getAllMembers(),
  });
}

export function useGetMemberById(memberId: string | undefined) {
  const { memberService } = useServices();

  return useQuery<Member>({
    queryKey: ['member', memberId],
    queryFn: async () => memberService.getMemberById(memberId),
    enabled: memberId !== undefined,
  });
}
