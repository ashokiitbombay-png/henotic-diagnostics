import React from 'react';
import { registry } from '@/lib/widgets';

interface BlockItem {
  blockName: string;
  attrs?: Record<string, any>;
  innerHTML?: string;
}

interface BlockRendererProps {
  blocks: BlockItem[];
  context?: Record<string, any>;
}

export default function BlockRenderer({ blocks, context }: BlockRendererProps) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block, idx) => {
        // Strip block namespace, e.g., "acf/rate-cards" -> "rate-cards"
        const cleanName = block.blockName ? block.blockName.replace(/^[a-zA-Z0-9_-]+\//, "") : "";
        
        const BlockComponent = registry[cleanName];
        if (BlockComponent) {
          return <BlockComponent key={idx} {...block.attrs} {...context} />;
        }
        
        if (block.innerHTML) {
          return <div key={idx} dangerouslySetInnerHTML={{ __html: block.innerHTML }} />;
        }
        
        return null;
      })}
    </>
  );
}
