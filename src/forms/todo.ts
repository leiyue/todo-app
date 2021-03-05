import { CreateUserOneTodoMutationVariables, useCreateUserOneTodoMutation } from '@/generated/graphql'
import { useAuthStore } from '@/hooks'
import { SubmitEvent } from '@/types'
import { useField, useForm } from 'vee-validate'
import { ComputedRef, Ref } from 'vue'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'

export interface TodoForm {
  title: Ref<unknown>
  titleError: ComputedRef<string | undefined>
  titleBlur: (e?: Event | undefined) => void
  isSubmitting: Ref<boolean>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (e?: SubmitEvent | undefined) => Promise<void>
}

const validationSchema = yup.object({
  title: yup.string().trim()
})

export const useTodoForm = (): TodoForm => {
  const toast = useToast()
  const { getUser: currentUser } = useAuthStore()
  const { executeMutation: createUserOneTodo } = useCreateUserOneTodoMutation()
  const { handleSubmit, isSubmitting } = useForm({ validationSchema })

  const { errorMessage: titleError, value: title, handleBlur: titleBlur } = useField('title')

  const onSubmit = handleSubmit(async (values) => {
    const { title } = values
    if (title) {
      createUserOneTodo(
        {
          data: { title, owner: { connect: { id: currentUser.value.id } } }
        } as CreateUserOneTodoMutationVariables,
        { additionalTypenames: ['Todo'] }
      )
        .then(({ data, error }) => {
          if (error) {
            toast.error(error.message)
            console.error(error)
            return false
          }
          toast.success('success')
        })
        .catch(console.error)
      return true
    }
    toast.warning('title required')
  })

  return {
    title,
    titleError,
    titleBlur,
    isSubmitting,
    onSubmit
  }
}
