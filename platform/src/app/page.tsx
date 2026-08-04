import Link from 'next/link';
import { getAllStyles } from '@/lib/content';
import { StyleGallery } from '@/components/StyleGallery';

export default function Home() {
  const styles = getAllStyles();

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-ground/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-display text-lg tracking-tight">
              Design<span className="text-text-secondary">Vault</span>
            </Link>
            <nav className="flex items-center gap-8">
              <a
                href="#gallery"
                className="text-sm text-text-primary hover:text-accent transition-colors"
              >
                Gallery
              </a>
              <Link
                href="/vocabulary"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Vocabulary
              </Link>
              <a
                href="#"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Guide
              </a>
              <a
                href="#"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Map
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mb-6">
            {styles.length} Design Aesthetics.
            <br />
            <span className="text-text-secondary">Copy the prompt. Ship the page.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
            A curated design inspiration platform with full design intelligence — principles,
            vocabulary, anti-patterns — and ready-to-use AI prompts for each style.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#gallery"
              className="bg-accent text-accent-text px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Browse Styles
            </a>
            <Link
              href="/vocabulary"
              className="border border-border hover:border-border-hover px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Search Vocabulary
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Gallery (filters + grid) */}
      <StyleGallery styles={styles} />

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
