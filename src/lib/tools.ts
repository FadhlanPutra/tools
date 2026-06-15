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
    description: 'Beautify, minify, and validate JSON instantly.',
    category: 'formatter',
    path: '/tools/json-formatter',
    icon: '{}',
    tags: ['json', 'format', 'beautify', 'minify', 'validate'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate UUID v4 instantly and copy to clipboard.',
    category: 'generator',
    path: '/tools/uuid-generator',
    icon: '🔑',
    tags: ['uuid', 'generate', 'random', 'id'],
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong passwords with customizable length and characters.',
    category: 'generator',
    path: '/tools/password-generator',
    icon: '🔒',
    tags: ['password', 'generate', 'security', 'random'],
  },
  {
    id: 'base64',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode and decode text to Base64 format.',
    category: 'encoder',
    path: '/tools/base64',
    icon: '🔣',
    tags: ['base64', 'encode', 'decode', 'text'],
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode JWT tokens and view headers and payloads. Data is not sent to any server.',
    category: 'encoder',
    path: '/tools/jwt-decoder',
    icon: '🪙',
    tags: ['jwt', 'token', 'decode', 'auth'],
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert Unix timestamp to date and vice versa.',
    category: 'converter',
    path: '/tools/timestamp-converter',
    icon: '⏱️',
    tags: ['timestamp', 'unix', 'date', 'time', 'convert'],
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Convert image formats directly in your browser.',
    category: 'converter',
    path: '/tools/image-converter',
    icon: '🖼️',
    tags: ['image', 'convert', 'png', 'jpeg', 'webp'],
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Calculate the number of words, characters, and sentences instantly.',
    category: 'utility',
    path: '/tools/word-counter',
    icon: '📝',
    tags: ['word', 'character', 'count', 'text', 'utility'],
  },
]
