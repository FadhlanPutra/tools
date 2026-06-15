import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import ToolInfo, { type Section } from '../components/ToolInfo'

const SECTIONS: Section[] = [
  { title: 'Security Tips', content: [
    'Use a length of at least 12 characters.',
    'Combine uppercase letters, lowercase letters, numbers, and symbols.',
    'Do not use the same password for different services.'
  ]}
]

const CHARS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
}

export function generatePassword(length: number, opts: Record<string, boolean>): string {
  let pool = CHARS.lower
  if (opts.upper) pool += CHARS.upper
  if (opts.numbers) pool += CHARS.numbers
  if (opts.symbols) pool += CHARS.symbols
  return Array.from({ length }, () => pool[Math.floor(Math.random() * pool.length)]).join('')
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [opts, setOpts] = useState({ upper: true, numbers: true, symbols: false })
  const [password, setPassword] = useState(() => generatePassword(16, { upper: true, numbers: true, symbols: false }))

  function generate() {
    setPassword(generatePassword(length, opts))
  }

  const strength =
    password.length >= 20 && opts.symbols ? 'Strong' :
    password.length >= 12 ? 'Good' : 'Weak'

  const strengthColor = strength === 'Strong' ? '#16a34a' : strength === 'Good' ? '#d97706' : '#ef4444'

  return (
    <>
      <Helmet>
        <title>Password Generator | build.my.id</title>
        <meta name="description" content="Create a strong, random password. Everything is processed in the browser — nothing is stored." />
      </Helmet>
      <ToolLayout
        title="Password Generator"
        description="Create a strong, random password. Everything is processed in the browser — nothing is stored."
      >
      <div className="space-y-5">
        {/* Password output */}
        <div
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          className="rounded-xl p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <code style={{ color: 'var(--text)' }} className="text-base font-mono break-all">
              {password}
            </code>
            <CopyButton text={password} />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: strength === 'Strong' ? '100%' : strength === 'Good' ? '60%' : '25%',
                  background: strengthColor,
                }}
              />
            </div>
            <span className="text-xs font-medium" style={{ color: strengthColor }}>
              {strength}
            </span>
          </div>
        </div>

        {/* Length slider */}
        <div>
          <label style={{ color: 'var(--text-muted)' }} className="text-xs block mb-2">
            Length: <span style={{ color: 'var(--text)' }} className="font-medium">{length}</span>
          </label>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-3 gap-3">
          {(['upper', 'numbers', 'symbols'] as const).map((key) => (
            <label
              key={key}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text)' }}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs cursor-pointer"
            >
              <input
                type="checkbox"
                checked={opts[key]}
                onChange={(e) => setOpts((prev) => ({ ...prev, [key]: e.target.checked }))}
                className="accent-blue-500"
              />
              {key === 'upper' ? 'Uppercase' : key === 'numbers' ? 'Numbers' : 'Symbols'}
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          style={{ background: 'var(--accent)', color: '#fff' }}
          className="w-full text-sm py-2.5 rounded-xl"
        >
          Generate New Password
        </button>
        <ToolInfo sections={SECTIONS} />
      </div>
      </ToolLayout>
    </>
  )
}

