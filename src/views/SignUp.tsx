import SignUpForm from '@/components/auth/SignUpForm'
import { Route } from '@/router'
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  setup() {
    return () => (
      <div class='p-10 mx-auto xs:p-0 lg:w-full lg:max-w-xl'>
        <h1 class='mb-5 text-2xl font-bold text-center'>Register</h1>
        <div class='w-full bg-white divide-y divide-gray-200 rounded-lg shadow'>
          <div class='p-5'>
            <SignUpForm />
          </div>
          <div class='p-5'>
            <div class='text-center'>
              <RouterLink
                class='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                to={{ name: Route.LOGIN }}
              >
                Already have an account? <br />
                Login!
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
