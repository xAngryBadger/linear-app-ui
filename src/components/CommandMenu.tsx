import { useEffect } from 'react'
import { Command } from 'cmdk'
import { useUiStore } from '../stores/uiStore'
import { useIssueStore } from '../stores/issueStore'
import { useFilterStore } from '../stores/filterStore'
import type { Status, Priority } from '../types'

const STATUSES: Status[] = ['backlog', 'todo', 'in_progress', 'done', 'cancelled']
const PRIORITIES: Priority[] = ['urgent', 'high', 'medium', 'low', 'none']

export function CommandMenu() {
  const paletteOpen = useUiStore((s) => s.paletteOpen)
  const closePalette = useUiStore((s) => s.closePalette)
  const setViewMode = useUiStore((s) => s.setViewMode)
  const setStatus = useFilterStore((s) => s.setStatus)
  const setPriority = useFilterStore((s) => s.setPriority)
  const createIssue = useIssueStore((s) => s.createIssue)
  const clearFilters = useFilterStore((s) => s.clearFilters)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        useUiStore.getState().togglePalette()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!paletteOpen) return null

  return (
    <div className="fixed inset-0 z-50" onClick={closePalette}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative mx-auto mt-[20vh] w-[560px] max-h-[400px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command>
          <div className="flex items-center border-b border-[var(--color-border)] px-4">
            <Command.Input
              placeholder="Type a command or search..."
              className="w-full bg-transparent py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-3)] outline-none"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-[var(--color-text-3)]">
              No results found.
            </Command.Empty>

            <Command.Group heading="Views" className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-3)]">
              <Command.Item
                onSelect={() => { setViewMode('board'); closePalette() }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-2)] rounded-md cursor-pointer data-[selected=true]:bg-[var(--color-bg-hover)] data-[selected=true]:text-[var(--color-text)]"
              >
                Board View
              </Command.Item>
              <Command.Item
                onSelect={() => { setViewMode('list'); closePalette() }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-2)] rounded-md cursor-pointer data-[selected=true]:bg-[var(--color-bg-hover)] data-[selected=true]:text-[var(--color-text)]"
              >
                List View
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Filter by Status" className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-3)] mt-2">
              {STATUSES.map((status) => (
                <Command.Item
                  key={status}
                  onSelect={() => { setStatus(status); closePalette() }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-2)] rounded-md cursor-pointer data-[selected=true]:bg-[var(--color-bg-hover)] data-[selected=true]:text-[var(--color-text)]"
                >
                  {status.replace('_', ' ')}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Filter by Priority" className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-3)] mt-2">
              {PRIORITIES.map((priority) => (
                <Command.Item
                  key={priority}
                  onSelect={() => { setPriority(priority); closePalette() }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-2)] rounded-md cursor-pointer data-[selected=true]:bg-[var(--color-bg-hover)] data-[selected=true]:text-[var(--color-text)]"
                >
                  {priority}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Actions" className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-3)] mt-2">
              <Command.Item
                onSelect={() => {
                  createIssue({
                    title: 'New Issue',
                    description: '',
                    status: 'todo',
                    priority: 'none',
                    teamId: 'team-eng',
                    assigneeId: null,
                    labelIds: [],
                  })
                  closePalette()
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-2)] rounded-md cursor-pointer data-[selected=true]:bg-[var(--color-bg-hover)] data-[selected=true]:text-[var(--color-text)]"
              >
                Create New Issue
              </Command.Item>
              <Command.Item
                onSelect={() => { clearFilters(); closePalette() }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-2)] rounded-md cursor-pointer data-[selected=true]:bg-[var(--color-bg-hover)] data-[selected=true]:text-[var(--color-text)]"
              >
                Clear All Filters
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
