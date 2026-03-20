# Happy Hour Boise — CLAUDE.md

Project context for AI-assisted development. Read this before writing any code.

---

## What this app is

A React Native app (iOS + Android) that shows a curated list of happy hour venues in Boise, Idaho. Users can search and filter venues by attributes like dog-friendly, deal type, and open-now status. There is no backend, no authentication, and no user accounts in v1.

---

## Commands

```bash
npx expo start           # Start dev server (scan QR with Expo Go)
npx expo start --ios     # Open in iOS simulator
npx expo start --android # Open in Android emulator
npm run lint             # Run ESLint on .ts/.tsx files
npm run typecheck        # Run TypeScript type checking (no emit)
```

---

## Tech stack

| Tool | Choice | Notes |
|---|---|---|
| Framework | React Native via Expo (managed workflow) | Do not suggest ejecting or bare workflow |
| Language | TypeScript — strict mode | No `any` |
| Navigation | React Navigation — stack navigator | Screen names listed below |
| Time parsing | day.js | Use this, not date-fns or Moment |
| Data | Bundled JSON — no network calls | See data layer section |
| Styling | StyleSheet.create() | No inline styles, no Tailwind, no third-party UI libs |

---

## Project structure

```
/
├── assets/               # Icons, splash screen
├── data/
│   └── venues.json       # Source of truth for all venue data
├── src/
│   ├── screens/
│   │   ├── VenueListScreen.tsx
│   │   └── VenueDetailScreen.tsx
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── utils/
│   │   └── timeHelpers.ts  # Open-now logic lives here — see below
│   ├── constants/        # Colors, spacing, config values
│   └── types.ts          # Shared TypeScript interfaces/types
├── App.tsx
└── CLAUDE.md
```

**Entry point:** `index.ts` → `App.tsx` → `src/screens/VenueListScreen.tsx`

**Path alias:** `@/` maps to `src/` (configured in `tsconfig.json` and `babel.config.js`). Use `@/screens/Foo` instead of relative paths.

**Expo managed workflow** — no `/ios` or `/android` directories. Native builds go through EAS or `npx expo run:ios/android`.

**Environment variables:** Use `expo-constants` to access values. Add keys to `.env` (gitignored) and document them in `.env.example`.

---

## Code standards

- Functional components only — no class components
- Custom hooks for all business logic (e.g. `useVenues`, `useFilters`)
- Error boundaries at route level minimum
- ESLint uses the Airbnb config with `@typescript-eslint`. Key rules already disabled: `react/react-in-jsx-scope`, `import/extensions`

---

## Data layer

### How data flows

1. Venue data is maintained in a Google Sheet by the app owner
2. A Google Apps Script exports the sheet to `data/venues.json`
3. `venues.json` is committed to the repo and bundled into the app binary at build time
4. The app imports it directly — no fetch, no API, no backend

```ts
import venues from '../data/venues.json';
```

There is no runtime data fetching in v1. Do not suggest adding an API call or remote data source. If asked about data updates, the correct answer is always: update the Sheet → run export script → commit new `venues.json` → push to `main`.

### Venue type

```ts
// src/types.ts
export type DealType = 'BOGO' | 'percent_off' | 'dollar_off' | 'flat_price' | 'other';

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type VenueTag = 'dog_friendly' | 'patio' | 'live_music' | 'sports_tv' | 'heated_patio';

export type Venue = {
  id: string;               // Unique slug, e.g. "bier-depot"
  name: string;
  address: string;          // Full street address, Boise ID
  happyHourDays: Day[];     // e.g. ['mon', 'tue', 'wed', 'thu', 'fri']
  happyHourStart: string;   // 24h time string, e.g. "15:00"
  happyHourEnd: string;     // 24h time string, e.g. "18:00"
  dealTypes: DealType[];    // One or more
  tags: VenueTag[];         // One or more
  dealDescription: string;  // Human-readable, e.g. "$5 pints, half-price apps"
  hasFoodSpecials: boolean;
  phone?: string;           // Optional
  website?: string;         // Optional
  lastVerified: string;     // ISO date string, e.g. "2026-03-01"
};
```

Always import and use this type. Never use `any` for venue data.

---

## Navigation

Stack navigator with exactly two screens:

```ts
export type RootStackParamList = {
  VenueList: undefined;
  VenueDetail: { venueId: string };
};
```

- `VenueList` — main scrollable list with search bar and filter panel at top
- `VenueDetail` — full detail view for a single venue; receives `venueId` as param and looks up the venue from the imported JSON

Do not add additional screens in v1.

---

## Filter state

Filter state lives in `VenueListScreen` and is passed down as props. Shape:

```ts
export type FilterState = {
  searchQuery: string;
  openNow: boolean;
  hasFoodSpecials: boolean;
  tags: VenueTag[];
  dealTypes: DealType[];    // Empty array = no filter (show all)
};

const defaultFilters: FilterState = {
  searchQuery: '',
  openNow: false,
  hasFoodSpecials: false,
  tags: [],
  dealTypes: [],
};
```

All filters are additive (AND logic) — a venue must match every active filter to appear. Filters update in real time with no loading state needed (local data only).

---

## Open-now logic

This is the most complex piece of business logic. It lives exclusively in `src/utils/timeHelpers.ts`.

### Rules

- Compare current device day and time against `happyHourDays`, `happyHourStart`, `happyHourEnd`
- Use `day.js` for all time operations
- `happyHourStart` and `happyHourEnd` are 24h strings (`"HH:mm"`) — parse with `dayjs('2000-01-01 ' + time, 'YYYY-MM-DD HH:mm')`
- Happy hours do not span midnight in v1 — `happyHourEnd` is always later in the day than `happyHourStart`
- Day matching: map `dayjs().day()` (0=Sunday) to the `Day` type

### Implementation

```ts
// src/utils/timeHelpers.ts
import dayjs from 'dayjs';
import { Venue, Day } from '../types';

const dayjsDayToDay: Record<number, Day> = {
  0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat',
};

export function isVenueOpenNow(venue: Venue): boolean {
  const now = dayjs();
  const currentDay = dayjsDayToDay[now.day()];
  if (!venue.happyHourDays.includes(currentDay)) return false;

  const start = dayjs(`2000-01-01 ${venue.happyHourStart}`, 'YYYY-MM-DD HH:mm');
  const end   = dayjs(`2000-01-01 ${venue.happyHourEnd}`,   'YYYY-MM-DD HH:mm');
  const check = dayjs(`2000-01-01 ${now.format('HH:mm')}`,  'YYYY-MM-DD HH:mm');

  return check.isAfter(start) && check.isBefore(end);
}
```

Write unit tests for this function. Edge cases to cover: first minute of happy hour, last minute, one minute before, one minute after, wrong day.

---

## Styling — placeholder mode

The UX designer owns all visual design. Do not make styling decisions.
All screens and components must use bare-bones placeholder styling only:

- Views: transparent background, 1px solid border (`#ccc`), no border radius
- Text: system default size and color — no custom fonts, sizes, weights, or colors
- No shadows, elevation, or depth effects
- No padding or margin beyond the minimum needed for layout legibility
- No color fills on any container
- Spacing between elements: use a flat 8px or 16px gap — do not design a spacing system
- No icons — use plain text labels (e.g. `[ dog friendly ]` not a paw icon)
- No loading spinners — use a plain `<Text>Loading...</Text>`
- FlatList items: full-width row, 1px bottom border, 12px padding, nothing else

When in doubt, do less. The goal is structure and wiring, not appearance. A designer will replace all styles — write them in a way that is easy to delete.

---

## CI / build pipeline

- **EAS Build** (Expo Application Services) handles iOS and Android builds
- **GitHub Actions** triggers EAS builds on push to `main`
- `venues.json` must be committed before a build — it is bundled into the binary

---

## Out of scope for v1

Do not suggest or implement any of the following:

- User authentication or accounts
- Persisted user state (favorites, preferences)
- Push notifications
- A backend API or database
- Crowdsourced or user-submitted venue data
- Ratings or reviews
- Map view (deferred to v2)
- Anything outside Boise city limits