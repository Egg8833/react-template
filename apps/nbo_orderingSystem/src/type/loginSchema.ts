import {z} from 'zod';

export const schema = z.object({
  account: z.string().min(1,{message: 'Account is required'}),
  password: z.string().min(1,{message: 'FlowNo is required'}),
  rememberMe: z.boolean()
});

export type FormLoginData = z.infer<typeof schema>;

export const defaultValues: FormLoginData = {
  account: '',
  password: '',
  rememberMe: true,
};