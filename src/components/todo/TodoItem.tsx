import { Todo } from '@/generated/graphql'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Todo>,
      required: true
    },
    buttonText: {
      type: String,
      default: 'Done'
    },
    onClick: {
      type: Function,
      default: () => void 0
    }
  },
  setup(props) {
    return () => (
      <div class='flex justify-between mb-4'>
        <span>{props.item.title}</span>
        <button
          class='px-3 py-1 text-sm text-gray-700 border rounded-md select-none'
          onClick={(e: Event) => props.onClick(e)}
        >
          {props.buttonText}
        </button>
      </div>
    )
  }
})
