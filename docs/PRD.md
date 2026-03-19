# Product Requirements Document

**App:** Happy Hour Boise
**Platform:** React Native (iOS + Android)
**Release:** v1.0 — MVP
**Status:** Draft

---

## 1. Problem & goals

### 1.1 Problem statement

When Boise residents spontaneously decide to go to happy hour, they face a fragmented and time-consuming research process. Finding basic information — what are the happy hour times, what deals are offered, is the patio dog-friendly — requires searching across Google, Yelp, and individual restaurant websites. This information is rarely consolidated in one place, often outdated, and requires significant effort to verify.

The result: groups default to familiar spots rather than discovering new venues, and the spontaneous nature of happy hour decisions is killed by research overhead.

### 1.2 Goals

- Become the go-to resource for happy hour discovery in Boise, Idaho
- Reduce time-to-decision for groups choosing a happy hour venue
- Surface hard-to-find venue details (dog-friendly, deal specifics) in a single view
- Establish a trusted, manually curated dataset that users can rely on

### 1.3 Non-goals (v1)

- User accounts, authentication, or saved favorites
- User-generated reviews or ratings
- Venue owner self-service portal
- Push notifications or personalized recommendations
- Expansion beyond Boise city limits
- Monetization — to be determined post-launch based on traction

---

## 2. Target users

| Persona | Description | Core need |
|---|---|---|
| The Social Planner | Organizes outings for a group; needs to quickly filter by constraints | Filter by specific attributes fast |
| The Spontaneous Explorer | Out with friends, decides in the moment to find a nearby happy hour | Find something close, right now |
| The Dog Parent | Won't go anywhere their dog can't come along | Dog-friendly filter is essential |
| The Deal Seeker | Motivated primarily by value — wants the best deal on drinks or food | Understand deal type upfront |

---

## 3. Features & scope

### 3.1 Feature list

| # | Feature | Priority | Notes |
|---|---|---|---|
| 1 | Venue list view | P0 | Scrollable list of all happy hour venues |
| 2 | Venue detail view | P0 | Full info card for a single venue |
| 3 | Search by name | P0 | Text search across venue names |
| 4 | Filter: happy hour days & times | P0 | e.g. open now, or filter by day |
| 5 | Filter: deal type | P0 | BOGO, % off, $1 off, flat price |
| 6 | Filter: food vs. drink specials | P0 | Toggle between food, drinks, or both |
| 7 | Filter: dog friendly | P0 | Boolean — show only dog-friendly venues |
| 8 | Map view | P1 | Deferred to v2 |
| 9 | Share venue | P1 | Native share sheet for a venue card |

### 3.2 Venue data model

Each venue record contains the following fields:

| Field | Type | Example |
|---|---|---|
| `id` | String (slug) | `bier-depot` |
| `name` | String | `The Bier Depot` |
| `address` | String | `1521 W State St, Boise, ID` |
| `happyHourDays` | Array of Day | `['mon','tue','wed','thu','fri']` |
| `happyHourStart` | String (24h) | `15:00` |
| `happyHourEnd` | String (24h) | `18:00` |
| `dealTypes` | Array of DealType | `['dollar_off', 'percent_off']` |
| `dealDescription` | String | `$5 pints, half-price apps` |
| `hasFoodSpecials` | Boolean | `true` |
| `hasDrinkSpecials` | Boolean | `true` |
| `dogFriendly` | Boolean | `false` |
| `phone` | String (optional) | `(208) 555-0123` |
| `website` | URL (optional) | `https://...` |
| `lastVerified` | ISO date string | `2026-03-01` |

**Allowed values:**
- `Day`: `mon` `tue` `wed` `thu` `fri` `sat` `sun`
- `DealType`: `BOGO` `percent_off` `dollar_off` `flat_price` `other`

---

## 4. User stories

### 4.1 Discovery & browsing

- As a user, I can open the app and immediately see a list of all happy hour venues in Boise, so I can browse options without any setup.
- As a user, I can search for a venue by name, so I can quickly find a specific place I already have in mind.
- As a user, I can see each venue's happy hour times and days at a glance in the list, so I don't have to tap into every card.

### 4.2 Filtering

- As a user, I can filter venues to show only those currently in happy hour, so I know what's available right now.
- As a user, I can filter by deal type (BOGO, % off, $1 off), so I can find the kind of deal I'm looking for.
- As a user, I can filter to show only venues with food specials, drink specials, or both, so I can match my appetite.
- As a user, I can toggle a dog-friendly filter, so I only see venues where I can bring my dog.
- As a user, I can combine multiple filters simultaneously, so I can narrow results to exactly what I need.

### 4.3 Venue detail

- As a user, I can tap a venue to see its full detail page including address, hours, all deal specifics, and dog-friendly status.
- As a user, I can tap the address to open it in my maps app, so I can get directions easily.
- As a user, I can tap the phone number to call the venue directly from the app.
- As a user, I can see when the venue's data was last verified, so I know how current the information is.

---

## 5. Technical requirements

### 5.1 Platform

- React Native — targets iOS 14+ and Android 10+
- Expo managed workflow
- Single codebase for both platforms

### 5.2 Data & backend

- v1: static `venues.json` bundled with the app — no backend required at launch
- Data manually curated and updated by the app owner via Google Sheets + Apps Script export
- Each venue record includes a `lastVerified` timestamp for transparency
- Future: migrate to a lightweight CDN-hosted JSON (e.g. Cloudflare R2) when update frequency increases

### 5.3 Navigation

- React Navigation stack navigator
- Two screens: `VenueList` and `VenueDetail`
- No authentication or persistent user state

### 5.4 Location

- Optional: use device location to sort venues by proximity
- Requires location permission prompt — gracefully degrade if denied
- Deferred to v2

### 5.5 Performance

- App must load and display venue list within 2 seconds on a standard device
- Filter and search results must update in real time — no loading state needed for local data
- App must function fully offline — all data is bundled locally

### 5.6 Dependencies

| Dependency | Purpose |
|---|---|
| React Navigation | Screen routing |
| day.js | Time parsing for open-now logic |
| Expo Location (v2) | Proximity sorting |
| React Native Maps (v2) | Map view |

---

## 6. Out of scope for v1

- User authentication or accounts
- Persisted user state (favorites, preferences)
- Push notifications
- A backend API or database
- Crowdsourced or user-submitted venue data
- Ratings or reviews
- Map view
- Anything outside Boise city limits
- Monetization features of any kind

---

## 7. Success metrics

| Metric | Target (90 days post-launch) |
|---|---|
| Monthly active users (MAU) | 500+ |
| Venues in database | 50+ curated listings |
| Average session length | > 90 seconds |
| Crash-free session rate | > 99% |
| App Store rating | ≥ 4.2 stars |

---

## 8. Open questions

- **Monetization:** Sponsored listings? Premium filter features? Venue partnerships? To be determined post-launch based on traction.
- **Data freshness:** How often will happy hour info be re-verified? What is the ops process for keeping data current?
- **App name & branding:** "Happy Hour Boise" is the working title — needs trademark check.
- **App Store category:** Food & Drink vs. Lifestyle — which drives better discoverability?
- **Venue coverage:** Which Boise neighborhoods and venue types to prioritize for initial data collection?
- **Alcohol age rating:** iOS requires 17+ for alcohol-related apps — confirm this applies and set accordingly.
