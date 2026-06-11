# build.my.id

Developer tools online gratis — React + TypeScript + Vite + Tailwind CSS

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy ke Cloudflare Pages

1. Push ke GitHub
2. Connect repo di [Cloudflare Pages](https://pages.cloudflare.com)
3. Build command: `npm run build`
4. Output directory: `dist`

## Struktur

```
src/
├── components/     # Shared UI components
├── hooks/          # useTheme, dll
├── lib/            # tools.ts (registry semua tool)
├── pages/          # HomePage, ToolsPage
└── tools/          # Satu folder per tool
    ├── json-formatter/
    ├── uuid-generator/
    ├── password-generator/
    ├── base64/
    ├── jwt-decoder/
    └── timestamp-converter/
```

## Cara Tambah Tool Baru

1. Buat folder `src/tools/nama-tool/`
2. Buat komponen `NamaTool.tsx` (gunakan `<ToolLayout>` sebagai wrapper)
3. Daftarkan di `src/lib/tools.ts`
4. Tambahkan route di `src/App.tsx`
