import { z } from 'zod';

export const PlanSchema = z.object({
  id: z.uuidv4().nonoptional(),
  name: z.string().min(2),
  description: z.string().min(2),
  updateDate: z.date().nonoptional(),
  createDate: z.date().nonoptional(),
});

export type Plan = z.infer<typeof PlanSchema>;
