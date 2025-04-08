import {z} from 'zod';
import { patterns } from '@/constants';

export const schema = z.object({
  account: z.string().min(1,{message: 'Account is required'}),
  flowNo: z.string().min(1,{message: 'FlowNo is required'}),
  name: z.string().min(2,{message: 'Name must be at least 2 characters long'}).max(100),
  email: z.string().min(1,{message: 'Email is required'}).regex(patterns.email, {message: 'Invalid email format'}),
  orderType: z.string().min(1,{message: 'OrderType is required'}),
  checkName: z.boolean()

});

export type FormData = z.infer<typeof schema>;

export const defaultValues: FormData = {
  account: '',
  flowNo: '',
  name: '',
  email: '',
  orderType: 'ROD',
  checkName: true
};