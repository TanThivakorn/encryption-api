export interface ApiResponse<T> {
  successful: boolean;
  error_code: string;
  data: T | null;
}

export interface EncryptDataResponse {
  data1: string;
  data2: string;
}

export interface DecryptDataResponse {
  payload: string;
}