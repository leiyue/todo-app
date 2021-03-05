import { defineComponent } from 'vue'

export default defineComponent({
  setup(_props, { slots }) {
    return () => (
      <div class='flex flex-col justify-center min-h-screen bg-gray-100 sm:py-12'>
        {slots.default && slots.default()}
      </div>
    )
  }
})
