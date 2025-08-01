import api from './api'
import { API_ENDPOINTS, PAYMENT_METHODS, CURRENCIES } from '../constants'
import { Payment, PaymentMethod, Order } from '../types'

export interface CreatePaymentParams {
  orderId: string
  amount: number
  currency: keyof typeof CURRENCIES
  method: keyof typeof PAYMENT_METHODS
  description: string
  metadata?: any
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'succeeded' | 'failed'
  clientSecret?: string
  paymentMethod?: string
}

export interface PaymentMethodData {
  id: string
  type: PaymentMethod
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface RefundParams {
  paymentId: string
  amount?: number
  reason: string
}

class PaymentService {
  // Create payment intent
  async createPaymentIntent(params: CreatePaymentParams): Promise<PaymentIntent> {
    const response = await api.post<PaymentIntent>(API_ENDPOINTS.CREATE_PAYMENT, params)
    
    if (!response.success || !response.data) {
      throw new Error('Không thể tạo thanh toán')
    }
    
    return response.data
  }

  // Process payment
  async processPayment(paymentIntentId: string, paymentMethodData: any): Promise<Payment> {
    const response = await api.post<Payment>(`${API_ENDPOINTS.PAYMENTS}/${paymentIntentId}/confirm`, {
      paymentMethodData,
    })
    
    if (!response.success || !response.data) {
      throw new Error('Không thể xử lý thanh toán')
    }
    
    return response.data
  }

  // Get payment details
  async getPayment(paymentId: string): Promise<Payment> {
    const response = await api.get<Payment>(`${API_ENDPOINTS.PAYMENT_DETAIL.replace(':id', paymentId)}`)
    
    if (!response.success || !response.data) {
      throw new Error('Không thể lấy thông tin thanh toán')
    }
    
    return response.data
  }

  // Get payment history
  async getPaymentHistory(page: number = 1, limit: number = 10): Promise<{
    payments: Payment[]
    total: number
    page: number
    totalPages: number
  }> {
    const response = await api.get<{
      payments: Payment[]
      total: number
      page: number
      totalPages: number
    }>(`${API_ENDPOINTS.PAYMENTS}?page=${page}&limit=${limit}`)
    
    if (!response.success || !response.data) {
      throw new Error('Không thể lấy lịch sử thanh toán')
    }
    
    return response.data
  }

  // Refund payment
  async refundPayment(params: RefundParams): Promise<Payment> {
    const response = await api.post<Payment>(`${API_ENDPOINTS.PAYMENTS}/${params.paymentId}/refund`, {
      amount: params.amount,
      reason: params.reason,
    })
    
    if (!response.success || !response.data) {
      throw new Error('Không thể hoàn tiền')
    }
    
    return response.data
  }

  // Save payment method
  async savePaymentMethod(paymentMethodData: any): Promise<PaymentMethodData> {
    const response = await api.post<PaymentMethodData>('/payments/methods', paymentMethodData)
    
    if (!response.success || !response.data) {
      throw new Error('Không thể lưu phương thức thanh toán')
    }
    
    return response.data
  }

  // Get saved payment methods
  async getPaymentMethods(): Promise<PaymentMethodData[]> {
    const response = await api.get<PaymentMethodData[]>('/payments/methods')
    
    if (!response.success || !response.data) {
      throw new Error('Không thể lấy phương thức thanh toán')
    }
    
    return response.data
  }

  // Delete payment method
  async deletePaymentMethod(methodId: string): Promise<void> {
    await api.delete(`/payments/methods/${methodId}`)
  }

  // Set default payment method
  async setDefaultPaymentMethod(methodId: string): Promise<void> {
    await api.patch(`/payments/methods/${methodId}/default`)
  }

  // Calculate payment fees
  calculateFees(amount: number, method: PaymentMethod, currency: string): {
    amount: number
    fee: number
    total: number
  } {
    const fees: Record<PaymentMethod, number> = {
      'credit-card': 0.029, // 2.9%
      'bank-transfer': 0.01, // 1%
      'digital-wallet': 0.015, // 1.5%
      'crypto': 0.02, // 2%
      'cash-on-delivery': 0.05, // 5%
    }

    const feeRate = fees[method] || 0
    const fee = amount * feeRate
    const total = amount + fee

    return {
      amount,
      fee,
      total,
    }
  }

  // Validate payment method
  validatePaymentMethod(method: PaymentMethod, data: any): boolean {
    switch (method) {
      case 'credit-card':
        return this.validateCreditCard(data)
      case 'bank-transfer':
        return this.validateBankTransfer(data)
      case 'digital-wallet':
        return this.validateDigitalWallet(data)
      case 'crypto':
        return this.validateCrypto(data)
      case 'cash-on-delivery':
        return true // No validation needed
      default:
        return false
    }
  }

  private validateCreditCard(data: any): boolean {
    return !!(
      data.cardNumber &&
      data.expiryMonth &&
      data.expiryYear &&
      data.cvv &&
      data.cardNumber.length >= 13 &&
      data.cardNumber.length <= 19 &&
      data.cvv.length >= 3 &&
      data.cvv.length <= 4
    )
  }

  private validateBankTransfer(data: any): boolean {
    return !!(
      data.accountNumber &&
      data.accountName &&
      data.bankCode &&
      data.accountNumber.length >= 8
    )
  }

  private validateDigitalWallet(data: any): boolean {
    return !!(
      data.walletType &&
      data.walletId &&
      ['momo', 'zalopay', 'vnpay', 'paypal'].includes(data.walletType)
    )
  }

  private validateCrypto(data: any): boolean {
    return !!(
      data.walletAddress &&
      data.cryptocurrency &&
      data.walletAddress.length >= 26 &&
      ['BTC', 'ETH', 'USDT', 'USDC'].includes(data.cryptocurrency)
    )
  }

  // Format currency
  formatCurrency(amount: number, currency: string): string {
    const formatters: Record<string, Intl.NumberFormat> = {
      VND: new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }),
      USD: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      EUR: new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }),
    }

    const formatter = formatters[currency] || formatters.USD
    return formatter.format(amount)
  }

  // Get payment status color
  getPaymentStatusColor(status: Payment['status']): string {
    const colors = {
      pending: 'text-yellow-600',
      processing: 'text-blue-600',
      completed: 'text-green-600',
      failed: 'text-red-600',
      refunded: 'text-gray-600',
    }
    return colors[status] || 'text-gray-600'
  }

  // Get payment status label
  getPaymentStatusLabel(status: Payment['status']): string {
    const labels = {
      pending: 'Chờ xử lý',
      processing: 'Đang xử lý',
      completed: 'Hoàn thành',
      failed: 'Thất bại',
      refunded: 'Đã hoàn tiền',
    }
    return labels[status] || 'Không xác định'
  }

  // Get payment method label
  getPaymentMethodLabel(method: PaymentMethod): string {
    const labels = {
      'credit-card': 'Thẻ tín dụng',
      'bank-transfer': 'Chuyển khoản ngân hàng',
      'digital-wallet': 'Ví điện tử',
      'crypto': 'Tiền điện tử',
      'cash-on-delivery': 'Thanh toán khi nhận hàng',
    }
    return labels[method] || method
  }

  // Get payment method icon
  getPaymentMethodIcon(method: PaymentMethod): string {
    const icons = {
      'credit-card': '💳',
      'bank-transfer': '🏦',
      'digital-wallet': '📱',
      'crypto': '₿',
      'cash-on-delivery': '💰',
    }
    return icons[method] || '💳'
  }
}

export const paymentService = new PaymentService()
export default paymentService 