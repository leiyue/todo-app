import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/config'
import { SignUpInput, useSignUpMutation } from '@/generated/graphql'
import { useAuthStore } from '@/hooks'
import { Route } from '@/router'
import { SubmitEvent } from '@/types'
import { useField, useForm } from 'vee-validate'
import { ComputedRef, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'

export interface RegisterForm {
  email: Ref<unknown>
  emailError: ComputedRef<string | undefined>
  emailBlur: (e?: Event | undefined) => void
  name: Ref<unknown>
  nameError: ComputedRef<string | undefined>
  nameBlur: (e?: Event | undefined) => void
  password: Ref<unknown>
  passwordError: ComputedRef<string | undefined>
  passwordBlur: (e?: Event | undefined) => void
  passwordConfirmation: Ref<unknown>
  passwordConfirmationError: ComputedRef<string | undefined>
  passwordConfirmationBlur: (e?: Event | undefined) => void
  isSubmitting: Ref<boolean>
  onSubmit: (e?: SubmitEvent | undefined) => Promise<void>
}

const validationSchema = yup.object({
  email: yup.string().trim().required('Required field').email(),
  name: yup.string().trim(),
  password: yup
    .string()
    .trim()
    .required('Required field')
    .min(PASSWORD_MIN_LENGTH, `Min length must be more as ${PASSWORD_MIN_LENGTH} symbols`)
    .max(PASSWORD_MAX_LENGTH, `Max length must be less as ${PASSWORD_MAX_LENGTH} symbols`)
    .matches(/[\d]/, 'Password must contain at least one number')
    .matches(/[A-Za-z]/, 'Password must contain at least one letter')
    .matches(/[#?!@$%^&*-]/, 'Password must contain at least one special character'),
  passwordConfirmation: yup
    .string()
    .trim()
    .required('Required field')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

export const useRegisterForm = (): RegisterForm => {
  const router = useRouter()
  const toast = useToast()
  const { setAuthState } = useAuthStore()
  const { executeMutation: signUp } = useSignUpMutation()
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema
  })

  const { errorMessage: emailError, value: email, handleBlur: emailBlur } = useField('email')
  const { errorMessage: nameError, value: name, handleBlur: nameBlur } = useField('name')
  const { errorMessage: passwordError, value: password, handleBlur: passwordBlur } = useField('password')
  const {
    errorMessage: passwordConfirmationError,
    value: passwordConfirmation,
    handleBlur: passwordConfirmationBlur
  } = useField('passwordConfirmation')

  const onSubmit = handleSubmit(async (values) => {
    const { email, name, password } = values
    signUp({ email, name, password } as SignUpInput)
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          toast.error(error.message)
          return false
        }
        if (data) {
          setAuthState(data.signUp)
          router.push({ name: Route.ROOT, query: { t: new Date().getTime() } })
          toast.success('success')
        }
      })
      .catch(console.error)
  })

  return {
    email,
    emailError,
    emailBlur,
    name,
    nameError,
    nameBlur,
    password,
    passwordError,
    passwordBlur,
    passwordConfirmationError,
    passwordConfirmation,
    passwordConfirmationBlur,
    isSubmitting,
    onSubmit
  }
}
