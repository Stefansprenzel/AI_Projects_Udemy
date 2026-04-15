import type { ColumnState } from '@/types'

export const initialColumns: ColumnState[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    cards: [
      {
        id: 'card-1',
        title: 'Define success criteria',
        details: 'Capture the project scope, styling goals, and feature list for the MVP.',
      },
      {
        id: 'card-2',
        title: 'Design board layout',
        details: 'Create a clean single-board layout with five columns and accessible controls.',
      },
    ],
  },
  {
    id: 'planned',
    title: 'Planned',
    cards: [
      {
        id: 'card-3',
        title: 'Build drag-and-drop',
        details: 'Implement drag-and-drop support using browser-native drag events.',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In progress',
    cards: [
      {
        id: 'card-4',
        title: 'Add card creation flows',
        details: 'Allow users to add title and details for new cards from each column.',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [
      {
        id: 'card-5',
        title: 'Polish UI styles',
        details: 'Apply the brand palette and refine spacing for a premium interface.',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      {
        id: 'card-6',
        title: 'Validate MVP goals',
        details: 'Confirm the app supports all required interactions and loads dummy data.',
      },
    ],
  },
]
