import { useMemo } from "react";
import { Block } from "@shared/schema";
import { generateCode } from "@/lib/codeGenerator";

export function useCodeGeneration(blocks: Block[]) {
  const generatedCode = useMemo(() => {
    return generateCode(blocks);
  }, [blocks]);

  return { generatedCode };
}
