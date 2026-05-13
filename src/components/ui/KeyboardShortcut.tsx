interface KeyboardShortcutProps {
  keys: string[]
  className?: string
}

export function KeyboardShortcut({ keys, className = '' }: KeyboardShortcutProps) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {keys.map((key, i) => (
        <kbd
          key={i}
          className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[10px] font-mono rounded border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-3)]"
        >
          {key}
        </kbd>
      ))}
    </span>
  )
}
