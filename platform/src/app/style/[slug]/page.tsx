import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStyleBySlug, getAllStyleSlugs } from '@/lib/content';
import { PromptPanel } from '@/components/PromptPanel';
import { StyleToc, TocItem } from '@/components/StyleToc';
import { PreviewFontProvider } from '@/components/preview/font-registry';
import { MiniPageMockup } from '@/components/preview/MiniPageMockup';

interface StylePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllStyleSlugs().map((slug) => ({
    slug,
  }));
}

export default async function StylePage({ params }: StylePageProps) {
  const { slug } = await params;
  const style = getStyleBySlug(slug);

  if (!style) {
    notFound();
  }

  const tocItems: TocItem[] = [
    style.visualDna && { id: 'visual-dna', label: 'Visual DNA' },
    style.principles && style.principles.length > 0 && { id: 'principles', label: 'Design Principles' },
    style.typography && { id: 'typography', label: 'Typography System' },
    style.color && { id: 'color', label: 'Color Architecture' },
    style.motion && { id: 'motion', label: 'Motion Principles' },
    style.layout && { id: 'layout', label: 'Layout Grammar' },
    style.texture && { id: 'texture', label: 'Texture & Surface' },
    style.vocabulary && { id: 'vocabulary', label: 'Vocabulary Bank' },
    style.antiSlop && style.antiSlop.length > 0 && { id: 'anti-slop', label: 'Anti-Slop Checklist' },
    style.whenToUse && { id: 'when-to-use', label: 'When to Use' },
    style.mistakes && style.mistakes.length > 0 && { id: 'mistakes', label: 'Common Mistakes' },
    style.references && { id: 'references', label: 'Reference Gallery' },
    (style.exactPrompt || style.templatePrompt) && { id: 'prompts', label: 'Prompts' },
  ].filter((item): item is TocItem => item !== false && item !== null);

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* Sticky TOC sidebar (PRD §5.3) */}
          <aside className="hidden lg:block">
            <StyleToc items={tocItems} />
          </aside>

          <div className="max-w-4xl">
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

            {/* Live Preview */}
            {style.preview ? (
              <section aria-label="Live style preview" className="mb-16">
                <PreviewFontProvider>
                  <MiniPageMockup style={style} />
                </PreviewFontProvider>
              </section>
            ) : null}

            {/* Visual DNA */}
            {style.visualDna && (
              <section id="visual-dna" className="mb-16 scroll-mt-24">
                <h2 className="font-display text-2xl mb-6">Visual DNA</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">{style.visualDna}</p>
                </div>
              </section>
            )}

            {/* Design Principles */}
            {style.principles && style.principles.length > 0 && (
              <section id="principles" className="mb-16 scroll-mt-24">
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
              <section id="typography" className="mb-16 scroll-mt-24">
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
              <section id="color" className="mb-16 scroll-mt-24">
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
              <section id="motion" className="mb-16 scroll-mt-24">
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
              <section id="layout" className="mb-16 scroll-mt-24">
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
              <section id="texture" className="mb-16 scroll-mt-24">
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
              <section id="vocabulary" className="mb-16 scroll-mt-24">
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
              <section id="anti-slop" className="mb-16 scroll-mt-24">
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
              <section id="when-to-use" className="mb-16 scroll-mt-24">
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
              <section id="mistakes" className="mb-16 scroll-mt-24">
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
              <section id="references" className="mb-16 scroll-mt-24">
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
              <section id="prompts" className="mb-16 scroll-mt-24">
                <PromptPanel
                  exactPrompt={style.exactPrompt}
                  templatePrompt={style.templatePrompt}
                  styleName={style.title}
                  testedWith={style.testedWith}
                />
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
