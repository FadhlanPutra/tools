import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Globe, ChevronDown, CheckCircle, Database } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TOOLS } from '../lib/tools'

const FEATURES = [
  { icon: Zap,    title: 'Instan',         desc: 'Semua tool berjalan langsung di browser, tanpa loading.' },
  { icon: Shield, title: 'Privat',          desc: 'Data kamu tidak pernah dikirim ke server manapun.' },
  { icon: Globe,  title: '100% Gratis',     desc: 'Tidak perlu daftar, tidak perlu bayar, selamanya.' },
]

const FAQ_ITEMS = [
  { q: 'Apakah data saya aman?', a: 'Ya. Semua proses berjalan di browser Anda. Tidak ada data yang dikirim ke server kami.' },
  { q: 'Apakah ini benar-benar gratis?', a: 'Ya, 100% gratis tanpa biaya tersembunyi.' },
  { q: 'Bagaimana cara kerjanya?', a: 'Kami menggunakan teknologi web modern untuk menjalankan logika pemrosesan secara lokal di perangkat Anda.' },
  { q: 'Apakah saya perlu login?', a: 'Tidak. Semua tool bisa langsung digunakan tanpa pendaftaran.' },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="max-w-4xl mx-auto px-4">
      {/* Hero */}
      <section className="text-center py-24">
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

      {/* How it works */}
      <section className="pb-24 border-t border-[var(--border)] pt-16">
        <h2 style={{ color: 'var(--text)' }} className="text-2xl font-bold text-center mb-12">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Pilih tool', desc: 'Cari alat yang kamu butuhkan.' },
            { step: '2', title: 'Masukkan input', desc: 'Tempel teks atau upload file.' },
            { step: '3', title: 'Dapatkan hasil', desc: 'Copy hasil secara instan.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div style={{ background: 'var(--bg-secondary)', color: 'var(--accent)' }} className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">{item.step}</div>
              <h3 style={{ color: 'var(--text)' }} className="font-semibold mb-2">{item.title}</h3>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--bg-secondary)' }} className="py-16 rounded-2xl mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center px-4">
          {[
            { label: 'Tools tersedia', value: TOOLS.length, icon: Database },
            { label: 'Browser-based', value: '100%', icon: Globe },
            { label: 'Data ke server', value: '0', icon: Shield },
          ].map((stat) => (
            <div key={stat.label}>
              <stat.icon className="mx-auto mb-2 text-[var(--accent)]" size={24} />
              <div style={{ color: 'var(--text)' }} className="text-3xl font-bold mb-1">{stat.value}</div>
              <div style={{ color: 'var(--text-muted)' }} className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <h2 style={{ color: 'var(--text)' }} className="text-2xl font-bold text-center mb-10">FAQ</h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ border: '1px solid var(--border)' }} className="rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <span style={{ color: 'var(--text)' }} className="font-medium text-sm">{item.q}</span>
                <ChevronDown size={16} style={{ color: 'var(--text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <div style={{ color: 'var(--text-muted)' }} className="p-4 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA bottom */}
      <section className="text-center pb-24">
        <h2 style={{ color: 'var(--text)' }} className="text-3xl font-bold mb-4">Siap untuk mulai?</h2>
        <p style={{ color: 'var(--text-muted)' }} className="mb-8">Jelajahi semua tool developer yang kami sediakan.</p>
        <Link
          to="/tools"
          style={{ background: 'var(--accent)', color: '#fff' }}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
        >
          Lihat Semua Tools
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} Tools. Dev-friendly utilities.</p>
      </footer>
    </main>
  )
}
