import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Globe, ChevronDown, Database } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TOOLS } from '../lib/tools'

const FEATURES = [
  { icon: Zap,    title: 'Instant',         desc: 'All tools run directly in your browser, no loading.' },
  { icon: Shield, title: 'Private',         desc: 'Your data is never sent to any server.' },
  { icon: Globe,  title: '100% Free',       desc: 'No registration, no payment, forever.' },
]

const FAQ_ITEMS = [
  { q: 'Is my data safe?', a: 'Yes. All processing happens in your browser. No data is sent to our servers.' },
  { q: 'Is this really free?', a: 'Yes, 100% free with no hidden charges.' },
  { q: 'How does it work?', a: 'We use modern web technology to run processing logic locally on your device.' },
  { q: 'Do I need to sign in?', a: 'No. All tools can be used immediately without registration.' },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="max-w-4xl mx-auto px-4">
      {/* Hero */}
      <section className="text-center py-24">
        <h1 style={{ color: 'var(--text)' }} className="text-5xl font-bold leading-tight mb-5">
          Online tools,<br />
          <span style={{ color: 'var(--accent)' }}>ready to use.</span>
        </h1>

        <p style={{ color: 'var(--text-muted)' }} className="text-base max-w-md mx-auto mb-10 leading-relaxed">
          A collection of free tools for everyone. 
          Everything runs in your browser — your data never leaves your device.
        </p>

        <Link
          to="/tools"
          style={{ background: 'var(--accent)', color: 'white' }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
        >
          See All Tools
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
          Popular Tools
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
            View all {TOOLS.length} tools
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-24 border-t border-[var(--border)] pt-16">
        <h2 style={{ color: 'var(--text)' }} className="text-2xl font-bold text-center mb-12">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Choose tool', desc: 'Find the tool you need.' },
            { step: '2', title: 'Enter input', desc: 'Paste text or upload file.' },
            { step: '3', title: 'Get result', desc: 'Copy results instantly.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div style={{ background: 'var(--bg-secondary)', color: 'var(--accent)' }} className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">{item.step}</div>
              <h4 style={{ color: 'var(--text)' }} className="font-semibold mb-2">{item.title}</h4>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--bg-secondary)' }} className="py-16 rounded-2xl mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center px-4">
          {[
            { label: 'Tools available', value: TOOLS.length, icon: Database },
            { label: 'Browser-based', value: '100%', icon: Globe },
            { label: 'Data to server', value: '0', icon: Shield },
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
        <h2 style={{ color: 'var(--text)' }} className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p style={{ color: 'var(--text-muted)' }} className="mb-8">Explore all the useful tools we provide.</p>
        <Link
          to="/tools"
          style={{ background: 'var(--accent)', color: 'white' }}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
        >
          See All Tools
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} Tools. Simple utilities for everyone.</p>
      </footer>
    </main>
  )
}
