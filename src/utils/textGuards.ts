export function isLikelyBase64(input: string): boolean {
  const trimmed = input.trim();

  if (trimmed.length < 8 || trimmed.length % 4 === 1 || /\s/.test(trimmed)) {
    return false;
  }

  return /^[A-Za-z0-9+/=_-]+$/.test(trimmed);
}

export function estimatePrintableRatio(text: string): number {
  if (!text.length) {
    return 0;
  }

  let printable = 0;

  for (const char of text) {
    const code = char.charCodeAt(0);
    const isPrintable =
      code === 9 || code === 10 || code === 13 || (code >= 32 && code <= 126);

    if (isPrintable) {
      printable += 1;
    }
  }

  return printable / text.length;
}

export function looksLikeXml(input: string): boolean {
  const trimmed = input.trim();
  return trimmed.startsWith('<') && trimmed.endsWith('>');
}

export function looksLikePemCertificate(input: string): boolean {
  const trimmed = input.trim();
  return /-----BEGIN CERTIFICATE-----/.test(trimmed) && /-----END CERTIFICATE-----/.test(trimmed);
}

export function looksLikeSql(input: string): boolean {
  return /^\s*(select|insert|update|delete|create|alter|drop|with)\b/i.test(input);
}

export function looksLikeUrlEncoded(input: string): boolean {
  return /%[0-9A-Fa-f]{2}|\+/.test(input) && !/\s{2,}/.test(input);
}
