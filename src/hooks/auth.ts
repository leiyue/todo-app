import { AuthPayload, User } from '@/generated/graphql'
import { useSessionStorage } from '@vueuse/core'
import { computed, ComputedRef, Ref } from 'vue'

export interface AuthState {
  user: User
  token: string | null
}

export interface AuthStore {
  state: Ref<AuthPayload>
  setAuthState: (authPayload: AuthPayload) => AuthPayload
  isAuthenticated: ComputedRef<boolean>
  getToken: ComputedRef<string | null>
  getUser: ComputedRef<User>
  logout: () => void
}

const state: Ref<AuthPayload> = useSessionStorage('session', { token: null, user: undefined })
export const setAuthState = (authPayload: AuthPayload): AuthPayload => Object.assign(state.value, authPayload)
export const isAuthenticated: ComputedRef<boolean> = computed(() => !!state.value.token)
export const getToken: ComputedRef<string | null> = computed(() => state.value.token)
export const getUser: ComputedRef<User> = computed(() => state.value.user)
export const logout = (): void => {
  sessionStorage.removeItem('auth-session')
}

export const authStore: AuthStore = {
  state,
  setAuthState,
  isAuthenticated,
  getToken,
  getUser,
  logout
}
