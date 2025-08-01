// Traditional Ao Dai Styles (No Modern/Innovative)
export const AO_DAI_STYLES = {
  NGU_THAN: 'ngu-than',
  CUNG_DINH: 'cung-dinh',
  HOC_SINH: 'hoc-sinh',
  CUOI: 'cuoi',
  MIEN_NAM: 'mien-nam',
  AO_TAC: 'ao-tac',
  BA_BA: 'ba-ba'
} as const

export const AO_DAI_STYLE_LABELS = {
  [AO_DAI_STYLES.NGU_THAN]: 'Áo dài ngũ thân',
  [AO_DAI_STYLES.CUNG_DINH]: 'Áo dài cung đình Huế',
  [AO_DAI_STYLES.HOC_SINH]: 'Áo dài học sinh',
  [AO_DAI_STYLES.CUOI]: 'Áo dài cưới',
  [AO_DAI_STYLES.MIEN_NAM]: 'Áo dài miền Nam truyền thống',
  [AO_DAI_STYLES.AO_TAC]: 'Áo tấc',
  [AO_DAI_STYLES.BA_BA]: 'Áo bà ba'
} as const

export const AO_DAI_STYLE_DESCRIPTIONS = {
  [AO_DAI_STYLES.NGU_THAN]: 'Truyền thống 5 thân, phù hợp với các dịp lễ trang trọng',
  [AO_DAI_STYLES.CUNG_DINH]: 'Kiểu áo cung đình Huế, mang đậm văn hóa triều Nguyễn',
  [AO_DAI_STYLES.HOC_SINH]: 'Tinh khôi, thanh lịch, phù hợp với học sinh, sinh viên',
  [AO_DAI_STYLES.CUOI]: 'Trang trọng, lộng lẫy cho ngày cưới truyền thống',
  [AO_DAI_STYLES.MIEN_NAM]: 'Thoải mái, phù hợp với khí hậu miền Nam',
  [AO_DAI_STYLES.AO_TAC]: 'Kiểu áo cổ điển, thanh lịch',
  [AO_DAI_STYLES.BA_BA]: 'Thoải mái, phù hợp với cuộc sống hàng ngày'
} as const

// Fabric Types
export const FABRIC_TYPES = {
  SILK: 'silk',
  COTTON: 'cotton',
  SATIN: 'satin',
  VOAN: 'voan',
  GABARDINE: 'gabardine'
} as const

export const FABRIC_QUALITIES = {
  STANDARD: 'standard',
  PREMIUM: 'premium',
  LUXURY: 'luxury'
} as const

export const SUSTAINABILITY_TYPES = {
  CONVENTIONAL: 'conventional',
  ECO_FRIENDLY: 'eco-friendly',
  ORGANIC: 'organic'
} as const

// Pattern Categories
export const PATTERN_CATEGORIES = {
  FLORAL: 'floral',
  GEOMETRIC: 'geometric',
  CULTURAL: 'cultural',
  ABSTRACT: 'abstract'
} as const

// Traditional Colors with Cultural Significance
export const TRADITIONAL_COLORS = {
  RED: {
    name: 'Đỏ truyền thống',
    hex: '#dc2626',
    meaning: 'May mắn, thịnh vượng, tình yêu',
    culturalSignificance: 'Màu của lễ cưới, Tết, và các dịp lễ quan trọng'
  },
  GOLD: {
    name: 'Vàng hoàng gia',
    hex: '#eab308',
    meaning: 'Quý phái, giàu sang, uy quyền',
    culturalSignificance: 'Màu của hoàng gia, biểu tượng của sự giàu có'
  },
  PURPLE: {
    name: 'Tím cung đình',
    hex: '#7c3aed',
    meaning: 'Quý phái, sang trọng, bí ẩn',
    culturalSignificance: 'Màu của cung đình, chỉ dành cho hoàng tộc'
  },
  PINK: {
    name: 'Hồng thanh xuân',
    hex: '#ec4899',
    meaning: 'Dịu dàng, nữ tính, thanh xuân',
    culturalSignificance: 'Màu của tuổi trẻ và sự dịu dàng'
  },
  BLUE: {
    name: 'Xanh thanh lịch',
    hex: '#2563eb',
    meaning: 'Thanh lịch, tin cậy, hòa bình',
    culturalSignificance: 'Màu của sự tin cậy và thanh lịch'
  },
  GREEN: {
    name: 'Xanh lá tự nhiên',
    hex: '#16a34a',
    meaning: 'Tự nhiên, sinh sôi, hy vọng',
    culturalSignificance: 'Màu của thiên nhiên và sự sinh sôi'
  },
  WHITE: {
    name: 'Trắng tinh khôi',
    hex: '#ffffff',
    meaning: 'Tinh khôi, thuần khiết, trong sáng',
    culturalSignificance: 'Màu của sự thuần khiết và tinh khôi'
  }
} as const

// Accessory Types
export const ACCESSORY_TYPES = {
  KHAN_DONG: 'khan-dong',
  NO: 'no',
  KIM_TUYEN: 'kim-tuyen',
  NGOC_TRAI: 'ngoc-trai'
} as const

// Blockchain Networks
export const BLOCKCHAIN_NETWORKS = {
  ETHEREUM: 'ethereum',
  POLYGON: 'polygon',
  BINANCE: 'binance'
} as const

// Designer Verification Levels
export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
} as const

// Education Categories
export const EDUCATION_CATEGORIES = {
  HISTORY: 'history',
  CULTURE: 'culture',
  TECHNIQUE: 'technique',
  DESIGN: 'design'
} as const

export const EDUCATION_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
} as const

// Community Categories
export const COMMUNITY_CATEGORIES = {
  GENERAL: 'general',
  DESIGNERS: 'designers',
  ENTHUSIASTS: 'enthusiasts',
  BEGINNERS: 'beginners'
} as const

// Post Types
export const POST_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  DESIGN: 'design',
  POLL: 'poll'
} as const

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit-card',
  BANK_TRANSFER: 'bank-transfer',
  DIGITAL_WALLET: 'digital-wallet',
  CRYPTO: 'crypto',
  CASH_ON_DELIVERY: 'cash-on-delivery'
} as const

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PRODUCTION: 'in-production',
  QUALITY_CHECK: 'quality-check',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
} as const

// Notification Types
export const NOTIFICATION_TYPES = {
  ORDER_UPDATE: 'order-update',
  DESIGN_COMPLETE: 'design-complete',
  MESSAGE: 'message',
  SYSTEM: 'system',
  MARKETING: 'marketing',
  SECURITY: 'security'
} as const

// User Roles
export const USER_ROLES = {
  USER: 'user',
  DESIGNER: 'designer',
  ADMIN: 'admin'
} as const

// Languages
export const LANGUAGES = {
  VI: 'vi',
  EN: 'en',
  FR: 'fr',
  JA: 'ja',
  KO: 'ko'
} as const

export const LANGUAGE_LABELS = {
  [LANGUAGES.VI]: 'Tiếng Việt',
  [LANGUAGES.EN]: 'English',
  [LANGUAGES.FR]: 'Français',
  [LANGUAGES.JA]: '日本語',
  [LANGUAGES.KO]: '한국어'
} as const

// Currencies
export const CURRENCIES = {
  VND: 'VND',
  USD: 'USD',
  EUR: 'EUR'
} as const

// Theme Types
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
} as const

// Privacy Settings
export const PRIVACY_LEVELS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  FRIENDS: 'friends'
} as const

// Copyright Licenses
export const COPYRIGHT_LICENSES = {
  ALL_RIGHTS_RESERVED: 'all-rights-reserved',
  CREATIVE_COMMONS: 'creative-commons',
  CUSTOM: 'custom'
} as const

// Watermark Types
export const WATERMARK_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  DYNAMIC: 'dynamic'
} as const

// Watermark Positions
export const WATERMARK_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  CENTER: 'center'
} as const

// AR Settings
export const AR_LIGHTING = {
  NATURAL: 'natural',
  STUDIO: 'studio',
  OUTDOOR: 'outdoor'
} as const

export const AR_BACKGROUND = {
  REAL: 'real',
  VIRTUAL: 'virtual',
  TRANSPARENT: 'transparent'
} as const

export const AR_QUALITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const

export const AR_TRACKING = {
  BODY: 'body',
  FACE: 'face',
  FULL_BODY: 'full-body'
} as const

// Design Status
export const DESIGN_STATUS = {
  DRAFT: 'draft',
  COMPLETED: 'completed',
  ORDERED: 'ordered',
  IN_PRODUCTION: 'in-production'
} as const

// Marketplace Availability
export const AVAILABILITY_STATUS = {
  AVAILABLE: 'available',
  LIMITED: 'limited',
  SOLD_OUT: 'sold-out'
} as const

// Sort Options
export const SORT_OPTIONS = {
  RELEVANCE: 'relevance',
  PRICE: 'price',
  RATING: 'rating',
  NEWEST: 'newest',
  POPULAR: 'popular'
} as const

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc'
} as const

// File Types
export const FILE_TYPES = {
  PDF: 'pdf',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  LINK: 'link'
} as const

// Quiz Question Types
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  TRUE_FALSE: 'true-false',
  FILL_BLANK: 'fill-blank'
} as const

// Lesson Content Types
export const LESSON_CONTENT_TYPES = {
  VIDEO: 'video',
  TEXT: 'text',
  INTERACTIVE: 'interactive',
  QUIZ: 'quiz'
} as const

// Design Image Types
export const DESIGN_IMAGE_TYPES = {
  PREVIEW: 'preview',
  DETAIL: 'detail',
  THREE_D_MODEL: '3d-model',
  AR_PREVIEW: 'ar-preview'
} as const

// Image Resolutions
export const IMAGE_RESOLUTIONS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const

// Interaction Types
export const INTERACTION_TYPES = {
  VIEW: 'view',
  DOWNLOAD: 'download',
  SHARE: 'share',
  LIKE: 'like',
  COMMENT: 'comment'
} as const

// AR Interaction Types
export const AR_INTERACTION_TYPES = {
  ROTATE: 'rotate',
  ZOOM: 'zoom',
  COLOR_CHANGE: 'color-change',
  PATTERN_CHANGE: 'pattern-change'
} as const

// Form Field Types
export const FORM_FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  SELECT: 'select',
  TEXTAREA: 'textarea',
  FILE: 'file',
  DATE: 'date'
} as const

// Validation Rule Types
export const VALIDATION_RULE_TYPES = {
  REQUIRED: 'required',
  MIN: 'min',
  MAX: 'max',
  PATTERN: 'pattern',
  CUSTOM: 'custom'
} as const

// Error Codes
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // User
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  USER_PREFERENCES: '/user/preferences',
  
  // Designer
  DESIGNERS: '/designers',
  DESIGNER_PROFILE: '/designers/:id',
  DESIGNER_PORTFOLIO: '/designers/:id/portfolio',
  DESIGNER_REVIEWS: '/designers/:id/reviews',
  
  // Designs
  DESIGNS: '/designs',
  DESIGN_DETAIL: '/designs/:id',
  CREATE_DESIGN: '/designs',
  UPDATE_DESIGN: '/designs/:id',
  DELETE_DESIGN: '/designs/:id',
  
  // Marketplace
  MARKETPLACE: '/marketplace',
  MARKETPLACE_DESIGNS: '/marketplace/designs',
  MARKETPLACE_CATEGORIES: '/marketplace/categories',
  
  // Orders
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  CREATE_ORDER: '/orders',
  UPDATE_ORDER: '/orders/:id',
  
  // Payments
  PAYMENTS: '/payments',
  PAYMENT_DETAIL: '/payments/:id',
  CREATE_PAYMENT: '/payments',
  
  // NFT
  NFTS: '/nfts',
  NFT_DETAIL: '/nfts/:id',
  MINT_NFT: '/nfts/mint',
  TRANSFER_NFT: '/nfts/:id/transfer',
  
  // Education
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  LESSONS: '/courses/:id/lessons',
  ENROLL_COURSE: '/courses/:id/enroll',
  
  // Community
  COMMUNITIES: '/communities',
  COMMUNITY_DETAIL: '/communities/:id',
  POSTS: '/communities/:id/posts',
  CREATE_POST: '/communities/:id/posts',
  
  // AR
  AR_SESSIONS: '/ar/sessions',
  AR_ANALYTICS: '/ar/analytics',
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  MARK_READ: '/notifications/:id/read',
  
  // Upload
  UPLOAD_IMAGE: '/upload/image',
  UPLOAD_VIDEO: '/upload/video',
  UPLOAD_DOCUMENT: '/upload/document'
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PROFILE: 'user_profile',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  CART: 'cart',
  RECENT_DESIGNS: 'recent_designs',
  FAVORITES: 'favorites'
} as const

// Session Storage Keys
export const SESSION_KEYS = {
  AR_SESSION: 'ar_session',
  DESIGN_SESSION: 'design_session',
  CART_SESSION: 'cart_session'
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100
} as const

// File Upload Limits
export const UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  VIDEO_MAX_SIZE: 100 * 1024 * 1024, // 100MB
  DOCUMENT_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
} as const

// Time Constants
export const TIME_CONSTANTS = {
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  DEBOUNCE_DELAY: 300, // 300ms
  THROTTLE_DELAY: 1000, // 1 second
} as const

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
} as const

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
} as const

// Z-Index Layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080
} as const 