import type { FormatDetector } from '../../app/types';
import { safeJsonParse } from '../../utils/safeJsonParse';

export const jsonDetector: FormatDetector = {
  id: 'json',
  detect(input) {
    const parsed = safeJsonParse<unknown>(input);

    if (parsed === null) {
      return null;
    }

    if (typeof parsed === 'string' && safeJsonParse<unknown>(parsed) !== null) {
      return {
        format: 'stringified-json',
        confidence: 0.98,
        reason: 'Detected JSON text wrapped inside a JSON string.',
      };
    }

    return {
      format: 'json',
      confidence: 0.95,
      reason: 'Parsed successfully as JSON.',
    };
  },
};
