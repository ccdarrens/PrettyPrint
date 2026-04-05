import {
  BasicConstraintsExtension,
  ExtendedKeyUsageExtension,
  KeyUsagesExtension,
  SubjectAlternativeNameExtension,
  SubjectKeyIdentifierExtension,
  X509Certificate,
} from '@peculiar/x509';

function formatDate(value: Date): string {
  return value.toLocaleString();
}

function formatAlgorithm(value: Algorithm): string {
  const algorithm = value as unknown as Record<string, unknown>;
  const name = typeof algorithm.name === 'string' ? algorithm.name : 'Unknown';
  const hash =
    typeof algorithm.hash === 'object' && algorithm.hash !== null
      ? (algorithm.hash as { name?: string }).name
      : undefined;

  return hash ? `${name} (${hash})` : name;
}

function formatKeyUsages(flags: number): string[] {
  const values: Array<[number, string]> = [
    [1, 'Digital Signature'],
    [2, 'Non Repudiation'],
    [4, 'Key Encipherment'],
    [8, 'Data Encipherment'],
    [16, 'Key Agreement'],
    [32, 'Certificate Sign'],
    [64, 'CRL Sign'],
    [128, 'Encipher Only'],
    [256, 'Decipher Only'],
  ];

  return values.filter(([flag]) => (flags & flag) === flag).map(([, label]) => label);
}

function formatSan(extension: { names: { items: ReadonlyArray<{ type: string; value: string }> } } | null): string {
  if (!extension || extension.names.items.length === 0) {
    return 'Not present';
  }

  return extension.names.items.map((item) => `${item.type}:${item.value}`).join(', ');
}

function formatBasicConstraints(
  extension: BasicConstraintsExtension | null,
): string {
  if (!extension) {
    return 'Not present';
  }

  return `CA:${extension.ca ? 'TRUE' : 'FALSE'}${typeof extension.pathLength === 'number' ? `, pathlen:${extension.pathLength}` : ''}`;
}

function buildCertificateText(certificate: X509Certificate): string {
  const sanExtension = certificate.getExtension(SubjectAlternativeNameExtension);
  const keyUsageExtension = certificate.getExtension(KeyUsagesExtension);
  const extendedKeyUsageExtension = certificate.getExtension(ExtendedKeyUsageExtension);
  const basicConstraintsExtension = certificate.getExtension(BasicConstraintsExtension);
  const subjectKeyIdExtension = certificate.getExtension(SubjectKeyIdentifierExtension);

  return [
    'Certificate:',
    `  Subject: ${certificate.subject}`,
    `  Issuer: ${certificate.issuer}`,
    `  Serial Number: ${certificate.serialNumber}`,
    `  Not Before: ${formatDate(certificate.notBefore)}`,
    `  Not After : ${formatDate(certificate.notAfter)}`,
    `  Signature Algorithm: ${formatAlgorithm(certificate.signatureAlgorithm)}`,
    `  Public Key Algorithm: ${formatAlgorithm(certificate.publicKey.algorithm)}`,
    `  X509v3 Subject Alternative Name: ${formatSan(sanExtension)}`,
    `  X509v3 Key Usage: ${keyUsageExtension ? formatKeyUsages(keyUsageExtension.usages).join(', ') || 'Present but empty' : 'Not present'}`,
    `  X509v3 Extended Key Usage: ${extendedKeyUsageExtension ? extendedKeyUsageExtension.usages.join(', ') || 'Present but empty' : 'Not present'}`,
    `  X509v3 Basic Constraints: ${formatBasicConstraints(basicConstraintsExtension)}`,
    `  X509v3 Subject Key Identifier: ${subjectKeyIdExtension?.keyId ?? 'Not present'}`,
  ].join('\n');
}

export function parsePemCertificate(input: string) {
  const trimmed = input.trim();
  const lines = trimmed.split(/\r?\n/);

  try {
    const certificate = new X509Certificate(trimmed);

    return {
      format: 'certificate' as const,
      title: 'PEM certificate detected',
      summary: 'Parsed PEM certificate and extracted readable X.509 details.',
      prettyText: buildCertificateText(certificate),
      metadata: [
        { label: 'Subject', value: certificate.subject },
        { label: 'Issuer', value: certificate.issuer },
      ],
      sections: [],
    };
  } catch {
    return {
      format: 'certificate' as const,
      title: 'PEM certificate detected',
      summary:
        'Detected PEM certificate boundaries, but the certificate body could not be parsed as a valid X.509 certificate.',
      prettyText: trimmed,
      metadata: [
        { label: 'Header', value: lines[0] ?? 'Unknown' },
        { label: 'Footer', value: lines[lines.length - 1] ?? 'Unknown' },
        { label: 'Body lines', value: `${Math.max(lines.length - 2, 0)}` },
      ],
      sections: [
        {
          title: 'Certificate block',
          content:
            'The PEM boundaries were recognized, but the content could not be parsed into readable X.509 fields.',
        },
      ],
      warnings: ['This PEM block is not a valid certificate payload or is incomplete.'],
    };
  }
}
