import { describe, expect, it } from 'vitest';
import { parseUrlEncoded } from '../../parsers/parseUrlEncoded';
import { sampleInputs } from '../fixtures/sampleInputs';

describe('parseUrlEncoded', () => {
  it('decodes one parameter per line', () => {
    const result = parseUrlEncoded(sampleInputs.urlEncoded);

    expect(result.format).toBe('url-encoded');
    expect(result.prettyText).toBe(`name=PrettyPrint
mode=local only
feature=upload+detect`);
    expect(result.metadata).toEqual([
      { label: 'Encoded length', value: '58 chars' },
      { label: 'Parameters', value: '3' },
    ]);
  });

  it('decodes complex encoded content and repeated keys', () => {
    const result = parseUrlEncoded(sampleInputs.urlEncodedComplexOne);

    expect(result.prettyText).toContain('redirect=https://example.com/callback?code=abc123&state=ready');
    expect(result.prettyText).toContain('notes=second value with spaces');
    expect(result.prettyText).toContain('notes=emoji check');
    expect(result.metadata[1]).toEqual({ label: 'Parameters', value: '10' });
  });
});
