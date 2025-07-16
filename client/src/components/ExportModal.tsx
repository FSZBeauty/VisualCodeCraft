import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Download, X } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface ExportModalProps {
  onClose: () => void;
  generatedCode: {
    javascript: string;
    html: string;
    css: string;
  };
}

export default function ExportModal({ onClose, generatedCode }: ExportModalProps) {
  const [exportFormat, setExportFormat] = useState("html");
  const [projectName, setProjectName] = useState("my-visual-app");

  const handleExport = async () => {
    try {
      if (exportFormat === "html") {
        // Single HTML file with inline CSS and JS
        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <style>
        ${generatedCode.css}
    </style>
</head>
<body>
    ${generatedCode.html}
    <script>
        ${generatedCode.javascript}
    </script>
</body>
</html>`;
        
        const blob = new Blob([fullHtml], { type: "text/html" });
        saveAs(blob, `${projectName}.html`);
      } else if (exportFormat === "separate") {
        // Separate files in ZIP
        const zip = new JSZip();
        
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${generatedCode.html}
    <script src="script.js"></script>
</body>
</html>`;
        
        zip.file("index.html", htmlContent);
        zip.file("style.css", generatedCode.css);
        zip.file("script.js", generatedCode.javascript);
        
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, `${projectName}.zip`);
      } else if (exportFormat === "json") {
        // Block layout as JSON
        const blocks = JSON.parse(localStorage.getItem('visual-ide-project') || '{"blocks": []}');
        const jsonContent = JSON.stringify(blocks, null, 2);
        
        const blob = new Blob([jsonContent], { type: "application/json" });
        saveAs(blob, `${projectName}-blocks.json`);
      }
      
      onClose();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="panel-bg text-light border-gray">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Export Project
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Export Format</Label>
            <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="html" id="html" />
                <Label htmlFor="html" className="text-sm">Single HTML file (inline CSS/JS)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="separate" id="separate" />
                <Label htmlFor="separate" className="text-sm">Separate files (HTML/CSS/JS)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="text-sm">Block layout (JSON)</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="projectName" className="text-sm font-medium mb-2 block">
              Project Name
            </Label>
            <Input
              id="projectName"
              className="ide-bg text-white border-gray focus:border-[var(--accent-blue)]"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="secondary"
              className="bg-[var(--hover-bg)] text-light hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-[var(--accent-blue)] text-white hover:bg-blue-600"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
