interface AvatarProps {
  initials: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses: Record<string, string> = {
  sm: 'w-5 h-5 text-[9px]',
  md: 'w-6 h-6 text-[10px]',
  lg: 'w-8 h-8 text-xs',
}

export function Avatar({ initials, size = 'md', className = '' }: AvatarProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-medium leading-none ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  )
}
