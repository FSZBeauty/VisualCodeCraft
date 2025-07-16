import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Maximize2, Eye } from "lucide-react";

interface LivePreviewProps {
  generatedCode: {
    javascript: string;
    html: string;
    css: string;
  };
}

export default function LivePreview({ generatedCode }: LivePreviewProps) {
  const [previewContent, setPreviewContent] = useState("");

  useEffect(() => {
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Live Preview</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 20px;
            background: #f5f5f5;
          }
          ${generatedCode.css}
        </style>
      </head>
      <body>
        ${generatedCode.html}
        <script>
          ${generatedCode.javascript}
        </script>
      </body>
      </html>
    `;
    setPreviewContent(fullHtml);
  }, [generatedCode]);

  const handleRefresh = () => {
    // Force re-render by updating the key
    const iframe = document.getElementById("preview-iframe") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = "about:blank";
      setTimeout(() => {
        iframe.srcdoc = previewContent;
      }, 100);
    }
  };

  const handleFullscreen = () => {
    const newWindow = window.open("", "_blank", "width=800,height=600");
    if (newWindow) {
      newWindow.document.write(previewContent);
      newWindow.document.close();
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-gray">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-[var(--accent-blue)]" />
          <span className="text-sm font-medium">Live Preview</span>
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-[var(--hover-bg)] hover:bg-gray-600 text-xs"
            onClick={handleRefresh}
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-[var(--hover-bg)] hover:bg-gray-600 text-xs"
            onClick={handleFullscreen}
          >
            <Maximize2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <div className="bg-white h-full rounded border border-gray">
          <iframe
            id="preview-iframe"
            className="w-full h-full rounded"
            srcDoc={previewContent}
            sandbox="allow-scripts allow-same-origin"
            title="Live Preview"
          />
        </div>
      </div>
    </div>
  );
}
