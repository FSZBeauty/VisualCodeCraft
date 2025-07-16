import { BlockType } from "@shared/schema";

export interface BlockProperty {
  key: string;
  type: "text" | "select" | "number" | "boolean";
  placeholder?: string;
  options?: string[];
  default?: any;
}

export interface BlockDefinition {
  type: BlockType;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  hasInput?: boolean;
  hasOutput?: boolean;
  properties?: BlockProperty[];
  defaultProperties?: Record<string, any>;
}

export const blockCategories: Record<string, { name: string; icon: string; blocks: BlockDefinition[] }> = {
  logic: {
    name: "Logic",
    icon: "fas fa-brain",
    blocks: [
      {
        type: "if-statement",
        name: "If Statement",
        description: "Conditional logic",
        icon: "fas fa-code-branch",
        color: "blue",
        category: "logic",
        hasInput: true,
        hasOutput: true,
        properties: [
          { key: "condition", type: "text", placeholder: "Enter condition..." },
        ],
        defaultProperties: { condition: "" },
      },
      {
        type: "for-loop",
        name: "For Loop",
        description: "Repeat actions",
        icon: "fas fa-sync",
        color: "green",
        category: "logic",
        hasInput: true,
        hasOutput: true,
        properties: [
          { key: "variable", type: "text", placeholder: "Loop variable..." },
          { key: "start", type: "text", placeholder: "Start value..." },
          { key: "end", type: "text", placeholder: "End value..." },
        ],
        defaultProperties: { variable: "i", start: "0", end: "10" },
      },
      {
        type: "while-loop",
        name: "While Loop",
        description: "Repeat while condition is true",
        icon: "fas fa-redo",
        color: "teal",
        category: "logic",
        hasInput: true,
        hasOutput: true,
        properties: [
          { key: "condition", type: "text", placeholder: "While condition..." },
        ],
        defaultProperties: { condition: "" },
      },
    ],
  },
  variables: {
    name: "Variables",
    icon: "fas fa-box",
    blocks: [
      {
        type: "variable",
        name: "Variable",
        description: "Store data",
        icon: "fas fa-box",
        color: "purple",
        category: "variables",
        hasOutput: true,
        properties: [
          { key: "name", type: "text", placeholder: "Variable name..." },
          { key: "value", type: "text", placeholder: "Initial value..." },
          { key: "type", type: "select", options: ["let", "const", "var"] },
        ],
        defaultProperties: { name: "", value: "", type: "let" },
      },
    ],
  },
  functions: {
    name: "Functions",
    icon: "fas fa-cogs",
    blocks: [
      {
        type: "function",
        name: "Function",
        description: "Reusable code",
        icon: "fas fa-cogs",
        color: "orange",
        category: "functions",
        hasInput: true,
        hasOutput: true,
        properties: [
          { key: "name", type: "text", placeholder: "Function name..." },
          { key: "parameters", type: "text", placeholder: "Parameters..." },
        ],
        defaultProperties: { name: "", parameters: "" },
      },
      {
        type: "console-log",
        name: "Console Log",
        description: "Output to console",
        icon: "fas fa-terminal",
        color: "gray",
        category: "functions",
        hasInput: true,
        properties: [
          { key: "message", type: "text", placeholder: "Message to log..." },
        ],
        defaultProperties: { message: "" },
      },
      {
        type: "alert",
        name: "Alert",
        description: "Show alert dialog",
        icon: "fas fa-exclamation-triangle",
        color: "yellow",
        category: "functions",
        hasInput: true,
        properties: [
          { key: "message", type: "text", placeholder: "Alert message..." },
        ],
        defaultProperties: { message: "" },
      },
    ],
  },
  events: {
    name: "Events",
    icon: "fas fa-mouse-pointer",
    blocks: [
      {
        type: "event-listener",
        name: "Event Listener",
        description: "Handle interactions",
        icon: "fas fa-mouse-pointer",
        color: "red",
        category: "events",
        hasOutput: true,
        properties: [
          { key: "event", type: "select", options: ["click", "hover", "input", "submit"] },
          { key: "target", type: "text", placeholder: "Target element ID..." },
        ],
        defaultProperties: { event: "click", target: "" },
      },
    ],
  },
  html: {
    name: "HTML",
    icon: "fas fa-code",
    blocks: [
      {
        type: "button",
        name: "Button",
        description: "Interactive element",
        icon: "fas fa-hand-pointer",
        color: "teal",
        category: "html",
        properties: [
          { key: "text", type: "text", placeholder: "Button text..." },
          { key: "id", type: "text", placeholder: "Button ID..." },
          { key: "class", type: "text", placeholder: "CSS classes..." },
        ],
        defaultProperties: { text: "Click Me", id: "", class: "" },
      },
      {
        type: "text-input",
        name: "Text Input",
        description: "User input field",
        icon: "fas fa-keyboard",
        color: "indigo",
        category: "html",
        properties: [
          { key: "placeholder", type: "text", placeholder: "Placeholder text..." },
          { key: "id", type: "text", placeholder: "Input ID..." },
          { key: "type", type: "select", options: ["text", "password", "email", "number"] },
        ],
        defaultProperties: { placeholder: "", id: "", type: "text" },
      },
      {
        type: "div",
        name: "Div Container",
        description: "Generic container",
        icon: "fas fa-square",
        color: "gray",
        category: "html",
        properties: [
          { key: "id", type: "text", placeholder: "Div ID..." },
          { key: "class", type: "text", placeholder: "CSS classes..." },
          { key: "content", type: "text", placeholder: "Content..." },
        ],
        defaultProperties: { id: "", class: "", content: "" },
      },
      {
        type: "text",
        name: "Text",
        description: "Display text",
        icon: "fas fa-font",
        color: "slate",
        category: "html",
        properties: [
          { key: "content", type: "text", placeholder: "Text content..." },
          { key: "tag", type: "select", options: ["p", "h1", "h2", "h3", "span"] },
          { key: "id", type: "text", placeholder: "Element ID..." },
        ],
        defaultProperties: { content: "", tag: "p", id: "" },
      },
    ],
  },
  css: {
    name: "CSS",
    icon: "fas fa-paint-brush",
    blocks: [
      {
        type: "css-style",
        name: "CSS Style",
        description: "Style elements",
        icon: "fas fa-paint-brush",
        color: "pink",
        category: "css",
        properties: [
          { key: "selector", type: "text", placeholder: "CSS selector..." },
          { key: "property", type: "text", placeholder: "CSS property..." },
          { key: "value", type: "text", placeholder: "Property value..." },
        ],
        defaultProperties: { selector: "", property: "", value: "" },
      },
    ],
  },
};
