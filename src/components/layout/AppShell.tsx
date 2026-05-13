import { useUiStore } from '../../stores/uiStore'
import { Sidebar } from './Sidebar'
import { motion } from 'motion/react'

interface AppShellProps {
  children: React.ReactNode
  detailPanel: React.ReactNode
}

export function AppShell({ children, detailPanel }: AppShellProps) {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen)
  const detailPanelOpen = useUiStore((s) => s.detailPanelOpen)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <motion.div
        animate={{ width: sidebarOpen ? 240 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex-shrink-0 overflow-hidden border-r border-[var(--color-border)]"
      >
        <Sidebar />
      </motion.div>

      <main className="flex-1 flex min-w-0 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-auto">{children}</div>

        <motion.div
          animate={{ width: detailPanelOpen ? 480 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex-shrink-0 overflow-hidden border-l border-[var(--color-border)]"
        >
          {detailPanel}
        </motion.div>
      </main>
    </div>
  )
}
