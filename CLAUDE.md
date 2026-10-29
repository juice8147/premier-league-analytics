# Premier League Analytics

React 19 + Vite + TypeScript site for exploring all 20 Premier League clubs: coach, formation pitch, squad tables, per-player analytics (percentile radar, per-90 stats, form), a league-wide player browser and a player comparison tool.

## Commands

- `npm run dev` start the dev server
- `npm test` data integrity tests (vitest)
- `npm run lint` oxlint
- `npm run build` type-check (`tsc -b`) then production build to `dist/`

## Structure

- `src/pages/` Home, Team, Player, Leaders, Scatter, SeasonTeam, Compare
- `src/components/` charts, PitchFormation, RosterTable, small shared pieces
- `src/data/` bundled squads (`squadsA-D.ts`, one compact line per player), `build.ts` (parses players, generates stats), `index.ts`
- `src/types.ts` the `Player` shape
- `src/index.css` all styling, driven by CSS custom properties in `:root` with light and dark themes

## Conventions

- Routing with react-router-dom, charts with recharts.
- Colors come from CSS tokens in `:root` (dark navy theme only).
- Player stats are deterministic, position-based estimates generated from the player id in `src/data/build.ts`, not official figures. Keep the `Player` shape if real data replaces them.
- Squad data is a snapshot. Check coaches, squads and formations against current sources before relying on them.

## Design direction (implemented)

Match-day scouting board on a quiet ink-navy background (single dark theme, no light mode), hairline rules and one pale-blue accent, a large shirt number on the player card, and a radar that can overlay a second player. Type: Geist throughout, weights 400-600. Clubs use a shield crest drawn in club colors (`Badge` in `small.tsx`), not official logos. Keep controls at least 44px tall and respect reduced motion. Tokens live in `src/index.css`; fonts load from Google Fonts in `index.html`. The compare page uses `src/components/PlayerPicker.tsx`, a type-ahead combobox limited to the first player's position. Demo: https://claude.ai/artifact/MnKGAF3onnznDH926BKQ8s

## Photos and key stats

Photo URLs go in `src/data/photos.ts` (player id or team id as key). Missing photos fall back to club-colored initials (`Avatar`) and the crest on a club-colored band (`VenuePhoto`), both in `small.tsx`. Position-specific key stats live in `keyStats` in `src/lib/stats.ts`; the player page and single-position roster tables use them.

## Analysis features

- Percentiles rank against `peerPool` (same position, `MIN_MINUTES`+). The player page toggles `?peers=role` to narrow to a role group (`roleGroup`) and shows the pool size, warning under 10.
- `metrics` in `src/lib/stats.ts` is the league-wide metric list used by the Scatter page (`/scatter?x=&y=&pos=`, median reference lines, regulars only) and `playersToCsv` (Players page "Export CSV" of the filtered list).
- Team of the season (`/team-of-the-season`): `teamOfSeason` in `src/lib/stats.ts` picks a 4-3-3 by `seasonScore` (70% mean percentile, 30% form).
- Tests for the stats math live in `tests/stats.test.ts`.

## Git

Deploy: `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on push to `main` (HashRouter, `base: ./`). Pages source must be set to GitHub Actions.

Branch `main`, remote `origin` at github.com/juice8147/premier-league-analytics. A local pre-commit hook requires `CLAUDE.md` to be staged on every commit, so update it and `git add CLAUDE.md`. Do not commit or push unless asked.
