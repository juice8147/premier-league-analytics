# Premier League Analytics

React + Vite + TypeScript site for exploring all 20 Premier League clubs: coach, formation on an interactive pitch, full squad tables, and per-player analytics (percentile radar vs position peers, per-90 stats, recent form), plus a league-wide player browser and a player comparison tool.

## Run

```
npm install
npm run dev     # development
npm test        # data integrity tests
npm run build   # production build in dist/
```

## Data

All data is bundled in `src/data/squads*.ts` (one compact line per player). It is a **snapshot**: check coaches, squads and formations against current sources before relying on them. Player statistics are **deterministic, position-based estimates** generated in `src/data/build.ts` from each player's id, not official figures. To use real numbers, replace `parsePlayer` with real stats and keep the `Player` shape in `src/types.ts`.
