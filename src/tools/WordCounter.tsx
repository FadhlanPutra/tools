import { useState, useMemo, useRef, type ChangeEvent, type DragEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import ToolLayout from '../components/ToolLayout'
import ToolInfo, { type Section } from '../components/ToolInfo'
import * as mammoth from 'mammoth'
import * as pdfjsLib from 'pdfjs-dist'

// Use the local worker file path from node_modules
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

// Set worker source for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const SECTIONS: Section[] = [
  { title: 'What is Word Counter?', content: 'Word Counter is a simple tool to count the number of words, characters, and sentences in your text, document (.docx), or PDF in real-time.' },
  { title: 'How to use', content: 'Simply paste your text, select a file, or drag and drop a file (.txt, .md, .csv, .docx, .pdf) into the area above to calculate its statistics instantly.' }
]

export function calculateStats(text: string) {
  const trimmed = text.trim()
  const words = trimmed ? trimmed.split(/\s+/).length : 0
  const characters = text.length
  const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0
  return { words, characters, sentences }
}

export default function WordCounter() {
  const [text, setText] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const stats = useMemo(() => calculateStats(text), [text])

  const handleFile = async (file: File) => {
    setError(null)
    const ext = file.name.split('.').pop()?.toLowerCase()

    try {
      if (ext === 'docx') {
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ arrayBuffer })
        setText(result.value)
      } else if (ext === 'pdf') {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        let fullText = ''
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          fullText += content.items.map((item: any) => item.str).join(' ') + '\n'
        }
        setText(fullText)
      } else if (ext === 'txt' || ext === 'md' || ext === 'csv' || file.type.startsWith('text/')) {
        const reader = new FileReader()
        reader.onload = (e) => setText(e.target?.result as string)
        reader.readAsText(file)
      } else {
        throw new Error('File format not supported.')
      }
    } catch (err) {
      console.error(err)
      setError('Failed to process file. Ensure the format is valid.')
    }
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <>
      <Helmet>
        <title>Word Counter | build.my.id</title>
        <meta name="description" content="Count the number of words, characters, and sentences from text or files (.txt, .md, .csv, .docx, .pdf) instantly." />
      </Helmet>
      <ToolLayout
        title="Word Counter"
        description="Count the number of words, characters, and sentences from text or files (.txt, .md, .csv, .docx, .pdf) instantly."
      >
        <div className="space-y-4">
          {error && <div style={{ color: '#ef4444' }} className="text-sm p-2 bg-red-100 rounded">{error}</div>}
          
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: isDragging ? 'var(--accent-light)' : 'var(--bg-secondary)',
              border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--border)'}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            className="rounded-xl p-8 text-center"
          >
            <p style={{ color: 'var(--text-muted)' }}>
              Drag a file (.txt, .md, .csv, .docx, .pdf) here, or click to select
            </p>
            <input
              type="file"
              ref={fileInputRef}
              accept=".txt,.md,.csv,.docx,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste your text here..."
            rows={10}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              outline: 'none',
              width: '100%',
            }}
            className="rounded-lg p-4 text-sm font-mono"
          />

          <div className="grid grid-cols-3 gap-4">
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }} className="p-4 rounded-xl text-center">
              <div style={{ color: 'var(--text-muted)' }} className="text-xs uppercase mb-1">Words</div>
              <div className="text-2xl font-bold">{stats.words}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }} className="p-4 rounded-xl text-center">
              <div style={{ color: 'var(--text-muted)' }} className="text-xs uppercase mb-1">Characters</div>
              <div className="text-2xl font-bold">{stats.characters}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }} className="p-4 rounded-xl text-center">
              <div style={{ color: 'var(--text-muted)' }} className="text-xs uppercase mb-1">Sentences</div>
              <div className="text-2xl font-bold">{stats.sentences}</div>
            </div>
          </div>
          <ToolInfo sections={SECTIONS} />
        </div>
      </ToolLayout>
    </>
  )
}
