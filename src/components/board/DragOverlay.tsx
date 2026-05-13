import { PriorityIcon } from '../ui/PriorityIcon'
import type { Issue } from '../../types'

interface DragOverlayCardProps {
  issue: Issue
}

export function DragOverlayCard({ issue }: DragOverlayCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[var(--color-accent)]/50 bg-[var(--color-bg-surface)] p-3 shadow-xl rotate-[2deg] w-[270px]">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-mono text-[var(--color-text-3)]">
          {issue.identifier}
        </span>
        <PriorityIcon priority={issue.priority} className="flex-shrink-0" />
      </div>

      <p className="text-sm text-[var(--color-text)] leading-snug">
        {issue.title}
      </p>
    </div>
  )
}
