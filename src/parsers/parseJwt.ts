import { prettyJson } from '../formatters/prettyJson';
import { safeJsonParse } from '../utils/safeJsonParse';
import { tryBase64Decode } from '../utils/tryBase64Decode';

function formatUnixTimestamp(value: unknown): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 'Not set';
  }

  return new Date(value * 1000).toLocaleString();
}

export function parseJwt(input: string) {
  const parts = input.trim().split('.');

  if (parts.length !== 3) {
    throw new Error('Input is not a valid JWT.');
  }

  const header = tryBase64Decode(parts[0]);
  const payload = tryBase64Decode(parts[1]);

  if (!header || !payload) {
    throw new Error('JWT segments could not be decoded.');
  }

  const headerJson = safeJsonParse<Record<string, unknown>>(header.text);
  const payloadJson = safeJsonParse<Record<string, unknown>>(payload.text);

  if (!headerJson || !payloadJson) {
    throw new Error('JWT header or payload is not valid JSON.');
  }

  return {
    format: 'jwt' as const,
    title: 'JWT detected',
    summary: 'Detected a three-part token with decodable JSON header and payload.',
    prettyText: [
      'Header',
      prettyJson(headerJson),
      '',
      'Payload',
      prettyJson(payloadJson),
      '',
      'Signature',
      parts[2],
    ].join('\n'),
    metadata: [
      { label: 'Algorithm', value: String(headerJson.alg ?? 'Unknown') },
      { label: 'Type', value: String(headerJson.typ ?? 'JWT') },
      { label: 'Issuer', value: String(payloadJson.iss ?? 'Not set') },
      { label: 'Subject', value: String(payloadJson.sub ?? 'Not set') },
      {
        label: 'Expires',
        value: formatUnixTimestamp(payloadJson.exp),
      },
    ],
    sections: [
      {
        title: 'Header claims',
        content: `Token header fields: ${Object.keys(headerJson).join(', ') || 'none'}.`,
      },
      {
        title: 'Payload claims',
        content: `Token payload fields: ${Object.keys(payloadJson).join(', ') || 'none'}.`,
      },
    ],
    warnings:
      parts[2].length < 16
        ? ['Signature segment is unusually short. Verify the token source before trusting it.']
        : undefined,
  };
}
