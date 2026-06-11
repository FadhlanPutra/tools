import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  function process() {
    setError('')
    if (!input.trim()) return setOutput('')
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      }
    } catch {
      setError(mode === 'decode' ? 'Input bukan Base64 yang valid.' : 'Terdapat karakter yang tidak bisa di-encode.')
      setOutput('')
    }
  }

  return (
    <ToolLayout
      title="Base64 Encoder / Decoder"
      description="Encode teks ke Base64 atau decode Base64 kembali ke teks. Berjalan di browser."
    >
      <div className="space-y-4">
        {/* Mode toggle */}
        <div
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          className="inline-flex rounded-lg p-1 gap-1"
        >
          {(['encode', 'decode'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setOutput(''); setError('') }}
              style={{
                background: mode === m ? 'var(--accent)' : 'transparent',
                color: mode === m ? '#fff' : 'var(--text-muted)',
              }}
              className="text-sm px-4 py-1.5 rounded-md transition-all capitalize"
            >
              {m}
            </button>
          ))}
        </div>

        <div>
          <label style={{ color: 'var(--text-muted)' }} className="text-xs block mb-2">
            {mode === 'encode' ? 'Teks asli' : 'Base64 string'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            placeholder={mode === 'encode' ? 'hello world' : 'aGVsbG8gd29ybGQ='}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              outline: 'none',
              resize: 'vertical',
            }}
            className="w-full rounded-xl p-4 text-sm font-mono"
          />
        </div>

        <button
          onClick={process}
          style={{ background: 'var(--accent)', color: '#fff' }}
          className="text-sm px-5 py-2 rounded-lg capitalize"
        >
          {mode}
        </button>

        {error && <p className="text-red-500 text-xs">⚠ {error}</p>}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label style={{ color: 'var(--text-muted)' }} className="text-xs">Output</label>
              <CopyButton text={output} />
            </div>
            <pre
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text)' }}
              className="rounded-xl p-4 text-sm font-mono break-all whitespace-pre-wrap"
            >
              {output}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
