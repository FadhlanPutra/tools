export interface Section {
  title: string
  content: string | string[]
}

export default function ToolInfo({ sections }: { sections: Section[] }) {
  return (
    <section className="mt-12 pt-8 border-t border-[var(--border)] space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
      {sections.map((section, idx) => (
        <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }} className="rounded-xl p-4 transition-all hover:border-[var(--accent)] hover:shadow-sm">
          <h3 style={{ color: 'var(--text)' }} className="font-semibold text-sm mb-2">{section.title}</h3>
          {typeof section.content === 'string' ? (
            <p style={{ color: 'var(--text-muted)' }} className="text-sm leading-relaxed">{section.content}</p>
          ) : (
            <ul style={{ color: 'var(--text-muted)' }} className="text-sm list-disc pl-4 space-y-1">
              {section.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  )
}
