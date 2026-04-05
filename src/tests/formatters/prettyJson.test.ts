import { describe, expect, it } from 'vitest';
import { prettyJson } from '../../formatters/prettyJson';

describe('prettyJson', () => {
  it('formats objects with two-space indentation', () => {
    expect(prettyJson({ tool: 'prettyprint', flags: ['local', 'fast'] })).toBe(`{
  "tool": "prettyprint",
  "flags": [
    "local",
    "fast"
  ]
}`);
  });
});
