import { useId, useMemo, useState } from 'react'
import { getTeam } from '../data'
import type { Player } from '../types'

const MAX_RESULTS = 8

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** Players whose name or club contains every typed word; names that start with the text rank first. */
function search(players: Player[], query: string): Player[] {
  const words = normalize(query).split(/\s+/).filter(Boolean)
  if (words.length === 0) return []
  const scored: [number, Player][] = []
  for (const p of players) {
    const name = normalize(p.name)
    const hay = `${name} ${normalize(getTeam(p.teamId)?.name ?? '')}`
    if (!words.every((w) => hay.includes(w))) continue
    const rank = name.startsWith(words[0]) ? 0 : name.split(' ').some((part) => part.startsWith(words[0])) ? 1 : 2
    scored.push([rank, p])
  }
  return scored.sort((a, b) => a[0] - b[0] || a[1].name.localeCompare(b[1].name)).slice(0, MAX_RESULTS).map(([, p]) => p)
}

interface Props {
  label: string
  value?: Player
  options: Player[]
  onSelect: (id: string) => void
  hint?: string
}

/** Type-ahead player search with keyboard support (arrows, enter, escape). */
export default function PlayerPicker({ label, value, options, onSelect, hint }: Props) {
  const uid = useId()
  const listId = `${uid}-list`
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(false)
  const [active, setActive] = useState(0)

  const results = useMemo(() => search(options, query), [options, query])
  const open = editing && query.trim().length > 0
  const shown = editing ? query : value?.name ?? ''

  const choose = (p: Player) => {
    onSelect(p.id)
    setEditing(false)
    setQuery('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && open && results[active]) {
      e.preventDefault()
      choose(results[active])
    } else if (e.key === 'Escape') {
      setEditing(false)
      setQuery('')
    }
  }

  return (
    <div className="picker">
      <label htmlFor={`${uid}-input`} className="picker-label">{label}</label>
      <div className="picker-field">
        <input
          id={`${uid}-input`}
          type="text"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          placeholder="Type a player name"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && results[active] ? `${uid}-opt-${results[active].id}` : undefined}
          value={shown}
          onFocus={(e) => { setEditing(true); setQuery(''); e.currentTarget.select() }}
          onChange={(e) => { setEditing(true); setQuery(e.target.value); setActive(0) }}
          onBlur={() => { setEditing(false); setQuery('') }}
          onKeyDown={onKeyDown}
        />
        {value && (
          <button type="button" className="picker-clear" onClick={() => onSelect('')} aria-label={`Clear ${label}`}>
            Clear
          </button>
        )}
        {open && (
          <ul id={listId} role="listbox" className="picker-list" aria-label={`${label} suggestions`}>
            {results.length === 0 && <li className="picker-empty" role="presentation">No player matches “{query.trim()}”. {hint}</li>}
            {results.map((p, i) => (
              <li
                key={p.id}
                id={`${uid}-opt-${p.id}`}
                role="option"
                aria-selected={i === active}
                className={i === active ? 'active' : undefined}
                onMouseDown={(e) => { e.preventDefault(); choose(p) }}
                onMouseEnter={() => setActive(i)}
              >
                <span>{p.name}</span>
                <span className="muted">{getTeam(p.teamId)?.shortName} · {p.detailedPosition}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {hint && !open && <p className="picker-hint">{hint}</p>}
    </div>
  )
}
