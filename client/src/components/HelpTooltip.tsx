import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface HelpTooltipProps {
  content: string;
  children?: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export default function HelpTooltip({ content, children, side = "top" }: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children || (
            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-300 cursor-help" />
          )}
        </TooltipTrigger>
        <TooltipContent 
          side={side}
          className="bg-gray-800 text-white border-gray-700 max-w-xs"
        >
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}