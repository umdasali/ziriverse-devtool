export interface JWTHeader {
  alg?: string;
  typ?: string;
  kid?: string;
  [key: string]: unknown;
}

export interface JWTPayload {
  sub?: string;
  iss?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: unknown;
}

export interface JWTDecodeResult {
  isValid: boolean;
  error?: string;
  header?: JWTHeader;
  payload?: JWTPayload;
  signature?: string;
  isExpired?: boolean;
  expiresAt?: Date;
  issuedAt?: Date;
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  try {
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return atob(base64);
  }
}

export function decodeJWT(token: string): JWTDecodeResult {
  const trimmed = token.trim();

  if (!trimmed) {
    return { isValid: false, error: "Token is empty" };
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return { isValid: false, error: `Expected 3 parts separated by dots, got ${parts.length}` };
  }

  try {
    const headerJson = base64UrlDecode(parts[0]);
    const header = JSON.parse(headerJson) as JWTHeader;

    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson) as JWTPayload;

    const signature = parts[2];

    const now = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp ? payload.exp < now : undefined;
    const expiresAt = payload.exp ? new Date(payload.exp * 1000) : undefined;
    const issuedAt = payload.iat ? new Date(payload.iat * 1000) : undefined;

    return {
      isValid: true,
      header,
      payload,
      signature,
      isExpired,
      expiresAt,
      issuedAt,
    };
  } catch (e) {
    return {
      isValid: false,
      error: e instanceof Error ? e.message : "Failed to decode token",
    };
  }
}
