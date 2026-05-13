import type { Status } from '../../types'
import { STATUS_LABELS } from '../../types'

interface StatusBadgeProps {
  status: Status
  className?: string
}

const statusColors: Record<Status, string> = {
  backlog: 'var(--color-backlog)',
  todo: 'var(--color-todo)',
  in_progress: 'var(--color-in-progress)',
  done: 'var(--color-done)',
  cancelled: 'var(--color-cancelled)',
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${className}`}>
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: statusColors[status] }}
      />
      {STATUS_LABELS[status]}
    </span>
  )
}
