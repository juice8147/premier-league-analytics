import { NavLink, Route, Routes } from 'react-router-dom'
import { DATA_NOTE, SEASON } from './data'
import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage'
import PlayerPage from './pages/PlayerPage'
import LeadersPage from './pages/LeadersPage'
import ComparePage from './pages/ComparePage'
import ScatterPage from './pages/ScatterPage'
import SeasonTeamPage from './pages/SeasonTeamPage'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="app-header">
        <div className="bar">
          <NavLink to="/" className="brand">Scouting Board <small>{SEASON}</small></NavLink>
          <nav aria-label="Main">
            <NavLink to="/" end>Clubs</NavLink>
            <NavLink to="/players">Players</NavLink>
            <NavLink to="/team-of-the-season">Team of the season</NavLink>
            <NavLink to="/scatter">Scatter</NavLink>
            <NavLink to="/compare">Compare</NavLink>
          </nav>
        </div>
      </header>
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team/:teamId" element={<TeamPage />} />
          <Route path="/player/:playerId" element={<PlayerPage />} />
          <Route path="/players" element={<LeadersPage />} />
          <Route path="/scatter" element={<ScatterPage />} />
          <Route path="/team-of-the-season" element={<SeasonTeamPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="*" element={<p className="empty">Page not found. Go back to the clubs list.</p>} />
        </Routes>
      </main>
      <footer className="app-footer">{DATA_NOTE}</footer>
    </>
  )
}
