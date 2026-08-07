import type { ReactNode } from 'react';
import type { StylePreview } from '../../../lib/types';
import EditorialLayout from './EditorialLayout';
import BrutalistLayout from './BrutalistLayout';
import TerminalLayout from './TerminalLayout';
import CinematicLayout from './CinematicLayout';
import GridLayout from './GridLayout';
import AsymmetricLayout from './AsymmetricLayout';

export interface LayoutProps {
  preview: StylePreview;
  title: string;
}

export const LAYOUT_VARIANTS: Record<
  StylePreview['layout'],
  (props: LayoutProps) => ReactNode
> = {
  editorial: EditorialLayout,
  brutalist: BrutalistLayout,
  terminal: TerminalLayout,
  cinematic: CinematicLayout,
  grid: GridLayout,
  asymmetric: AsymmetricLayout,
};
