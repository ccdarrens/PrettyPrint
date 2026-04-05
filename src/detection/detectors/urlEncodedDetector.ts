import type { FormatDetector } from '../../app/types';
import { looksLikeUrlEncoded } from '../../utils/textGuards';

export const urlEncodedDetector: FormatDetector = {
  id: 'url-encoded',
  detect(input) {
    if (!looksLikeUrlEncoded(input)) {
      return null;
    }

    return {
      format: 'url-encoded',
      confidence: 0.7,
      reason: 'Input contains URL-encoded escape sequences.',
    };
  },
};
