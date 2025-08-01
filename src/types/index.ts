// Core Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'designer' | 'admin'
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  language: 'vi' | 'en' | 'fr' | 'ja' | 'ko'
  theme: 'light' | 'dark' | 'auto'
  notifications: NotificationSettings
  privacy: PrivacySettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends'
  designVisibility: 'public' | 'private' | 'friends'
  allowMessaging: boolean
  allowDesignSharing: boolean
}

// Designer Types
export interface Designer {
  id: string
  userId: string
  name: string
  avatar: string
  bio: string
  specialties: AoDaiStyle[]
  experience: number // years
  certifications: Certification[]
  portfolio: PortfolioItem[]
  rating: number
  reviewCount: number
  verificationStatus: 'pending' | 'verified' | 'rejected'
  isAvailable: boolean
  location: Location
  languages: string[]
  pricing: PricingInfo
  createdAt: Date
  updatedAt: Date
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: Date
  expiryDate?: Date
  documentUrl: string
  verified: boolean
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  images: string[]
  category: AoDaiStyle
  tags: string[]
  createdAt: Date
  likes: number
  views: number
}

export interface PricingInfo {
  consultationFee: number
  designFee: number
  productionFee: number
  currency: 'VND' | 'USD' | 'EUR'
  paymentMethods: PaymentMethod[]
}

export interface Location {
  country: string
  city: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// Ao Dai Types (Traditional Only)
export type AoDaiStyle = 
  | 'ngu-than' // Áo dài ngũ thân
  | 'cung-dinh' // Áo dài cung đình Huế
  | 'hoc-sinh' // Áo dài học sinh
  | 'cuoi' // Áo dài cưới
  | 'mien-nam' // Áo dài miền Nam truyền thống
  | 'ao-tac' // Áo tấc
  | 'ba-ba' // Áo bà ba

export interface AoDaiDesign {
  id: string
  userId: string
  designerId?: string
  title: string
  description: string
  style: AoDaiStyle
  fabric: Fabric
  pattern: Pattern
  colors: Color[]
  accessories: Accessory[]
  measurements: Measurements
  images: DesignImage[]
  status: 'draft' | 'completed' | 'ordered' | 'in-production'
  price: number
  currency: 'VND' | 'USD' | 'EUR'
  createdAt: Date
  updatedAt: Date
  nftMetadata?: NFTMetadata
  copyright: CopyrightInfo
}

export interface Fabric {
  id: string
  name: string
  type: 'silk' | 'cotton' | 'satin' | 'voan' | 'gabardine'
  quality: 'standard' | 'premium' | 'luxury'
  price: number
  sustainability: 'conventional' | 'eco-friendly' | 'organic'
  description: string
  image: string
}

export interface Pattern {
  id: string
  name: string
  category: 'floral' | 'geometric' | 'cultural' | 'abstract'
  meaning: string
  origin: string
  period: string
  image: string
  colors: string[]
}

export interface Color {
  id: string
  name: string
  hex: string
  rgb: { r: number; g: number; b: number }
  meaning: string
  culturalSignificance: string
}

export interface Accessory {
  id: string
  name: string
  type: 'khan-dong' | 'no' | 'kim-tuyen' | 'ngoc-trai'
  description: string
  price: number
  image: string
}

export interface Measurements {
  chest: number
  waist: number
  hips: number
  shoulder: number
  armLength: number
  height: number
  customNotes?: string
}

export interface DesignImage {
  id: string
  url: string
  type: 'preview' | 'detail' | '3d-model' | 'ar-preview'
  watermark: boolean
  resolution: 'low' | 'medium' | 'high'
  createdAt: Date
}

// NFT & Blockchain Types
export interface NFTMetadata {
  tokenId: string
  contractAddress: string
  blockchain: 'ethereum' | 'polygon' | 'binance'
  metadata: {
    name: string
    description: string
    image: string
    attributes: NFTAttribute[]
  }
  ownership: {
    owner: string
    creator: string
    transferHistory: TransferRecord[]
  }
  royalties: {
    percentage: number
    recipients: RoyaltyRecipient[]
  }
}

export interface NFTAttribute {
  trait_type: string
  value: string | number
  display_type?: 'number' | 'boost_number' | 'boost_percentage' | 'date'
}

export interface TransferRecord {
  from: string
  to: string
  timestamp: Date
  transactionHash: string
}

export interface RoyaltyRecipient {
  address: string
  percentage: number
  name: string
}

// Copyright Protection Types
export interface CopyrightInfo {
  owner: string
  creationDate: Date
  registrationDate?: Date
  expirationDate?: Date
  license: 'all-rights-reserved' | 'creative-commons' | 'custom'
  terms: string
  watermark: WatermarkInfo
  tracking: TrackingInfo
}

export interface WatermarkInfo {
  enabled: boolean
  type: 'text' | 'image' | 'dynamic'
  content: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  opacity: number
  rotation: number
}

export interface TrackingInfo {
  screenshotProtection: boolean
  downloadProtection: boolean
  viewTracking: boolean
  shareTracking: boolean
  analytics: AnalyticsData
}

export interface AnalyticsData {
  views: number
  downloads: number
  shares: number
  uniqueVisitors: number
  timeSpent: number
  interactions: Interaction[]
}

export interface Interaction {
  type: 'view' | 'download' | 'share' | 'like' | 'comment'
  userId?: string
  timestamp: Date
  ipAddress?: string
  userAgent?: string
}

// Education System Types
export interface Course {
  id: string
  title: string
  description: string
  category: 'history' | 'culture' | 'technique' | 'design'
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: number // minutes
  lessons: Lesson[]
  instructor: Designer
  price: number
  currency: 'VND' | 'USD' | 'EUR'
  enrolledStudents: number
  rating: number
  reviewCount: number
  certificate: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Lesson {
  id: string
  title: string
  description: string
  content: LessonContent
  duration: number // minutes
  order: number
  resources: Resource[]
  quiz?: Quiz
}

export interface LessonContent {
  type: 'video' | 'text' | 'interactive' | 'quiz'
  data: any
  transcript?: string
  subtitles?: Subtitle[]
}

export interface Resource {
  id: string
  name: string
  type: 'pdf' | 'image' | 'video' | 'audio' | 'link'
  url: string
  size?: number
  description?: string
}

export interface Quiz {
  id: string
  questions: Question[]
  timeLimit?: number
  passingScore: number
}

export interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'fill-blank'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
}

export interface Subtitle {
  language: string
  content: string
  timestamp: number
}

// Social Features Types
export interface Community {
  id: string
  name: string
  description: string
  category: 'general' | 'designers' | 'enthusiasts' | 'beginners'
  members: number
  posts: Post[]
  rules: string[]
  moderators: string[]
  createdAt: Date
}

export interface Post {
  id: string
  authorId: string
  communityId: string
  type: 'text' | 'image' | 'video' | 'design' | 'poll'
  content: PostContent
  likes: number
  comments: Comment[]
  shares: number
  views: number
  tags: string[]
  isPinned: boolean
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PostContent {
  text?: string
  images?: string[]
  video?: string
  designId?: string
  poll?: Poll
}

export interface Comment {
  id: string
  authorId: string
  content: string
  likes: number
  replies: Comment[]
  createdAt: Date
  updatedAt: Date
}

export interface Poll {
  question: string
  options: PollOption[]
  endDate: Date
  allowMultiple: boolean
}

export interface PollOption {
  id: string
  text: string
  votes: number
  voters: string[]
}

// Marketplace Types
export interface Marketplace {
  designs: MarketplaceDesign[]
  categories: Category[]
  filters: FilterOptions
  search: SearchOptions
}

export interface MarketplaceDesign {
  id: string
  design: AoDaiDesign
  seller: Designer
  price: Price
  availability: 'available' | 'limited' | 'sold-out'
  sales: number
  rating: number
  reviewCount: number
  featured: boolean
  trending: boolean
}

export interface Price {
  amount: number
  currency: 'VND' | 'USD' | 'EUR'
  originalPrice?: number
  discount?: number
  discountEndDate?: Date
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  parentId?: string
  children?: Category[]
  designCount: number
}

export interface FilterOptions {
  priceRange: { min: number; max: number }
  styles: AoDaiStyle[]
  designers: string[]
  ratings: number[]
  availability: string[]
  sustainability: string[]
}

export interface SearchOptions {
  query: string
  filters: FilterOptions
  sortBy: 'relevance' | 'price' | 'rating' | 'newest' | 'popular'
  sortOrder: 'asc' | 'desc'
  page: number
  limit: number
}

// AR/3D Types
export interface ARExperience {
  id: string
  designId: string
  userId: string
  type: 'try-on' | 'preview' | 'customization'
  settings: ARSettings
  session: ARSession
  analytics: ARAnalytics
}

export interface ARSettings {
  lighting: 'natural' | 'studio' | 'outdoor'
  background: 'real' | 'virtual' | 'transparent'
  quality: 'low' | 'medium' | 'high'
  tracking: 'body' | 'face' | 'full-body'
}

export interface ARSession {
  startTime: Date
  endTime?: Date
  duration: number
  screenshots: string[]
  recordings: string[]
  interactions: ARInteraction[]
}

export interface ARInteraction {
  type: 'rotate' | 'zoom' | 'color-change' | 'pattern-change'
  timestamp: Date
  data: any
}

export interface ARAnalytics {
  sessionCount: number
  averageDuration: number
  popularFeatures: string[]
  conversionRate: number
}

// Payment Types
export type PaymentMethod = 
  | 'credit-card'
  | 'bank-transfer'
  | 'digital-wallet'
  | 'crypto'
  | 'cash-on-delivery'

export interface Payment {
  id: string
  userId: string
  amount: number
  currency: 'VND' | 'USD' | 'EUR'
  method: PaymentMethod
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  transactionId?: string
  description: string
  metadata: any
  createdAt: Date
  updatedAt: Date
}

// Order Types
export interface Order {
  id: string
  userId: string
  designerId: string
  designId: string
  status: OrderStatus
  items: OrderItem[]
  total: number
  currency: 'VND' | 'USD' | 'EUR'
  payment: Payment
  shipping: ShippingInfo
  timeline: OrderTimeline[]
  createdAt: Date
  updatedAt: Date
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'in-production'
  | 'quality-check'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export interface OrderItem {
  id: string
  designId: string
  quantity: number
  price: number
  customizations: Customization[]
}

export interface Customization {
  type: 'measurement' | 'color' | 'pattern' | 'accessory'
  value: any
  additionalCost: number
}

export interface ShippingInfo {
  address: Address
  method: 'standard' | 'express' | 'premium'
  cost: number
  estimatedDelivery: Date
  trackingNumber?: string
  status: 'pending' | 'shipped' | 'delivered'
}

export interface Address {
  name: string
  phone: string
  email: string
  street: string
  city: string
  state: string
  country: string
  zipCode: string
}

export interface OrderTimeline {
  status: OrderStatus
  timestamp: Date
  description: string
  updatedBy: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data: any
  read: boolean
  createdAt: Date
}

export type NotificationType = 
  | 'order-update'
  | 'design-complete'
  | 'message'
  | 'system'
  | 'marketing'
  | 'security'

// Error Types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: AppError
  message?: string
  pagination?: PaginationInfo
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'file' | 'date'
  required: boolean
  validation?: ValidationRule[]
  options?: SelectOption[]
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom'
  value: any
  message: string
}

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

// Theme Types
export interface Theme {
  name: string
  colors: ThemeColors
  fonts: ThemeFonts
  spacing: ThemeSpacing
  breakpoints: ThemeBreakpoints
}

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  error: string
  warning: string
  success: string
  info: string
}

export interface ThemeFonts {
  primary: string
  secondary: string
  accent: string
}

export interface ThemeSpacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
}

export interface ThemeBreakpoints {
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
} 