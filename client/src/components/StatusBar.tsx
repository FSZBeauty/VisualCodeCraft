import { Block } from "@shared/schema";
import { Activity, Code, Eye, FileText } from "lucide-react";

interface StatusBarProps {
  blocks: Block[];
  generatedCode: {
    javascript: string;
    html: string;
    css: string;
  };
  rightPanelTab: "code" | "preview";
}

export default function StatusBar({ blocks, generatedCode, rightPanelTab }: StatusBarProps) {
  const totalLines = generatedCode.javascript.split('\n').length + 
                    generatedCode.html.split('\n').length + 
                    generatedCode.css.split('\n').length;

  return (
    <div className="bg-gray-900 border-t border-gray-700 px-4 py-2 flex items-center justify-between text-xs text-gray-400">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Activity className="w-3 h-3" />
          <span>{blocks.length} blocks</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Code className="w-3 h-3" />
          <span>{totalLines} lines generated</span>
        </div>

        <div className="flex items-center space-x-1">
          <FileText className="w-3 h-3" />
          <span>JS: {generatedCode.javascript.split('\n').length}</span>
          <span>HTML: {generatedCode.html.split('\n').length}</span>
          <span>CSS: {generatedCode.css.split('\n').length}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {rightPanelTab === "preview" ? (
            <>
              <Eye className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Live Preview</span>
            </>
          ) : (
            <>
              <Code className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400">Code View</span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
}