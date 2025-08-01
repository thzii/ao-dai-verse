import { ValidationRule, FormField } from '../types'

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation
export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Mật khẩu phải có ít nhất 8 ký tự')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ hoa')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ thường')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 số')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Phone number validation (Vietnamese format)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Vietnamese ID card validation
export const validateIdCard = (idCard: string): boolean => {
  const idCardRegex = /^[0-9]{9}$|^[0-9]{12}$/
  return idCardRegex.test(idCard)
}

// URL validation
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// File size validation
export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize
}

// File type validation
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type)
}

// Required field validation
export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return value !== null && value !== undefined
}

// Min length validation
export const validateMinLength = (value: string, min: number): boolean => {
  return value.length >= min
}

// Max length validation
export const validateMaxLength = (value: string, max: number): boolean => {
  return value.length <= max
}

// Number range validation
export const validateNumberRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

// Pattern validation
export const validatePattern = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value)
}

// Custom validation function
export const validateCustom = (value: any, validator: (value: any) => boolean): boolean => {
  return validator(value)
}

// Validate form field
export const validateField = (value: any, field: FormField): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (!field.validation) {
    return { isValid: true, errors: [] }
  }
  
  for (const rule of field.validation) {
    let isValid = true
    
    switch (rule.type) {
      case 'required':
        isValid = validateRequired(value)
        break
      case 'min':
        if (typeof value === 'string') {
          isValid = validateMinLength(value, rule.value)
        } else if (typeof value === 'number') {
          isValid = validateNumberRange(value, rule.value, Infinity)
        }
        break
      case 'max':
        if (typeof value === 'string') {
          isValid = validateMaxLength(value, rule.value)
        } else if (typeof value === 'number') {
          isValid = validateNumberRange(value, -Infinity, rule.value)
        }
        break
      case 'pattern':
        if (typeof value === 'string') {
          isValid = validatePattern(value, new RegExp(rule.value))
        }
        break
      case 'custom':
        isValid = validateCustom(value, rule.value)
        break
    }
    
    if (!isValid) {
      errors.push(rule.message)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Validate form
export const validateForm = (values: Record<string, any>, fields: FormField[]): {
  isValid: boolean
  errors: Record<string, string[]>
} => {
  const errors: Record<string, string[]> = {}
  let isValid = true
  
  for (const field of fields) {
    const value = values[field.name]
    const validation = validateField(value, field)
    
    if (!validation.isValid) {
      errors[field.name] = validation.errors
      isValid = false
    }
  }
  
  return { isValid, errors }
}

// Credit card validation (Luhn algorithm)
export const validateCreditCard = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\s/g, '')
  
  if (!/^\d+$/.test(cleanNumber)) {
    return false
  }
  
  let sum = 0
  let isEven = false
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i])
    
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}

// Vietnamese name validation
export const validateVietnameseName = (name: string): boolean => {
  const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s]+$/
  return nameRegex.test(name.trim())
}

// Date validation
export const validateDate = (date: string): boolean => {
  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj.getTime())
}

// Future date validation
export const validateFutureDate = (date: string): boolean => {
  const dateObj = new Date(date)
  const now = new Date()
  return dateObj > now
}

// Past date validation
export const validatePastDate = (date: string): boolean => {
  const dateObj = new Date(date)
  const now = new Date()
  return dateObj < now
}

// Age validation
export const validateAge = (birthDate: string, minAge: number, maxAge?: number): boolean => {
  const birth = new Date(birthDate)
  const now = new Date()
  const age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--
  }
  
  if (maxAge) {
    return age >= minAge && age <= maxAge
  }
  
  return age >= minAge
}

// Vietnamese address validation
export const validateVietnameseAddress = (address: string): boolean => {
  return address.trim().length >= 10 && address.trim().length <= 200
}

// Price validation
export const validatePrice = (price: number): boolean => {
  return price > 0 && price <= 1000000000 // Max 1 billion VND
}

// Quantity validation
export const validateQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= 1000
}

// Color hex validation
export const validateColorHex = (color: string): boolean => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return hexRegex.test(color)
}

// RGB color validation
export const validateRgbColor = (r: number, g: number, b: number): boolean => {
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255
}

// Vietnamese postal code validation
export const validatePostalCode = (postalCode: string): boolean => {
  const postalRegex = /^[0-9]{5,6}$/
  return postalRegex.test(postalCode)
}

// Vietnamese bank account validation
export const validateBankAccount = (accountNumber: string): boolean => {
  const accountRegex = /^[0-9]{9,16}$/
  return accountRegex.test(accountNumber)
}

// Vietnamese tax code validation
export const validateTaxCode = (taxCode: string): boolean => {
  const taxRegex = /^[0-9]{10,13}$/
  return taxRegex.test(taxCode)
}

// Vietnamese business license validation
export const validateBusinessLicense = (license: string): boolean => {
  const licenseRegex = /^[0-9]{10,15}$/
  return licenseRegex.test(license)
}

// Vietnamese social security number validation
export const validateSocialSecurityNumber = (ssn: string): boolean => {
  const ssnRegex = /^[0-9]{10}$/
  return ssnRegex.test(ssn)
}

// Vietnamese health insurance number validation
export const validateHealthInsuranceNumber = (hin: string): boolean => {
  const hinRegex = /^[0-9]{10,15}$/
  return hinRegex.test(hin)
}

// Vietnamese passport validation
export const validatePassport = (passport: string): boolean => {
  const passportRegex = /^[A-Z][0-9]{7}$/
  return passportRegex.test(passport)
}

// Vietnamese driving license validation
export const validateDrivingLicense = (license: string): boolean => {
  const licenseRegex = /^[0-9]{12}$/
  return licenseRegex.test(license)
}

// Vietnamese vehicle registration validation
export const validateVehicleRegistration = (registration: string): boolean => {
  const registrationRegex = /^[0-9]{2}[A-Z][0-9]{4,5}$/
  return registrationRegex.test(registration)
}

// Vietnamese phone number formatting
export const formatPhoneNumber = (phone: string): string => {
  const clean = phone.replace(/\D/g, '')
  
  if (clean.startsWith('84')) {
    return `+${clean}`
  }
  
  if (clean.startsWith('0')) {
    return `+84${clean.slice(1)}`
  }
  
  return clean
}

// Vietnamese currency formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

// Vietnamese date formatting
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('vi-VN').format(dateObj)
}

// Vietnamese datetime formatting
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
} 