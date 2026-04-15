import type { Card as CardType } from '@/types'

type CardProps = {
  card: CardType
  columnId: string
  onDelete: (columnId: string, cardId: string) => void
  onDragStart: (event: React.DragEvent<HTMLDivElement>, cardId: string) => void
}

export default function Card({ card, columnId, onDelete, onDragStart }: CardProps) {
  return (
    <div
      className="card-item"
      draggable
      onDragStart={(event) => onDragStart(event, card.id)}
    >
      <div>
        <h3 className="card-title">{card.title}</h3>
        <p className="card-details">{card.details}</p>
      </div>
      <div className="card-actions">
        <button type="button" className="button-small button-delete" onClick={() => onDelete(columnId, card.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}
