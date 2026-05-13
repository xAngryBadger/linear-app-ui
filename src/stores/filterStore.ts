import { create } from 'zustand'
import type { Status, Priority } from '../types'

interface FilterStore {
  search: string
  status: Status | null
  priority: Priority | null
  assigneeId: string | null
  teamId: string | null
  setSearch: (search: string) => void
  setStatus: (status: Status | null) => void
  setPriority: (priority: Priority | null) => void
  setAssigneeId: (assigneeId: string | null) => void
  setTeamId: (teamId: string | null) => void
  clearFilters: () => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  search: '',
  status: null,
  priority: null,
  assigneeId: null,
  teamId: null,

  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setAssigneeId: (assigneeId) => set({ assigneeId }),
  setTeamId: (teamId) => set({ teamId }),
  clearFilters: () => set({ search: '', status: null, priority: null, assigneeId: null, teamId: null }),
}))
