import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import ToolInfo, { type Section } from '../components/ToolInfo'

const SECTIONS: Section[] = [
  { title: 'What is JWT?', content: 'JSON Web Token (JWT) is an open standard for creating secure access tokens between two parties.' },
  { title: 'Security', content: [
    'The JWT decoded here only shows publicly available data.',
    'Do not store sensitive data in the JWT payload because anyone can read it without a secret key.'
  ]}
]

export function decodeJWT(token: string) {
  const parts = token.trim().split('.')
  if (parts.length !== 3) throw new Error('JWT must have 3 parts (header.payload.signature)')

  function decode(part: string) {
    const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '=='.slice((base64.length + 3) % 4)
    // return JSON.parse(decodeURIComponent(escape(atob(padded))))
    return JSON.parse(new TextDecoder().decode(
      Uint8Array.from(atob(padded), c => c.charCodeAt(0))
    ))
  }

  return {
    header: decode(parts[0]),
    payload: decode(parts[1]),
    signature: parts[2],
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [result, setResult] = useState<ReturnType<typeof decodeJWT> | null>(null)
  const [error, setError] = useState('')

  function decode() {
    setError('')
    try {
      setResult(decodeJWT(token))
    } catch (e: any) {
      setResult(null)
      setError(e.message)
    }
  }

  return (
    <>
      <Helmet>
        <title>JWT Decoder | build.my.id</title>
        <meta name="description" content="Decode JWT tokens and view headers and payloads. Data is not sent to any server — everything is local." />
      </Helmet>
      <ToolLayout
        title="JWT Decoder"
        description="Decode JWT tokens and view headers and payloads. Data is not sent to any server — everything is local."
      >
      <div className="space-y-4">
        <div>
          <label style={{ color: 'var(--text-muted)' }} className="text-xs block mb-2">
            JWT Token
          </label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            rows={4}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            style={{
              background: 'var(--bg-secondary)',
              border: `1px solid ${error ? '#ef4444' : 'var(--border)'}`,
              color: 'var(--text)',
              outline: 'none',
              resize: 'vertical',
            }}
            className="w-full rounded-xl p-4 text-sm font-mono"
          />
          {error && <p className="text-red-500 text-xs mt-1">⚠ {error}</p>}
        </div>

        <button
          onClick={decode}
          style={{ background: 'var(--accent)', color: '#fff' }}
          className="text-sm px-5 py-2 rounded-lg"
        >
          Decode
        </button>

        {result && (
          <div className="space-y-4">
            {(['header', 'payload'] as const).map((key) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <label style={{ color: 'var(--text-muted)' }} className="text-xs capitalize">
                    {key}
                  </label>
                  <CopyButton text={JSON.stringify(result[key], null, 2)} />
                </div>
                <pre
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  className="rounded-xl p-4 text-sm font-mono overflow-auto"
                >
                  {JSON.stringify(result[key], null, 2)}
                </pre>
              </div>
            ))}
            <div>
              <label style={{ color: 'var(--text-muted)' }} className="text-xs block mb-2">
                Signature <span className="text-yellow-500">(cannot be verified without a secret key)</span>
              </label>
              <code
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text)' }}
                className="block rounded-xl p-4 text-sm font-mono break-all"
              >
                {result.signature}
              </code>
            </div>
          </div>
        )}
        <ToolInfo sections={SECTIONS} />
      </div>
      </ToolLayout>
    </>
  )
}

