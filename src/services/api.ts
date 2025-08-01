import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiResponse, AppError, ERROR_CODES, STORAGE_KEYS, TIME_CONSTANTS } from '../constants'
import { toast } from 'react-hot-toast'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
const API_TIMEOUT = 30000

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          })
          
          const { accessToken } = response.data
          localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken)
          
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh token failed, redirect to login
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
        window.location.href = '/login'
      }
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra'
    toast.error(errorMessage)
    
    return Promise.reject(error)
  }
)

// Generic API methods
export const api = {
  // GET request
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get(url, config)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // POST request
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post(url, data, config)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // PUT request
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put(url, data, config)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // PATCH request
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.patch(url, data, config)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // DELETE request
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete(url, config)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // Upload file
  upload: async <T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await apiClient.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        },
      })
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
}

// Error handler
function handleApiError(error: any): AppError {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response
    return {
      code: data?.code || `HTTP_${status}`,
      message: data?.message || `Lỗi ${status}`,
      details: data?.details,
      timestamp: new Date(),
    }
  } else if (error.request) {
    // Network error
    return {
      code: ERROR_CODES.NETWORK_ERROR,
      message: 'Không thể kết nối đến máy chủ',
      details: error.request,
      timestamp: new Date(),
    }
  } else {
    // Other error
    return {
      code: ERROR_CODES.UNKNOWN_ERROR,
      message: error.message || 'Có lỗi không xác định',
      details: error,
      timestamp: new Date(),
    }
  }
}

export default api 