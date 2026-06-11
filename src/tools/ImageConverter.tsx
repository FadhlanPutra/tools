import { useState, useRef } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'

export default function ImageConverter() {
  const [image, setImage] = useState<string | null>(null)
  const [format, setFormat] = useState('image/png')
  const [filename, setFilename] = useState('converted-image')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFilename(file.name.split('.')[0])
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  function convert() {
    if (!image || !canvasRef.current) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL(format)
        const link = document.createElement('a')
        link.download = `${filename}.${format.split('/')[1]}`
        link.href = dataUrl
        link.click()
      }
    }
    img.src = image
  }

  return (
    <ToolLayout
      title="Image Converter"
      description="Ubah format gambar langsung di browser. Tanpa upload ke server."
    >
      <div className="space-y-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFile}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        
        {image && (
          <>
            <div>
              <label className="text-xs block mb-1">Format Target</label>
              <select 
                value={format} 
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]"
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WebP</option>
                <option value="image/avif">AVIF</option>
              </select>
            </div>
            
            <button 
              onClick={convert}
              className="w-full bg-[var(--accent)] text-white py-2 rounded-lg"
            >
              Konversi & Download
            </button>
          </>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </ToolLayout>
  )
}
