import { describe, expect, it } from 'vitest';
import { prettyXml } from '../../formatters/prettyXml';

describe('prettyXml', () => {
  it('formats nested XML with aligned indentation', () => {
    const input = '<?xml version="1.0"?><root><item id="1"><name>Alpha</name><enabled>true</enabled></item><empty /></root>';
    const documentNode = new DOMParser().parseFromString(input, 'application/xml');

    expect(prettyXml(documentNode, input)).toBe(`<?xml version="1.0"?>
<root>
  <item id="1">
    <name>Alpha</name>
    <enabled>true</enabled>
  </item>
  <empty />
</root>`);
  });
});
