import { AppShell } from './components/layout/AppShell'
import { BoardView } from './components/board/BoardView'
import { useUiStore } from './stores/uiStore'
import { CommandMenu } from './components/CommandMenu'

function DetailPanel() {
  const detailPanelOpen = useUiStore((s) => s.detailPanelOpen)
  const closeDetail = useUiStore((s) => s.closeDetail)
  if (!detailPanelOpen) return null
  return (
    <div className="w-full h-full p-6">
      <button onClick={closeDetail} className="text-xs text-[var(--color-text-3)] hover:text-[var(--color-text)]">
        Close
      </button>
    </div>
  )
}

function App() {
  return (
    <>
      <AppShell detailPanel={<DetailPanel />}>
        <BoardView />
      </AppShell>
      <CommandMenu />
    </>
  )
}

export default App
