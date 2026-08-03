export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-ground/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-display text-lg tracking-tight">
              Design<span className="text-text-secondary">Vault</span>
            </div>
            <nav className="flex items-center gap-8">
              <a href="#" className="text-sm text-text-primary hover:text-accent transition-colors">
                Gallery
              </a>
              <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Vocabulary
              </a>
              <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Guide
              </a>
              <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
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
            30+ Design Aesthetics.
            <br />
            <span className="text-text-secondary">Copy the prompt. Ship the page.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
            A curated design inspiration platform with full design intelligence — principles,
            vocabulary, anti-patterns — and ready-to-use AI prompts for each style.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="bg-accent text-accent-text px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform">
              Browse Styles
            </button>
            <button className="border border-border hover:border-border-hover px-8 py-3 rounded-lg font-medium transition-colors">
              Search Vocabulary
            </button>
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="bg-ground-elevated border border-border px-4 py-2 rounded-full text-sm text-text-primary">
              All Styles
            </span>
            <span className="bg-ground-elevated border border-border px-4 py-2 rounded-full text-sm text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors cursor-pointer">
              Monochrome
            </span>
            <span className="bg-ground-elevated border border-border px-4 py-2 rounded-full text-sm text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors cursor-pointer">
              High Motion
            </span>
            <span className="bg-ground-elevated border border-border px-4 py-2 rounded-full text-sm text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors cursor-pointer">
              Editorial
            </span>
            <span className="bg-ground-elevated border border-border px-4 py-2 rounded-full text-sm text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors cursor-pointer">
              Brutalist
            </span>
            <span className="bg-ground-elevated border border-border px-4 py-2 rounded-full text-sm text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors cursor-pointer">
              Cinematic
            </span>
            <span className="bg-ground-elevated border border-border px-4 py-2 rounded-full text-sm text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors cursor-pointer">
              Minimal
            </span>
          </div>
        </div>
      </section>

      {/* Style Grid */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Dither Mono", essence: "Brutalist B&W editorial where bitmap texture replaces color.", tags: ["monochrome", "brutalist", "editorial"] },
              { name: "Vast Quiet Cinematic", essence: "Editorial minimalism meets cinematic scale — vast B&W photography, mist atmosphere.", tags: ["cinematic", "minimal", "editorial"] },
              { name: "Obsidian Precision", essence: "Near-black developer aesthetic with custom geometric sans, hairline borders, radial glow.", tags: ["developer", "dark-mode", "precision"] },
              { name: "Liquid Glass Noir", essence: "Frosted translucent panels over dark video with liquid-glass edge refraction.", tags: ["glassmorphism", "dark", "spatial"] },
              { name: "Kinetic Typography", essence: "Type IS the design — monumental display faces that animate, split, morph.", tags: ["kinetic", "typography", "animation"] },
              { name: "Editorial Serif Narrative", essence: "Magazine-quality layout with serif headlines, drop caps, pull quotes.", tags: ["editorial", "serif", "narrative"] },
            ].map((style) => (
              <div
                key={style.name}
                className="bg-ground-elevated border border-border rounded-xl overflow-hidden hover:border-border-hover transition-colors group"
              >
                <div className="h-48 bg-gradient-to-br from-ground to-ground-elevated relative">
                  <div className="absolute bottom-3 left-3 font-mono-label text-text-muted">
                    {style.name.toUpperCase()}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg mb-2 group-hover:text-accent transition-colors">
                    {style.name}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4">{style.essence}</p>
                  <div className="flex flex-wrap gap-2">
                    {style.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-ground border border-border px-2 py-1 rounded text-xs text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-mono-label text-text-muted">© 2026 DesignVault</div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
              GitHub
            </a>
            <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
              Discord
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
