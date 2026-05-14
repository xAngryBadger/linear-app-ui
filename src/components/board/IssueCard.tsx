import { useDroppable } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { PriorityIcon } from '../ui/PriorityIcon'
import { Avatar } from '../ui/Avatar'
import { StatusBadge } from '../ui/StatusBadge'
import type { Issue } from '../../types'

interface IssueCardProps {
  issue: Issue
  onClick?: (issueId: string) => void
}

export function IssueCard({ issue, onClick }: IssueCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id,
    data: { issue },
  })

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: issue.id,
    data: { issue },
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        setDroppableRef(node)
      }}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => onClick?.(issue.id)}
      className={`group flex flex-col gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3 cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md ${isDragging ? 'opacity-50 shadow-lg z-50' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-mono text-[var(--color-text-3)]">
          {issue.identifier}
        </span>
        <PriorityIcon priority={issue.priority} className="flex-shrink-0" />
      </div>

      <p className="text-sm text-[var(--color-text)] leading-snug">
        {issue.title}
      </p>

      <div className="flex items-center justify-between gap-2 mt-auto">
        <StatusBadge status={issue.status} className="text-[10px]" />
        {issue.assigneeId && <Avatar initials={issue.assigneeId.replace('member-', '').substring(0, 2).toUpperCase()} size="sm" />}
      </div>
    </div>
  )
}
