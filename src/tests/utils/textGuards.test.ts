import { describe, expect, it } from 'vitest';
import { estimatePrintableRatio, isLikelyBase64, looksLikePemCertificate, looksLikeSql, looksLikeUrlEncoded, looksLikeXml } from '../../utils/textGuards';

describe('textGuards', () => {
  it('identifies likely Base64 payloads', () => {
    expect(isLikelyBase64('VGhpcyBpcyBhIHRlc3Q=')).toBe(true);
    expect(isLikelyBase64('bad data')).toBe(false);
  });

  it('calculates printable character ratios', () => {
    expect(estimatePrintableRatio('abc\n123')).toBe(1);
    expect(estimatePrintableRatio('\u0000\u0001ABC')).toBeCloseTo(0.6);
  });

  it('recognizes XML, PEM, SQL, and URL-encoded text', () => {
    expect(looksLikeXml('<root></root>')).toBe(true);
    expect(looksLikePemCertificate('-----BEGIN CERTIFICATE-----\nabc\n-----END CERTIFICATE-----')).toBe(true);
    expect(looksLikeSql('select * from users')).toBe(true);
    expect(looksLikeUrlEncoded('name=Pretty%20Print+App')).toBe(true);
  });
});
