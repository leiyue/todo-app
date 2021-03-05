import { LayoutComponent } from '@/types'
import findLast from 'lodash-es/findLast'
import get from 'lodash-es/get'
import { defineComponent, FunctionalComponent, h, PropType } from 'vue'
import { useRoute } from 'vue-router'

// type LayoutComponent = DefineComponent<{}, {}, any>

interface LayoutProps {
  fallback?: string
  layouts: Record<string, LayoutComponent>
}

const Layout: FunctionalComponent<LayoutProps> = ({ fallback, layouts }, { slots }) => {
  const route = useRoute()
  return () => {
    const found = findLast(route.matched, (route) => 'layout' in route.meta)
    const componentName = found ? get(found, 'meta.layout') : fallback
    if (componentName) {
      const Layout = get(layouts, componentName)
      if (Layout) {
        return h(Layout, null, slots)
      }
    }
    return slots.default && typeof slots.default === 'function' ? slots.default() : null
  }
}

export default defineComponent({
  name: 'Layout',
  props: {
    fallback: {
      type: String,
      default: 'default'
    },
    layouts: {
      type: Object as PropType<Record<string, LayoutComponent>>,
      required: true
    }
  },
  setup: Layout
})
