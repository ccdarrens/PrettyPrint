import type { ParsedOutput } from '../app/types';

function decodePart(value: string): string {
  return decodeURIComponent(value.replace(/\+/g, ' '));
}

export function parseUrlEncoded(input: string): ParsedOutput {
  const trimmed = input.trim();
  const parameters = trimmed
    .split('&')
    .filter((entry) => entry.length > 0)
    .map((entry) => {
      const [rawKey, ...rawValueParts] = entry.split('=');
      const rawValue = rawValueParts.join('=');
      const key = decodePart(rawKey ?? '');
      const value = decodePart(rawValue);

      return { key, value };
    });

  const prettyText = parameters.map(({ key, value }) => `${key}=${value}`).join('\n');

  return {
    format: 'url-encoded',
    title: 'URL-encoded text detected',
    summary: 'Input contains URL-encoded escape sequences.',
    prettyText,
    metadata: [
      { label: 'Encoded length', value: `${trimmed.length.toLocaleString()} chars` },
      { label: 'Parameters', value: `${parameters.length}` },
    ],
    sections: [
      {
        title: 'Decoding',
        content: 'Percent escapes and plus signs were decoded locally and formatted one parameter per line.',
      },
    ],
  };
}
