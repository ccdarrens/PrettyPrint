import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const fixtureDirectory = dirname(fileURLToPath(import.meta.url));
const samplesDirectory = resolve(fixtureDirectory, '../../../samples');

function readSample(filename: string): string {
  return readFileSync(resolve(samplesDirectory, filename), 'utf8');
}

export const sampleInputs = {
  json: readSample('json-example.json'),
  jsonArray: readSample('json-array-example.json'),
  stringifiedJson: readSample('stringified-json-example.txt'),
  jwt: readSample('jwt-example.txt'),
  xml: readSample('xml-example.xml'),
  xmlCompactOne: readSample('xml-compact-example-1.xml'),
  xmlCompactTwo: readSample('xml-compact-example-2.xml'),
  certificateValid: readSample('valid-certificate-example.pem'),
  base64: readSample('base64-example.txt'),
  urlEncoded: readSample('url-encoded-example.txt'),
  urlEncodedComplexOne: readSample('url-encoded-complex-example-1.txt'),
  urlEncodedComplexTwo: readSample('url-encoded-complex-example-2.txt'),
  sql: readSample('sql-example.sql'),
  unknown: readSample('unknown-example.txt'),
};
