import type { DetectionResult, FormatDetector } from '../app/types';
import { base64Detector } from './detectors/base64Detector';
import { jsonDetector } from './detectors/jsonDetector';
import { jwtDetector } from './detectors/jwtDetector';
import { pemDetector } from './detectors/pemDetector';
import { sqlDetector } from './detectors/sqlDetector';
import { urlEncodedDetector } from './detectors/urlEncodedDetector';
import { xmlDetector } from './detectors/xmlDetector';

const detectors: FormatDetector[] = [
  jwtDetector,
  jsonDetector,
  pemDetector,
  xmlDetector,
  urlEncodedDetector,
  sqlDetector,
  base64Detector,
];

export function detectFormat(input: string): DetectionResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      format: 'unknown',
      confidence: 0,
      reason: 'No input provided.',
    };
  }

  let bestMatch: DetectionResult | null = null;

  for (const detector of detectors) {
    const result = detector.detect(trimmed);

    if (!result) {
      continue;
    }

    if (!bestMatch || result.confidence > bestMatch.confidence) {
      bestMatch = result;
    }
  }

  return (
    bestMatch ?? {
      format: 'unknown',
      confidence: 0,
      reason: 'No known detector matched the input.',
    }
  );
}
