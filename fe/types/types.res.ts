export interface Result {
  success: boolean;
  message: string;
  data?: null | Record<string, string>;
  error?: null | Record<string, string>;
}
