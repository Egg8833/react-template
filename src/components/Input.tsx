import {useForm} from 'react-hook-form'
import {TextField} from '@mui/material'
import {zodResolver} from '@hookform/resolvers/zod'
import {FormData} from '@/type/schema'
import {schema} from '@/type/schema'
const Input = () => {
  const {
    register,
    formState: {errors},
  } = useForm<FormData>({mode: 'all', resolver: zodResolver(schema)})
  return (
    <>
      <TextField
        {...register('name')}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register('email', {required: true})}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
    </>
  )
}

export default Input
