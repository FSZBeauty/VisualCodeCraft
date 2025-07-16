import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

function DragItem() {
  const [{ isDragging }, drag] = useDrag({
    type: 'test',
    item: { name: 'Test Item' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
        margin: '5px',
        cursor: 'move',
      }}
    >
      Drag me!
    </div>
  );
}

function DropZone() {
  const [{ isOver }, drop] = useDrop({
    accept: 'test',
    drop: (item) => {
      console.log('Dropped:', item);
      alert('Drop successful!');
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? 'lightgreen' : 'lightgray',
        padding: '20px',
        margin: '10px',
        minHeight: '100px',
        border: '2px dashed #ccc',
      }}
    >
      Drop zone {isOver ? '(hover)' : ''}
    </div>
  );
}

export default function DragTest() {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Drag and Drop Test</h3>
      <DragItem />
      <DropZone />
    </div>
  );
}