import urql from '@urql/vue'
import { App } from 'vue'
import toast from 'vue-toastification'
import { head } from './head'
import { toastOptions } from './toast'
import { urqlOptions } from './urql'

const install = (app: App): void => {
  app.use(head)
  app.use(urql, urqlOptions)
  app.use(toast, toastOptions)
}

export default { install }
