// components/DraggableTable.tsx
import React from 'react'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import {restrictToVerticalAxis} from '@dnd-kit/modifiers'

interface Column<T> {
  label: string
  key: string
  render?: (item: T) => React.ReactNode
}

interface DraggableTableProps<T> {
  columns: Column<T>[]
  data: T[]
  getId: (item: T) => string
  onDragEnd: (newData: T[]) => void
  onDelete?: (id: string) => void
}

function DraggableTable<T>({
  columns,
  data,
  getId,
  onDragEnd,
  onDelete,
}: DraggableTableProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={(event) => {
        const { active, over } = event
        if (active.id !== over?.id) {
          const oldIndex = data.findIndex((item) => getId(item) === active.id)
          const newIndex = data.findIndex((item) => getId(item) === over?.id)
          const newItems = arrayMove(data, oldIndex, newIndex)
          onDragEnd(newItems)
        }
      }}
    >
      <SortableContext
        items={data.map(getId)}
        strategy={verticalListSortingStrategy}
      >
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <Row
                key={getId(item)}
                id={getId(item)}
                item={item}
                columns={columns}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  )
}

function Row<T>({
  id,
  item,
  columns,
  onDelete,
}: {
  id: string
  item: T
  columns: Column<T>[]
  onDelete?: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
  }

  return (
    <tr ref={setNodeRef} style={style}>
      {columns.map((col) => {
        if (col.key === 'delete' && onDelete) {
          return (
            <td
              key={col.key}
              style={{
                border: '1px solid #ccc',
                padding: '8px',
                textAlign: 'center',
              }}
            >
              <button onClick={() => onDelete(id)} style={{ color: 'red' }}>
                刪
              </button>
            </td>
          )
        }

        if (col.key === 'sort') {
          return (
            <td
              key={col.key}
              {...attributes}
              {...listeners}
              style={{
                border: '1px solid #ccc',
                padding: '8px',
                textAlign: 'center',
              }}
            >
              ☰
            </td>
          )
        }

        return (
          <td
            key={col.key}
            style={{
              border: '1px solid #ccc',
              padding: '8px',
              textAlign: 'center',
            }}
          >
            {col.render ? col.render(item) : (item as any)[col.key]}
          </td>
        )
      })}
    </tr>
  )
}

export default DraggableTable
