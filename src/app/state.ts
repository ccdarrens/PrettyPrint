import { detectFormat } from '../detection/detectFormat';
import { parseBase64 } from '../parsers/parseBase64';
import { parseJson } from '../parsers/parseJson';
import { parseJwt } from '../parsers/parseJwt';
import { parsePemCertificate } from '../parsers/parsePemCertificate';
import { parseSql } from '../parsers/parseSql';
import { parseStringifiedJson } from '../parsers/parseStringifiedJson';
import { parseUrlEncoded } from '../parsers/parseUrlEncoded';
import { parseXml } from '../parsers/parseXml';
import type { AppState, ParsedOutput } from './types';

export const SAMPLE_INPUT = `{
  "tool": "prettyprint",
  "enabled": true,
  "features": ["json", "jwt", "base64"]
}`;

function parseDetectedInput(input: string): ParsedOutput | null {
  const detection = detectFormat(input);

  switch (detection.format) {
    case 'json':
      return parseJson(input);
    case 'stringified-json':
      return parseStringifiedJson(input);
    case 'jwt':
      return parseJwt(input);
    case 'xml':
      return parseXml(input);
    case 'certificate':
      return parsePemCertificate(input);
    case 'base64':
      return parseBase64(input);
    case 'url-encoded':
      return parseUrlEncoded(input);
    case 'sql':
      return parseSql(input);
    default:
      return null;
  }
}

export function deriveAppState(input: string, sourceName?: string): AppState {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      input,
      sourceName,
      parsed: null,
      error: null,
    };
  }

  try {
    return {
      input,
      sourceName,
      parsed: parseDetectedInput(input),
      error: null,
    };
  } catch (error) {
    return {
      input,
      sourceName,
      parsed: null,
      error: error instanceof Error ? error.message : 'Unable to parse input.',
    };
  }
}
