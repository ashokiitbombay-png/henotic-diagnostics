import React from 'react';
import { registry } from '@/lib/widgets';

interface ShortcodeParserProps {
  html: string;
  context?: Record<string, any>;
}

export default function ShortcodeParser({ html, context }: ShortcodeParserProps) {
  if (!html) return null;

  // Regex to match shortcodes like [rate-cards], [trust-badges], etc.
  const shortcodeRegex = /\[([a-zA-Z0-9_-]+)(?:\s+([^\]]+))?\]/g;
  
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = shortcodeRegex.exec(html)) !== null) {
    const startIndex = match.index;
    const fullMatch = match[0];
    const name = match[1]; // e.g., "rate-cards"
    
    // Add text before the shortcode
    if (startIndex > lastIndex) {
      parts.push(html.substring(lastIndex, startIndex));
    }
    
    // Look up the registry for this widget
    const BlockComponent = registry[name];
    if (BlockComponent) {
      parts.push(<BlockComponent key={startIndex} {...context} />);
    } else {
      // Fallback: render the original shortcode string if not registered
      parts.push(fullMatch);
    }
    
    lastIndex = shortcodeRegex.lastIndex;
  }
  
  if (lastIndex < html.length) {
    parts.push(html.substring(lastIndex));
  }
  
  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === 'string') {
          return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
        }
        return part;
      })}
    </>
  );
}
