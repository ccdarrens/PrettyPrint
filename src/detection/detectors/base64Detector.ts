import type { FormatDetector } from '../../app/types';
import { estimatePrintableRatio, isLikelyBase64 } from '../../utils/textGuards';
import { tryBase64Decode } from '../../utils/tryBase64Decode';

export const base64Detector: FormatDetector = {
  id: 'base64',
  detect(input) {
    if (!isLikelyBase64(input)) {
      return null;
    }

    const decoded = tryBase64Decode(input);

    if (!decoded) {
      return null;
    }

    const printableRatio = estimatePrintableRatio(decoded.text);

    return {
      format: 'base64',
      confidence: printableRatio >= 0.75 ? 0.9 : 0.72,
      reason:
        printableRatio >= 0.75
          ? 'Detected Base64 text that decodes into readable content.'
          : 'Detected Base64 text that appears to decode into binary data.',
    };
  },
};
