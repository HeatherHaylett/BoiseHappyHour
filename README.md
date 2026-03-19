# 🍺 Happy Hour Boise

> Find the best happy hour deals in Boise, Idaho — dog-friendly patios, BOGO drinks, half-price apps, and more. All in one place, always verified.

---

## What it is

Happy Hour Boise is a React Native app (iOS + Android) that consolidates happy hour information across Boise venues into a single, searchable, filterable list. No accounts, no ads, no noise — just the details you actually need when you're standing on a sidewalk trying to figure out where to go.

**The problem it solves:** Happy hour info is scattered across Google, Yelp, and individual restaurant websites. Deal specifics (BOGO? $1 off? food or drinks?) and details like dog-friendly patios are rarely in one place and often outdated. This app fixes that with a manually curated, regularly verified dataset.

---

## Features (v1)

- Browse all Boise happy hour venues in a scrollable list
- Search by venue name
- Filter by: open right now, dog-friendly, food specials, drink specials, deal type
- Full venue detail: hours, days, deal breakdown, address, phone, website
- Works completely offline — no network required
- All data manually verified by a human

---

## Tech stack

| | |
|---|---|
| Framework | React Native + Expo (managed workflow) |
| Language | TypeScript (strict) |
| Navigation | React Navigation |
| Time logic | day.js |
| Data | Bundled JSON — no backend |
| CI/CD | GitHub Actions + EAS Build |

---

## Project structure

```
/
├── assets/               # App icon, splash screen
├── data/
│   └── venues.json       # All venue data — source of truth
├── src/
│   ├── screens/
│   │   ├── VenueListScreen.tsx
│   │   └── VenueDetailScreen.tsx
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   │   └── timeHelpers.ts
│   ├── constants/
│   └── types.ts
├── .claude/
│   └── settings.json     # Claude Code hooks
├── .github/
│   └── workflows/
│       ├── ci.yml         # Lint, typecheck, expo export on every push
│       └── build.yml      # EAS production build on push to main
├── docs/
│   └── PRD.md
├── CLAUDE.md
└── README.md
```

---

## Getting started

**Prerequisites:** Node 20+, Expo CLI, Expo Go app on your phone (for device testing)

```bash
git clone https://github.com/YOUR_USERNAME/happy-hour-boise.git
cd happy-hour-boise
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS) or the Camera app (Android).

```bash
npx expo start --ios      # iOS simulator
npx expo start --android  # Android emulator
```

---

## Development

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript check (no emit)
npm test            # Jest unit tests
```

Git hooks (via Husky) run lint and typecheck automatically on every commit.

Claude Code hooks run lint, typecheck, and tests automatically during AI-assisted development — see `.claude/settings.json`.

---

## Data pipeline

Venue data lives in a Google Sheet maintained by the app owner. To update it:

1. Edit the Sheet
2. Run **Happy Hour → Export venues.json** from the Sheet toolbar
3. Download `venues.json` from Google Drive
4. Replace `data/venues.json` in this repo
5. Commit and push → triggers a new build automatically

There is no backend. `venues.json` is bundled into the app binary at build time.

---

## Contributing

This is a private project. If you're a collaborator:

- Read `CLAUDE.md` before writing any code
- Read `docs/PRD.md` for product context
- Pick up issues from the [GitHub Project board](../../projects)
- One issue per branch, one PR per issue
- PRs require passing CI before merging

---

## Roadmap

See `docs/PRD.md` for the full product vision. High-level:

- **v1** — curated list, search, filters, offline, Boise only
- **v2** — map view, saved favorites, user accounts
- **Future** — crowdsourced updates, venue owner portal, additional cities

---

## License

Private — all rights reserved.
