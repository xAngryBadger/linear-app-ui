import { create } from 'zustand'
import type { Issue, Status, Priority } from '../types'
import { issues as seedIssues, teams as seedTeams, members as seedMembers, labels as seedLabels } from '../lib/seed-data'
import { pushUndo } from '../lib/undo'

interface IssueStore {
  issues: Issue[]
  teams: typeof seedTeams
  members: typeof seedMembers
  labels: typeof seedLabels
  addIssue: (issue: Issue) => void
  createIssue: (partial: Omit<Issue, 'id' | 'identifier' | 'createdAt' | 'updatedAt'>) => void
  updateIssue: (id: string, updates: Partial<Issue>) => void
  deleteIssue: (id: string) => void
  moveIssue: (id: string, status: Status) => void
  setPriority: (id: string, priority: Priority) => void
  setAssignee: (id: string, assigneeId: string | null) => void
  getIssueById: (id: string) => Issue | undefined
  getIssuesByStatus: (status: Status) => Issue[]
  getIssuesByTeam: (teamId: string) => Issue[]
}

function generateIdentifier(teamId: string, teams: typeof seedTeams, issues: Issue[]): string {
  const team = teams.find((t) => t.id === teamId)
  if (!team) return `UNK-${Date.now()}`
  const teamIssues = issues.filter((i) => i.teamId === teamId)
  const count = teamIssues.length + 1
  return `${team.key}-${count}`
}

export const useIssueStore = create<IssueStore>((set, get) => ({
  issues: [...seedIssues],
  teams: [...seedTeams],
  members: [...seedMembers],
  labels: [...seedLabels],

  addIssue: (issue) => set((state) => ({ issues: [...state.issues, issue] })),

  createIssue: (partial) => {
    const state = get()
    const now = new Date().toISOString()
    const issue: Issue = {
      ...partial,
      id: `issue-${crypto.randomUUID()}`,
      identifier: generateIdentifier(partial.teamId, state.teams, state.issues),
      createdAt: now,
      updatedAt: now,
    }
    set((state) => ({ issues: [...state.issues, issue] }))
  },

  updateIssue: (id, updates) => {
    const prev = get().issues.find((i) => i.id === id)
    if (!prev) return
    const prevSnapshot = { ...prev }
    pushUndo({
      description: `Update ${prev.identifier}`,
      undo: () => {
        set((state) => ({
          issues: state.issues.map((i) => (i.id === id ? prevSnapshot : i)),
        }))
      },
    })
    set((state) => ({
      issues: state.issues.map((i) =>
        i.id === id ? { ...i, ...updates, updatedAt: new Date().toISOString() } : i,
      ),
    }))
  },

  deleteIssue: (id) => {
    const prev = get().issues.find((i) => i.id === id)
    if (!prev) return
    pushUndo({
      description: `Delete ${prev.identifier}`,
      undo: () => {
        set((state) => ({ issues: [...state.issues, prev] }))
      },
    })
    set((state) => ({ issues: state.issues.filter((i) => i.id !== id) }))
  },

  moveIssue: (id, status) => {
    const prev = get().issues.find((i) => i.id === id)
    if (!prev || prev.status === status) return
    const prevStatus = prev.status
    pushUndo({
      description: `Move ${prev.identifier} from ${prevStatus} to ${status}`,
      undo: () => {
        set((state) => ({
          issues: state.issues.map((i) => (i.id === id ? { ...i, status: prevStatus } : i)),
        }))
      },
    })
    set((state) => ({
      issues: state.issues.map((i) =>
        i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i,
      ),
    }))
  },

  setPriority: (id, priority) => {
    const prev = get().issues.find((i) => i.id === id)
    if (!prev || prev.priority === priority) return
    const prevPriority = prev.priority
    pushUndo({
      description: `Change ${prev.identifier} priority to ${priority}`,
      undo: () => {
        set((state) => ({
          issues: state.issues.map((i) => (i.id === id ? { ...i, priority: prevPriority } : i)),
        }))
      },
    })
    set((state) => ({
      issues: state.issues.map((i) =>
        i.id === id ? { ...i, priority, updatedAt: new Date().toISOString() } : i,
      ),
    }))
  },

  setAssignee: (id, assigneeId) => {
    set((state) => ({
      issues: state.issues.map((i) =>
        i.id === id ? { ...i, assigneeId, updatedAt: new Date().toISOString() } : i,
      ),
    }))
  },

  getIssueById: (id) => get().issues.find((i) => i.id === id),

  getIssuesByStatus: (status) => get().issues.filter((i) => i.status === status),

  getIssuesByTeam: (teamId) => get().issues.filter((i) => i.teamId === teamId),
}))
