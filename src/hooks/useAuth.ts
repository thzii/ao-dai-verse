import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import authService, { LoginCredentials, RegisterData } from '../services/authService'
import { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface UseAuthReturn extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  clearError: () => void
}

export const useAuth = (): UseAuthReturn => {
  const navigate = useNavigate()
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }))
        
        if (authService.isAuthenticated()) {
          const user = authService.getCurrentUserFromStorage()
          if (user) {
            setState({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } else {
            // Try to fetch current user from API
            const currentUser = await authService.getCurrentUser()
            setState({
              user: currentUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          }
        } else {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Không thể khởi tạo phiên đăng nhập',
        })
      }
    }

    initializeAuth()
  }, [])

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const response = await authService.login(credentials)
      
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      
      toast.success('Đăng nhập thành công!')
      navigate('/dashboard')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      toast.error(errorMessage)
    }
  }, [navigate])

  // Register function
  const register = useCallback(async (data: RegisterData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const response = await authService.register(data)
      
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      
      toast.success('Đăng ký thành công!')
      navigate('/dashboard')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng ký thất bại'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      toast.error(errorMessage)
    }
  }, [navigate])

  // Logout function
  const logout = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }))
      
      await authService.logout()
      
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
      
      toast.success('Đăng xuất thành công!')
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout API fails, clear local state
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
      navigate('/')
    }
  }, [navigate])

  // Update profile function
  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const updatedUser = await authService.updateProfile(data)
      
      setState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
        error: null,
      }))
      
      toast.success('Cập nhật thông tin thành công!')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Cập nhật thông tin thất bại'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      toast.error(errorMessage)
    }
  }, [])

  // Clear error function
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    clearError,
  }
}

// Hook for checking if user has specific role
export const useHasRole = (requiredRole: string): boolean => {
  const { user } = useAuth()
  return user?.role === requiredRole
}

// Hook for checking if user is designer
export const useIsDesigner = (): boolean => {
  return useHasRole('designer')
}

// Hook for checking if user is admin
export const useIsAdmin = (): boolean => {
  return useHasRole('admin')
}

// Hook for protected routes
export const useRequireAuth = (redirectTo: string = '/login') => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo)
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo])

  return { isAuthenticated, isLoading }
}

// Hook for requiring specific role
export const useRequireRole = (requiredRole: string, redirectTo: string = '/unauthorized') => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== requiredRole)) {
      navigate(redirectTo)
    }
  }, [isAuthenticated, isLoading, user, requiredRole, navigate, redirectTo])

  return { isAuthenticated, isLoading, hasRole: user?.role === requiredRole }
}

export default useAuth 