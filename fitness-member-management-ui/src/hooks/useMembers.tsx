import { useMutation } from "@tanstack/react-query";
import { useServices } from "../contexts/servicesContext";
import { CreateMemberInput } from "../schemas/member.schema";

export function useCreateMember() {
  const { memberService } = useServices();
  return useMutation({
    mutationFn: async ({data}: {data: CreateMemberInput; onSuccess?: () => void}) => memberService.createMember(data),
    onSuccess: (_data, {onSuccess}) => {
      onSuccess?.();
    }
  })
}
