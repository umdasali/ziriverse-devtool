export interface UUIDResult {
  uuid: string;
  version: string;
  withoutDashes: string;
  uppercase: string;
}

export function generateUUID(): UUIDResult {
  const uuid = crypto.randomUUID();
  return {
    uuid,
    version: "v4",
    withoutDashes: uuid.replace(/-/g, ""),
    uppercase: uuid.toUpperCase(),
  };
}

export function generateBulkUUIDs(count: number): UUIDResult[] {
  const clamped = Math.min(Math.max(1, count), 1000);
  return Array.from({ length: clamped }, () => generateUUID());
}

export function validateUUID(input: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(input.trim());
}
