import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import ToolInfo, { type Section } from '../components/ToolInfo'

const SECTIONS: Section[] = [
  {
    title: 'What is JSON?',
    content: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate.'
  },
  {
    title: 'Beautify vs Minify',
    content: [
      'Beautify: Adds indentation and spaces to make JSON easy for humans to read.',
      'Minify: Removes spaces, newlines, and indentation to reduce JSON file size, typically used for transmitting data between servers.'
    ]
  },
  {
    title: 'Validation Tips',
    content: [
      'Ensure all keys are wrapped in double quotes (").',
      'Avoid trailing commas after the last item in an object or array.',
      'Check if curly braces {} or square brackets [] are properly closed.'
    ]
  }
]

export function formatJson(input: string, type: 'beautify' | 'minify'): string {
  const parsed = JSON.parse(input)
  return type === 'beautify' ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed)
}

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  function beautify() {
    try {
      setOutput(formatJson(input, 'beautify'))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  function minify() {
    try {
      setOutput(formatJson(input, 'minify'))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>JSON Formatter | build.my.id</title>
        <meta name="description" content="Beautify, minify, and validate JSON instantly. Data is not sent to any server." />
      </Helmet>
      <ToolLayout
        title="JSON Formatter"
        description="Beautify, minify, and validate JSON instantly. Data is not sent to any server."
      >
      <div className="space-y-4">
        <div>
          <label style={{ color: 'var(--text-muted)' }} className="block text-xs mb-2">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'{"name":"John","age":20}'}
            rows={8}
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

        <div className="flex gap-2">
          <button
            onClick={beautify}
            style={{ background: 'var(--accent)', color: '#fff' }}
            className="text-sm px-4 py-2 rounded-lg"
          >
            Beautify
          </button>
          <button
            onClick={minify}
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text)' }}
            className="text-sm px-4 py-2 rounded-lg"
          >
            Minify
          </button>
        </div>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label style={{ color: 'var(--text-muted)' }} className="text-xs">Output</label>
              <CopyButton text={output} />
            </div>
            <pre
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text)' }}
              className="rounded-xl p-4 text-sm font-mono overflow-auto max-h-80"
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

