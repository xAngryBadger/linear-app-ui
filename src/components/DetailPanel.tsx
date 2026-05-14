import { useUiStore } from '../stores/uiStore'
import { useIssueStore } from '../stores/issueStore'
import { STATUS_LABELS, PRIORITY_LABELS, type Priority, type Status } from '../types'

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

function DetailPanel() {
  const detailPanelOpen = useUiStore((s) => s.detailPanelOpen)
  const detailIssueId = useUiStore((s) => s.detailIssueId)
  const closeDetail = useUiStore((s) => s.closeDetail)
  const issues = useIssueStore((s) => s.issues)
  const members = useIssueStore((s) => s.members)

  if (!detailPanelOpen || !detailIssueId) return null

  const issue = issues.find((i) => i.id === detailIssueId)
  if (!issue) return null

  const assignee = issue.assigneeId ? members.find((m) => m.id === issue.assigneeId) : null

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <button
        onClick={closeDetail}
        className="text-xs text-[var(--color-text-3)] hover:text-[var(--color-text)] mb-4"
      >
        Close
      </button>

      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-mono text-[var(--color-text-3)]">{issue.identifier}</span>
          <h2 className="text-lg font-semibold text-[var(--color-text)] leading-tight mt-0.5">
            {issue.title}
          </h2>
        </div>

        {issue.description && (
          <p className="text-sm text-[var(--color-text-2)] leading-relaxed">{issue.description}</p>
        )}

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-[11px] text-[var(--color-text-3)] uppercase tracking-wider">Status</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[issue.status] }}
              />
              <span className="text-[var(--color-text)]">{STATUS_LABELS[issue.status]}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-[var(--color-text-3)] uppercase tracking-wider">Priority</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: PRIORITY_COLORS[issue.priority] }}
              />
              <span className="text-[var(--color-text)]">{PRIORITY_LABELS[issue.priority]}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-[var(--color-text-3)] uppercase tracking-wider">Assignee</span>
            <div className="mt-1 text-[var(--color-text)]">
              {assignee ? assignee.name : 'Unassigned'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { DetailPanel }
