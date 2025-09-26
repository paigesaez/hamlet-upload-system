# Repository Guidelines

## Project Structure & Module Organization
The repository is structured around the Next.js App Router. Shared layout lives in `app/layout.tsx` and the default landing page in `app/page.tsx`. Feature workspaces such as `app/form-uploader`, `app/hamlet-dashboard`, `app/theme-switcher`, and `app/prototype-2` host route-specific UI and server handlers; keep feature assets confined to their route folder. Reusable presentation logic belongs in `components/`, with supporting hooks in `hooks/` and data/utility helpers in `utils/`. Global styles are split between `app/globals.css` and targeted overrides in `styles/datepicker.css`. Static assets land in `public/`, and operational helpers such as `scripts/monitor.sh` should stay in `scripts/`.

## Build, Test, and Development Commands
Run `npm run dev` to start the Turbopack-enabled dev server on `http://localhost:3000`. Use `npm run build` to generate a production bundle and `npm run start` to serve it locally. Execute `npm run lint` before submitting work; the Husky pre-push hook enforces it alongside `npx tsc --noEmit` for strict type-checking. Use `./scripts/monitor.sh` during local QA when the health endpoint is available at `http://localhost:3001/api/health`.

## Coding Style & Naming Conventions
The codebase is TypeScript-first with `strict` mode and an `@/*` path alias; import shared modules via `import { ... } from '@/components/...';` to avoid relative ladders. Follow the existing pattern of 2-space indentation, PascalCase component names (`FormUploader`), camelCase utilities (`handleDrop`), and kebab-case route folders (`form-uploader`). Prefer functional components with hooks, co-locate form schemas next to UI, and lean on Tailwind class utilities plus NextUI tokens for styling. ESLint extends `next/core-web-vitals`; resolve lint and accessibility warnings rather than silencing them.

## Testing Guidelines
There is no dedicated test runner yet, so every change must at minimum pass `npm run lint` and `npx tsc --noEmit`. When adding automated coverage, place component tests beside the source using the `*.test.tsx` suffix and exercise forms through React Testing Library. Document any manual QA steps in the PR description, including results of the health monitor script or API probes.

## Commit & Pull Request Guidelines
Recent commits (e.g., "Add Hamlet Dashboard with complete location-based data system") use imperative, capitalized subject lines without trailing punctuation; continue this format. Keep commits focused and reference relevant routes or components in the body. Pull requests should include a concise summary, screenshots or screen recordings for UI changes, manual test notes, linked issues, and callouts for schema/API updates.
