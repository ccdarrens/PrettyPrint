import { describe, expect, it } from 'vitest';
import { detectFormat } from '../../detection/detectFormat';
import { sampleInputs } from '../fixtures/sampleInputs';

describe('detectFormat', () => {
  it('detects plain JSON', () => {
    expect(detectFormat(sampleInputs.json)).toMatchObject({
      format: 'json',
      reason: 'Parsed successfully as JSON.',
    });
  });

  it('detects stringified JSON', () => {
    expect(detectFormat(sampleInputs.stringifiedJson)).toMatchObject({
      format: 'stringified-json',
    });
  });

  it('detects JWT ahead of generic Base64', () => {
    expect(detectFormat(sampleInputs.jwt)).toMatchObject({
      format: 'jwt',
      confidence: 0.99,
    });
  });

  it('detects XML', () => {
    expect(detectFormat(sampleInputs.xml)).toMatchObject({
      format: 'xml',
    });
  });

  it('detects PEM certificates', () => {
    expect(detectFormat(sampleInputs.certificateValid)).toMatchObject({
      format: 'certificate',
    });
  });

  it('detects readable Base64', () => {
    expect(detectFormat(sampleInputs.base64)).toMatchObject({
      format: 'base64',
      reason: 'Detected Base64 text that decodes into readable content.',
    });
  });

  it('detects URL-encoded text', () => {
    expect(detectFormat(sampleInputs.urlEncoded)).toMatchObject({
      format: 'url-encoded',
    });
  });

  it('detects SQL', () => {
    expect(detectFormat(sampleInputs.sql)).toMatchObject({
      format: 'sql',
    });
  });

  it('returns unknown when no detectors match', () => {
    expect(detectFormat(sampleInputs.unknown)).toEqual({
      format: 'unknown',
      confidence: 0,
      reason: 'No known detector matched the input.',
    });
  });

  it('returns unknown for blank input', () => {
    expect(detectFormat('   ')).toEqual({
      format: 'unknown',
      confidence: 0,
      reason: 'No input provided.',
    });
  });
});
