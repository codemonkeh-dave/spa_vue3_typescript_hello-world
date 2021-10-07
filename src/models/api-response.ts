interface ApiResponseError {
  status: string | number;
  message: string;
}

interface Message {
  message: string;
}

export interface ApiResponse {
  error: ApiResponseError | null;
  data: Message | null;
}
