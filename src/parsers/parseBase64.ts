import { tryBase64Decode } from '../utils/tryBase64Decode';
import { estimatePrintableRatio } from '../utils/textGuards';

function bytesToHexPreview(bytes: Uint8Array, maxBytes = 64): string {
  return Array.from(bytes.slice(0, maxBytes), (value) => value.toString(16).padStart(2, '0')).join(' ');
}

function guessDecodedKind(text: string): string {
  const trimmed = text.trim();

  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return 'Looks like JSON';
  }

  if (trimmed.startsWith('<')) {
    return 'Looks like XML or HTML';
  }

  return 'Plain text';
}

export function parseBase64(input: string) {
  const decoded = tryBase64Decode(input);

  if (!decoded) {
    throw new Error('Input is not valid Base64.');
  }

  const printableRatio = estimatePrintableRatio(decoded.text);
  const isText = printableRatio >= 0.75;

  return {
    format: 'base64' as const,
    title: 'Base64 detected',
    summary:
      printableRatio >= 0.75
        ? 'Detected Base64 text that decodes into readable content.'
        : 'Detected Base64 text that appears to decode into binary data.',
    prettyText: isText ? decoded.text : bytesToHexPreview(decoded.bytes),
    metadata: [
      { label: 'Encoded length', value: `${input.trim().length.toLocaleString()} chars` },
      { label: 'Decoded size', value: `${decoded.bytes.byteLength.toLocaleString()} bytes` },
      { label: 'Content type', value: isText ? guessDecodedKind(decoded.text) : 'Binary data' },
    ],
    sections: [
      {
        title: 'Decoded preview',
        content: isText
          ? 'The payload decoded successfully to readable text and is shown directly.'
          : 'The payload decoded successfully, but it appears to be binary. A hex preview is shown instead.',
      },
    ],
  };
}
