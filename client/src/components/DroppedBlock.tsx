import { useState } from "react";
import { useDrag } from "react-dnd";
import { Block } from "@shared/schema";
import { blockCategories } from "@/lib/blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface DroppedBlockProps {
  block: Block;
  isSelected: boolean;
  onUpdate: (updates: Partial<Block>) => void;
  onDelete: () => void;
  onSelect: () => void;
}

export default function DroppedBlock({
  block,
  isSelected,
  onUpdate,
  onDelete,
  onSelect,
}: DroppedBlockProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "dropped-block",
    item: { id: block.id, x: block.x, y: block.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // The drop is handled by the VisualCanvas drop handler
    },
  });

  // Find block definition
  const blockDef = Object.values(blockCategories)
    .flatMap(cat => cat.blocks)
    .find(b => b.type === block.type);

  if (!blockDef) return null;

  const handlePropertyChange = (key: string, value: any) => {
    onUpdate({ properties: { ...block.properties, [key]: value } });
  };

  return (
    <div
      ref={drag}
      className={`absolute bg-${blockDef.color}-600 rounded-lg p-4 shadow-lg border border-${blockDef.color}-500 block-shadow ${
        isDragging ? "drag-preview" : ""
      } ${isSelected ? "ring-2 ring-white" : ""}`}
      style={{
        left: block.x,
        top: block.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onClick={() => onSelect()}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <i className={`${blockDef.icon} text-white`}></i>
          <span className="text-white font-medium">{blockDef.name}</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:text-red-200 h-6 w-6 p-0"
          onClick={() => onDelete()}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Block-specific properties */}
      <div className="space-y-2">
        {blockDef.properties?.map((prop) => (
          <div key={prop.key}>
            {prop.type === "text" && (
              <Input
                className={`bg-${blockDef.color}-700 text-white border-${blockDef.color}-800 placeholder-${blockDef.color}-300 text-sm`}
                placeholder={prop.placeholder}
                value={block.properties[prop.key] || ""}
                onChange={(e) => handlePropertyChange(prop.key, e.target.value)}
              />
            )}
            
            {prop.type === "select" && (
              <Select
                value={block.properties[prop.key] || ""}
                onValueChange={(value) => handlePropertyChange(prop.key, value)}
              >
                <SelectTrigger className={`bg-${blockDef.color}-700 text-white border-${blockDef.color}-800 text-sm`}>
                  <SelectValue placeholder={prop.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {prop.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
      </div>

      {/* Connection points */}
      {blockDef.hasInput && (
        <div className={`w-4 h-4 bg-${blockDef.color}-800 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2 connection-point`}></div>
      )}
      {blockDef.hasOutput && (
        <div className={`w-4 h-4 bg-${blockDef.color}-800 rounded-full absolute -bottom-2 left-1/2 transform -translate-x-1/2 connection-point`}></div>
      )}
    </div>
  );
}
