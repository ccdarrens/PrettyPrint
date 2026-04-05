import type { ParsedOutput } from '../app/types';
import { escapeHtml } from '../utils/escapeHtml';

function renderSummaryBanner(parsed: ParsedOutput | null): string {
  if (!parsed) {
    return '<div class="banner">Ready for JSON, stringified JSON, JWT, Base64, XML, SQL, PEM, and more via plugins.</div>';
  }

  return `<div class="banner banner-detected">${escapeHtml(
    parsed.summary ?? `${parsed.title} was detected and normalized locally.`,
  )}</div>`;
}

function renderMetadata(parsed: ParsedOutput | null): string {
  const items = parsed?.metadata ?? [];

  if (items.length === 0) {
    return '<p class="empty-copy">No extracted metadata.</p>';
  }

  return items
    .map(
      (item) => `
        <div class="meta-row">
          <dt>${escapeHtml(item.label)}</dt>
          <dd>${escapeHtml(item.value)}</dd>
        </div>
      `,
    )
    .join('');
}

function renderSections(parsed: ParsedOutput | null): string {
  const sections = parsed?.sections ?? [];

  if (sections.length === 0) {
    return '<p class="empty-copy">No extra details available.</p>';
  }

  return sections
    .map(
      (section) => `
        <article class="detail-card">
          <h3>${escapeHtml(section.title)}</h3>
          <p>${escapeHtml(section.content)}</p>
        </article>
      `,
    )
    .join('');
}

export function renderMetadataPanel(parsed: ParsedOutput | null): string {
  return `
    <aside class="panel details-panel">
      <div class="panel-head">
        <div>
          <p class="section-kicker">Details</p>
          <h2>${escapeHtml(parsed?.title ?? 'Extracted metadata')}</h2>
        </div>
      </div>
      ${renderSummaryBanner(parsed)}
      <dl class="meta-list">${renderMetadata(parsed)}</dl>
      <div class="detail-list">${renderSections(parsed)}</div>
    </aside>
  `;
}
