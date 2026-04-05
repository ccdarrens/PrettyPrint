const KEYWORDS = [
  'select',
  'from',
  'where',
  'insert',
  'into',
  'values',
  'update',
  'set',
  'delete',
  'join',
  'left join',
  'right join',
  'inner join',
  'outer join',
  'group by',
  'order by',
  'having',
  'limit',
  'create',
  'alter',
  'drop',
  'with',
  'union',
];

export function prettySql(input: string): string {
  let output = input.trim().replace(/\s+/g, ' ');

  for (const keyword of KEYWORDS.sort((a, b) => b.length - a.length)) {
    const pattern = new RegExp(`\\b${keyword.replace(/ /g, '\\s+')}\\b`, 'gi');
    output = output.replace(pattern, `\n${keyword.toUpperCase()}`);
  }

  return output.trim();
}
