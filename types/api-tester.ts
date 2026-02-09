export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

export type BodyType = "none" | "json" | "form-data" | "raw";

export type AuthType = "none" | "basic" | "bearer";

export interface HeaderPair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface FormDataPair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface BasicAuth {
  username: string;
  password: string;
}

export interface BearerAuth {
  token: string;
}

export interface AuthConfig {
  type: AuthType;
  basic?: BasicAuth;
  bearer?: BearerAuth;
}

export interface RequestBody {
  type: BodyType;
  json?: string;
  formData?: FormDataPair[];
  raw?: string;
}

export interface APIRequest {
  id: string;
  method: HTTPMethod;
  url: string;
  headers: HeaderPair[];
  body: RequestBody;
  auth: AuthConfig;
}

export interface APIResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  size: number;  // bytes
  time: number;  // milliseconds
}

export interface RequestHistory {
  id: string;
  request: APIRequest;
  response?: APIResponse;
  timestamp: number;
  success: boolean;
}

export interface CurlParseResult {
  method?: HTTPMethod;
  url?: string;
  headers?: HeaderPair[];
  body?: RequestBody;
  auth?: AuthConfig;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
