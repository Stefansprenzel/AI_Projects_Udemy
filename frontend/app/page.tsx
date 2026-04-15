import Board from '@/components/Board'

export default function Home() {
  return (
    <main className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Project board</p>
          <h1>Kanban workspace</h1>
          <p className="description">
            One board, five columns, drag cards between stages, add new cards, and rename columns.
          </p>
        </div>
      </div>
      <Board />
    </main>
  )
}
