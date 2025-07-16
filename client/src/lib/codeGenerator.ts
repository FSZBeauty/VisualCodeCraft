import { Block } from "@shared/schema";

export function generateCode(blocks: Block[]) {
  const html = generateHTML(blocks);
  const css = generateCSS(blocks);
  const javascript = generateJavaScript(blocks);

  return { html, css, javascript };
}

function generateHTML(blocks: Block[]): string {
  const htmlBlocks = blocks.filter(block => 
    ["button", "text-input", "div", "text"].includes(block.type)
  );

  let html = "";
  
  for (const block of htmlBlocks) {
    switch (block.type) {
      case "button":
        html += `<button id="${block.properties.id || ''}" class="${block.properties.class || ''}">${block.properties.text || 'Button'}</button>\n`;
        break;
      case "text-input":
        html += `<input type="${block.properties.type || 'text'}" id="${block.properties.id || ''}" placeholder="${block.properties.placeholder || ''}" />\n`;
        break;
      case "div":
        html += `<div id="${block.properties.id || ''}" class="${block.properties.class || ''}">${block.properties.content || ''}</div>\n`;
        break;
      case "text":
        const tag = block.properties.tag || "p";
        html += `<${tag} id="${block.properties.id || ''}">${block.properties.content || ''}</${tag}>\n`;
        break;
    }
  }

  return html;
}

function generateCSS(blocks: Block[]): string {
  const cssBlocks = blocks.filter(block => block.type === "css-style");
  
  let css = "";
  
  for (const block of cssBlocks) {
    if (block.properties.selector && block.properties.property && block.properties.value) {
      css += `${block.properties.selector} {\n`;
      css += `  ${block.properties.property}: ${block.properties.value};\n`;
      css += `}\n\n`;
    }
  }

  return css;
}

function generateJavaScript(blocks: Block[]): string {
  let js = "";
  
  // Generate variables
  const variableBlocks = blocks.filter(block => block.type === "variable");
  for (const block of variableBlocks) {
    if (block.properties.name) {
      js += `${block.properties.type || 'let'} ${block.properties.name} = ${JSON.stringify(block.properties.value || '')};\n`;
    }
  }

  // Generate functions
  const functionBlocks = blocks.filter(block => block.type === "function");
  for (const block of functionBlocks) {
    if (block.properties.name) {
      js += `function ${block.properties.name}(${block.properties.parameters || ''}) {\n`;
      js += `  // Function body\n`;
      js += `}\n\n`;
    }
  }

  // Generate event listeners
  const eventBlocks = blocks.filter(block => block.type === "event-listener");
  for (const block of eventBlocks) {
    if (block.properties.target && block.properties.event) {
      js += `document.getElementById('${block.properties.target}').addEventListener('${block.properties.event}', function(event) {\n`;
      js += `  // Event handler\n`;
      js += `});\n\n`;
    }
  }

  // Generate console.log statements
  const consoleBlocks = blocks.filter(block => block.type === "console-log");
  for (const block of consoleBlocks) {
    if (block.properties.message) {
      js += `console.log(${JSON.stringify(block.properties.message)});\n`;
    }
  }

  // Generate alert statements
  const alertBlocks = blocks.filter(block => block.type === "alert");
  for (const block of alertBlocks) {
    if (block.properties.message) {
      js += `alert(${JSON.stringify(block.properties.message)});\n`;
    }
  }

  // Generate if statements
  const ifBlocks = blocks.filter(block => block.type === "if-statement");
  for (const block of ifBlocks) {
    if (block.properties.condition) {
      js += `if (${block.properties.condition}) {\n`;
      js += `  // If body\n`;
      js += `}\n\n`;
    }
  }

  // Generate for loops
  const forBlocks = blocks.filter(block => block.type === "for-loop");
  for (const block of forBlocks) {
    if (block.properties.variable && block.properties.start && block.properties.end) {
      js += `for (let ${block.properties.variable} = ${block.properties.start}; ${block.properties.variable} < ${block.properties.end}; ${block.properties.variable}++) {\n`;
      js += `  // Loop body\n`;
      js += `}\n\n`;
    }
  }

  // Generate while loops
  const whileBlocks = blocks.filter(block => block.type === "while-loop");
  for (const block of whileBlocks) {
    if (block.properties.condition) {
      js += `while (${block.properties.condition}) {\n`;
      js += `  // While body\n`;
      js += `}\n\n`;
    }
  }

  return js;
}
