import LoginForm from '@/components/auth/LoginForm'
import { Route } from '@/router'
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  setup() {
    return () => (
      <div class='p-10 mx-auto xs:p-0 md:w-full lg:max-w-md'>
        <h1 class='mb-5 text-2xl font-bold text-center'>Login</h1>
        <div class='w-full bg-white divide-y divide-gray-200 rounded-lg shadow'>
          <div class='p-5'>
            <LoginForm />
          </div>
          <div class='py-5'>
            <div class='text-center'>
              <RouterLink
                class='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                to={{ name: Route.REGISTER }}
              >
                Don't have an account? <br />
                Register!
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
