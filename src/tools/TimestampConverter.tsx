import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import ToolInfo, { type Section } from '../components/ToolInfo'

const SECTIONS: Section[] = [
  { title: 'What is Unix Timestamp?', content: 'Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC).' }
]

export function convertUnixToDate(ts: number) {
  const d = new Date(ts * 1000)
  return {
    utc: d.toUTCString(),
    local: d.toLocaleString(),
    iso: d.toISOString()
  }
}

export function convertDateToUnix(dateString: string) {
  return Math.floor(new Date(dateString).getTime() / 1000)
}

export default function TimestampConverter() {
  const [tsInput, setTsInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [tsResult, setTsResult] = useState('')
  const [dateResult, setDateResult] = useState('')
  const now = Math.floor(Date.now() / 1000)

  function convertTs() {
    const n = Number(tsInput)
    if (!tsInput || isNaN(n)) return setDateResult('Invalid input')
    const res = convertUnixToDate(n)
    setDateResult(`${res.utc}\n\nLocal: ${res.local}\nISO: ${res.iso}`)
  }

  function convertDate() {
    if (!dateInput) return setTsResult('Select a date first')
    const ts = convertDateToUnix(dateInput)
    setTsResult(ts.toString())
  }

  return (
    <>
      <Helmet>
        <title>Timestamp Converter | build.my.id</title>
        <meta name="description" content="Convert Unix timestamp to date and vice versa." />
      </Helmet>
      <ToolLayout
        title="Timestamp Converter"
        description="Convert Unix timestamp to date and vice versa."
      >
      <div className="space-y-8">
        {/* Current time */}
        <div
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          className="rounded-xl p-4 flex items-center justify-between"
        >
          <div>
            <p style={{ color: 'var(--text-muted)' }} className="text-xs mb-1">Current Unix timestamp</p>
            <code style={{ color: 'var(--text)' }} className="text-lg font-mono font-bold">{now}</code>
          </div>
          <CopyButton text={now.toString()} />
        </div>

        {/* Timestamp → Date */}
        <div className="space-y-3">
          <h3 style={{ color: 'var(--text)' }} className="text-sm font-semibold">
            Unix Timestamp → Date
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={tsInput}
              onChange={(e) => setTsInput(e.target.value)}
              placeholder="1749550000"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                outline: 'none',
              }}
              className="flex-1 rounded-xl px-4 py-2.5 text-sm font-mono"
            />
            <button
              onClick={convertTs}
              style={{ background: 'var(--accent)', color: '#fff' }}
              className="text-sm px-4 py-2 rounded-xl"
            >
              Convert
            </button>
          </div>
          {dateResult && (
            <div className="flex items-start justify-between gap-3">
              <pre
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text)' }}
                className="flex-1 rounded-xl p-4 text-sm font-mono whitespace-pre-wrap"
              >
                {dateResult}
              </pre>
              <CopyButton text={dateResult} />
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div className="space-y-3">
          <h3 style={{ color: 'var(--text)' }} className="text-sm font-semibold">
            Date → Unix Timestamp
          </h3>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                outline: 'none',
                colorScheme: 'dark',
              }}
              className="flex-1 rounded-xl px-4 py-2.5 text-sm"
            />
            <button
              onClick={convertDate}
              style={{ background: 'var(--accent)', color: '#fff' }}
              className="text-sm px-4 py-2 rounded-xl"
            >
              Convert
            </button>
          </div>
          {tsResult && (
            <div
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              className="flex items-center justify-between rounded-xl px-4 py-3"
            >
              <code style={{ color: 'var(--text)' }} className="text-sm font-mono">{tsResult}</code>
              <CopyButton text={tsResult} />
            </div>
          )}
        </div>
        <ToolInfo sections={SECTIONS} />
      </div>
      </ToolLayout>
    </>
  )
}

