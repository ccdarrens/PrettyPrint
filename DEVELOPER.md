# Developer Guide

## Stack

- Vite
- Vanilla TypeScript
- Static browser-only app
- No backend services
- GitHub Pages deployment from `main`

## Repository layout

- `src/app`: app entry point, shared app state, shared types
- `src/ui`: panel and shell rendering
- `src/detection`: format detection pipeline and detectors
- `src/parsers`: format-specific parsing into the shared parsed result model
- `src/formatters`: pretty-printers for structured text
- `src/utils`: helpers for parsing, clipboard, downloads, and guards
- `src/styles`: global, layout, and panel styles
- `samples`: manual test inputs for supported formats
- `public`: static assets copied directly into the build output
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow

## Result model

The app is centered around a shared detection and parse contract defined in `src/app/types.ts`.

- `DetectionResult`: selected format, confidence, and reason
- `ParsedOutput`: title, summary, pretty text, metadata, sections, and warnings

Detectors identify the likely format first. Parsers then convert that input into a common `ParsedOutput` shape so the UI can stay format-agnostic.

## Local development

Requirements:

- Node.js 20+
- npm

Commands:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Build and verification

Use `npm run build` as the main verification step. It runs TypeScript compilation and the Vite production build.

There is currently no automated unit test suite wired into the repo. The `src/tests` structure exists for future expansion, but the main validation today is:

- `npm run build`
- Manual inspection in the browser
- Manual checks with files from `samples/`

## GitHub Pages deployment

The repo uses a GitHub Actions workflow to build and publish the static site from `main`.

Expected GitHub configuration:

1. In GitHub repository settings, open `Settings -> Pages`.
2. Set `Source` to `GitHub Actions`.
3. Set the custom domain to `prettyprint.io`.
4. Enable HTTPS after DNS is resolving correctly.

Repository-side setup included here:

- `vite.config.ts` uses `base: '/'` for the custom domain
- `public/CNAME` contains `prettyprint.io`
- `.github/workflows/deploy.yml` builds and deploys `dist/`

DNS still has to be configured outside the repo.

## DNS for prettyprint.io

At the DNS provider for `prettyprint.io`, point the domain to GitHub Pages using GitHub's documented records for apex and `www` usage as needed. Keep this aligned with the GitHub Pages custom domain settings.

## Development guidelines

- Keep all parsing local to the browser
- Do not add backend dependencies or network calls for format inspection
- Prefer small, format-specific detector and parser modules
- Preserve the shared `ParsedOutput` contract when adding formats
- Add or update files in `samples/` when adding detector coverage
- Use `npm run build` before committing

## Adding a new format

1. Add or update a detector in `src/detection/detectors`.
2. Add a parser in `src/parsers`.
3. Add any formatter helpers needed in `src/formatters`.
4. Register the detector/parser in the app flow.
5. Add one or more representative files in `samples/`.
6. Verify with `npm run build` and manual browser checks.
