import type { Priority } from '../../types'

interface PriorityIconProps {
  priority: Priority
  className?: string
}

export function PriorityIcon({ priority, className = '' }: PriorityIconProps) {
  const colorMap: Record<Priority, string> = {
    urgent: 'var(--color-urgent)',
    high: 'var(--color-high)',
    medium: 'var(--color-medium)',
    low: 'var(--color-low)',
    none: 'var(--color-none)',
  }

  if (priority === 'none') {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
        <line x1="3" y1="7" x2="11" y2="7" stroke={colorMap[priority]} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }

  if (priority === 'urgent') {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
        <path d="M7 1L13 7L7 13L1 7Z" fill={colorMap.urgent} />
      </svg>
    )
  }

  const isHigh = priority === 'high'
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      {isHigh ? (
        <>
          <line x1="3" y1="11" x2="11" y2="3" stroke={colorMap[priority]} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11" y1="3" x2="11" y2="10" stroke={colorMap[priority]} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11" y1="3" x2="4" y2="3" stroke={colorMap[priority]} strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="11" y1="3" x2="3" y2="11" stroke={colorMap[priority]} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="11" x2="3" y2="4" stroke={colorMap[priority]} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="11" x2="10" y2="11" stroke={colorMap[priority]} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}
