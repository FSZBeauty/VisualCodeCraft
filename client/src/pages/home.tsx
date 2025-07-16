import { useState, useEffect } from "react";
import TopToolbar from "@/components/TopToolbar";
import BlocksSidebar from "@/components/BlocksSidebar";
import VisualCanvas from "@/components/VisualCanvas";
import CodeView from "@/components/CodeView";
import LivePreview from "@/components/LivePreview";
import ExportModal from "@/components/ExportModal";
import TutorialOverlay from "@/components/TutorialOverlay";
import QuickTips from "@/components/QuickTips";
import StatusBar from "@/components/StatusBar";

import { useBlocks } from "@/hooks/use-blocks";
import { useCodeGeneration } from "@/hooks/use-code-generation";

export default function Home() {
  const [rightPanelTab, setRightPanelTab] = useState<"code" | "preview">("code");
  const [codeTab, setCodeTab] = useState<"javascript" | "html" | "css">("javascript");
  const [selectedCategory, setSelectedCategory] = useState("logic");
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showQuickTips, setShowQuickTips] = useState(true);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  const { blocks, addBlock, updateBlock, deleteBlock, clearBlocks } = useBlocks();
  const { generatedCode } = useCodeGeneration(blocks);

  const handleBlockDrop = (blockType: string, position: { x: number; y: number }) => {
    const newBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type: blockType as any,
      x: position.x,
      y: position.y,
      properties: {},
    };
    addBlock(newBlock);
  };

  // Check if user is new and show tutorial
  useEffect(() => {
    const hasVisited = localStorage.getItem('visual-ide-visited');
    if (!hasVisited) {
      setShowTutorial(true);
      localStorage.setItem('visual-ide-visited', 'true');
    }
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setShowTutorial(true);
      }
    };
    
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const handleNewProject = () => {
    clearBlocks();
    setShowQuickTips(true);
  };

  const handleSaveProject = () => {
    // Save to local storage
    localStorage.setItem('visual-ide-project', JSON.stringify({
      blocks,
      timestamp: new Date().toISOString()
    }));
  };

  const handleOpenProject = () => {
    const saved = localStorage.getItem('visual-ide-project');
    if (saved) {
      const project = JSON.parse(saved);
      // Load blocks from saved project
      clearBlocks();
      project.blocks.forEach((block: any) => addBlock(block));
    }
  };

  const handleShowTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <div className="flex flex-col h-screen ide-bg text-light overflow-hidden">
      <TopToolbar
        onNewProject={handleNewProject}
        onSaveProject={handleSaveProject}
        onOpenProject={handleOpenProject}
        onExportProject={() => setShowExportModal(true)}
        onShowTutorial={handleShowTutorial}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <BlocksSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <div className="flex-1 relative">
          <VisualCanvas
            blocks={blocks}
            onBlockDrop={handleBlockDrop}
            onBlockUpdate={updateBlock}
            onBlockDelete={deleteBlock}
            selectedBlockId={selectedBlockId}
            onBlockSelect={setSelectedBlockId}
          />
          
          {/* Quick Tips overlay */}
          {showQuickTips && blocks.length === 0 && (
            <div className="absolute top-4 right-4 z-10">
              <QuickTips onClose={() => setShowQuickTips(false)} />
            </div>
          )}
          

        </div>
        
        <aside className="w-96 panel-bg border-l border-gray flex flex-col">
          <div className="flex border-b border-gray">
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                rightPanelTab === "code" 
                  ? "accent-blue text-white" 
                  : "hover:bg-hover-bg"
              }`}
              onClick={() => setRightPanelTab("code")}
            >
              <i className="fas fa-code mr-2"></i>Code
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                rightPanelTab === "preview" 
                  ? "accent-blue text-white" 
                  : "hover:bg-hover-bg"
              }`}
              onClick={() => setRightPanelTab("preview")}
            >
              <i className="fas fa-eye mr-2"></i>Preview
            </button>
          </div>

          {rightPanelTab === "code" && (
            <CodeView
              codeTab={codeTab}
              onCodeTabChange={setCodeTab}
              generatedCode={generatedCode}
            />
          )}

          {rightPanelTab === "preview" && (
            <LivePreview generatedCode={generatedCode} />
          )}
        </aside>
      </div>

      {/* Status bar */}
      <StatusBar 
        blocks={blocks} 
        generatedCode={generatedCode}
        rightPanelTab={rightPanelTab}
      />

      {/* Tutorial overlay */}
      {showTutorial && (
        <TutorialOverlay onClose={() => setShowTutorial(false)} />
      )}

      {/* Export modal */}
      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          generatedCode={generatedCode}
        />
      )}
    </div>
  );
}
