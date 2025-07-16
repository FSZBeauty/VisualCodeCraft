import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Play, Code, Eye } from "lucide-react";

interface TutorialOverlayProps {
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: "Welcome to Visual JavaScript IDE",
    content: "Create interactive web applications using drag-and-drop blocks. No coding experience required!",
    icon: <Play className="w-6 h-6" />,
    image: "/tutorial/welcome.svg"
  },
  {
    title: "Block Categories",
    content: "Choose from different categories:\n• Logic - If statements, loops\n• Variables - Store data\n• Functions - Reusable code\n• Events - User interactions\n• HTML - Visual elements\n• CSS - Styling",
    icon: <Code className="w-6 h-6" />,
    highlight: "sidebar"
  },
  {
    title: "Drag & Drop Blocks",
    content: "Simply drag blocks from the sidebar onto the canvas. Each block represents a piece of code that will be generated automatically.",
    icon: <Eye className="w-6 h-6" />,
    highlight: "canvas"
  },
  {
    title: "Configure Block Properties",
    content: "Click on any block to edit its properties. Add text, set values, or choose options from dropdown menus.",
    icon: <Code className="w-6 h-6" />,
    highlight: "properties"
  },
  {
    title: "View Generated Code",
    content: "Switch between JavaScript, HTML, and CSS tabs to see the code generated from your blocks. The code updates automatically!",
    icon: <Code className="w-6 h-6" />,
    highlight: "code-panel"
  },
  {
    title: "Live Preview",
    content: "Click the Preview tab to see your application running in real-time. Test buttons, forms, and interactions immediately.",
    icon: <Eye className="w-6 h-6" />,
    highlight: "preview-panel"
  },
  {
    title: "Save & Export",
    content: "Save your project locally or export as:\n• Single HTML file\n• Separate HTML/CSS/JS files\n• Block layout (JSON)\n\nReady to start building?",
    icon: <Play className="w-6 h-6" />,
    highlight: "toolbar"
  }
];

export default function TutorialOverlay({ onClose }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="panel-bg text-light border-gray max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {currentTutorial.icon}
              <span>{currentTutorial.title}</span>
            </div>
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
          <div className="bg-gray-800 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
            {currentTutorial.image ? (
              <img 
                src={currentTutorial.image} 
                alt={currentTutorial.title}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">{currentTutorial.icon}</div>
                <div className="text-xl font-medium">{currentTutorial.title}</div>
              </div>
            )}
          </div>
          
          <div className="text-sm text-light leading-relaxed whitespace-pre-line">
            {currentTutorial.content}
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-blue-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="bg-gray-700 hover:bg-gray-600"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              
              {currentStep === tutorialSteps.length - 1 ? (
                <Button
                  size="sm"
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start Building
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}