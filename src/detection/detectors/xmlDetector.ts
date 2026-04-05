import type { FormatDetector } from '../../app/types';
import { looksLikeXml } from '../../utils/textGuards';

export const xmlDetector: FormatDetector = {
  id: 'xml',
  detect(input) {
    if (!looksLikeXml(input)) {
      return null;
    }

    return {
      format: 'xml',
      confidence: 0.78,
      reason: 'Input looks like an XML document.',
    };
  },
};
