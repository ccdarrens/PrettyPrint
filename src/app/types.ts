export type DetectedFormat =
  | 'json'
  | 'stringified-json'
  | 'jwt'
  | 'xml'
  | 'certificate'
  | 'base64'
  | 'url-encoded'
  | 'sql'
  | 'unknown';

export interface DetectionResult {
  format: DetectedFormat;
  confidence: number;
  reason: string;
}

export interface ParsedOutput {
  format: DetectedFormat;
  title: string;
  summary?: string;
  prettyText: string;
  metadata: Array<{ label: string; value: string }>;
  sections?: Array<{
    title: string;
    content: string;
  }>;
  warnings?: string[];
}

export interface AppState {
  input: string;
  sourceName?: string;
  parsed: ParsedOutput | null;
  error: string | null;
}

export interface FormatDetector {
  id: string;
  detect(input: string): DetectionResult | null;
}
