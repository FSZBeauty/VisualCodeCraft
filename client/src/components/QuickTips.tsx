import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Lightbulb, MousePointer, Code, Eye } from "lucide-react";

interface QuickTipsProps {
  onClose: () => void;
}

const tips = [
  {
    icon: <MousePointer className="w-5 h-5" />,
    title: "Drag & Drop",
    description: "Drag blocks from the sidebar to the canvas to start building your application."
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: "Edit Properties",
    description: "Click on any block to edit its properties like text, IDs, or styling options."
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Live Preview",
    description: "Switch to the Preview tab to see your application running in real-time."
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Start Simple",
    description: "Begin with HTML blocks (button, text) then add logic and styling blocks."
  }
];

export default function QuickTips({ onClose }: QuickTipsProps) {
  return (
    <Card className="w-80 bg-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span>Quick Tips</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="text-blue-400 mt-0.5">{tip.icon}</div>
            <div>
              <div className="font-medium text-sm">{tip.title}</div>
              <div className="text-xs text-gray-300 mt-1">{tip.description}</div>
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-gray-700">
          <div className="text-xs text-gray-400">
            Press <kbd className="px-1 py-0.5 bg-gray-700 rounded">?</kbd> anytime for help
          </div>
        </div>
      </CardContent>
    </Card>
  );
}