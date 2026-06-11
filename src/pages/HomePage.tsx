import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'
import { TOOLS } from '../lib/tools'

const FEATURES = [
  { icon: Zap,    title: 'Instan',         desc: 'Semua tool berjalan langsung di browser, tanpa loading.' },
  { icon: Shield, title: 'Privat',          desc: 'Data kamu tidak pernah dikirim ke server manapun.' },
  { icon: Globe,  title: '100% Gratis',     desc: 'Tidak perlu daftar, tidak perlu bayar, selamanya.' },
]

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4">
      {/* Hero */}
      <section className="text-center py-24">
        {/* <div
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--accent)' }}
          className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {TOOLS.length} tools tersedia sekarang
        </div> */}

        <h1 style={{ color: 'var(--text)' }} className="text-5xl font-bold leading-tight mb-5">
          Developer tools,<br />
          <span style={{ color: 'var(--accent)' }}>langsung jalan.</span>
        </h1>

        <p style={{ color: 'var(--text-muted)' }} className="text-base max-w-md mx-auto mb-10 leading-relaxed">
          Kumpulan tools gratis untuk developer, mahasiswa IT, dan pengguna teknologi.
          Semua berjalan di browser — data tidak pernah meninggalkan perangkat kamu.
        </p>

        <Link
          to="/tools"
          style={{ background: 'var(--accent)', color: '#fff' }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
        >
          Lihat Semua Tools
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-16">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            className="rounded-xl p-5"
          >
            <div
              style={{ background: 'var(--card-hover)', color: 'var(--accent)' }}
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
            >
              <Icon size={15} />
            </div>
            <h3 style={{ color: 'var(--text)' }} className="font-semibold text-sm mb-1">{title}</h3>
            <p style={{ color: 'var(--text-muted)' }} className="text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* Tool preview */}
      <section className="pb-24">
        <p style={{ color: 'var(--text-muted)' }} className="text-xs text-center mb-6 uppercase tracking-widest">
          Tools populer
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {TOOLS.slice(0, 6).map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text)' }}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm hover:border-blue-500/50 transition-all"
            >
              <span>{tool.icon}</span>
              <span className="font-medium truncate">{tool.name}</span>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/tools"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
            className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl hover:opacity-80 transition-opacity"
          >
            Lihat semua {TOOLS.length} tools
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </main>
  )
}
