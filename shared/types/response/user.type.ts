export interface UserExistsResponse {
  success: boolean;
  status: string;
  message: string;
  data: { available: boolean };
}
