import { AppShell } from './components/layout/AppShell'
import { BoardView } from './components/board/BoardView'
import { ListView } from './components/list/ListView'
import { DetailPanel } from './components/DetailPanel'
import { useUiStore } from './stores/uiStore'
import { CommandMenu } from './components/CommandMenu'

function App() {
  const viewMode = useUiStore((s) => s.viewMode)

  return (
    <>
      <AppShell detailPanel={<DetailPanel />}>
        {viewMode === 'list' ? <ListView /> : <BoardView />}
      </AppShell>
      <CommandMenu />
    </>
  )
}

export default App
