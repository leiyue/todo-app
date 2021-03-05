import { LoginInput, useLoginMutation } from '@/generated/graphql'
import { useAuthStore } from '@/hooks'
import { Route } from '@/router'
import { SubmitEvent } from '@/types'
import { useField, useForm } from 'vee-validate'
import { computed, ComputedRef, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'

export interface LoginForm {
  email: Ref<unknown>
  emailError: ComputedRef<string | undefined>
  emailBlur: (e?: Event | undefined) => void
  password: Ref<unknown>
  passwordError: ComputedRef<string | undefined>
  passwordBlur: (e?: Event | undefined) => void
  isSubmitting: Ref<boolean>
  onSubmit: (e?: SubmitEvent | undefined) => Promise<void>
  tooManyAttempts: ComputedRef<boolean>
}

const validationSchema = yup.object({
  email: yup.string().trim().required('Required field'),
  password: yup.string().trim().required('Required field')
})

export const useLoginForm = (): LoginForm => {
  const router = useRouter()
  const toast = useToast()
  const { setAuthState } = useAuthStore()
  const { executeMutation: login } = useLoginMutation()
  const { handleSubmit, isSubmitting, submitCount } = useForm({ validationSchema })

  const { errorMessage: emailError, value: email, handleBlur: emailBlur } = useField('email')
  const { errorMessage: passwordError, value: password, handleBlur: passwordBlur } = useField('password')

  const tooManyAttempts = computed((): boolean => submitCount.value >= 5)

  const onSubmit = handleSubmit(async (values) => {
    const { email, password } = values
    login({ email, password } as LoginInput)
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          toast.error(error.message)
          return false
        }
        if (data) {
          setAuthState(data.login)
          toast.success('success')
          router.push({ name: Route.ROOT, query: { t: new Date().getTime() } })
        }
      })
      .catch(console.error)
  })

  return {
    email,
    emailError,
    emailBlur,
    password,
    passwordError,
    passwordBlur,
    isSubmitting,
    tooManyAttempts,
    onSubmit
  }
}
