import { useTodoForm } from '@/forms'
import { SubmitEvent } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { title, titleBlur, isSubmitting, onSubmit } = useTodoForm()
    return () => (
      <form
        onSubmit={async (e: Event) => {
          await onSubmit(e as SubmitEvent)
          title.value = ''
        }}
        class='flex rounded-md'
      >
        <input
          type='text'
          placeholder='Title'
          class={['border rounded-none rounded-l-md px-3 py-1.5 flex-1 focus:outline-none']}
          v-model={title.value}
          onBlur={titleBlur}
          autocomplete='title'
        />
        <button
          type='submit'
          class='px-4 text-white bg-green-600 border border-green-600 rounded-none select-none rounded-r-md disabled:opacity-50'
          disabled={isSubmitting.value}
        >
          Add
        </button>
      </form>
    )
  }
})
