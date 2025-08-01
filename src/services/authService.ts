import api from './api'
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants'
import { User } from '../types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  role?: 'user' | 'designer'
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  newPassword: string
  confirmPassword: string
}

class AuthService {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.LOGIN, credentials)
    
    if (response.success && response.data) {
      this.setTokens(response.data.accessToken, response.data.refreshToken)
      this.setUser(response.data.user)
    }
    
    return response.data!
  }

  // Register
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.REGISTER, data)
    
    if (response.success && response.data) {
      this.setTokens(response.data.accessToken, response.data.refreshToken)
      this.setUser(response.data.user)
    }
    
    return response.data!
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.LOGOUT)
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      this.clearAuth()
    }
  }

  // Refresh token
  async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await api.post<{ accessToken: string }>(API_ENDPOINTS.REFRESH_TOKEN, {
      refreshToken,
    })

    if (response.success && response.data) {
      this.setAccessToken(response.data.accessToken)
      return response.data.accessToken
    }

    throw new Error('Failed to refresh token')
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>(API_ENDPOINTS.USER_PROFILE)
    if (response.success && response.data) {
      this.setUser(response.data)
      return response.data
    }
    throw new Error('Failed to get current user')
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<User>(API_ENDPOINTS.UPDATE_PROFILE, data)
    if (response.success && response.data) {
      this.setUser(response.data)
      return response.data
    }
    throw new Error('Failed to update profile')
  }

  // Request password reset
  async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    await api.post('/auth/forgot-password', data)
  }

  // Confirm password reset
  async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
    await api.post('/auth/reset-password', data)
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    })
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    await api.post('/auth/verify-email', { token })
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<void> {
    await api.post('/auth/resend-verification')
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getAccessToken()
    return !!token && !this.isTokenExpired(token)
  }

  // Get current user from storage
  getCurrentUserFromStorage(): User | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch (error) {
        console.error('Error parsing user from storage:', error)
        return null
      }
    }
    return null
  }

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
  }

  // Set tokens
  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  }

  // Set access token only
  private setAccessToken(accessToken: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken)
  }

  // Set user
  private setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user))
  }

  // Clear all auth data
  private clearAuth(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE)
  }

  // Check if token is expired
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expiryTime = payload.exp * 1000 // Convert to milliseconds
      return Date.now() >= expiryTime
    } catch (error) {
      return true
    }
  }
}

export const authService = new AuthService()
export default authService 