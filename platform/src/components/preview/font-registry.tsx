'use client';

import type { ReactNode, JSX } from 'react';
import {
  Fraunces,
  Playfair_Display,
  Source_Serif_4,
  Newsreader,
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
  Space_Mono,
  Archivo,
  Oswald,
} from 'next/font/google';

/**
 * Self-hosted Google font instances. Each binds `--font-<key>` on the wrapper
 * element so every descendant SpecimenPreview can resolve the same CSS
 * variable names that FONT_CATALOG keys in fonts.ts reference.
 */
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});
const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif-4',
});
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

/** Mount once around a set of cards so every descendant preview shares the font variables. */
export function PreviewFontProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div
      className={[
        fraunces.variable,
        playfairDisplay.variable,
        sourceSerif4.variable,
        newsreader.variable,
        inter.variable,
        spaceGrotesk.variable,
        jetBrainsMono.variable,
        spaceMono.variable,
        archivo.variable,
        oswald.variable,
      ].join(' ')}
    >
      {children}
    </div>
  );
}