import { useAuthStore } from '@/hooks'
import { Route } from '@/router'
import { defineComponent } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default defineComponent({
  setup(_props, { slots }) {
    const toast = useToast()
    const { logout } = useAuthStore()
    const { currentRoute: route, push } = useRouter()

    const signOut = () => {
      logout()
      toast.success('success')
      push({ name: Route.LOGIN })
    }
    return () => (
      <div class='max-w-screen-sm mx-8 mt-8 overflow-hidden border rounded-lg sm:mx-auto'>
        <div class='flex justify-between px-6 py-4 text-white bg-green-500'>
          <div>
            <RouterLink
              class={[
                'px-3 py-1 font-bold text-white rounded-md select-none',
                route.value.name === Route.TODO ? 'bg-green-600' : ''
              ]}
              to={{ name: Route.TODO }}
            >
              Todo
            </RouterLink>
            <RouterLink
              class={[
                'px-3 py-1 font-bold text-white rounded-md select-none',
                route.value.name === Route.DONE ? 'bg-green-600' : ''
              ]}
              to={{ name: Route.DONE }}
            >
              Done
            </RouterLink>
          </div>
          <div class='flex'>
            {/* <div class='flex items-center mr-4'>
              // mdi:check-circle-outline
              <svg class='inline-block w-5 fill-current' viewBox='0 0 24 24'>
                <path
                  d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8l-1.41-1.42z'
                  fill='currentColor'
                ></path>
              </svg>
              <span class='ml-1'>1</span>
            </div>

            <div class='flex items-center'>
              // mdi:check-circle
              <svg class='inline-block w-5' viewBox='0 0 24 24'>
                <path
                  d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
                  fill='currentColor'
                ></path>
              </svg>
              <span class='ml-1'>1</span>
            </div> */}

            <div class='flex items-center'>
              <a
                href='javascript: void 0'
                class='px-3 py-1 font-bold text-white rounded-md select-none'
                onClick={signOut}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
        <div class='px-6 py-4 transition-all duration-300'>{slots.default && slots.default()}</div>
      </div>
    )
  }
})
