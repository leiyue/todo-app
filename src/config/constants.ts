export const DEBUG: string = import.meta.env.VITE_DEBUG ? true : false
export const TITLE: string = import.meta.env.VITE_TITLE ? String(import.meta.env.VITE_TITLE) : 'Todo App'
export const API_ENDPOINT: string = import.meta.env.VITE_API_ENDPOINT
  ? String(import.meta.env.VITE_API_ENDPOINT)
  : 'Todo App'
export const PASSWORD_MIN_LENGTH: number = import.meta.env.PASSWORD_MIN_LENGTH
  ? parseInt(String(import.meta.env.PASSWORD_MIN_LENGTH), 10)
  : 7
export const PASSWORD_MAX_LENGTH: number = import.meta.env.PASSWORD_MAX_LENGTH
  ? parseInt(String(import.meta.env.PASSWORD_MAX_LENGTH), 10)
  : 32

const variableName = [
  'APP_NAME',
  'VITE_TITLE',
  'VITE_API_ENDPOINT',
  'VITE_PROXY_TARGET',
  'VITE_USERNAME_MIN_LENGTH',
  'VITE_USERNAME_MAX_LENGTH',
  'VITE_PASSWORD_MIN_LENGTH',
  'VITE_PASSWORD_MAX_LENGTH'
]

DEBUG && console.log(Object.fromEntries(variableName.map((key) => [key, import.meta.env[key]])))
