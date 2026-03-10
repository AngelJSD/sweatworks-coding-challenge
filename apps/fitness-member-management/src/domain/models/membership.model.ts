import { z } from 'zod';

export const MembershipSchema = z.object({
  id: z.uuidv4().nonoptional(),
  memberId: z.uuidv4().nonoptional(),
  planId: z.uuidv4().nonoptional(),
  startDate: z.date().nonoptional(),
  endDate: z.date().nonoptional(),
  cancelDate: z.date(),
  updateDate: z.date().nonoptional(),
  createDate: z.date().nonoptional(),
});

export const CreateMembershipSchema = MembershipSchema.omit({ updateDate: true, createDate: true, cancelDate: true });

export type Membership = z.infer<typeof MembershipSchema>;
export type CreateMembershipInput = z.infer<typeof CreateMembershipSchema>;

