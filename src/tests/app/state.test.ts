import { describe, expect, it } from 'vitest';
import { deriveAppState } from '../../app/state';
import { sampleInputs } from '../fixtures/sampleInputs';

describe('deriveAppState', () => {
  it('returns an empty state for blank input', () => {
    expect(deriveAppState('   ')).toEqual({
      input: '   ',
      sourceName: undefined,
      parsed: null,
      error: null,
    });
  });

  it('parses supported input and preserves the source name', () => {
    const state = deriveAppState(sampleInputs.json, 'example.json');

    expect(state.error).toBeNull();
    expect(state.sourceName).toBe('example.json');
    expect(state.parsed?.format).toBe('json');
  });

  it('surfaces parser errors for malformed XML', () => {
    const state = deriveAppState('<root><item></root>');

    expect(state.parsed).toBeNull();
    expect(state.error).toBe('Input is not valid XML.');
  });

  it('returns no parse result and no error for unknown input', () => {
    const state = deriveAppState(sampleInputs.unknown);

    expect(state.parsed).toBeNull();
    expect(state.error).toBeNull();
  });
});
