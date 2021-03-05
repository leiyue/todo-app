import { PluginOptions, POSITION } from 'vue-toastification'

export const toastOptions: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  newestOnTop: true,
  maxToasts: 10,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  timeout: 3000
}
