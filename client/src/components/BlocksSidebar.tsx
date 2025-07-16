import { blockCategories } from "@/lib/blocks";
import DraggableBlock from "./DraggableBlock";
import HelpTooltip from "./HelpTooltip";

interface BlocksSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function BlocksSidebar({ selectedCategory, onCategoryChange }: BlocksSidebarProps) {
  const categories = Object.keys(blockCategories);

  return (
    <aside className="w-64 panel-bg border-r border-gray flex flex-col">
      <div className="p-4 border-b border-gray">
        <div className="flex items-center space-x-2 mb-3">
          <h2 className="text-sm font-semibold">Code Blocks</h2>
          <HelpTooltip content="Drag blocks from here to the canvas to start building your application" />
        </div>
        <div className="space-y-2">
          <div className="text-xs text-muted uppercase tracking-wider">Categories</div>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  selectedCategory === category
                    ? "accent-blue text-white"
                    : "hover:bg-hover-bg"
                }`}
                onClick={() => onCategoryChange(category)}
                title={`${blockCategories[category].name} blocks`}
              >
                <i className={`${blockCategories[category].icon} mr-2`}></i>
                {blockCategories[category].name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="text-xs text-muted uppercase tracking-wider">
              {blockCategories[selectedCategory].name} Blocks
            </div>
            <HelpTooltip 
              content="Drag these blocks to the canvas. Click on placed blocks to edit their properties." 
              side="right"
            />
          </div>
          
          {blockCategories[selectedCategory].blocks.map((block) => {
            console.log("Rendering block:", block.name, block.type);
            return (
              <div key={block.type} className="mb-2">
                <DraggableBlock block={block} />
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-3 bg-gray-800 rounded-lg">
          <div className="text-xs text-yellow-400 font-medium mb-2">💡 Quick Start</div>
          <div className="text-xs text-gray-300">
            1. Start with HTML blocks (Button, Text)<br/>
            2. Add Events for interactions<br/>
            3. Use Logic for conditions<br/>
            4. Style with CSS blocks
          </div>
        </div>
      </div>
    </aside>
  );
}
