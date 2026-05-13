import { useDroppable } from '@dnd-kit/core'
import { IssueCard } from './IssueCard'
import { StatusBadge } from '../ui/StatusBadge'
import type { Issue, Status } from '../../types'

interface BoardColumnProps {
  status: Status
  issues: Issue[]
  onIssueClick?: (issueId: string) => void
}

export function BoardColumn({ status,  issues, onIssueClick }: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { status },
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col min-w-[280px] w-[280px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] transition-colors ${isOver ? 'border-[var(--color-accent)]/50 bg-[var(--color-accent)]/5' : ''}`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <StatusBadge status={status} />
        </div>
        <span className="text-xs text-[var(--color-text-3)] tabular-nums">
          {issues.length}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-2 overflow-y-auto flex-1">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onClick={onIssueClick} />
        ))}
        {issues.length === 0 && (
          <div className="flex items-center justify-center py-8 text-xs text-[var(--color-text-3)]">
            No issues
          </div>
        )}
      </div>
    </div>
  )
}
