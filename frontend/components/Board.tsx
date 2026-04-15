'use client'

import { useState } from 'react'
import type { ColumnState } from '@/types'
import { initialColumns } from '@/lib/data'
import Column from './Column'

export default function Board() {
  const [columns, setColumns] = useState<ColumnState[]>(initialColumns)

  const handleRename = (columnId: string, nextTitle: string) => {
    setColumns((current) =>
      current.map((column) =>
        column.id === columnId ? { ...column, title: nextTitle } : column,
      ),
    )
  }

  const handleAddCard = (columnId: string, title: string, details: string) => {
    setColumns((current) =>
      current.map((column) => {
        if (column.id !== columnId) return column

        const nextCard: ColumnState['cards'][number] = {
          id: `${columnId}-${Date.now()}`,
          title,
          details,
        }

        return {
          ...column,
          cards: [nextCard, ...column.cards],
        }
      }),
    )
  }

  const handleDeleteCard = (columnId: string, cardId: string) => {
    setColumns((current) =>
      current.map((column) =>
        column.id === columnId
          ? { ...column, cards: column.cards.filter((card) => card.id !== cardId) }
          : column,
      ),
    )
  }

  const handleCardDrop = (targetColumnId: string, cardId: string) => {
    setColumns((current) => {
      const sourceColumnIndex = current.findIndex((column) =>
        column.cards.some((card) => card.id === cardId),
      )
      const targetColumnIndex = current.findIndex((column) => column.id === targetColumnId)
      if (sourceColumnIndex === -1 || targetColumnIndex === -1) {
        return current
      }

      const sourceColumn = current[sourceColumnIndex]
      const cardToMove = sourceColumn.cards.find((card) => card.id === cardId)
      if (!cardToMove) return current

      if (sourceColumn.id === targetColumnId) return current

      return current.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            cards: column.cards.filter((card) => card.id !== cardId),
          }
        }

        if (column.id === targetColumnId) {
          return {
            ...column,
            cards: [cardToMove, ...column.cards],
          }
        }

        return column
      })
    })
  }

  const handleCardDragStart = (event: React.DragEvent<HTMLDivElement>, cardId: string) => {
    event.dataTransfer.setData('text/plain', cardId)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <section className="board-grid">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onRename={handleRename}
          onAddCard={handleAddCard}
          onDeleteCard={handleDeleteCard}
          onCardDrop={handleCardDrop}
          onCardDragStart={handleCardDragStart}
        />
      ))}
    </section>
  )
}
