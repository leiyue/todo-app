import App from '@/App'
import hooks from '@/hooks'
import plugins from '@/plugins'
import { router } from '@/router'
import { createApp } from 'vue'
import 'windi.css'
import './App.scss'

createApp(App).use(plugins).use(hooks).use(router).mount('#app')
