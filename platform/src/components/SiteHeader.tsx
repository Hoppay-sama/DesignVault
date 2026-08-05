import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-ground/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display text-lg tracking-tight">
            Design<span className="text-text-secondary">Vault</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              href="/#gallery"
              className="text-sm text-text-primary hover:text-accent transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/vocabulary"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Vocabulary
            </Link>
            <Link
              href="/guide"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Guide
            </Link>
            <Link
              href="/map"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Map
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
