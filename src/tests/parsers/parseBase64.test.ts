import { describe, expect, it } from 'vitest';
import { parseBase64 } from '../../parsers/parseBase64';
import { sampleInputs } from '../fixtures/sampleInputs';

describe('parseBase64', () => {
  it('shows decoded readable text directly', () => {
    const result = parseBase64(sampleInputs.base64);

    expect(result.format).toBe('base64');
    expect(result.prettyText).toBe('This is a Base64 sample that decodes to readable text.');
    expect(result.metadata).toEqual([
      { label: 'Encoded length', value: '72 chars' },
      { label: 'Decoded size', value: '54 bytes' },
      { label: 'Content type', value: 'Plain text' },
    ]);
  });

  it('shows a hex preview for binary-looking payloads', () => {
    const result = parseBase64('AAECAwQFBgcICQ==');

    expect(result.prettyText).toContain('00 01 02 03 04 05 06 07 08 09');
    expect(result.metadata[2]).toEqual({ label: 'Content type', value: 'Binary data' });
  });

  it('rejects invalid Base64', () => {
    expect(() => parseBase64('not base64***')).toThrow('Input is not valid Base64.');
  });
});
