import type { AppState } from '../app/types';
import { renderHeader } from './renderHeader';
import { renderInputPanel } from './renderInputPanel';
import { renderMetadataPanel } from './renderMetadataPanel';
import { renderResultPanel } from './renderResultPanel';

export function renderApp(state: AppState, inputCollapsed: boolean): string {
  return `
    <div class="shell">
      ${renderHeader()}
      <main class="workspace ${inputCollapsed ? 'workspace-input-collapsed' : ''}">
        ${renderInputPanel(state.input, state.sourceName, inputCollapsed)}
        ${renderResultPanel(state.parsed, state.error)}
        ${renderMetadataPanel(state.parsed)}
      </main>
    </div>
  `;
}
