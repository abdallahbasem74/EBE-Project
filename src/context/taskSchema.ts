import { z } from 'zod';

export const taskSchema = z.object({
  text: z.string().min(3, 'Task must be at least 3 characters').max(100, 'Task is too long'),
  priority: z.enum(['Low', 'Medium', 'High']),
});

export type TaskFormData = z.infer<typeof taskSchema>;