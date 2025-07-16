import { useDrag } from "react-dnd";
import { BlockDefinition } from "@/lib/blocks";

interface DraggableBlockProps {
  block: BlockDefinition;
}

export default function DraggableBlock({ block }: DraggableBlockProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "block",
    item: () => {
      console.log("Drag item created:", block.name, "type:", block.type);
      return { 
        type: block.type, 
        block: block,
        name: block.name 
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      console.log("Drag end:", block.name, "didDrop:", monitor.didDrop(), "dropResult:", monitor.getDropResult());
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    console.log("Block clicked:", block.name);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log("Mouse down:", block.name);
  };

  return (
    <div
      ref={drag}
      className={`bg-blue-600 rounded-lg p-3 hover:bg-blue-700 transition-colors mb-2 ${
        isDragging ? 'cursor-grabbing opacity-50' : 'cursor-grab'
      }`}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'rotate(2deg)' : 'none'
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onDragStart={(e) => {
        console.log("Native drag start:", block.name);
      }}
    >
      <div className="flex items-center space-x-2">
        <i className={`${block.icon} text-white`}></i>
        <span className="text-white text-sm font-medium">{block.name}</span>
      </div>
      <div className="text-white text-xs mt-1">
        {block.description}
      </div>
    </div>
  );
}
