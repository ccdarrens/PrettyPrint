import { describe, expect, it } from 'vitest';
import { safeJsonParse } from '../../utils/safeJsonParse';

describe('safeJsonParse', () => {
  it('parses valid JSON', () => {
    expect(safeJsonParse<{ ok: boolean }>('{"ok":true}')).toEqual({ ok: true });
  });

  it('returns null for invalid JSON', () => {
    expect(safeJsonParse('{oops')).toBeNull();
  });
});
