# Premier League Analytics

React 19 + Vite + TypeScript site for exploring all 20 Premier League clubs: coach, formation pitch, squad tables, per-player analytics (percentile radar, per-90 stats, form), a league-wide player browser and a player comparison tool.

## Commands

- `npm run dev` start the dev server
- `npm test` data integrity tests (vitest)
- `npm run lint` oxlint
- `npm run build` type-check (`tsc -b`) then production build to `dist/`

## Structure

- `src/pages/` Home, Team, Player, Leaders, Compare
- `src/components/` charts, PitchFormation, RosterTable, small shared pieces
- `src/data/` bundled squads (`squadsA-D.ts`, one compact line per player), `build.ts` (parses players, generates stats), `index.ts`
- `src/types.ts` the `Player` shape
- `src/index.css` all styling, driven by CSS custom properties in `:root` with light and dark themes

## Conventions

- Routing with react-router-dom, charts with recharts.
- Colors come from CSS tokens; dark mode works through `prefers-color-scheme` and `data-theme`.
- Player stats are deterministic, position-based estimates generated from the player id in `src/data/build.ts`, not official figures. Keep the `Player` shape if real data replaces them.
- Squad data is a snapshot. Check coaches, squads and formations against current sources before relying on them.

## Design direction (in progress)

Match-day scouting board: chalk paper, dark pitch-green ink, floodlight-yellow highlights, a large shirt number on the player card, and a radar that can overlay a second player. Condensed grotesque (Barlow Condensed) for names and numbers, Public Sans for text. Keep controls at least 44px tall and respect reduced motion. Demo: https://claude.ai/artifact/MnKGAF3onnznDH926BKQ8s

## Git

The repo has no commits yet (branch `master`; main branch is `main`). Do not commit unless asked.
