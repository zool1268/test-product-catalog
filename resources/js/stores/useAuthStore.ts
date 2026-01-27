
import type { AxiosError } from "axios"
import { defineStore } from "pinia"
import { useQuasar } from "quasar"
import { computed, ref } from "vue"

import type { User } from "@/types"

import api from "../utils/api"
import { ApiError } from "../utils/api"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export const useAuthStore = defineStore('auth', () => {
  const $q = useQuasar()

  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref<boolean>(false)

  const isAuthenticated = computed<boolean>(() => !!token.value && !!user.value)

  async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    loading.value = true

    try {
      const response = await api.post<AuthResponse>('/login', credentials)
      const { access_token, user: userData } = response.data

      token.value = access_token
      user.value = userData

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('user', JSON.stringify(userData))

      $q.notify({
        type: 'positive',
        message: 'Вы успешно вошли в систему',
        position: 'bottom'
      })

      return response.data

    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>
      const message = axiosError.response?.data?.message || 'Ошибка входа'

      $q.notify({
        type: 'negative',
        message,
        position: 'bottom'
      })

      throw error

    } finally {
      loading.value = false
    }
  }

  async function logout(): Promise<void> {
    loading.value = true
    try {
      if (token.value) {
        await api.post('/logout')
      }
    } catch (error: unknown) {
      console.error('Ошибка при выходе:', error)
    } finally {
      loading.value = true
      token.value = null
      user.value = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')

      $q.notify({
        type: 'info',
        message: 'Вы вышли из системы',
        position: 'bottom'
      })
    }
  }

  async function checkAuth(): Promise<boolean> {
    if (!token.value) return false

    try {
      const response = await api.get<User>('/user')
      user.value = response.data
      return true
    } catch {
      // Токен недействителен
      token.value = null
      user.value = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,

    login,
    logout,
    checkAuth,
  }
})
