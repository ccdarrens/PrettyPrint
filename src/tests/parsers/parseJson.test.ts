import { describe, expect, it } from 'vitest';
import { parseJson } from '../../parsers/parseJson';
import { parseStringifiedJson } from '../../parsers/parseStringifiedJson';
import { sampleInputs } from '../fixtures/sampleInputs';

describe('parseJson', () => {
  it('parses object JSON into the shared output contract', () => {
    const result = parseJson(sampleInputs.json);

    expect(result.format).toBe('json');
    expect(result.metadata).toEqual([
      { label: 'Structure', value: 'Object (3 keys)' },
      { label: 'Top-level type', value: 'object' },
    ]);
    expect(result.prettyText).toContain('"service": "prettyprint"');
  });

  it('describes top-level arrays correctly', () => {
    const result = parseJson(sampleInputs.jsonArray);

    expect(result.metadata).toEqual([
      { label: 'Structure', value: 'Array (10 items)' },
      { label: 'Top-level type', value: 'array' },
    ]);
  });

  it('rejects stringified JSON payloads', () => {
    expect(() => parseJson(sampleInputs.stringifiedJson)).toThrow('Input is not plain JSON.');
  });
});

describe('parseStringifiedJson', () => {
  it('unwraps a JSON string and pretty-prints the nested payload', () => {
    const result = parseStringifiedJson(sampleInputs.stringifiedJson);

    expect(result.format).toBe('stringified-json');
    expect(result.prettyText).toBe(`{
  "service": "prettyprint",
  "flags": [
    "upload",
    "local-only"
  ],
  "active": true
}`);
    expect(result.metadata).toEqual([
      { label: 'Decoded length', value: '71 chars' },
      { label: 'Container', value: 'JSON string literal' },
    ]);
  });

  it('rejects strings that do not contain JSON', () => {
    expect(() => parseStringifiedJson('"not json"')).toThrow('String content is not valid JSON.');
  });
});
