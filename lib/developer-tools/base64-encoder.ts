export interface Base64Result {
  output: string;
  isValid: boolean;
  error?: string;
  inputSize: number;
  outputSize: number;
}

export function encodeBase64(input: string): Base64Result {
  if (!input) {
    return { output: "", isValid: false, error: "Input is empty", inputSize: 0, outputSize: 0 };
  }

  try {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(input);
    const binary = Array.from(bytes)
      .map((b) => String.fromCharCode(b))
      .join("");
    const encoded = btoa(binary);

    return {
      output: encoded,
      isValid: true,
      inputSize: bytes.length,
      outputSize: encoded.length,
    };
  } catch (e) {
    return {
      output: "",
      isValid: false,
      error: e instanceof Error ? e.message : "Encoding failed",
      inputSize: 0,
      outputSize: 0,
    };
  }
}

export function decodeBase64(input: string): Base64Result {
  if (!input) {
    return { output: "", isValid: false, error: "Input is empty", inputSize: 0, outputSize: 0 };
  }

  try {
    const cleaned = input.replace(/\s/g, "");
    const binary = atob(cleaned);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    const decoded = decoder.decode(bytes);

    return {
      output: decoded,
      isValid: true,
      inputSize: cleaned.length,
      outputSize: decoded.length,
    };
  } catch (e) {
    return {
      output: "",
      isValid: false,
      error: "Invalid Base64 string",
      inputSize: input.length,
      outputSize: 0,
    };
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
