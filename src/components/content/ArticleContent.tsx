import { Activity } from 'lucide-react';
import WordPressRenderer from '@/components/content/WordPressRenderer';

interface ArticleContentProps {
  content: string | any[];
  context?: Record<string, any>;
  showTableOfContents?: boolean;
}

export function ArticleContent({
  content,
  context,
  showTableOfContents = true,
}: ArticleContentProps) {
  const isEmpty =
    !content ||
    (typeof content === 'string' && content.trim().length === 0) ||
    (Array.isArray(content) && content.length === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/20 to-cyan-500/20 blur-xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Activity className="h-7 w-7 text-teal-400/70" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white/80">
          Content Unavailable
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/40">
          This article doesn&apos;t have any content yet. Check back soon for
          updates.
        </p>
      </div>
    );
  }

  return (
    <article className="relative">
      {/* Subtle left gradient border accent */}
      <div
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-teal-500/50 via-cyan-500/30 to-transparent"
        aria-hidden="true"
      />

      <div className="wp-content-wrapper pl-6">
        <WordPressRenderer
          content={content}
          context={context}
        />
      </div>
    </article>
  );
}
