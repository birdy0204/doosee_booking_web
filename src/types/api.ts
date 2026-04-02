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

// ==================== 表單提交 ====================

export interface FormSubmissionDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
  salonName?: string;
  service?: string;
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
  source?: FormSource;
}

export interface UpdateFormSubmissionDto {
  status: FormStatus;
  note?: string;
}
