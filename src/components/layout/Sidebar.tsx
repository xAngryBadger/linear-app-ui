import { useFilterStore } from '../../stores/filterStore'
import { useTeamStore } from '../../stores/teamStore'
import { useUiStore } from '../../stores/uiStore'
import { SidebarSection } from './SidebarSection'
import { LayoutDashboard, Layers, ChevronRight } from 'lucide-react'

export function Sidebar() {
  const teamId = useFilterStore((s) => s.teamId)
  const setTeamId = useFilterStore((s) => s.setTeamId)
  const teams = useTeamStore((s) => s.teams)
  const members = useTeamStore((s) => s.members)
  const viewMode = useUiStore((s) => s.viewMode)
  const setViewMode = useUiStore((s) => s.setViewMode)

  return (
    <div className="w-[240px] h-full flex flex-col bg-[var(--color-bg-alt)]">
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
            L
          </div>
          <span className="text-sm font-semibold text-[var(--color-text)]">Linear App</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <SidebarSection title="Views">
          <button
            onClick={() => setViewMode('board')}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded hover:bg-[var(--color-bg-hover)] transition-colors duration-100 ${
              viewMode === 'board' ? 'text-[var(--color-text)] bg-[var(--color-bg-hover)]' : 'text-[var(--color-text-2)]'
            }`}
          >
            <LayoutDashboard size={14} />
            Board
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded hover:bg-[var(--color-bg-hover)] transition-colors duration-100 ${
              viewMode === 'list' ? 'text-[var(--color-text)] bg-[var(--color-bg-hover)]' : 'text-[var(--color-text-2)]'
            }`}
          >
            <Layers size={14} />
            List
          </button>
        </SidebarSection>

        <SidebarSection title="Teams">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => setTeamId(teamId === team.id ? null : team.id)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded hover:bg-[var(--color-bg-hover)] transition-colors duration-100 ${
                teamId === team.id ? 'text-[var(--color-text)] bg-[var(--color-bg-hover)]' : 'text-[var(--color-text-2)]'
              }`}
            >
              <ChevronRight
                size={12}
                className={`transition-transform duration-150 ${teamId === team.id ? 'rotate-90' : ''}`}
              />
              <span>{team.icon}</span>
              <span>{team.name}</span>
            </button>
          ))}
        </SidebarSection>

        <SidebarSection title="Members">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--color-text-2)]"
            >
              <div className="w-5 h-5 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[9px] text-[var(--color-accent)] font-medium">
                {member.avatar}
              </div>
              <span>{member.name}</span>
              {member.isCurrentUser && (
                <span className="ml-auto text-[10px] text-[var(--color-text-3)]">You</span>
              )}
            </div>
          ))}
        </SidebarSection>
      </div>

      <div className="px-3 py-2 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-3)]">
        Press ⌘K for commands
      </div>
    </div>
  )
}
