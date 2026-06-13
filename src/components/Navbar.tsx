import { Link } from 'react-router-dom'
import { Sun, Moon, Monitor } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

interface NavbarProps {
  theme: Theme
  onThemeChange: (t: Theme) => void
}

const THEMES: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light',  icon: Sun,     label: 'Light' },
  { value: 'dark',   icon: Moon,    label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
]

export default function Navbar({ theme, onThemeChange }: NavbarProps) {
  return (
    <header
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          style={{ color: 'var(--text)' }}
          className="font-bold text-lg tracking-tight"
        >
          build<span style={{ color: 'var(--accent)' }}>.my.id</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/privacy-policy" className="text-sm hover:text-[var(--accent)]" style={{ color: 'var(--text-muted)' }}>Privacy</Link>
          {/* Theme switcher */}
          <div
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            className="flex items-center rounded-lg p-1 gap-0.5"
          >
            {THEMES.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                title={label}
                onClick={() => onThemeChange(value)}
                style={{
                  color: theme === value ? 'var(--accent)' : 'var(--text-muted)',
                  background: theme === value ? 'var(--card-hover)' : 'transparent',
                }}
                className="p-1.5 rounded-md transition-all"
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}