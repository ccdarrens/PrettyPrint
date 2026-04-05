export function prettyXml(input: string): string {
  const trimmed = input.trim().replace(/>\s*</g, '><');
  const parts = trimmed.replace(/></g, '>\n<').split('\n');
  let indent = 0;

  return parts
    .map((part) => {
      if (/^<\//.test(part)) {
        indent = Math.max(indent - 1, 0);
      }

      const line = `${'  '.repeat(indent)}${part}`;

      if (/^<[^!?/][^>]*[^/]>/ .test(part)) {
        indent += 1;
      }

      return line;
    })
    .join('\n');
}
