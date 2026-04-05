import { prettyJson } from '../formatters/prettyJson';
import { safeJsonParse } from '../utils/safeJsonParse';

function describeJsonShape(value: unknown): string {
  if (Array.isArray(value)) {
    return `Array (${value.length} items)`;
  }

  if (value === null) {
    return 'Null';
  }

  switch (typeof value) {
    case 'object':
      return `Object (${Object.keys(value as Record<string, unknown>).length} keys)`;
    case 'string':
      return 'String';
    case 'number':
      return 'Number';
    case 'boolean':
      return 'Boolean';
    default:
      return 'Unknown';
  }
}

export function parseJson(input: string) {
  const parsed = safeJsonParse<unknown>(input);

  if (parsed === null || typeof parsed === 'string') {
    throw new Error('Input is not plain JSON.');
  }

  return {
    format: 'json' as const,
    title: 'JSON detected',
    summary: 'Parsed successfully as JSON.',
    prettyText: prettyJson(parsed),
    metadata: [
      { label: 'Structure', value: describeJsonShape(parsed) },
      { label: 'Top-level type', value: Array.isArray(parsed) ? 'array' : typeof parsed },
    ],
    sections: [
      {
        title: 'Normalization',
        content: 'The input was parsed and reformatted with two-space indentation for readability.',
      },
    ],
  };
}
