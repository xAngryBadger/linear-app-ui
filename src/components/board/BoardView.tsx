import { DndContext, DragOverlay, type DragStartEvent, type DragEndEvent, pointerWithin, type Modifier } from '@dnd-kit/core'
import { useState, useCallback, useMemo } from 'react'
import { useIssueStore } from '../../stores/issueStore'
import { useFilterStore } from '../../stores/filterStore'
import { useUiStore } from '../../stores/uiStore'
import { BoardColumn } from './BoardColumn'
import { DragOverlayCard } from './DragOverlay'
import { STATUS_ORDER, type Status } from '../../types'

const stripScale: Modifier = ({ transform }) => {
  return {
    ...transform,
    scaleX: 1,
    scaleY: 1,
  }
}

export function BoardView() {
  const issues = useIssueStore((s) => s.issues)
  const moveIssue = useIssueStore((s) => s.moveIssue)
  const search = useFilterStore((s) => s.search)
  const statusFilter = useFilterStore((s) => s.status)
  const priorityFilter = useFilterStore((s) => s.priority)
  const assigneeFilter = useFilterStore((s) => s.assigneeId)
  const teamFilter = useFilterStore((s) => s.teamId)
  const openDetail = useUiStore((s) => s.openDetail)

  const [activeId, setActiveId] = useState<string | null>(null)

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

  const columns = useMemo(() => {
  return STATUS_ORDER.map((status) => ({
    status,
    issues: filteredIssues.filter((i) => i.status === status),
  }))
  }, [filteredIssues])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)

      if (!over) return

      const issueId = String(active.id)
      const overId = String(over.id)

      let newStatus: Status | undefined

      for (const col of columns) {
        if (col.issues.some((i) => i.id === overId)) {
          newStatus = col.status
          break
        }
      }

      if (!newStatus) {
        if (STATUS_ORDER.includes(overId as Status)) {
          newStatus = overId as Status
        }
      }

      if (newStatus) {
        moveIssue(issueId, newStatus)
      }
    },
    [columns, moveIssue],
  )

  const activeIssue = activeId ? issues.find((i) => i.id === activeId) : null

  return (
    <DndContext
    collisionDetection={pointerWithin}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    modifiers={[stripScale]}
    >
      <div className="flex h-full gap-4 p-4 overflow-x-auto">
        {columns.map((col) => (
          <BoardColumn
            key={col.status}
            status={col.status}
            issues={col.issues}
            onIssueClick={openDetail}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeIssue ? <DragOverlayCard issue={activeIssue} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
