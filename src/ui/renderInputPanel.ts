import { escapeHtml } from '../utils/escapeHtml';

const uploadIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 16V5" />
    <path d="M8 9l4-4 4 4" />
    <path d="M5 19h14" />
  </svg>
`;

const clearIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
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

export function renderInputPanel(input: string, sourceName?: string, collapsed = false): string {
  return `
    <section class="panel input-panel ${collapsed ? 'panel-collapsed' : ''}">
      <div class="panel-head">
        <div>
          <p class="section-kicker">Input</p>
          <p class="panel-help">Paste JSON, JWT, Base64, XML, SQL or encoded text here ...</p>
        </div>
        <div class="action-row">
          <label for="file-input" class="icon-button" title="Upload file">
            ${uploadIcon}
            <span class="visually-hidden">Upload file</span>
          </label>
          <button type="button" id="clear-input" class="icon-button" title="Clear input">
            ${clearIcon}
            <span class="visually-hidden">Clear input</span>
          </button>
          <button type="button" id="toggle-input" class="icon-button" title="${collapsed ? 'Expand input panel' : 'Collapse input panel'}">
            ${collapsed ? expandIcon : collapseIcon}
            <span class="visually-hidden">${collapsed ? 'Expand input panel' : 'Collapse input panel'}</span>
          </button>
        </div>
      </div>
      <input id="file-input" class="visually-hidden" type="file" />
      ${collapsed ? '' : `${sourceName ? `<p class="source-badge">Loaded file: ${escapeHtml(sourceName)}</p>` : ''}
      <label class="visually-hidden" for="source-input">Input text</label>
      <textarea id="source-input" spellcheck="false" placeholder="Paste JSON, JWT, Base64, XML, SQL, PEM, or encoded text here...">${escapeHtml(input)}</textarea>`}
    </section>
  `;
}
