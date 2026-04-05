import { prettyXml } from '../formatters/prettyXml';

export function parseXml(input: string) {
  const parser = new DOMParser();
  const documentNode = parser.parseFromString(input, 'application/xml');

  if (documentNode.querySelector('parsererror')) {
    throw new Error('Input is not valid XML.');
  }

  return {
    format: 'xml' as const,
    title: 'XML detected',
    summary: 'Input looks like an XML document.',
    prettyText: prettyXml(documentNode, input),
    metadata: [
      { label: 'Root element', value: documentNode.documentElement.nodeName },
      { label: 'Document type', value: documentNode.doctype?.name ?? 'None' },
    ],
    sections: [
      {
        title: 'Structure',
        content: 'The XML document was validated with DOMParser and indented for readability.',
      },
    ],
  };
}
