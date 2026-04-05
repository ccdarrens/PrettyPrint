import { describe, expect, it } from 'vitest';
import { parseXml } from '../../parsers/parseXml';
import { sampleInputs } from '../fixtures/sampleInputs';

describe('parseXml', () => {
  it('pretty-prints XML and extracts root metadata', () => {
    const result = parseXml(sampleInputs.xmlCompactOne);

    expect(result.format).toBe('xml');
    expect(result.metadata).toEqual([
      { label: 'Root element', value: 'catalog' },
      { label: 'Document type', value: 'None' },
    ]);
    expect(result.prettyText).toContain('<catalog generatedAt="2026-04-05T18:30:00Z" region="us-west">');
    expect(result.prettyText).toContain('  <service id="auth" enabled="true">');
    expect(result.prettyText).toContain('    <endpoint method="POST" path="/api/v1/login">');
  });

  it('keeps nested tags aligned', () => {
    const result = parseXml('<root><group><item>A</item><item>B</item></group><empty /></root>');

    expect(result.prettyText).toBe(`<root>
  <group>
    <item>A</item>
    <item>B</item>
  </group>
  <empty />
</root>`);
  });

  it('rejects malformed XML', () => {
    expect(() => parseXml('<root><item></root>')).toThrow('Input is not valid XML.');
  });
});
