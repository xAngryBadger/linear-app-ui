interface SidebarSectionProps {
  title: string
  children: React.ReactNode
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="mb-1">
      <h3 className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-3)]">
        {title}
      </h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}
