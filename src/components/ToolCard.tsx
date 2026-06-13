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
      className="group block rounded-xl p-5 transition-all hover:border-blue-500/50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl select-none">{tool.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1">{tool.name}</h4>
          <p style={{ color: 'var(--text-muted)' }} className="text-xs leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
