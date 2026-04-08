// ==================== 通用型別 ====================

/** ABP 分頁請求參數 */
export interface PagedRequestDto {
  skipCount?: number;
  maxResultCount?: number;
  sorting?: string;
}

/** ABP 分頁回應格式 */
export interface PagedResultDto<T> {
  items: T[];
  totalCount: number;
}

// ==================== 列舉 ====================

/** 表單處理狀態 */
export enum FormStatus {
  /** 未處理 */
  Pending = 0,
  /** 已聯繫 */
  Contacted = 1,
  /** 已預約 */
  Booked = 2,
}

/** 表單來源管道 */
export enum FormSource {
  /** 官網表單 */
  Website = 0,
  /** LINE */
  Line = 1,
  /** Instagram */
  Instagram = 2,
  /** Facebook */
  Facebook = 3,
  /** 其他 */
  Other = 4,
}

// ==================== 認證 ====================

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResultDto {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface CurrentUserDto {
  id: string;
  userName: string;
  email: string;
  roles: string[];
}

// ==================== 角色 ====================

export interface RoleDto {
  id: string;
  name: string;
  isDefault: boolean;
  isStatic: boolean;
}

// ==================== 使用者 ====================

export interface UserDto {
  id: string;
  userName: string;
  email: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  isActive: boolean;
  roles: string[];
  creationTime: string;
  lastModificationTime?: string;
}

export interface CreateUserDto {
  userName: string;
  email: string;
  password: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  roles?: string[];
}

export interface UpdateUserDto {
  userName: string;
  email: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  isActive?: boolean;
  password?: string;
  roles?: string[];
}

// ==================== 合作夥伴分類 ====================

/** 合作夥伴分類 */
export enum PartnerCategory {
  /** 公司 */
  Company = 0,
  /** 個人品牌 */
  PersonalBrand = 1,
}

// ==================== FAQ 常見問題 ====================

export interface FaqDto {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isPublished: boolean;
  creationTime: string;
  lastModificationTime?: string;
}

export interface CreateUpdateFaqDto {
  question: string;
  answer: string;
  sortOrder?: number;
  isPublished?: boolean;
}

// ==================== 客戶見證 ====================

export interface TestimonialDto {
  id: string;
  authorName: string;
  authorTitle?: string;
  content: string;
  sortOrder: number;
  isPublished: boolean;
  creationTime: string;
  lastModificationTime?: string;
}

export interface CreateUpdateTestimonialDto {
  authorName: string;
  authorTitle?: string;
  content: string;
  sortOrder?: number;
  isPublished?: boolean;
}

// ==================== 合作夥伴 ====================

export interface PartnerDto {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  category: PartnerCategory;
  sortOrder: number;
  creationTime: string;
  lastModificationTime?: string;
}

export interface CreateUpdatePartnerDto {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  category: PartnerCategory;
  sortOrder?: number;
}

// ==================== 方案定價 ====================

export interface PricingPlanFeatureDto {
  id: string;
  text: string;
  sortOrder: number;
}

export interface CreateUpdatePricingPlanFeatureDto {
  text: string;
  sortOrder?: number;
}

export interface PricingPlanDto {
  id: string;
  name: string;
  description?: string;
  price: number | null;
  originalPrice: number | null;
  period?: string;
  ctaText?: string;
  isRecommended: boolean;
  isPublished: boolean;
  sortOrder: number;
  features: PricingPlanFeatureDto[];
  creationTime: string;
  lastModificationTime?: string;
}

export interface CreateUpdatePricingPlanDto {
  name: string;
  description?: string;
  price?: number | null;
  originalPrice?: number | null;
  period?: string;
  ctaText?: string;
  isRecommended?: boolean;
  isPublished?: boolean;
  sortOrder?: number;
  features: CreateUpdatePricingPlanFeatureDto[];
}

// ==================== 聯絡資訊（單一記錄） ====================

export interface ContactInfoDto {
  id: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  instagram: string;
  line: string;
}

export interface UpdateContactInfoDto {
  email: string;
  phone: string;
  address: string;
  facebook: string;
  instagram: string;
  line: string;
}

// ==================== 表單提交 ====================

export interface FormSubmissionDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
  salonName?: string;
  service?: string;
  description?: string;
  source: FormSource;
  status: FormStatus;
  note?: string;
  creationTime: string;
  lastModificationTime?: string;
}

export interface CreateFormSubmissionDto {
  name: string;
  email: string;
  phone?: string;
  salonName?: string;
  service?: string;
  description?: string;
  source?: FormSource;
}

export interface UpdateFormSubmissionDto {
  status: FormStatus;
  note?: string;
}
