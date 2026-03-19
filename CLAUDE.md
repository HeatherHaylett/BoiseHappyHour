# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npx expo start          # Start dev server (scan QR with Expo Go)
npx expo start --ios    # Open in iOS simulator
npx expo start --android # Open in Android emulator
npm run lint            # Run ESLint on .ts/.tsx files
npm run typecheck       # Run TypeScript type checking (no emit)
```

## Architecture

**Entry point:** `index.ts` → `App.tsx` → `src/screens/HomeScreen.tsx`

**Path alias:** `@/` maps to `src/` (configured in `tsconfig.json` and `babel.config.js`). Use `@/screens/Foo` instead of relative paths.

**Folder structure under `src/`:**
- `screens/` — top-level screen components rendered by `App.tsx`
- `components/` — reusable UI components
- `hooks/` — custom React hooks
- `utils/` — helper functions
- `constants/` — colors, spacing, config values
- `types/` — shared TypeScript interfaces/types
- `assets/` — images, fonts, icons

**Expo managed workflow** — no `/ios` or `/android` directories. Native builds go through EAS or `npx expo run:ios/android`.

**Environment variables:** Use `expo-constants` to access values. Add keys to `.env` (gitignored) and document them in `.env.example`.

- Styling: StyleSheet.create() — no inline styles, no Tailwind

## Code Standards
- Functional components only. No class components.
- Custom hooks for ALL business logic (useAuth, useCart, etc.)
- Error boundaries at route level minimum

## Linting

ESLint uses the Airbnb config with `@typescript-eslint`. Key rules already disabled: `react/react-in-jsx-scope`, `import/extensions`.
