import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import ToolInfo, { type Section } from '../components/ToolInfo'

const SECTIONS: Section[] = [
  { title: 'Apa itu UUID?', content: 'UUID (Universally Unique Identifier) adalah label 128-bit yang digunakan untuk mengidentifikasi informasi dalam sistem komputer dengan keunikan yang sangat tinggi.' }
]

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()])
  const [count, setCount] = useState(1)

  function generate() {
    setUuids(Array.from({ length: count }, generateUUID))
  }

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate UUID v4 secara instan. Aman — semua dibuat di browser kamu."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div>
            <label style={{ color: 'var(--text-muted)' }} className="text-xs block mb-1">
              Jumlah
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={count}
              onChange={(e) => setCount(Math.min(20, Math.max(1, Number(e.target.value))))}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                outline: 'none',
              }}
              className="w-20 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={generate}
            style={{ background: 'var(--accent)', color: '#fff' }}
            className="text-sm px-5 py-2 rounded-lg mt-5"
          >
            Generate
          </button>
        </div>

        <div className="space-y-2">
          {uuids.map((uuid, i) => (
            <div
              key={i}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              className="flex items-center justify-between rounded-xl px-4 py-3"
            >
              <code style={{ color: 'var(--text)' }} className="text-sm font-mono">
                {uuid}
              </code>
              <CopyButton text={uuid} />
            </div>
          ))}
        </div>
        <ToolInfo sections={SECTIONS} />
      </div>
    </ToolLayout>
  )
}
