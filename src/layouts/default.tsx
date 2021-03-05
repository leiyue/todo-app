import { defineComponent } from 'vue'

export default defineComponent({
  setup(_props, { slots }) {
    return () => <> {slots.default && slots.default()}</>
  }
})
