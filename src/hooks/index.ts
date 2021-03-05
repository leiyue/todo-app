import { App, inject, InjectionKey } from 'vue'
import { AuthStore, authStore } from './auth'

const AuthSymbol: InjectionKey<AuthStore> = Symbol('Auth')

const install = (app: App): void => {
  app.provide(AuthSymbol, authStore)
}

export const useAuthStore = (): AuthStore => inject(AuthSymbol) as AuthStore

export default { install, useAuthStore }
