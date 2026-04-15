'use client'

import { useState } from 'react'
import type { ColumnState } from '@/types'
import Card from './Card'

type ColumnProps = {
  column: ColumnState
  onRename: (columnId: string, nextTitle: string) => void
  onAddCard: (columnId: string, title: string, details: string) => void
  onDeleteCard: (columnId: string, cardId: string) => void
  onCardDrop: (columnId: string, cardId: string) => void
  onCardDragStart: (event: React.DragEvent<HTMLDivElement>, cardId: string) => void
}

export default function Column({ column, onRename, onAddCard, onDeleteCard, onCardDrop, onCardDragStart }: ColumnProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleValue, setTitleValue] = useState(column.title)
  const [newTitle, setNewTitle] = useState('')
  const [newDetails, setNewDetails] = useState('')

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const cardId = event.dataTransfer.getData('text/plain')
    if (cardId) {
      onCardDrop(column.id, cardId)
    }
  }

  const handleAddCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newTitle.trim()) return
    onAddCard(column.id, newTitle.trim(), newDetails.trim())
    setNewTitle('')
    setNewDetails('')
  }

  const commitTitle = () => {
    const trimmed = titleValue.trim()
    if (trimmed) {
      onRename(column.id, trimmed)
    }
    setIsEditingTitle(false)
  }

  return (
    <section
      className="column-card"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="column-header">
        {isEditingTitle ? (
          <input
            className="column-input"
            value={titleValue}
            onChange={(event) => setTitleValue(event.target.value)}
            onBlur={commitTitle}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                commitTitle()
              }
            }}
            autoFocus
          />
        ) : (
          <h2 className="column-title" onClick={() => setIsEditingTitle(true)}>{column.title}</h2>
        )}
        <button type="button" className="button-small button-tertiary" onClick={() => setIsEditingTitle((current) => !current)}>
          Rename
        </button>
      </div>

      <div className="card-list">
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            columnId={column.id}
            onDelete={onDeleteCard}
            onDragStart={onCardDragStart}
          />
        ))}
      </div>

      <form className="add-card-form" onSubmit={handleAddCard}>
        <input
          type="text"
          placeholder="Card title"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          required
        />
        <textarea
          placeholder="Card details"
          value={newDetails}
          onChange={(event) => setNewDetails(event.target.value)}
        />
        <button type="submit" className="button button-secondary">
          Add card
        </button>
      </form>
    </section>
  )
}
