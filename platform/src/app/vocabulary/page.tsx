import Link from 'next/link';
import { buildVocabularyIndex } from '@/lib/vocabulary';
import { VocabularySearch } from '@/components/VocabularySearch';

export const metadata = {
  title: 'Vocabulary Search — DesignVault',
  description:
    'Search the design vocabulary across all styles. Find terms, techniques, and see which styles use them.',
};

export default function VocabularyPage() {
  const terms = buildVocabularyIndex();

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-4 mb-6">
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

        <h1 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tight mb-4">
          Design Vocabulary
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          A searchable index of design terms, techniques, and patterns.
          Find the right word for the effect you want, and see which styles use it.
        </p>
      </div>

      {/* Search */}
      <VocabularySearch terms={terms} />
    </main>
  );
}
