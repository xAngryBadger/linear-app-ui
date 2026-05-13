export interface UndoEntry {
  id: string
  undo: () => void
  description: string
}

const undoStack: UndoEntry[] = []
const MAX_UNDO = 50

export function pushUndo(entry: Omit<UndoEntry, 'id'>): string {
  const id = crypto.randomUUID()
  undoStack.push({ ...entry, id })
  if (undoStack.length > MAX_UNDO) undoStack.shift()
  return id
}

export function popUndo(): UndoEntry | undefined {
  return undoStack.pop()
}

export function peekUndo(): UndoEntry | undefined {
  return undoStack[undoStack.length - 1]
}

export function clearUndo(): void {
  undoStack.length = 0
}

export function getUndoStack(): readonly UndoEntry[] {
  return undoStack
}
