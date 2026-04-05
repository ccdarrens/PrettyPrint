import { describe, expect, it } from 'vitest';
import { parseSql } from '../../parsers/parseSql';
import { sampleInputs } from '../fixtures/sampleInputs';

describe('parseSql', () => {
  it('formats SQL and reports the statement type', () => {
    const result = parseSql(sampleInputs.sql);

    expect(result.format).toBe('sql');
    expect(result.prettyText).toBe(`SELECT id, email, created_at 
FROM users 
WHERE active = 1 
ORDER BY created_at desc 
LIMIT 25;`);
    expect(result.metadata).toEqual([
      { label: 'Statement type', value: 'SELECT' },
      { label: 'Length', value: '91 chars' },
    ]);
  });
});
