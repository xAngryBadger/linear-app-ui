import { useMemo } from 'react'
import { useIssueStore } from '../../stores/issueStore'
import { useFilterStore } from '../../stores/filterStore'
import { useUiStore } from '../../stores/uiStore'
import { STATUS_LABELS, PRIORITY_LABELS, type Priority, type Status } from '../../types'

const PRIORITY_COLORS: Record<Priority, string> = {
  urgent: 'var(--color-urgent)',
  high: 'var(--color-accent)',
  medium: 'var(--color-warning, #f5d142)',
  low: 'var(--color-text-3)',
  none: 'var(--color-text-3)',
}

const STATUS_COLORS: Record<Status, string> = {
  backlog: 'var(--color-text-3)',
  todo: 'var(--color-text-3)',
  in_progress: 'var(--color-accent)',
  done: 'var(--color-success, #42b5f5)',
  cancelled: 'var(--color-text-3)',
}

export function ListView() {
  const issues = useIssueStore((s) => s.issues)
  const members = useIssueStore((s) => s.members)
  const search = useFilterStore((s) => s.search)
  const statusFilter = useFilterStore((s) => s.status)
  const priorityFilter = useFilterStore((s) => s.priority)
  const assigneeFilter = useFilterStore((s) => s.assigneeId)
  const teamFilter = useFilterStore((s) => s.teamId)
  const openDetail = useUiStore((s) => s.openDetail)

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (search && !issue.title.toLowerCase().includes(search.toLowerCase()) && !issue.identifier.toLowerCase().includes(search.toLowerCase())) return false
      if (statusFilter && issue.status !== statusFilter) return false
      if (priorityFilter && issue.priority !== priorityFilter) return false
      if (assigneeFilter && issue.assigneeId !== assigneeFilter) return false
      if (teamFilter && issue.teamId !== teamFilter) return false
      return true
    })
  }, [issues, search, statusFilter, priorityFilter, assigneeFilter, teamFilter])

  return (
    <div className="h-full overflow-auto p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left text-[11px] text-[var(--color-text-3)] uppercase tracking-wider">
            <th className="pb-2 pl-3 font-medium">ID</th>
            <th className="pb-2 pl-3 font-medium">Title</th>
            <th className="pb-2 pl-3 font-medium">Status</th>
            <th className="pb-2 pl-3 font-medium">Priority</th>
            <th className="pb-2 pl-3 font-medium">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map((issue) => {
            const assignee = issue.assigneeId ? members.find((m) => m.id === issue.assigneeId) : null
            return (
              <tr
                key={issue.id}
                onClick={() => openDetail(issue.id)}
                className="border-b border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors"
              >
                <td className="py-2 pl-3 font-mono text-[11px] text-[var(--color-text-3)]">{issue.identifier}</td>
                <td className="py-2 pl-3 text-[var(--color-text)]">{issue.title}</td>
                <td className="py-2 pl-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[issue.status] }} />
                    <span className="text-[var(--color-text-2)]">{STATUS_LABELS[issue.status]}</span>
                  </div>
                </td>
                <td className="py-2 pl-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PRIORITY_COLORS[issue.priority] }} />
                    <span className="text-[var(--color-text-2)]">{PRIORITY_LABELS[issue.priority]}</span>
                  </div>
                </td>
                <td className="py-2 pl-3 text-[var(--color-text-2)]">{assignee ? assignee.name : '—'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
