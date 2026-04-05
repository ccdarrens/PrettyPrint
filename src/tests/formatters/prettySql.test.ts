import { describe, expect, it } from 'vitest';
import { prettySql } from '../../formatters/prettySql';

describe('prettySql', () => {
  it('uppercases known SQL keywords and splits them across lines', () => {
    expect(prettySql('select id, email from users where active = 1 order by created_at desc limit 25;')).toBe(`SELECT id, email 
FROM users 
WHERE active = 1 
ORDER BY created_at desc 
LIMIT 25;`);
  });
});
