import { z } from 'zod';

export const MemberSchema = z.object({
  id: z.uuidv4().nonoptional(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email().toLowerCase(),
  age: z.number().min(0).max(120),
  createDate: z.date().nonoptional(),
  updateDate: z.date().nonoptional(),
});

export const CreateMemberSchema = MemberSchema.omit({ id: true, createDate: true, updateDate: true });

export type Member = z.infer<typeof MemberSchema>;
export type CreateMemberInput = z.infer<typeof CreateMemberSchema>;
