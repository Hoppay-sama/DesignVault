import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStyleBySlug, getAllStyleSlugs } from '@/lib/content';
import { PromptPanel } from '@/components/PromptPanel';

interface StylePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllStyleSlugs().map((slug) => ({
    slug,
  }));
}

export default function StylePage({ params }: StylePageProps) {
  const style = getStyleBySlug(params.slug);

  if (!style) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-sm text-text-muted hover:text-text-secondary transition-colors flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Gallery
          </Link>
          <Link
            href="/vocabulary"
            className="text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Vocabulary Search
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="font-mono-label text-text-muted mb-4">{style.slug.toUpperCase()}</div>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            {style.title}
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">{style.oneLineEssence}</p>

          {/* Meta */}
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">Difficulty:</span>
              <span className="text-accent">{'★'.repeat(style.difficulty)}{'☆'.repeat(5 - style.difficulty)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">Mood:</span>
              <span className="text-text-secondary">{style.moodKeywords.join(' · ')}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {style.tags.map((tag) => (
              <span
                key={tag}
                className="bg-ground-elevated border border-border px-3 py-1 rounded-full text-sm text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Visual DNA */}
        {style.visualDna && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Visual DNA</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">{style.visualDna}</p>
            </div>
          </section>
        )}

        {/* Design Principles */}
        {style.principles && style.principles.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Design Principles</h2>
            <div className="space-y-6">
              {style.principles.map((principle, index) => (
                <div
                  key={index}
                  className="bg-ground-elevated border border-border rounded-lg p-6"
                >
                  <p className="text-text-primary leading-relaxed">{principle}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Typography */}
        {style.typography && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Typography System</h2>
            <div className="bg-ground-elevated border border-border rounded-lg p-6">
              <pre className="text-text-secondary text-sm whitespace-pre-wrap font-mono">
                {style.typography}
              </pre>
            </div>
          </section>
        )}

        {/* Color */}
        {style.color && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Color Architecture</h2>
            <div className="bg-ground-elevated border border-border rounded-lg p-6">
              <pre className="text-text-secondary text-sm whitespace-pre-wrap font-mono">
                {style.color}
              </pre>
            </div>
          </section>
        )}

        {/* Motion */}
        {style.motion && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Motion Principles</h2>
            <div className="bg-ground-elevated border border-border rounded-lg p-6">
              <pre className="text-text-secondary text-sm whitespace-pre-wrap font-mono">
                {style.motion}
              </pre>
            </div>
          </section>
        )}

        {/* Layout */}
        {style.layout && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Layout Grammar</h2>
            <div className="bg-ground-elevated border border-border rounded-lg p-6">
              <pre className="text-text-secondary text-sm whitespace-pre-wrap font-mono">
                {style.layout}
              </pre>
            </div>
          </section>
        )}

        {/* Texture */}
        {style.texture && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Texture & Surface</h2>
            <div className="bg-ground-elevated border border-border rounded-lg p-6">
              <pre className="text-text-secondary text-sm whitespace-pre-wrap font-mono">
                {style.texture}
              </pre>
            </div>
          </section>
        )}

        {/* Vocabulary */}
        {style.vocabulary && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Vocabulary Bank</h2>
            <div className="bg-ground-elevated border border-border rounded-lg p-6">
              <pre className="text-text-secondary text-sm whitespace-pre-wrap font-mono">
                {style.vocabulary}
              </pre>
            </div>
          </section>
        )}

        {/* Anti-Slop Checklist */}
        {style.antiSlop && style.antiSlop.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Anti-Slop Checklist</h2>
            <div className="space-y-3">
              {style.antiSlop.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-ground-elevated border border-border rounded-lg p-4"
                >
                  <span className="text-accent mt-0.5">☐</span>
                  <span className="text-text-secondary text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* When to Use */}
        {style.whenToUse && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">When to Use</h2>
            <div className="bg-ground-elevated border border-border rounded-lg p-6">
              <pre className="text-text-secondary text-sm whitespace-pre-wrap font-mono">
                {style.whenToUse}
              </pre>
            </div>
          </section>
        )}

        {/* Common Mistakes */}
        {style.mistakes && style.mistakes.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Common Mistakes</h2>
            <div className="space-y-6">
              {style.mistakes.map((mistake, index) => (
                <div
                  key={index}
                  className="bg-ground-elevated border border-border rounded-lg p-6"
                >
                  <p className="text-text-primary leading-relaxed">{mistake}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {style.references && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6">Reference Gallery</h2>
            <div className="bg-ground-elevated border border-border rounded-lg p-6">
              <pre className="text-text-secondary text-sm whitespace-pre-wrap font-mono">
                {style.references}
              </pre>
            </div>
          </section>
        )}

        {/* Dual Prompt Panel */}
        {(style.exactPrompt || style.templatePrompt) && (
          <PromptPanel
            exactPrompt={style.exactPrompt}
            templatePrompt={style.templatePrompt}
            styleName={style.title}
          />
        )}
      </div>
    </main>
  );
}
