import { useCallback } from 'react'
import { useUiStore } from '../stores/uiStore'
import { useIssueStore } from '../stores/issueStore'
import { useFilterStore } from '../stores/filterStore'
import { popUndo } from './undo'

type ShortcutAction = () => void

interface RegisteredShortcut {
  key: string
  label: string
  action: ShortcutAction
  scope: string
  priority: number
}

const registeredShortcuts = new Map<string, RegisteredShortcut[]>()

function parseKeyCombo(combo: string): { key: string; meta: boolean; ctrl: boolean; shift: boolean; alt: boolean } {
  const parts = combo.toLowerCase().split('+')
  return {
    key: parts[parts.length - 1],
    meta: parts.includes('meta') || parts.includes('cmd') || parts.includes('⌘'),
    ctrl: parts.includes('ctrl'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt'),
  }
}

function matchesEvent(combo: string, e: KeyboardEvent): boolean {
  const parsed = parseKeyCombo(combo)
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
  return (
    e.key.toLowerCase() === parsed.key &&
    (isMac ? e.metaKey === parsed.meta : e.ctrlKey === parsed.meta) &&
    e.ctrlKey === parsed.ctrl &&
    e.shiftKey === parsed.shift &&
    e.altKey === parsed.alt
  )
}

export function registerShortcut(key: string, label: string, action: ShortcutAction, scope = 'global', priority = 0) {
  const entry: RegisteredShortcut = { key, label, action, scope, priority }
  const existing = registeredShortcuts.get(key) || []
  existing.push(entry)
  existing.sort((a, b) => b.priority - a.priority)
  registeredShortcuts.set(key, existing)
  return () => {
    const list = registeredShortcuts.get(key) || []
    const idx = list.indexOf(entry)
    if (idx >= 0) list.splice(idx, 1)
  }
}

const gKeyQueue: string[] = []
let gKeyTimer: ReturnType<typeof setTimeout> | null = null

export function useShortcuts() {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar)
  const closeDetail = useUiStore((s) => s.closeDetail)
  const openPalette = useUiStore((s) => s.openPalette)
  const createIssue = useIssueStore((s) => s.createIssue)
  const activeTeamId = useFilterStore((s) => s.teamId)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable

      if (matchesEvent('cmd+\\', e)) {
        e.preventDefault()
        toggleSidebar()
        return
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        closeDetail()
        return
      }

      if (matchesEvent('cmd+z', e)) {
        e.preventDefault()
        const entry = popUndo()
        if (entry) entry.undo()
        return
      }

      if (isInput) return

      if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        gKeyQueue.push('g')
        if (gKeyTimer) clearTimeout(gKeyTimer)
        gKeyTimer = setTimeout(() => {
          gKeyQueue.length = 0
        }, 1000)

        if (gKeyQueue.length >= 2) {
          gKeyQueue.length = 0
          if (gKeyTimer) clearTimeout(gKeyTimer)
          return
        }
        return
      }

      if (gKeyQueue.length === 1 && e.key.toLowerCase() === 'i' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        gKeyQueue.length = 0
        if (gKeyTimer) clearTimeout(gKeyTimer)
        openPalette()
        return
      }

      if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        e.preventDefault()
        const teams = useIssueStore.getState().teams
        const teamId = activeTeamId || teams[0]?.id || 'team-1'
        createIssue({
          title: 'New Issue',
          description: '',
          status: 'backlog',
          priority: 'none',
          assigneeId: null,
          teamId,
          labelIds: [],
        })
        return
      }

      for (const [, shortcuts] of registeredShortcuts) {
        for (const shortcut of shortcuts) {
          if (matchesEvent(shortcut.key, e)) {
            e.preventDefault()
            shortcut.action()
            return
          }
        }
      }
    },
    [toggleSidebar, closeDetail, openPalette, createIssue, activeTeamId],
  )

  return handleKeyDown
}
