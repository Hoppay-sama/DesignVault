import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { StyleMap } from '@/components/StyleMap';
import { getAllStyles, getStyleBySlug } from '@/lib/content';
import { STYLE_CLUSTERS } from '@/lib/clusters';

export const metadata = {
  title: 'Style Map — DesignVault',
  description:
    'The landscape of all 30 design styles across the six axes — color, typography, motion, density, texture, layout — grouped into relationship clusters.',
};

export default function MapPage() {
  const styles = getAllStyles();

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 lg:px-8">
      <SiteHeader />

      <div className="max-w-5xl mx-auto">
        {/* Back Navigation */}
        <div className="flex items-center gap-4 mb-8">
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
        </div>

        {/* Hero */}
        <div className="mb-12">
          <div className="font-mono-label text-text-muted mb-4">LANDSCAPE MAP</div>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            Thirty styles,
            <br />
            <span className="text-text-secondary">six axes.</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            Every style in DesignVault is rated 1&ndash;6 on color, typography, motion, density,
            texture, and layout. This map plots them on any axis pair, colored by their
            relationship cluster — so you can see what sits next to what, and why.
          </p>
        </div>

        {/* Interactive scatter plot */}
        <div className="mb-16">
          <StyleMap styles={styles} />
        </div>

        {/* Cluster detail sections */}
        <section>
          <div className="font-mono-label text-text-muted mb-6">RELATIONSHIP CLUSTERS</div>
          <div className="space-y-10">
            {STYLE_CLUSTERS.map((cluster) => (
              <div
                key={cluster.id}
                className="bg-ground-elevated border border-border rounded-xl p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="w-3 h-3 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: cluster.color }}
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-display text-2xl">
                      <span className="font-mono-label text-text-muted mr-3">{cluster.id}</span>
                      {cluster.name}
                    </h2>
                    <p className="text-text-secondary mt-1">
                      <span className="font-mono-label text-text-muted mr-2">SHARED DNA</span>
                      {cluster.sharedDna}
                    </p>
                    <p className="text-text-secondary mt-1">
                      <span className="font-mono-label text-text-muted mr-2">DIFFERENTIATOR</span>
                      {cluster.differentiator}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {cluster.slugs.map((slug) => {
                    const style = getStyleBySlug(slug);
                    return (
                      <Link
                        key={slug}
                        href={`/style/${slug}`}
                        className="border border-border hover:border-accent hover:text-accent transition-colors px-3 py-1.5 rounded-lg text-sm text-text-secondary"
                      >
                        {style?.title ?? slug}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-ground-elevated border border-border rounded-xl p-10 text-center">
          <h2 className="font-display text-2xl mb-3">Find your starting point</h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            Pick a style from the map, open its entry, and copy a prompt that ships the real thing.
          </p>
          <Link
            href="/#gallery"
            className="bg-accent text-accent-text px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Browse Styles
          </Link>
        </section>
      </div>
    </main>
  );
}
