import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import ToolInfo, { type Section } from '../components/ToolInfo'

const SECTIONS: Section[] = [
  { title: 'What is Base64?', content: 'Base64 is a method to convert binary data to ASCII text format so that data can be safely transmitted over media that only supports text.' },
  { title: 'Security', content: 'Base64 is not encryption. Do not use it to hide sensitive data because anyone can decode it easily.' }
]

export function encodeBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
}

export function decodeBase64(str: string): string {
  return decodeURIComponent(escape(atob(str.trim())))
}

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
        setOutput(encodeBase64(input))
      } else {
        setOutput(decodeBase64(input))
      }
    } catch {
      setError(mode === 'decode' ? 'Input is not a valid Base64 string.' : 'Contains characters that cannot be encoded.')
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>Base64 Encoder / Decoder | build.my.id</title>
        <meta name="description" content="Encode text to Base64 or decode Base64 back to text. Runs in the browser." />
      </Helmet>
      <ToolLayout
        title="Base64 Encoder / Decoder"
        description="Encode text to Base64 or decode Base64 back to text. Runs in the browser."
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
            {mode === 'encode' ? 'Original text' : 'Base64 string'}
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
        <ToolInfo sections={SECTIONS} />
      </div>
      </ToolLayout>
    </>
  )
}

