import React from "react";
import { useDrop } from "react-dnd";
import { Block } from "@shared/schema";
import DroppedBlock from "./DroppedBlock";

interface VisualCanvasProps {
  blocks: Block[];
  onBlockDrop: (blockType: string, position: { x: number; y: number }) => void;
  onBlockUpdate: (id: string, updates: Partial<Block>) => void;
  onBlockDelete: (id: string) => void;
  selectedBlockId: string | null;
  onBlockSelect: (id: string | null) => void;
}

export default function VisualCanvas({
  blocks,
  onBlockDrop,
  onBlockUpdate,
  onBlockDelete,
  selectedBlockId,
  onBlockSelect,
}: VisualCanvasProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["block", "dropped-block"],
    drop: (item: any, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const canvasRect = document.getElementById("canvas")?.getBoundingClientRect();

      if (clientOffset && canvasRect) {
        const position = {
          x: clientOffset.x - canvasRect.left - 16, // Account for padding
          y: clientOffset.y - canvasRect.top - 16,  // Account for padding
        };

        if (item.type && typeof item.type === 'string') {
          // New block from sidebar
          console.log("Block dropped:", item.type, "at position:", position);
          onBlockDrop(item.type, position);
        } else if (item.id) {
          // Existing block being moved
          console.log("Moving block:", item.id, "to position:", position);
          onBlockUpdate(item.id, { x: position.x, y: position.y });
        }
      } else {
        console.log("Block dropped outside valid zone");
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <main
      id="canvas"
      ref={drop}
      className={`flex-1 ide-bg p-4 overflow-auto relative min-h-screen ${
        isOver ? "bg-blue-50/5" : ""
      }`}
      style={{ minWidth: '800px' }} // Make canvas wider
    >
      {/* Simple, clean background */}
      <div className="w-full h-full relative">
        {blocks.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-lg font-medium">Drop blocks here to start building</div>
            </div>
          </div>
        ) : null}

        {/* Render dropped blocks */}
        {blocks.map((block) => (
          <DroppedBlock
            key={block.id}
            block={block}
            isSelected={selectedBlockId === block.id}
            onUpdate={(updates) => onBlockUpdate(block.id, updates)}
            onDelete={() => onBlockDelete(block.id)}
            onSelect={() => onBlockSelect(block.id)}
          />
        ))}
      </div>
    </main>
  );
}