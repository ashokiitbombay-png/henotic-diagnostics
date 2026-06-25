import React from 'react';
import ShortcodeParser from './ShortcodeParser';
import BlockRenderer from './BlockRenderer';

interface WordPressRendererProps {
  content: string | any[];
  context?: Record<string, any>;
}

export default function WordPressRenderer({ content, context }: WordPressRendererProps) {
  if (!content) return null;

  if (typeof content === 'string') {
    return <ShortcodeParser html={content} context={context} />;
  }

  if (Array.isArray(content)) {
    return <BlockRenderer blocks={content} context={context} />;
  }

  return null;
}
