import { z } from 'zod';

export const exampleFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  age: z.number().min(18, { message: 'You must be at least 18 years old' }),
});

export type ExampleFormData = z.infer<typeof exampleFormSchema>;
