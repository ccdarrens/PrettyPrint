const textDecoder = new TextDecoder();

function normalizeBase64(input: string): string {
  return input.replace(/-/g, '+').replace(/_/g, '/');
}

export function tryBase64Decode(input: string): { bytes: Uint8Array; text: string } | null {
  try {
    const normalized = normalizeBase64(input.trim());
    const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
    const binary = atob(normalized + padding);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return {
      bytes,
      text: textDecoder.decode(bytes),
    };
  } catch {
    return null;
  }
}
