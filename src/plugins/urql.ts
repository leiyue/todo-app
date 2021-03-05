import { API_ENDPOINT } from '@/config'
import { getToken } from '@/hooks/auth'
import { ClientOptions } from '@urql/vue'

export const urqlOptions: ClientOptions = {
  url: API_ENDPOINT,
  fetchOptions: () => {
    const token = getToken.value
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  }
}
