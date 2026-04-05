import { prettySql } from '../formatters/prettySql';

export function parseSql(input: string) {
  const prettyText = prettySql(input);

  return {
    format: 'sql' as const,
    title: 'SQL detected',
    summary: 'Input starts with a common SQL statement keyword.',
    prettyText,
    metadata: [
      { label: 'Statement type', value: prettyText.split(/\s+/)[0] ?? 'Unknown' },
      { label: 'Length', value: `${input.trim().length.toLocaleString()} chars` },
    ],
    sections: [
      {
        title: 'Formatting',
        content: 'Common SQL keywords were normalized to uppercase and split onto separate lines.',
      },
    ],
  };
}
