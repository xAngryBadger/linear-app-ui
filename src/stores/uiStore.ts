import { create } from 'zustand'

interface UiStore {
  sidebarOpen: boolean
  detailPanelOpen: boolean
  detailIssueId: string | null
  paletteOpen: boolean
  viewMode: 'board' | 'list'
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  openDetail: (issueId: string) => void
  closeDetail: () => void
  openPalette: () => void
  closePalette: () => void
  togglePalette: () => void
  setViewMode: (mode: 'board' | 'list') => void
}

export const useUiStore = create<UiStore>((set) => ({
  sidebarOpen: true,
  detailPanelOpen: false,
  detailIssueId: null,
  paletteOpen: false,
  viewMode: 'board',

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  openDetail: (issueId) => set({ detailPanelOpen: true, detailIssueId: issueId }),
  closeDetail: () => set({ detailPanelOpen: false, detailIssueId: null }),

  openPalette: () => set({ paletteOpen: true }),
  closePalette: () => set({ paletteOpen: false }),
  togglePalette: () => set((s) => ({ paletteOpen: !s.paletteOpen })),

  setViewMode: (mode) => set({ viewMode: mode }),
}))
