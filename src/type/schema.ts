import {z} from 'zod';
import { patterns } from '@/constants';

export const schema = z.object({
  name: z.string().min(2,{message: 'Name must be at least 2 characters long'}).max(100),
  email: z.string().min(1,{message: 'Email is required'}).regex(patterns.email, {message: 'Invalid email format'}),

});

export type FormData = z.infer<typeof schema>;