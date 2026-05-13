import { create } from 'zustand'
import { teams as seedTeams, members as seedMembers } from '../lib/seed-data'

interface TeamStore {
  teams: typeof seedTeams
  members: typeof seedMembers
  activeTeamId: string | null
  setActiveTeam: (teamId: string | null) => void
  getTeamById: (id: string) => typeof seedTeams[number] | undefined
  getMemberById: (id: string) => typeof seedMembers[number] | undefined
  getCurrentUser: () => typeof seedMembers[number]
}

export const useTeamStore = create<TeamStore>((set, get) => ({
  teams: [...seedTeams],
  members: [...seedMembers],
  activeTeamId: null,

  setActiveTeam: (teamId) => set({ activeTeamId: teamId }),

  getTeamById: (id) => get().teams.find((t) => t.id === id),

  getMemberById: (id) => get().members.find((m) => m.id === id),

  getCurrentUser: () => get().members.find((m) => m.isCurrentUser) || seedMembers[0],
}))
