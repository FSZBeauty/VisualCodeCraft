import { useState, useCallback } from "react";
import { Block } from "@shared/schema";

export function useBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = useCallback((block: Block) => {
    setBlocks(prev => [...prev, block]);
  }, []);

  const updateBlock = useCallback((id: string, updates: Partial<Block>) => {
    setBlocks(prev => prev.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
  }, []);

  const clearBlocks = useCallback(() => {
    setBlocks([]);
  }, []);

  return {
    blocks,
    addBlock,
    updateBlock,
    deleteBlock,
    clearBlocks,
  };
}
