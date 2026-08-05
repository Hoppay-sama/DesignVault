'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StyleEntry, StyleAxis } from '@/lib/types';
import { STYLE_CLUSTERS, getClusterForSlug } from '@/lib/clusters';

interface AxisOption {
  key: keyof StyleAxis;
  label: string;
}

const AXIS_OPTIONS: AxisOption[] = [
  { key: 'color', label: 'Color' },
  { key: 'typography', label: 'Typography' },
  { key: 'motion', label: 'Motion' },
  { key: 'density', label: 'Density' },
  { key: 'texture', label: 'Texture' },
  { key: 'layout', label: 'Layout' },
];

// SVG geometry — plot area inside the viewBox
const SVG_WIDTH = 620;
const SVG_HEIGHT = 460;
const PLOT_LEFT = 56;
const PLOT_RIGHT = 596;
const PLOT_TOP = 32;
const PLOT_BOTTOM = 396;

function xFor(value: number): number {
  return PLOT_LEFT + ((value - 1) / 5) * (PLOT_RIGHT - PLOT_LEFT);
}

function yFor(value: number): number {
  return PLOT_BOTTOM - ((value - 1) / 5) * (PLOT_BOTTOM - PLOT_TOP);
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: keyof StyleAxis;
  onChange: (key: keyof StyleAxis) => void;
  options: AxisOption[];
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="font-mono-label text-text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as keyof StyleAxis)}
        className="bg-ground-elevated border border-border rounded-lg px-3 py-1.5 text-text-primary focus:border-accent focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/**
 * Landscape map (PRD §5.5). Positions every style on any pair of the
 * six axes, colored by its taxonomy cluster. Clicking a node opens the
 * style entry. Below the plot, the cluster legend doubles as a filter
 * hint — cluster details are rendered server-side on the map page.
 */
export function StyleMap({ styles }: { styles: StyleEntry[] }) {
  const [xAxis, setXAxis] = useState<keyof StyleAxis>('color');
  const [yAxis, setYAxis] = useState<keyof StyleAxis>('motion');

  const xLabel = AXIS_OPTIONS.find((o) => o.key === xAxis)?.label ?? 'X';
  const yLabel = AXIS_OPTIONS.find((o) => o.key === yAxis)?.label ?? 'Y';

  return (
    <div className="space-y-6">
      {/* Axis selectors */}
      <div className="flex flex-wrap items-center gap-6">
        <Select label="X AXIS" value={xAxis} onChange={setXAxis} options={AXIS_OPTIONS} />
        <Select label="Y AXIS" value={yAxis} onChange={setYAxis} options={AXIS_OPTIONS} />
        <p className="text-sm text-text-muted">
          Each dot is a style. Hover to identify, click to open.
        </p>
      </div>

      {/* Scatter plot */}
      <div className="bg-ground-elevated border border-border rounded-xl p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full min-w-[560px] h-auto"
          role="img"
          aria-label={`Style landscape map, ${xLabel} on the horizontal axis and ${yLabel} on the vertical axis`}
        >
          {/* Grid lines + axis labels */}
          {[1, 2, 3, 4, 5, 6].map((v) => (
            <g key={v}>
              <line
                x1={xFor(v)}
                y1={PLOT_TOP}
                x2={xFor(v)}
                y2={PLOT_BOTTOM}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
              <line
                x1={PLOT_LEFT}
                y1={yFor(v)}
                x2={PLOT_RIGHT}
                y2={yFor(v)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
              <text
                x={xFor(v)}
                y={PLOT_BOTTOM + 18}
                textAnchor="middle"
                className="fill-text-muted"
                fontSize={11}
              >
                {v}
              </text>
              <text
                x={PLOT_LEFT - 14}
                y={yFor(v) + 4}
                textAnchor="end"
                className="fill-text-muted"
                fontSize={11}
              >
                {v}
              </text>
            </g>
          ))}
          <text
            x={(PLOT_LEFT + PLOT_RIGHT) / 2}
            y={PLOT_BOTTOM + 40}
            textAnchor="middle"
            className="fill-text-secondary"
            fontSize={12}
          >
            {xLabel} →
          </text>
          <text
            x={18}
            y={(PLOT_TOP + PLOT_BOTTOM) / 2}
            textAnchor="middle"
            className="fill-text-secondary"
            fontSize={12}
            transform={`rotate(-90 18 ${(PLOT_TOP + PLOT_BOTTOM) / 2})`}
          >
            {yLabel} →
          </text>

          {/* Style nodes */}
          {styles.map((style) => {
            const cluster = getClusterForSlug(style.slug);
            const color = cluster?.color ?? '#A0A0A0';
            const cx = xFor(style.axis[xAxis]);
            const cy = yFor(style.axis[yAxis]);
            return (
              <Link key={style.slug} href={`/style/${style.slug}`} aria-label={style.title}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={7}
                  fill={color}
                  stroke="#0A0A0A"
                  strokeWidth={2}
                  className="cursor-pointer hover:opacity-100 opacity-90"
                >
                  <title>{`${style.title} — Cluster ${cluster?.id ?? '—'}`}</title>
                </circle>
              </Link>
            );
          })}
        </svg>
      </div>

      {/* Cluster legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {STYLE_CLUSTERS.map((cluster) => (
          <span key={cluster.id} className="flex items-center gap-2 text-sm text-text-secondary">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: cluster.color }}
            />
            <span className="font-mono-label text-text-muted">{cluster.id}</span>
            {cluster.name}
          </span>
        ))}
      </div>
    </div>
  );
}
