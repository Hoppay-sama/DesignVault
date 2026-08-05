import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/SiteHeader';
import { StyleCard } from '@/components/StyleGrid';
import { getAllStyles } from '@/lib/content';
import { StyleEntry } from '@/lib/types';

/** Normalizes a display tag ("Dark & Moody") into a URL slug ("dark-moody"). */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateStaticParams() {
  const tags = new Set<string>();
  for (const style of getAllStyles()) {
    for (const tag of style.tags) {
      tags.add(tagToSlug(tag));
    }
  }
  return Array.from(tags).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<{
  title: string;
  description: string;
}> {
  const { slug } = await params;
  const tag = findTagBySlug(slug);
  return {
    title: `${tag ?? 'Category'} — DesignVault`,
    description: tag ? `Styles tagged ${tag} in the vault.` : 'Style category.',
  };
}

function findTagBySlug(slug: string): string | undefined {
  return getAllStyles()
    .flatMap((style) => style.tags)
    .find((t) => tagToSlug(t) === slug);
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const styles = getAllStyles();
  const tag = findTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const filtered: StyleEntry[] = styles.filter((style) =>
    style.tags.some((t) => tagToSlug(t) === slug)
  );

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 lg:px-8">
      <SiteHeader />

      <div className="max-w-7xl mx-auto">
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
            href="/guide"
            className="text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Prompt Guide
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="font-mono-label text-text-muted mb-4">
            CATEGORY · {filtered.length} {filtered.length === 1 ? 'STYLE' : 'STYLES'}
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            {tag}
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Every style tagged <strong className="text-text-primary">{tag}</strong> in the vault.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((style) => (
            <StyleCard key={style.slug} style={style} />
          ))}
        </div>
      </div>
    </main>
  );
}
