import 'reflect-metadata/Reflect';
import '../styles/global.css';
import '../styles/layout.css';
import '../styles/panels.css';
import { deriveAppState, SAMPLE_INPUT } from './state';
import { renderApp } from '../ui/renderApp';
import { copyText } from '../utils/clipboard';
import { downloadText } from '../utils/download';
import { readLocalFile } from '../utils/readLocalFile';
import type { AppState, DetectedFormat } from './types';

const appRoot = document.querySelector<HTMLElement>('#app');

if (!appRoot) {
  throw new Error('App root was not found.');
}

const rootElement: HTMLElement = appRoot;
let state: AppState = deriveAppState(SAMPLE_INPUT);
let inputCollapsed = false;

function getExtension(format: DetectedFormat): string {
  switch (format) {
    case 'json':
    case 'stringified-json':
      return 'json';
    case 'jwt':
      return 'jwt';
    case 'xml':
      return 'xml';
    case 'certificate':
      return 'pem';
    case 'base64':
      return 'txt';
    case 'url-encoded':
      return 'txt';
    case 'sql':
      return 'sql';
    default:
      return 'txt';
  }
}

function getBaseName(filename: string): string {
  return filename.replace(/\.[^.]+$/, '');
}

function getDateStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

function createDownloadFilename(): string {
  const format = state.parsed?.format ?? 'unknown';
  const extension = getExtension(format);

  if (state.sourceName) {
    return `${getBaseName(state.sourceName)}-pretty.${extension}`;
  }

  return `pretty-${getDateStamp()}.${extension}`;
}

function bindEvents(): void {
  const textarea = rootElement.querySelector<HTMLTextAreaElement>('#source-input');
  const clearButton = rootElement.querySelector<HTMLButtonElement>('#clear-input');
  const toggleInputButton = rootElement.querySelector<HTMLButtonElement>('#toggle-input');
  const copyButton = rootElement.querySelector<HTMLButtonElement>('#copy-output');
  const downloadButton = rootElement.querySelector<HTMLButtonElement>('#download-output');
  const fileInput = rootElement.querySelector<HTMLInputElement>('#file-input');

  textarea?.addEventListener('input', (event) => {
    const nextValue = (event.target as HTMLTextAreaElement).value;
    state = deriveAppState(nextValue);
    render();
  });

  clearButton?.addEventListener('click', () => {
    state = deriveAppState('');
    render();
    if (!inputCollapsed) {
      rootElement.querySelector<HTMLTextAreaElement>('#source-input')?.focus();
    }
  });

  toggleInputButton?.addEventListener('click', () => {
    inputCollapsed = !inputCollapsed;
    render();
  });

  copyButton?.addEventListener('click', async () => {
    if (!state.parsed) {
      return;
    }

    await copyText(state.parsed.prettyText);
  });

  downloadButton?.addEventListener('click', () => {
    if (!state.parsed) {
      return;
    }

    downloadText(createDownloadFilename(), state.parsed.prettyText);
  });

  fileInput?.addEventListener('change', async (event) => {
    const selectedFile = (event.target as HTMLInputElement).files?.[0];

    if (!selectedFile) {
      return;
    }

    const contents = await readLocalFile(selectedFile);
    inputCollapsed = false;
    state = deriveAppState(contents, selectedFile.name);
    render();
  });
}

function render(): void {
  rootElement.innerHTML = renderApp(state, inputCollapsed);
  bindEvents();
}

render();
