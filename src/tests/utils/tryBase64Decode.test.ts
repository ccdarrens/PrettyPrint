import { describe, expect, it } from 'vitest';
import { tryBase64Decode } from '../../utils/tryBase64Decode';

describe('tryBase64Decode', () => {
  it('decodes standard Base64 payloads', () => {
    expect(tryBase64Decode('SGVsbG8=')).toMatchObject({ text: 'Hello' });
  });

  it('decodes URL-safe Base64 payloads', () => {
    expect(tryBase64Decode('SGVsbG8td29ybGQ')).toMatchObject({ text: 'Hello-world' });
  });

  it('returns null for invalid input', () => {
    expect(tryBase64Decode('not***base64')).toBeNull();
  });
});
