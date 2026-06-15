import { useState, useRef } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Helmet } from 'react-helmet-async'
import ToolLayout from '../components/ToolLayout'

import ToolInfo, { type Section } from '../components/ToolInfo'

const SECTIONS: Section[] = [
  { title: 'How does it work?', content: 'This tool processes images locally directly in your browser using the Canvas API.' },
  { title: 'Privacy', content: 'All processing is done on your own device. Image data is never uploaded to a server.' }
]

interface ImageFile {
  id: string
  file: File
  preview: string
}

export default function ImageConverter() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [format, setFormat] = useState('image/png')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function handleFiles(files: FileList | null) {
    if (!files) return
    const newImages: ImageFile[] = []
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        newImages.push({
          id: Math.random().toString(36).substring(7),
          file,
          preview: URL.createObjectURL(file),
        })
      }
    })
    setImages((prev: ImageFile[]) => [...prev, ...newImages])
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  async function convertAndDownload() {
    if (images.length === 0 || !canvasRef.current) return
    const zip = new JSZip()
    const canvas = canvasRef.current

    for (const imgFile of images) {
      const img = new Image()
      img.src = imgFile.preview
      await new Promise((resolve) => { img.onload = resolve })

      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      
      const blob = await new Promise<Blob | null>((resolve) => 
        canvas.toBlob(resolve, format)
      )
      
      if (blob) {
        const ext = format.split('/')[1]
        zip.file(`${imgFile.file.name.split('.')[0]}.${ext}`, blob)
      }
    }

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'converted-images.zip')
  }

  return (
    <>
      <Helmet>
        <title>Image Converter | build.my.id</title>
        <meta name="description" content="Convert multiple images format instantly directly in your browser." />
      </Helmet>
      <ToolLayout
        title="Image Converter"
        description="Convert multiple images format instantly directly in your browser."
      >
      <div className="space-y-4">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{ 
            border: isDragging ? '2px dashed var(--accent)' : '2px dashed var(--border)' 
          }}
          className="w-full h-48 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all bg-[var(--bg-secondary)]"
        >
          <p style={{ color: 'var(--text-muted)' }} className="text-sm">
            Drag & drop images or click to select
          </p>
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*" 
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
        
        {images.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {images.map((img: ImageFile) => (
                <img key={img.id} src={img.preview} className="h-20 w-full object-cover rounded-lg" />
              ))}
            </div>

            <div>
              <label className="text-xs block mb-1">Target Format</label>
              <select 
                value={format} 
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]"
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
            
            <button 
              onClick={convertAndDownload}
              className="w-full bg-[var(--accent)] text-white py-2 rounded-lg"
            >
              Convert & Download (ZIP)
            </button>
            <button 
              onClick={() => setImages([])}
              className="w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Clear All
            </button>
          </div>
        )}
        <ToolInfo sections={SECTIONS} />
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      </ToolLayout>
    </>
  )
}

