import TodoForm from '@/components/todo/TodoForm'
import TodoItem from '@/components/todo/TodoItem'
import { Todo, useGetManyTodosQuery, useUpdateUserOneTodoMutation } from '@/generated/graphql'
import { useAuthStore } from '@/hooks'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { getUser: currentUser } = useAuthStore()
    const context = computed(() => ({ additionalTypenames: ['Todo'] }), [])
    const result = useGetManyTodosQuery({
      variables: {
        where: { ownerId: { equals: currentUser.value?.id }, done: { equals: false } },
        orderBy: { createdAt: 'desc' }
      },
      context
    })
    const { fetching, error, data } = result
    const refresh = () => result.executeQuery({ requestPolicy: 'network-only' })
    const { executeMutation: updateUserOneTodo } = useUpdateUserOneTodoMutation()
    const finish = async (todo: Todo) => {
      const { id, done } = todo
      return await updateUserOneTodo({
        where: { id },
        data: {
          done: {
            set: !done
          }
        }
      })
    }
    return () => (
      <>
        <div class='pl-3'>
          {fetching.value ? (
            <div class='flex justify-between mb-4'>
              <span>Loading...</span>
            </div>
          ) : error.value ? (
            <div class='flex justify-between mb-4'>
              <span>Oh no... {error.value}</span>
            </div>
          ) : data.value && data.value.todos && data.value.todos.length ? (
            data.value.todos.map((todo) => (
              <TodoItem item={todo as Todo} buttonText={'Done'} onClick={() => finish(todo)} />
            ))
          ) : (
            <div class='flex justify-between mb-4'>
              <span>Empty List</span>
            </div>
          )}
        </div>
        <div class='mb-4'>
          <TodoForm />
        </div>
        <div class='flex'>
          <button
            class='px-3 py-1 mx-auto text-white bg-green-600 border border-green-600 rounded-md select-none'
            onClick={refresh}
          >
            Refresh
          </button>
        </div>
      </>
    )
  }
})
