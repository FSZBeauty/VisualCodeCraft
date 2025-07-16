import { Copy, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CodeViewProps {
  codeTab: "javascript" | "html" | "css";
  onCodeTabChange: (tab: "javascript" | "html" | "css") => void;
  generatedCode: {
    javascript: string;
    html: string;
    css: string;
  };
}

export default function CodeView({ codeTab, onCodeTabChange, generatedCode }: CodeViewProps) {
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode[codeTab]);
    toast({
      title: "Code copied to clipboard",
      description: `${codeTab.toUpperCase()} code has been copied.`,
    });
  };

  const getLanguageIcon = (lang: string) => {
    switch (lang) {
      case "javascript":
        return "fab fa-js-square";
      case "html":
        return "fab fa-html5";
      case "css":
        return "fab fa-css3-alt";
      default:
        return "fas fa-code";
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex border-b border-gray text-sm">
        {(["javascript", "html", "css"] as const).map((lang) => (
          <button
            key={lang}
            className={`px-3 py-2 transition-colors ${
              codeTab === lang
                ? "bg-blue-600 text-white"
                : "hover:bg-hover-bg"
            }`}
            onClick={() => onCodeTabChange(lang)}
          >
            <i className={`${getLanguageIcon(lang)} mr-1`}></i>
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="ide-bg rounded p-3 code-editor text-sm">
          <div className="text-muted mb-2">
            // Auto-generated {codeTab.toUpperCase()}
          </div>
          <pre className="text-light whitespace-pre-wrap">
            <code>{generatedCode[codeTab]}</code>
          </pre>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-muted">
            Auto-generated • {generatedCode[codeTab].split('\n').length} lines
          </span>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-[var(--hover-bg)] hover:bg-gray-600 text-xs"
              onClick={handleCopyCode}
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
