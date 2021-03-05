import { isAuthenticated } from '@/hooks/auth'
import NProgress from 'nprogress'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export enum Route {
  ROOT = 'ROOT',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  TODO = 'TODO',
  DONE = 'DONE'
}

const publicRoutes: Route[] = [Route.LOGIN, Route.REGISTER]

export const history = createWebHistory()

export const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: Route.ROOT,
    redirect: { name: Route.TODO }
  },
  {
    path: '/login',
    name: Route.LOGIN,
    component: () => import('@/views/Login'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/signup',
    name: Route.REGISTER,
    component: () => import('@/views/SignUp'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/todo',
    name: Route.TODO,
    component: () => import('@/views/Todo'),
    meta: {
      layout: 'todo'
    }
  },
  {
    path: '/done',
    name: Route.DONE,
    component: () => import('@/views/Done'),
    meta: {
      layout: 'todo'
    }
  }
]

export const router = createRouter({
  history,
  routes
})

router.beforeEach((to, _from, next) => {
  NProgress.start()
  if (publicRoutes.includes(to.name as Route) || isAuthenticated.value) {
    next()
  } else {
    next({ name: Route.LOGIN })
  }
})

router.afterEach(() => {
  setTimeout(() => NProgress.done(), 200)
})
