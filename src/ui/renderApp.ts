import type { AppState } from '../app/types';
import { renderHeader } from './renderHeader';
import { renderInputPanel } from './renderInputPanel';
import { renderMetadataPanel } from './renderMetadataPanel';
import { renderResultPanel } from './renderResultPanel';

export function renderApp(state: AppState, inputCollapsed: boolean, outputCollapsed: boolean): string {
  const workspaceClassName = [
    'workspace',
    inputCollapsed && outputCollapsed ? 'workspace-both-collapsed' : '',
    inputCollapsed && !outputCollapsed ? 'workspace-input-collapsed' : '',
    outputCollapsed && !inputCollapsed ? 'workspace-output-collapsed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <div class="shell">
      ${renderHeader()}
      <main class="${workspaceClassName}">
        ${renderInputPanel(state.input, state.sourceName, inputCollapsed)}
        ${renderResultPanel(state.parsed, state.error, outputCollapsed)}
        ${renderMetadataPanel(state.parsed)}
      </main>
    </div>
  `;
}
