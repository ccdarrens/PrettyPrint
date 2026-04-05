import type { FormatDetector } from '../../app/types';
import { safeJsonParse } from '../../utils/safeJsonParse';
import { tryBase64Decode } from '../../utils/tryBase64Decode';

export const jwtDetector: FormatDetector = {
  id: 'jwt',
  detect(input) {
    const parts = input.trim().split('.');

    if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
      return null;
    }

    const header = tryBase64Decode(parts[0]);
    const payload = tryBase64Decode(parts[1]);

    if (!header || !payload) {
      return null;
    }

    const headerJson = safeJsonParse<Record<string, unknown>>(header.text);
    const payloadJson = safeJsonParse<Record<string, unknown>>(payload.text);

    if (!headerJson || !payloadJson) {
      return null;
    }

    return {
      format: 'jwt',
      confidence: 0.99,
      reason: 'Detected a three-part token with decodable JSON header and payload.',
    };
  },
};
