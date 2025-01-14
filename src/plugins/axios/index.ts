// eslint-disable-next-line import/no-cycle
import { store } from '@/store'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((request) => {
  if (store.state.auth.accessToken) {
    // eslint-disable-next-line no-param-reassign
    request.headers.Authorization = `Bearer ${store.state.auth.accessToken}`
  }

  return request
})

export default apiClient
