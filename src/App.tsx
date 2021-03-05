import Layout from '@/components/layout'
import { TITLE } from '@/config'
import AuthLayout from '@/layouts/auth'
import DefaultLayout from '@/layouts/default'
import TodoLayout from '@/layouts/todo'
import { LayoutComponent } from '@/types'
import { useHead } from '@vueuse/head'
import { computed, defineComponent, KeepAlive, VNode } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    useHead({
      title: TITLE,
      meta: [
        {
          name: `description`,
          content: computed(() => 'Todo App Test')
        }
      ]
    })
    const layouts: Record<string, LayoutComponent> = { auth: AuthLayout, todo: TodoLayout, default: DefaultLayout }
    return () => (
      <Layout layouts={layouts}>
        <RouterView
          v-slots={{
            default: ({ Component }: { Component: VNode }) => <KeepAlive>{Component}</KeepAlive>
          }}
        />
      </Layout>
    )
  }
})
