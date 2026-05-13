export type Priority = 'urgent' | 'high' | 'medium' | 'low' | 'none'
export type Status = 'backlog' | 'todo' | 'in_progress' | 'done' | 'cancelled'

export interface Issue {
  id: string
  identifier: string
  title: string
  description: string
  status: Status
  priority: Priority
  assigneeId: string | null
  teamId: string
  labelIds: string[]
  createdAt: string
  updatedAt: string
}

export interface Team {
  id: string
  name: string
  key: string
  icon: string
}

export interface Member {
  id: string
  name: string
  avatar: string
  isCurrentUser: boolean
}

export interface Label {
  id: string
  name: string
  color: string
}

export type ViewMode = 'board' | 'list'

export interface FilterState {
  search: string
  status: Status | null
  priority: Priority | null
  assigneeId: string | null
  teamId: string | null
}

export interface ShortcutDefinition {
  key: string
  label: string
  handler: () => void
  scope?: string
  when?: () => boolean
}

export const STATUS_ORDER: Status[] = ['backlog', 'todo', 'in_progress', 'done', 'cancelled']

export const STATUS_LABELS: Record<Status, string> = {
  backlog: 'Backlog',
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
  cancelled: 'Cancelled',
}

export const PRIORITY_ORDER: Priority[] = ['urgent', 'high', 'medium', 'low', 'none']

export const PRIORITY_LABELS: Record<Priority, string> = {
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  none: 'No priority',
}
