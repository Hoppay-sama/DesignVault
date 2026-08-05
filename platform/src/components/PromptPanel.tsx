'use client';

import { useState } from 'react';

interface PromptPanelProps {
  exactPrompt?: string;
  templatePrompt?: string;
  styleName: string;
  testedWith?: string[];
}

export function PromptPanel({
  exactPrompt,
  templatePrompt,
  styleName,
  testedWith,
}: PromptPanelProps) {
  const [activeTab, setActiveTab] = useState<'exact' | 'template'>('exact');
  const [copied, setCopied] = useState(false);

  // Guard: if the active tab has no prompt (e.g. missing template on partial
  // styles), fall back to the one that exists so the panel never shows empty.
  const currentPrompt =
    activeTab === 'exact'
      ? exactPrompt
      : templatePrompt ?? exactPrompt;

  const handleCopy = async () => {
    if (currentPrompt) {
      await navigator.clipboard.writeText(currentPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const charCount = currentPrompt?.length || 0;

  return (
    <section className="mb-16">
      <h2 className="font-display text-2xl mb-6">AI Prompts</h2>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('exact')}
          disabled={!exactPrompt}
          className={`px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            activeTab === 'exact'
              ? 'bg-accent text-accent-text'
              : 'bg-ground-elevated border border-border text-text-secondary hover:text-text-primary'
          }`}
        >
          Exact Replica
        </button>
        <button
          onClick={() => setActiveTab('template')}
          disabled={!templatePrompt}
          className={`px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            activeTab === 'template'
              ? 'bg-accent text-accent-text'
              : 'bg-ground-elevated border border-border text-text-secondary hover:text-text-primary'
          }`}
        >
          Parameterized Template
        </button>
      </div>

      {/* Prompt Content */}
      <div className="bg-ground-elevated border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="font-mono-label text-text-muted">
              {activeTab === 'exact' ? 'EXACT REPLICA' : 'PARAMETERIZED TEMPLATE'}
            </span>
            <span className="text-xs text-text-muted">{charCount} characters</span>
            {testedWith && testedWith.length > 0 && (
              <span className="text-xs text-text-muted hidden sm:inline">
                Tested with: {testedWith.join(', ')}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            disabled={!currentPrompt}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-text font-medium hover:scale-105 transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Full Prompt
              </>
            )}
          </button>
        </div>

        {/* Code Block */}
        <div className="p-6">
          <pre className="text-text-secondary text-sm whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
            {currentPrompt || 'No prompt available yet.'}
          </pre>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 flex items-start gap-2 text-sm text-text-muted">
        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>
          {activeTab === 'exact'
            ? 'This prompt recreates a specific design pixel-faithfully. Study it to understand the style at its purest.'
            : 'This prompt has placeholders for your brand. Replace [BRACKETED] values with your details before using.'}
        </p>
      </div>
    </section>
  );
}