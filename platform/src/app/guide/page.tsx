import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata = {
  title: 'Prompt Guide — DesignVault',
  description:
    'How to write anti-slop design prompts: the two prompt architectures, what is fixed vs swappable, and the universal anti-slop rules.',
};

const EXACT_REPLICA_BLOCKS = [
  { n: '1', title: 'VIBE STATEMENT', text: '1-2 sentences. What the page feels like, what to ban.' },
  { n: '2', title: 'STACK & SETUP', text: 'Framework, fonts, CSS variables.' },
  { n: '3', title: 'ASSET URLS', text: 'Exact, no substitutions. Images, videos, fonts — all remote.' },
  { n: '4', title: 'LAYOUT & COPY', text: 'Section by section, pixel-precise. Exact strings.' },
  { n: '5', title: 'ANIMATION SPEC', text: 'Exact math. Easing, timing, stagger, scroll triggers.' },
  { n: '6', title: 'VISUAL RULES', text: 'Bans & constraints. "No purple, no cards, no glow".' },
  { n: '7', title: 'RESPONSIVE BEHAVIOR', text: 'Breakpoints, mobile adaptations.' },
];

const TEMPLATE_BLOCKS = [
  { n: '1', title: 'VIBE STATEMENT', text: '"A [MOOD] landing page for [BRAND_NAME]…" with guidance on choosing the mood.' },
  { n: '2', title: 'STACK & SETUP', text: 'Framework fixed. Fonts parameterized: "Replace [DISPLAY_FONT] with a grotesk like Space Grotesk or Chakra Petch".' },
  { n: '3', title: 'ASSET SLOTS', text: 'Not URLs: "Use a [TEXTURE_TYPE] image of [SUBJECT] processed with [PROCESSING_TECHNIQUE]".' },
  { n: '4', title: 'LAYOUT GRAMMAR', text: 'Structure, not copy: "Left-aligned headline, right-anchored image. Never centered hero."' },
  { n: '5', title: 'MOTION PRINCIPLES', text: 'Not exact values: "Orchestrated entrance, staggered reveals. No bounce easing. 800-1400ms."' },
  { n: '6', title: 'ANTI-SLOP CONSTRAINTS', text: 'Preserved verbatim. These NEVER change — they ARE the style.' },
  { n: '7', title: 'RESPONSIVE', text: 'Preserved verbatim. Breakpoint strategy is style-locked.' },
];

const FIXED_SWAPPABLE = [
  { element: 'Framework / stack', exact: 'Fixed', template: 'Fixed' },
  { element: 'Font names', exact: 'Exact (Orbitron, Ogg)', template: 'Placeholder + guidance' },
  { element: 'Font register', exact: '—', template: 'Fixed (e.g., "grotesk display")' },
  { element: 'Color hex values', exact: 'Exact (#0A0A0A)', template: 'Placeholder + guidance' },
  { element: 'Color architecture', exact: '—', template: 'Fixed (e.g., "near-black ground, one warm accent")' },
  { element: 'Image URLs', exact: 'Exact remote URLs', template: 'Slot descriptions + processing instructions' },
  { element: 'Copy / headlines', exact: 'Exact strings', template: 'Placeholder ([BRAND_NAME], [TAGLINE])' },
  { element: 'Layout structure', exact: 'Exact pixel values', template: 'Grammar rules (e.g., "asymmetric, left-aligned")' },
  { element: 'Animation easing', exact: 'Exact curves', template: 'Principles (e.g., "power2.out, no bounce")' },
  { element: 'Animation timing', exact: 'Exact ms values', template: 'Ranges (e.g., "800-1400ms")' },
  { element: 'Anti-slop bans', exact: 'Fixed', template: 'Fixed (NEVER parameterized)' },
  { element: 'Responsive strategy', exact: 'Fixed', template: 'Fixed' },
];

const BANNED_FONTS = [
  'Inter (as default display) — the LLM\u2019s statistical safe choice',
  'Roboto — Google default',
  'Arial — system fallback',
  'Fraunces — LLM\u2019s favorite serif',
  'Instrument Serif (as primary display) — LLM\u2019s second-favorite serif',
];

const BANNED_VISUAL = [
  'AI-purple / blue gradient glows — the #1 AI tell',
  'Centered hero over dark mesh gradient — the default composition',
  'Three equal feature cards — the lazy layout',
  'Generic glassmorphism on everything — backdrop-blur slop',
  'Neon / outer glow shadows — dated and cheap',
  'Pure black (#000000) — kills depth',
  'Pure white (#FFFFFF) as text — too harsh',
  'Gradient text on large headers — the AI emphasis default',
  'Custom mouse cursors — accessibility / performance hostile',
  'Warm beige + brass + espresso as default premium palette',
];

const BANNED_LAYOUT = [
  'Eyebrow above every section — templated rhythm',
  'Zigzag image+text alternation — banal pattern',
  'Logo wall inside the hero — trust logos belong below',
  'Two CTAs with same intent — duplicate action confusion',
  'Button text wrapping to 2+ lines — broken CTA',
  'h-screen for hero — iOS Safari viewport bug (use min-h-[100dvh])',
];

const BANNED_MOTION = [
  "window.addEventListener('scroll') — performance killer (use IntersectionObserver or CSS scroll-driven)",
  'Linear or ease-in-out transitions — generic',
  'Animating top / left / width / height — layout-triggering, causes jank',
  'Infinite animations on every element — motion noise',
  'Two or more marquees per page — lazy filler',
  'Bounce easing — feels cheap and unprofessional',
];

const MANDATORY_PRACTICES = [
  'One accent color, locked across the entire page',
  'Asymmetric layout (never default centered)',
  'Generous whitespace (py-32+ section padding)',
  'Custom or intentional font choice (name it specifically)',
  'Motion with purpose (each animation communicates something)',
  'prefers-reduced-motion fallback for all motion above level 3',
  'Real or generated images (never placeholder divs or gradient blobs)',
  'Near-black (#0A0A0A-#111111) instead of pure #000',
  'Near-white (#E8E8E8-#F5F5F5) instead of pure #FFF for text on dark',
  'Hero fits the initial viewport, headline max 2 lines',
];

function BanList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-mono-label text-text-muted mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
            <span aria-hidden="true" className="text-text-muted mt-0.5">
              ✕
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GuidePage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6 lg:px-8">
      <SiteHeader />

      <div className="max-w-4xl mx-auto">
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
        <div className="mb-16">
          <div className="font-mono-label text-text-muted mb-4">PROMPT GUIDE</div>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            How to write a prompt
            <br />
            <span className="text-text-secondary">that doesn&rsquo;t ship slop.</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            Every style in DesignVault ships two prompts built from the same skeleton:
            an <strong className="text-text-primary">Exact Replica</strong> for pixel-perfect
            reproduction, and a <strong className="text-text-primary">Parameterized Template</strong>{' '}
            for adapting the style to new content. The anti-slop constraints in block 6 are never
            parameterized — they are the style.
          </p>
        </div>

        {/* Two prompt modes */}
        <section className="mb-16">
          <h2 className="font-display text-3xl mb-2">Two prompt modes, one skeleton</h2>
          <p className="text-text-secondary mb-8">
            Both prompts share the same 7-block architecture. The difference is precision: exact
            values versus principled guidance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exact Replica */}
            <div className="bg-ground-elevated border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl">Exact Replica</h3>
                <span className="font-mono-label text-text-muted">REPRODUCE</span>
              </div>
              <ol className="space-y-4">
                {EXACT_REPLICA_BLOCKS.map((block) => (
                  <li key={block.n} className="flex gap-4">
                    <span className="font-mono-label text-accent w-6 shrink-0">{block.n}</span>
                    <div>
                      <p className="text-sm font-medium text-text-primary mb-0.5">{block.title}</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{block.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Parameterized Template */}
            <div className="bg-ground-elevated border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl">Parameterized Template</h3>
                <span className="font-mono-label text-text-muted">ADAPT</span>
              </div>
              <ol className="space-y-4">
                {TEMPLATE_BLOCKS.map((block) => (
                  <li key={block.n} className="flex gap-4">
                    <span className="font-mono-label text-accent w-6 shrink-0">{block.n}</span>
                    <div>
                      <p className="text-sm font-medium text-text-primary mb-0.5">{block.title}</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{block.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Fixed vs swappable */}
        <section className="mb-16">
          <h2 className="font-display text-3xl mb-2">What&rsquo;s fixed, what&rsquo;s swappable</h2>
          <p className="text-text-secondary mb-8">
            When you customize a prompt, only the middle rows change. The bans and the responsive
            strategy are style-locked.
          </p>
          <div className="bg-ground-elevated border border-border rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-6 py-4 font-mono-label text-text-muted font-normal">ELEMENT</th>
                  <th className="px-6 py-4 font-mono-label text-text-muted font-normal">EXACT REPLICA</th>
                  <th className="px-6 py-4 font-mono-label text-text-muted font-normal">PARAMETERIZED</th>
                </tr>
              </thead>
              <tbody>
                {FIXED_SWAPPABLE.map((row) => (
                  <tr key={row.element} className="border-b border-border last:border-b-0">
                    <td className="px-6 py-3 text-text-primary font-medium">{row.element}</td>
                    <td className="px-6 py-3 text-text-secondary">{row.exact}</td>
                    <td className="px-6 py-3 text-text-secondary">{row.template}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Universal anti-slop rules */}
        <section className="mb-16">
          <h2 className="font-display text-3xl mb-2">Universal anti-slop rules</h2>
          <p className="text-text-secondary mb-8">
            These apply across <em>all</em> styles. Violating any of them produces generic AI
            output regardless of style intent — which is why they are frozen in block 6 of every
            prompt.
          </p>

          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <BanList title="BANNED FONTS" items={BANNED_FONTS} />
              <BanList title="BANNED VISUAL PATTERNS" items={BANNED_VISUAL} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <BanList title="BANNED LAYOUT PATTERNS" items={BANNED_LAYOUT} />
              <BanList title="BANNED MOTION PATTERNS" items={BANNED_MOTION} />
            </div>

            <div>
              <h3 className="font-mono-label text-accent mb-4">MANDATORY PRACTICES</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MANDATORY_PRACTICES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed bg-ground-elevated border border-border rounded-lg p-4"
                  >
                    <span aria-hidden="true" className="text-accent mt-0.5">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ground-elevated border border-border rounded-xl p-10 text-center">
          <h2 className="font-display text-2xl mb-3">Ready to ship something that doesn&rsquo;t look like AI?</h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            Every style entry carries its full prompt pair plus a checklist of the exact rules
            that keep it out of slop territory.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/#gallery"
              className="bg-accent text-accent-text px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Browse Styles
            </Link>
            <Link
              href="/map"
              className="border border-border hover:border-border-hover px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View the Map
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
