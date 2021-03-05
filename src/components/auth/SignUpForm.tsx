import { useRegisterForm } from '@/forms'
import { SubmitEvent } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const {
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
    } = useRegisterForm()
    return () => (
      <form class='p-5' onSubmit={(e: Event) => onSubmit(e as SubmitEvent)}>
        <div class={[emailError.value ? 'mb-1' : 'mb-6']}>
          <label class='block mb-2 text-sm font-bold text-gray-700' for='email'>
            Email
          </label>
          <input
            type='text'
            placeholder='Email'
            class={[
              'w-full px-3 py-2 text-sm mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline',
              emailError.value ? 'border-red-500' : ''
            ]}
            v-model={email.value}
            onBlur={emailBlur}
            autocomplete='email'
          />
          {emailError.value && <p class='mb-2 text-xs italic text-red-500'>{emailError.value}</p>}
        </div>
        <div class={[nameError.value ? 'mb-1' : 'mb-6']}>
          <label class='block mb-2 text-sm font-bold text-gray-700' for='name'>
            Name
          </label>
          <input
            type='text'
            placeholder='Name'
            class={[
              'w-full px-3 py-2 text-sm mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline',
              nameError.value ? 'border-red-500' : ''
            ]}
            v-model={name.value}
            onBlur={nameBlur}
            autocomplete='name'
          />
          {nameError.value && <p class='mb-2 text-xs italic text-red-500'>{nameError.value}</p>}
        </div>
        <div class={[passwordError.value ? 'mb-1' : 'mb-6']}>
          <label class='block mb-2 text-sm font-bold text-gray-700' for='password'>
            Password
          </label>
          <input
            type='password'
            placeholder='********************'
            class={[
              'w-full px-3 py-2 text-sm mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline',
              passwordError.value ? 'border-red-500' : ''
            ]}
            v-model={password.value}
            onBlur={passwordBlur}
            autocomplete='current-password'
          />
          {passwordError.value && <p class='mb-2 text-xs italic text-red-500'>{passwordError.value}</p>}
        </div>
        <div class={[passwordConfirmationError.value ? 'mb-1' : 'mb-6']}>
          <label class='block mb-2 text-sm font-bold text-gray-700' for='password'>
            Confirmation
          </label>
          <input
            type='password'
            placeholder='********************'
            class={[
              'w-full px-3 py-2 text-sm mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline',
              passwordConfirmationError.value ? 'border-red-500' : ''
            ]}
            v-model={passwordConfirmation.value}
            onBlur={passwordConfirmationBlur}
            autocomplete='current-password'
          />
          {passwordConfirmationError.value && (
            <p class='mb-2 text-xs italic text-red-500'>{passwordConfirmationError.value}</p>
          )}
        </div>

        <div class='text-center'>
          <button
            type='submit'
            class='w-full px-3 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50'
            disabled={isSubmitting.value}
          >
            <span>Register Account</span>
            <svg focusable='false' class='inline-block w-4 h-4 ml-2' viewBox='0 0 24 24'>
              <path
                d='M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </div>
      </form>
    )
  }
})
