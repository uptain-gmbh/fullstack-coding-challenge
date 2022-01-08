export interface ApiResponse<T = null> {
  data?: T;
  success: boolean;
  message?: string;
  errors?: string[];
}
