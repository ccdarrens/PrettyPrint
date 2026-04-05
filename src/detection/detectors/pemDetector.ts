import type { FormatDetector } from '../../app/types';
import { looksLikePemCertificate } from '../../utils/textGuards';

export const pemDetector: FormatDetector = {
  id: 'certificate',
  detect(input) {
    if (!looksLikePemCertificate(input)) {
      return null;
    }

    return {
      format: 'certificate',
      confidence: 0.97,
      reason: 'Detected PEM certificate boundaries.',
    };
  },
};
