export function renderHeader(): string {
  return `
    <header class="hero">
      <div class="hero-brand">
        <img class="hero-logo" src="/logo.svg" alt="Pretty Print logo" width="64" height="64" />
        <div>
          <p class="eyebrow">Developer text tools</p>
          <h1>Pretty Print</h1>
        </div>
      </div>
      <p class="hero-note">Your data stays on this device for the entire session. No backend, no network calls.</p>
    </header>
  `;
}
