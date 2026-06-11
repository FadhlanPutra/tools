import { Link } from 'react-router-dom'
import type { Tool } from '../lib/tools'

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      to={tool.path}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
      }}
      className="group block rounded-xl p-5 transition-all hover:border-blue-500/50 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl select-none">{tool.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">{tool.name}</h3>
          <p style={{ color: 'var(--text-muted)' }} className="text-xs leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
