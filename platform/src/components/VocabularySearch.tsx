'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import type { VocabularyTerm } from '@/lib/vocabulary';

interface VocabularySearchProps {
  terms: VocabularyTerm[];
}

interface SearchResult extends VocabularyTerm {
  score: number;
}

export function VocabularySearch({ terms }: VocabularySearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build a simple inverted index for fast client-side search
  const index = useMemo(() => {
    const termIndex = new Map<string, number[]>();

    terms.forEach((term, idx) => {
      const words = [
        term.term.toLowerCase(),
        term.description.toLowerCase(),
        term.category.toLowerCase(),
        ...term.styles.map((s) => s.title.toLowerCase()),
      ]
        .join(' ')
        .split(/[\s,;:()\-_/]+/)
        .filter((w) => w.length > 1);

      const uniqueWords = Array.from(new Set(words));
      for (const word of uniqueWords) {
        if (!termIndex.has(word)) {
          termIndex.set(word, []);
        }
        termIndex.get(word)!.push(idx);
      }
    });

    return termIndex;
  }, [terms]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const queryWords = query
      .toLowerCase()
      .split(/[\s,;:()\-_/]+/)
      .filter((w) => w.length > 1);

    if (queryWords.length === 0) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    // Score each term by how many query words match
    const scores = new Map<number, number>();

    for (const qWord of queryWords) {
      // Exact prefix match
      const indexEntries = Array.from(index.entries());
      for (const [indexedWord, indices] of indexEntries) {
        if (indexedWord.startsWith(qWord) || indexedWord.includes(qWord)) {
          const isExact = indexedWord === qWord;
          const isPrefix = indexedWord.startsWith(qWord);
          const weight = isExact ? 3 : isPrefix ? 2 : 1;

          for (const idx of indices) {
            scores.set(idx, (scores.get(idx) || 0) + weight);
          }
        }
      }
    }

    // Also check direct term match (highest priority)
    const directQuery = query.toLowerCase().trim();
    terms.forEach((term, idx) => {
      if (term.term.toLowerCase().includes(directQuery)) {
        scores.set(idx, (scores.get(idx) || 0) + 10);
      }
    });

    const sorted: SearchResult[] = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([idx, score]) => ({ ...terms[idx], score }));

    setResults(sorted);
    setIsSearching(false);
  }, [query, index, terms]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups = new Map<string, SearchResult[]>();
    for (const result of results) {
      const cat = result.category;
      if (!groups.has(cat)) {
        groups.set(cat, []);
      }
      groups.get(cat)!.push(result);
    }
    return groups;
  }, [results]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vocabulary terms... (e.g., hairline border, radial glow, bento grid)"
          className="w-full bg-ground-elevated border border-border rounded-xl pl-12 pr-4 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          aria-label="Search vocabulary terms"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-secondary transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-text-muted">
          {terms.length} terms across all styles
        </p>
        {query && (
          <p className="text-sm text-text-muted">
            {isSearching ? 'Searching...' : `${results.length} results`}
          </p>
        )}
      </div>

      {/* Empty State */}
      {!query && (
        <div className="text-center py-16">
          <div className="text-text-muted mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <p className="text-text-secondary text-lg mb-2">
            Search the design vocabulary
          </p>
          <p className="text-text-muted text-sm max-w-md mx-auto">
            Find terms like &quot;hairline border&quot;, &quot;radial glow&quot;, or
            &quot;bento grid&quot; and see which styles use them.
          </p>
        </div>
      )}

      {/* No Results */}
      {query && !isSearching && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary text-lg mb-2">No terms found</p>
          <p className="text-text-muted text-sm">
            Try different keywords or check your spelling
          </p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-8">
          {Array.from(groupedResults.entries()).map(([category, categoryResults]) => (
            <div key={category}>
              <h3 className="font-mono-label text-text-muted mb-4">
                {category.toUpperCase()}
              </h3>
              <div className="space-y-3">
                {categoryResults.map((result) => (
                  <div
                    key={`${result.term}-${result.category}`}
                    className="bg-ground-elevated border border-border rounded-lg p-5 hover:border-border-hover transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <code className="text-accent font-mono text-sm">
                            {result.term}
                          </code>
                          <span className="text-xs text-text-muted bg-ground border border-border px-2 py-0.5 rounded">
                            {result.category}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mb-3">
                          {result.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.styles.map((style) => (
                            <Link
                              key={style.slug}
                              href={`/style/${style.slug}`}
                              className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors"
                            >
                              <span className="bg-ground border border-border px-2 py-1 rounded">
                                {style.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
