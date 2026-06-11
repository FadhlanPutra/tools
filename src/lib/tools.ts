export interface Tool {
  id: string
  name: string
  description: string
  category: Category
  path: string
  icon: string
  tags: string[]
}

export type Category = 'formatter' | 'generator' | 'encoder' | 'converter' | 'utility'

export const CATEGORIES: Record<Category, { label: string; icon: string }> = {
  formatter:  { label: 'Formatter',  icon: '{}' },
  generator:  { label: 'Generator',  icon: '⚡' },
  encoder:    { label: 'Encoder',    icon: '🔐' },
  converter:  { label: 'Converter',  icon: '🔄' },
  utility:    { label: 'Utility',    icon: '🛠️' },
}

export const TOOLS: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Beautify, minify, dan validasi JSON secara instan.',
    category: 'formatter',
    path: '/tools/json-formatter',
    icon: '{}',
    tags: ['json', 'format', 'beautify', 'minify', 'validate'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate UUID v4 secara instan dan copy ke clipboard.',
    category: 'generator',
    path: '/tools/uuid-generator',
    icon: '🔑',
    tags: ['uuid', 'generate', 'random', 'id'],
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Buat password kuat dengan panjang dan karakter yang bisa dikustomisasi.',
    category: 'generator',
    path: '/tools/password-generator',
    icon: '🔒',
    tags: ['password', 'generate', 'security', 'random'],
  },
  {
    id: 'base64',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode dan decode teks ke format Base64.',
    category: 'encoder',
    path: '/tools/base64',
    icon: '🔣',
    tags: ['base64', 'encode', 'decode', 'text'],
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode JWT token dan lihat header serta payload. Data tidak dikirim ke server.',
    category: 'encoder',
    path: '/tools/jwt-decoder',
    icon: '🪙',
    tags: ['jwt', 'token', 'decode', 'auth'],
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Konversi Unix timestamp ke tanggal dan sebaliknya.',
    category: 'converter',
    path: '/tools/timestamp-converter',
    icon: '⏱️',
    tags: ['timestamp', 'unix', 'date', 'time', 'convert'],
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Ubah format gambar langsung di browser.',
    category: 'converter',
    path: '/tools/image-converter',
    icon: '🖼️',
    tags: ['image', 'convert', 'png', 'jpeg', 'webp'],
  },
]
