import { prettyJson } from '../formatters/prettyJson';
import { safeJsonParse } from '../utils/safeJsonParse';

export function parseStringifiedJson(input: string) {
  const parsed = safeJsonParse<unknown>(input);

  if (typeof parsed !== 'string') {
    throw new Error('Input is not stringified JSON.');
  }

  const nested = safeJsonParse<unknown>(parsed);

  if (nested === null) {
    throw new Error('String content is not valid JSON.');
  }

  return {
    format: 'stringified-json' as const,
    title: 'Stringified JSON detected',
    summary: 'Detected JSON text wrapped inside a JSON string.',
    prettyText: prettyJson(nested),
    metadata: [
      { label: 'Decoded length', value: `${parsed.length.toLocaleString()} chars` },
      { label: 'Container', value: 'JSON string literal' },
    ],
    sections: [
      {
        title: 'Decoding',
        content: 'The outer JSON string was unescaped and the inner JSON payload was pretty-printed.',
      },
    ],
  };
}
