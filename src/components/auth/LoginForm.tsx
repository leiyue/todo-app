import { useLoginForm } from '@/forms'
import { SubmitEvent } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const {
      email,
      emailError,
      emailBlur,
      password,
      passwordError,
      passwordBlur,
      isSubmitting,
      tooManyAttempts,
      onSubmit
    } = useLoginForm()

    email.value = 'leiyue@github.com'
    password.value = 'pwd@123'

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
        <div class='text-center'>
          <button
            type='submit'
            class='w-full px-3 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50'
            disabled={isSubmitting.value || tooManyAttempts.value}
          >
            <span class='inline-block mr-2'>{isSubmitting.value ? 'Submitting' : 'Login'}</span>
            <svg
              focusable='false'
              class={['w-4 h-4', isSubmitting.value ? 'hidden' : 'inline-block']}
              viewBox='0 0 1024 1024'
            >
              <defs></defs>
              <path
                d='M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7c-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8c7-8.5 14.5-16.7 22.4-24.5c32.6-32.5 70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8c47.9 0 94.3 9.3 137.9 27.8c42.2 17.8 80.1 43.4 112.7 75.9c32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8c-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 0 1 520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 0 1 270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5c-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 0 1 0 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </div>
      </form>
    )
  }
})
