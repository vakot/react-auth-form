import { Button } from '@/components/Button'
import { FormItem } from '@/components/FormItem'
import { Input } from '@/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Min password length is 8 characters')
    .max(64, 'Max password length is 64 characters')
    .matches(/\d/, 'At least one digit')
    .matches(/[A-Z]/, 'At least one uppercase letter')
    .matches(/[a-z]/, 'At least one lowercase letter')
})

export const AuthForm: React.FC = () => {
  const methods = useForm<{
    email: string
    password: string
  }>({
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback<
    SubmitHandler<{
      email: string
      password: string
    }>
  >((data) => {
    console.log(data)
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Sign up</h2>

        <FormItem name="email">
          <Input type="email" placeholder="Enter your email" />
        </FormItem>

        <FormItem
          name="password"
          showError={false}
          rules={[
            {
              valid: (password: string = '') => password.length >= 8 && !password.includes(' '),
              message: '8 character or more (no spaces)'
            },
            {
              valid: (password: string = '') => /[A-Z]/.test(password) && /[a-z]/.test(password),
              message: 'Uppercase and lowercase letters'
            },
            {
              valid: (password: string = '') => /\d/.test(password),
              message: 'At least one digit'
            }
          ]}>
          <Input type="password" placeholder="Create your password" />
        </FormItem>

        <Button type="submit">Sign up</Button>
      </form>
    </FormProvider>
  )
}
