import type { ParsedOutput } from '../app/types';
import { escapeHtml } from '../utils/escapeHtml';

const copyIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="9" y="9" width="10" height="10" rx="2" />
    <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1" />
  </svg>
`;

const downloadIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 4v11" />
    <path d="M8 11l4 4 4-4" />
    <path d="M5 19h14" />
  </svg>
`;

const collapseIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7 14l5-5 5 5" />
  </svg>
`;

const expandIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7 10l5 5 5-5" />
  </svg>
`;

function renderWarnings(warnings?: string[]): string {
  if (!warnings || warnings.length === 0) {
    return '';
  }

  return `
    <div class="warning-list">
      ${warnings.map((warning) => `<p>${escapeHtml(warning)}</p>`).join('')}
    </div>
  `;
}

export function renderResultPanel(parsed: ParsedOutput | null, _error: string | null, collapsed: boolean): string {
  const emptyMessage = 'No detected format yet. Supported parsers can register themselves through the detector pipeline.';

  return `
    <section class="panel output-panel ${collapsed ? 'panel-collapsed' : ''}">
      <div class="panel-head">
        <div>
          <p class="section-kicker">Output</p>
        </div>
        <div class="action-row">
          <button type="button" id="copy-output" class="icon-button" title="Copy formatted output" ${parsed ? '' : 'disabled'}>
            ${copyIcon}
            <span class="visually-hidden">Copy formatted output</span>
          </button>
          <button type="button" id="download-output" class="icon-button" title="Download formatted output" ${parsed ? '' : 'disabled'}>
            ${downloadIcon}
            <span class="visually-hidden">Download formatted output</span>
          </button>
          <button
            type="button"
            id="toggle-output"
            class="icon-button"
            title="${collapsed ? 'Expand output panel' : 'Collapse output panel'}"
            aria-expanded="${collapsed ? 'false' : 'true'}"
          >
            ${collapsed ? expandIcon : collapseIcon}
            <span class="visually-hidden">${collapsed ? 'Expand output panel' : 'Collapse output panel'}</span>
          </button>
        </div>
      </div>
      ${collapsed ? '' : renderWarnings(parsed?.warnings)}
      ${collapsed ? '' : `<pre class="output-view"><code>${escapeHtml(parsed?.prettyText ?? emptyMessage)}</code></pre>`}
    </section>
  `;
}
