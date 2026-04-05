import type { FormatDetector } from '../../app/types';
import { looksLikeSql } from '../../utils/textGuards';

export const sqlDetector: FormatDetector = {
  id: 'sql',
  detect(input) {
    if (!looksLikeSql(input)) {
      return null;
    }

    return {
      format: 'sql',
      confidence: 0.76,
      reason: 'Input starts with a common SQL statement keyword.',
    };
  },
};
