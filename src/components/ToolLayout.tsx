import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface ToolLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export default function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link
        to="/tools"
        style={{ color: 'var(--text-muted)' }}
        className="inline-flex items-center gap-1.5 text-sm mb-6 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft size={14} />
        All Tools
      </Link>

      <h1 style={{ color: 'var(--text)' }} className="text-2xl font-bold mb-2">
        {title}
      </h1>
      <p style={{ color: 'var(--text-muted)' }} className="text-sm mb-8">
        {description}
      </p>

      {children}
    </main>
  )
}
