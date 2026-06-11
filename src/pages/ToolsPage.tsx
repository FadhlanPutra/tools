import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Search, Menu, X, ArrowRight } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import { TOOLS, CATEGORIES } from '../lib/tools'
import type { Category } from '../lib/tools'

type Filter = Category | 'all'

// Group tools by category
const GROUPED = Object.keys(CATEGORIES).reduce((acc, cat) => {
  acc[cat as Category] = TOOLS.filter((t) => t.category === cat as Category)
  return acc
}, {} as Record<Category, typeof TOOLS>)

// Search modal
function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')

  const results = query.trim()
    ? TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.tags.some((tag) => tag.includes(query.toLowerCase()))
      )
    : []

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{ background: 'var(--card)', border: '1px solid var(--border)', width: '100%', maxWidth: 520 }}
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Input */}
        <div
          style={{ borderBottom: '1px solid var(--border)' }}
          className="flex items-center gap-3 px-4 py-3"
        >
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            autoFocus
            type="text"
            placeholder="Cari tool..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ background: 'transparent', color: 'var(--text)', outline: 'none', flex: 1 }}
            className="text-sm"
          />
          <kbd
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            className="text-xs px-1.5 py-0.5 rounded"
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {query.trim() === '' ? (
            <p style={{ color: 'var(--text-muted)' }} className="text-xs text-center py-8">
              Ketik untuk mencari tool...
            </p>
          ) : results.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }} className="text-xs text-center py-8">
              Tidak ada hasil untuk "{query}"
            </p>
          ) : (
            results.map((tool) => (
              <Link
                key={tool.id}
                to={tool.path}
                onClick={onClose}
                style={{ color: 'var(--text)' }}
                className="flex items-center justify-between px-4 py-3 hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{tool.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{tool.name}</p>
                    <p style={{ color: 'var(--text-muted)' }} className="text-xs">{tool.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--accent)' }}
                    className="text-xs px-2 py-0.5 rounded-full capitalize"
                  >
                    {CATEGORIES[tool.category].label}
                  </span>
                  <ArrowRight size={12} style={{ color: 'var(--text-muted)' }} />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// Sidebar
function Sidebar({ active, onChange, open, onClose }: {
  active: Filter
  onChange: (f: Filter) => void
  open: boolean
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.keys(CATEGORIES).reduce((a, k) => ({ ...a, [k]: true }), {})
  )

  function toggle(cat: string) {
    setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }))
  }

  const content = (
    <nav className="flex flex-col gap-1 p-4">
      {/* All */}
      <button
        onClick={() => { onChange('all'); onClose() }}
        style={{
          background: active === 'all' ? 'var(--accent)' : 'transparent',
          color: active === 'all' ? '#fff' : 'var(--text)',
        }}
        className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg text-left w-full transition-colors"
      >
        All Tools
        <span
          style={{
            background: active === 'all' ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary)',
            color: active === 'all' ? '#fff' : 'var(--text-muted)',
          }}
          className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
        >
          {TOOLS.length}
        </span>
      </button>

      {/* Categories */}
      {(Object.keys(CATEGORIES) as Category[]).map((cat) => (
        <div key={cat}>
          <button
            onClick={() => toggle(cat)}
            style={{ color: 'var(--text-muted)' }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-2 w-full hover:opacity-80 transition-opacity"
          >
            {CATEGORIES[cat].label}
            <ChevronDown
              size={12}
              className="ml-auto transition-transform"
              style={{ transform: expanded[cat] ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {expanded[cat] && (
            <div className="ml-2 flex flex-col gap-0.5">
              {GROUPED[cat].map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  onClick={onClose}
                  style={{ color: 'var(--text-muted)' }}
                  className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg hover:bg-[var(--bg-secondary)] hover:text-[var(--text)] transition-colors group"
                >
                  <span
                    style={{ background: 'var(--border)' }}
                    className="w-1 h-1 rounded-full shrink-0 group-hover:bg-[var(--accent)] transition-colors"
                  />
                  {tool.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop */}
      <aside
        style={{ borderRight: '1px solid var(--border)', width: 220, minWidth: 220 }}
        className="hidden md:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto"
      >
        {content}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
        >
          <aside
            style={{ background: 'var(--bg)', borderRight: '1px solid var(--border)', width: 260, height: '100%' }}
            className="overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{ borderBottom: '1px solid var(--border)' }}
              className="flex items-center justify-between px-4 py-3"
            >
              <span style={{ color: 'var(--text)' }} className="text-sm font-semibold">Menu</span>
              <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </div>
            {content}
          </aside>
        </div>
      )}
    </>
  )
}

export default function ToolsPage() {
  const [active, setActive] = useState<Filter>('all')
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = active === 'all' ? TOOLS : TOOLS.filter((t) => t.category === active)

  const openSearch = useCallback(() => setSearchOpen(true), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [openSearch])

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 3.5rem)' }}>
      <Sidebar
        active={active}
        onChange={setActive}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 px-6 py-8 min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-8">
          {/* Hamburger mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
            className="md:hidden p-2 rounded-lg"
          >
            <Menu size={16} />
          </button>

          {/* Search bar */}
          <button
            onClick={openSearch}
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            className="flex items-center gap-2 flex-1 max-w-sm text-sm px-4 py-2.5 rounded-xl text-left hover:border-blue-500/50 transition-colors"
          >
            <Search size={14} />
            <span className="flex-1">Cari tool...</span>
            <kbd
              style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              className="text-xs px-1.5 py-0.5 rounded hidden sm:block"
            >
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Heading */}
        <h1 style={{ color: 'var(--text)' }} className="text-xl font-bold mb-1">
          {active === 'all' ? 'All Tools' : CATEGORIES[active as Category].label}
        </h1>
        <p style={{ color: 'var(--text-muted)' }} className="text-sm mb-6">
          {filtered.length} tools tersedia
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </main>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  )
}