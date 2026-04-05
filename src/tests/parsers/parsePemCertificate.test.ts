import { describe, expect, it } from 'vitest';
import { parsePemCertificate } from '../../parsers/parsePemCertificate';
import { sampleInputs } from '../fixtures/sampleInputs';

describe('parsePemCertificate', () => {
  it('renders human-readable X.509 details for valid certificates', () => {
    const result = parsePemCertificate(sampleInputs.certificateValid);

    expect(result.format).toBe('certificate');
    expect(result.summary).toBe('Parsed PEM certificate and extracted readable X.509 details.');
    expect(result.prettyText).toContain('Certificate:');
    expect(result.prettyText).toContain('Subject: OU=Samples, O=Pretty Print, CN=prettyprint.local');
    expect(result.prettyText).toContain('Issuer: OU=Samples, O=Pretty Print, CN=prettyprint.local');
    expect(result.metadata).toEqual([
      { label: 'Subject', value: 'OU=Samples, O=Pretty Print, CN=prettyprint.local' },
      { label: 'Issuer', value: 'OU=Samples, O=Pretty Print, CN=prettyprint.local' },
    ]);
    expect(result.warnings).toBeUndefined();
  });

  it('falls back to raw PEM block details when parsing fails', () => {
    const invalidPem = `-----BEGIN CERTIFICATE-----\nINVALID\n-----END CERTIFICATE-----`;
    const result = parsePemCertificate(invalidPem);

    expect(result.summary).toContain('could not be parsed as a valid X.509 certificate');
    expect(result.prettyText).toBe(invalidPem);
    expect(result.metadata).toEqual([
      { label: 'Header', value: '-----BEGIN CERTIFICATE-----' },
      { label: 'Footer', value: '-----END CERTIFICATE-----' },
      { label: 'Body lines', value: '1' },
    ]);
    expect(result.warnings).toEqual(['This PEM block is not a valid certificate payload or is incomplete.']);
  });
});
