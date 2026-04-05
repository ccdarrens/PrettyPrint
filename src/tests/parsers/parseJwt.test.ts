import { describe, expect, it } from 'vitest';
import { parseJwt } from '../../parsers/parseJwt';
import { sampleInputs } from '../fixtures/sampleInputs';

describe('parseJwt', () => {
  it('decodes header and payload sections', () => {
    const result = parseJwt(sampleInputs.jwt);

    expect(result.format).toBe('jwt');
    expect(result.prettyText).toContain('Header');
    expect(result.prettyText).toContain('"alg": "HS256"');
    expect(result.prettyText).toContain('Payload');
    expect(result.prettyText).toContain('"iss": "prettyprint"');
    expect(result.metadata).toEqual([
      { label: 'Algorithm', value: 'HS256' },
      { label: 'Type', value: 'JWT' },
      { label: 'Issuer', value: 'prettyprint' },
      { label: 'Subject', value: '1234567890' },
      expect.objectContaining({ label: 'Expires' }),
    ]);
    expect(result.warnings).toBeUndefined();
  });

  it('warns when the signature segment is unusually short', () => {
    const shortSignatureToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwcmV0dHlwcmludCIsInN1YiI6InNob3J0In0.x';
    const result = parseJwt(shortSignatureToken);

    expect(result.warnings).toEqual([
      'Signature segment is unusually short. Verify the token source before trusting it.',
    ]);
  });

  it('rejects malformed tokens', () => {
    expect(() => parseJwt('not.a.jwt')).toThrow('JWT segments could not be decoded.');
  });
});
