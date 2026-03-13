import { z } from 'zod';

export const MemberSchema = z.object({
  id: z.uuidv4(),
  firstName: z.string().min(2, { error: 'Please enter at least 2 characters' }),
  lastName: z.string().min(2, { error: 'Please enter at least 2 characters' }),
  email: z.email().toLowerCase(),
  age: z.number().min(0, { error: 'Please enter a value greater than 0' }).max(120, { error: 'Please enter a value lower than 120' }),
  createDate: z.date(),
  updateDate: z.date(),
});

export const CreateMemberSchema = MemberSchema.omit({ id: true, createDate: true, updateDate: true });

export type Member = z.infer<typeof MemberSchema>;
export type CreateMemberInput = z.infer<typeof CreateMemberSchema>;
