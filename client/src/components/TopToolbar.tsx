import { Moon, Sun, Play, Save, FolderOpen, Plus, Download, HelpCircle } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

interface TopToolbarProps {
  onNewProject: () => void;
  onSaveProject: () => void;
  onOpenProject: () => void;
  onExportProject: () => void;
  onShowTutorial: () => void;
}

export default function TopToolbar({
  onNewProject,
  onSaveProject,
  onOpenProject,
  onExportProject,
  onShowTutorial,
}: TopToolbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="panel-bg border-b border-gray px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <i className="fas fa-cube text-[var(--accent-blue)] text-xl"></i>
          <h1 className="text-lg font-semibold">Visual JS IDE</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            className="bg-[var(--accent-blue)] text-white hover:bg-blue-600"
            onClick={onNewProject}
          >
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-[var(--hover-bg)] text-[var(--text-light)] hover:bg-gray-600"
            onClick={onOpenProject}
          >
            <FolderOpen className="w-4 h-4 mr-1" />
            Open
          </Button>
          <Button
            size="sm"
            className="bg-[var(--success)] text-white hover:bg-green-600"
            onClick={onSaveProject}
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            className="bg-[var(--warning)] text-white hover:bg-orange-600"
            onClick={onExportProject}
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-[var(--hover-bg)] text-[var(--text-light)] hover:bg-gray-600"
          >
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-[var(--hover-bg)] text-[var(--text-light)] hover:bg-gray-600"
            onClick={onShowTutorial}
            title="Show tutorial (Press ? for help)"
          >
            <HelpCircle className="w-4 h-4 mr-1" />
            Help
          </Button>
          <span className="text-sm text-muted">Theme:</span>
          <Button
            size="sm"
            variant="secondary"
            className="bg-[var(--hover-bg)] hover:bg-gray-600"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
