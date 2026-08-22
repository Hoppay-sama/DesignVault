import { Suspense } from 'react';
import Link from 'next/link';
import { getAllStyles } from '@/lib/content';
import { StyleGallery } from '@/components/StyleGallery';
import { SiteHeader } from '@/components/SiteHeader';

export default function Home() {
  const styles = getAllStyles();

  return (
    <main className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="dv-hero px-6 pb-20 pt-32 lg:px-8">
        <div className="dv-hero-scene" aria-hidden="true">
          <span className="dv-hero-orbit dv-hero-orbit--outer" />
          <span className="dv-hero-orbit dv-hero-orbit--inner" />
          <span className="dv-hero-crosshair dv-hero-crosshair--top" />
          <span className="dv-hero-crosshair dv-hero-crosshair--bottom" />
          <span className="dv-hero-scanline" />
        </div>
        <div className="dv-hero-copy mx-auto max-w-4xl text-center">
          <h1 className="dv-hero-title font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
            <span className="dv-hero-title-line">{styles.length} Design Aesthetics.</span>
            <span className="dv-hero-title-line dv-hero-title-line--muted">
              Copy the prompt. Ship the page.
            </span>
          </h1>
          <p className="dv-hero-description mx-auto mb-10 mt-7 max-w-2xl text-lg text-text-secondary">
            A curated design inspiration platform with full design intelligence — principles,
            vocabulary, anti-patterns — and ready-to-use AI prompts for each style.
          </p>
          <div className="dv-hero-actions flex items-center justify-center gap-4">
            <a href="#gallery" className="dv-hero-primary bg-accent text-accent-text">
              Browse Styles
            </a>
            <Link href="/vocabulary" className="dv-hero-secondary">
              Search Vocabulary
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Gallery (filters + grid) */}
      <Suspense fallback={null}>
        <StyleGallery styles={styles} />
      </Suspense>

      {/* Footer */}
      <footer className="border-t border-border px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-mono-label text-text-muted">© 2026 DesignVault</div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
