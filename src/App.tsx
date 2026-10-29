import { NavLink, Route, Routes } from 'react-router-dom'
import { DATA_NOTE, SEASON } from './data'
import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage'
import PlayerPage from './pages/PlayerPage'
import LeadersPage from './pages/LeadersPage'
import ComparePage from './pages/ComparePage'

export default function App() {
  return (
    <>
      <header className="app-header">
        <span className="brand">PL Analytics · {SEASON}</span>
        <nav>
          <NavLink to="/" end>Clubs</NavLink>
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/compare">Compare</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team/:teamId" element={<TeamPage />} />
          <Route path="/player/:playerId" element={<PlayerPage />} />
          <Route path="/players" element={<LeadersPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
      <footer className="app-footer">{DATA_NOTE}</footer>
    </>
  )
}
