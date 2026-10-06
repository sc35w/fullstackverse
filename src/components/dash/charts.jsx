// Lightweight SVG charts for the portfolio dashboards, following the dataviz
// mark specs: 2px lines, bars <= 24px with 4px rounded data-ends, 2px surface
// gaps, hairline solid grid, crosshair/hover tooltips, table view twins.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { INK, SERIES, fmt, seqColor } from './theme';
import { cn } from '@/lib/utils';

export function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return undefined;
    const ro = new ResizeObserver(([e]) => setWidth(Math.floor(e.contentRect.width)));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

const niceMax = (v) => {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * p;
};

export function Legend({ series, kind = 'line' }) {
  if (!series || series.length < 2) return null;
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
      {series.map((s, i) => (
        <span key={s.key} className="inline-flex items-center gap-1.5">
          {kind === 'line' ? (
            <span className="h-0.5 w-3 rounded" style={{ background: s.color || SERIES[i] }} />
          ) : (
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: s.color || SERIES[i] }} />
          )}
          {s.label}
        </span>
      ))}
    </div>
  );
}

function Tooltip({ x, y, width, children }) {
  if (x == null) return null;
  const left = Math.min(Math.max(x + 12, 0), Math.max(width - 180, 0));
  return (
    <div
      className="pointer-events-none absolute z-10 min-w-[140px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg"
      style={{ left, top: Math.max(y - 10, 0) }}
    >
      {children}
    </div>
  );
}

function TooltipRow({ color, label, value }) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      <span className="h-0.5 w-3 shrink-0 rounded" style={{ background: color }} />
      <span className="font-semibold tabular-nums text-slate-900">{value}</span>
      <span className="text-slate-500">{label}</span>
    </div>
  );
}

// Card wrapper with title, optional legend and a Chart/Table toggle.
export function ChartCard({ title, subtitle, legend, table, actions, className, children }) {
  const [view, setView] = useState('chart');
  return (
    <figure className={cn('min-w-0 rounded-xl border border-slate-200 bg-white p-4', className)}>
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <figcaption className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          {subtitle && <div className="text-xs text-slate-500">{subtitle}</div>}
        </figcaption>
        <div className="flex items-center gap-2">
          {actions}
          {table && (
            <div className="flex rounded-md border border-slate-200 p-0.5 text-[11px] font-medium">
              {['chart', 'table'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={cn('rounded px-2 py-0.5 capitalize', view === v ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900')}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {legend && view === 'chart' && <div className="mb-2">{legend}</div>}
      {view === 'chart' || !table ? (
        children
      ) : (
        <div className="max-h-72 overflow-auto">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-white text-slate-500">
              <tr>
                {table.columns.map((c) => (
                  <th key={c} className="border-b border-slate-200 py-1.5 pr-3 font-medium">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="tabular-nums text-slate-700">
              {table.rows.map((r, i) => (
                <tr key={i} className="border-b border-slate-100">
                  {r.map((c, j) => (
                    <td key={j} className="py-1.5 pr-3">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </figure>
  );
}

// Multi-series line chart with crosshair tooltip. data: [{[xKey]: string, [series.key]: number}]
export function LineChart({ data, xKey = 'date', series, height = 220, format = fmt.compact, xFormat = fmt.date, area = false, threshold, yMax, marker }) {
  const [ref, width] = useWidth();
  // threshold: {value, label, color?} or an array of them
  const thresholds = threshold ? [].concat(threshold) : [];
  const [hover, setHover] = useState(null);
  const pad = { l: 44, r: 16, t: 10, b: 24 };
  const w = Math.max(width - pad.l - pad.r, 10);
  const h = height - pad.t - pad.b;
  const max = useMemo(
    () => yMax ?? niceMax(Math.max(...thresholds.map((t) => t.value), ...data.flatMap((d) => series.map((s) => d[s.key] || 0)))),
    [data, series, thresholds, yMax]
  );
  const xs = (i) => pad.l + (data.length <= 1 ? w / 2 : (i / (data.length - 1)) * w);
  const ys = (v) => pad.t + h - (v / max) * h;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const xTickEvery = Math.max(1, Math.ceil(data.length / Math.max(2, Math.floor(w / 70))));

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - pad.l;
    const i = Math.round((px / w) * (data.length - 1));
    if (i >= 0 && i < data.length) setHover(i);
  };

  return (
    <>
    {series.length > 1 && <div className="mb-2"><Legend series={series.map((s, i) => ({ ...s, color: s.color || SERIES[i] }))} kind="line" /></div>}
    <div ref={ref} className="relative" style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} onPointerMove={onMove} onPointerLeave={() => setHover(null)} className="touch-none">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={pad.l + w} y1={ys(t)} y2={ys(t)} stroke={t === 0 ? INK.axis : INK.grid} />
              <text x={pad.l - 6} y={ys(t) + 3} textAnchor="end" fontSize="10" fill={INK.muted} className="tabular-nums">{format(t)}</text>
            </g>
          ))}
          {data.map((d, i) =>
            i % xTickEvery === 0 ? (
              <text key={i} x={xs(i)} y={height - 6} textAnchor="middle" fontSize="10" fill={INK.muted}>{xFormat(d[xKey])}</text>
            ) : null
          )}
          {thresholds.map((t) => (
            <g key={t.label}>
              <line x1={pad.l} x2={pad.l + w} y1={ys(t.value)} y2={ys(t.value)} stroke={t.color || '#d03b3b'} strokeWidth="1" />
              <text x={pad.l + w} y={ys(t.value) - 4} textAnchor="end" fontSize="10" fill={t.color || '#b42318'}>{t.label}</text>
            </g>
          ))}
          {marker != null && marker < data.length && (
            <line x1={xs(marker)} x2={xs(marker)} y1={pad.t} y2={pad.t + h} stroke="#0F172A" strokeWidth="2" />
          )}
          {series.map((s, si) => {
            const color = s.color || SERIES[si];
            const pts = data.map((d, i) => `${xs(i)},${ys(d[s.key] || 0)}`);
            return (
              <g key={s.key}>
                {area && (
                  <path d={`M${xs(0)},${ys(0)} L${pts.join(' L')} L${xs(data.length - 1)},${ys(0)} Z`} fill={color} opacity="0.1" />
                )}
                <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                {data.length > 0 && (
                  <circle cx={xs(data.length - 1)} cy={ys(data[data.length - 1][s.key] || 0)} r="4" fill={color} stroke="#fff" strokeWidth="2" />
                )}
              </g>
            );
          })}
          {hover != null && (
            <g>
              <line x1={xs(hover)} x2={xs(hover)} y1={pad.t} y2={pad.t + h} stroke={INK.axis} />
              {series.map((s, si) => (
                <circle key={s.key} cx={xs(hover)} cy={ys(data[hover][s.key] || 0)} r="4" fill={s.color || SERIES[si]} stroke="#fff" strokeWidth="2" />
              ))}
            </g>
          )}
        </svg>
      )}
      {hover != null && (
        <Tooltip x={xs(hover)} y={pad.t} width={width}>
          <div className="mb-1 text-slate-500">{xFormat(data[hover][xKey])}</div>
          {series.map((s, si) => (
            <TooltipRow key={s.key} color={s.color || SERIES[si]} label={s.label} value={format(data[hover][s.key] || 0)} />
          ))}
        </Tooltip>
      )}
    </div>
    </>
  );
}

// Vertical bar chart; several series stack. data: [{[xKey], [series.key]}]
export function BarChart({ data, xKey = 'label', series, height = 220, format = fmt.compact, xFormat = (v) => v, onBarClick, activeX }) {
  const [ref, width] = useWidth();
  const [hover, setHover] = useState(null);
  const pad = { l: 44, r: 8, t: 10, b: 24 };
  const w = Math.max(width - pad.l - pad.r, 10);
  const h = height - pad.t - pad.b;
  const max = niceMax(Math.max(...data.map((d) => series.reduce((a, s) => a + (d[s.key] || 0), 0)), 1));
  const band = w / Math.max(data.length, 1);
  const bw = Math.min(24, Math.max(band - 4, 2));
  const ys = (v) => (v / max) * h;
  const ticks = [0, 0.5, 1].map((t) => t * max);
  const xTickEvery = Math.max(1, Math.ceil(data.length / Math.max(2, Math.floor(w / 56))));

  return (
    <>
    {series.length > 1 && <div className="mb-2"><Legend series={series.map((s, i) => ({ ...s, color: s.color || SERIES[i] }))} kind="bar" /></div>}
    <div ref={ref} className="relative" style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} onPointerLeave={() => setHover(null)}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={pad.l + w} y1={pad.t + h - ys(t)} y2={pad.t + h - ys(t)} stroke={t === 0 ? INK.axis : INK.grid} />
              <text x={pad.l - 6} y={pad.t + h - ys(t) + 3} textAnchor="end" fontSize="10" fill={INK.muted} className="tabular-nums">{format(t)}</text>
            </g>
          ))}
          {data.map((d, i) => {
            const cx = pad.l + band * i + band / 2;
            let acc = 0;
            const dim = activeX != null && activeX !== d[xKey];
            return (
              <g
                key={i}
                onPointerEnter={() => setHover(i)}
                onClick={onBarClick ? () => onBarClick(d[xKey]) : undefined}
                className={onBarClick ? 'cursor-pointer' : undefined}
                opacity={dim ? 0.35 : hover != null && hover !== i ? 0.7 : 1}
              >
                <rect x={pad.l + band * i} y={pad.t} width={band} height={h} fill="transparent" />
                {series.map((s, si) => {
                  const v = d[s.key] || 0;
                  const bh = Math.max(ys(v) - (si < series.length - 1 && v > 0 ? 2 : 0), 0);
                  const y = pad.t + h - ys(acc) - ys(v);
                  acc += v;
                  if (v <= 0) return null;
                  const isTop = series.slice(si + 1).every((t) => !(d[t.key] > 0));
                  const r = isTop ? Math.min(4, bw / 2, bh) : 0;
                  return (
                    <path
                      key={s.key}
                      d={`M${cx - bw / 2},${y + bh} V${y + r} Q${cx - bw / 2},${y} ${cx - bw / 2 + r},${y} H${cx + bw / 2 - r} Q${cx + bw / 2},${y} ${cx + bw / 2},${y + r} V${y + bh} Z`}
                      fill={s.color || SERIES[si]}
                    />
                  );
                })}
                {i % xTickEvery === 0 && (
                  <text x={cx} y={height - 6} textAnchor="middle" fontSize="10" fill={INK.muted}>{xFormat(d[xKey])}</text>
                )}
              </g>
            );
          })}
        </svg>
      )}
      {hover != null && data[hover] && (
        <Tooltip x={pad.l + band * hover + band / 2} y={pad.t} width={width}>
          <div className="mb-1 text-slate-500">{xFormat(data[hover][xKey])}</div>
          {series.map((s, si) => (
            <TooltipRow key={s.key} color={s.color || SERIES[si]} label={s.label} value={format(data[hover][s.key] || 0)} />
          ))}
        </Tooltip>
      )}
    </div>
    </>
  );
}

// Ranked horizontal bars (top-N). items: [{label, value, color?}]
export function HBars({ items, format = fmt.compact, color = SERIES[0], onClick, active }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-2">
      {items.map((it) => (
        <button
          key={it.label}
          type="button"
          onClick={onClick ? () => onClick(it.label) : undefined}
          className={cn('group block w-full text-left', !onClick && 'cursor-default', active && active !== it.label && 'opacity-40')}
          title={`${it.label}: ${format(it.value)}`}
        >
          <div className="mb-0.5 flex justify-between gap-2 text-xs">
            <span className="truncate text-slate-700">{it.label}</span>
            <span className="font-semibold tabular-nums text-slate-900">{format(it.value)}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full transition-[width]" style={{ width: `${(it.value / max) * 100}%`, background: it.color || color }} />
          </div>
        </button>
      ))}
    </div>
  );
}

// Heatmap: rows x cols grid of values, sequential blue.
export function Heatmap({ rows, cols, values, format = fmt.int, cellH = 22, colFormat = (c) => c, onCellClick }) {
  const [hover, setHover] = useState(null);
  const flat = values.flat();
  const max = Math.max(...flat, 1);
  const min = Math.min(...flat, 0);
  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <div className="inline-grid min-w-full gap-[2px]" style={{ gridTemplateColumns: `minmax(64px,auto) repeat(${cols.length}, minmax(16px,1fr))` }}>
          <div />
          {cols.map((c, j) => (
            <div key={j} className="pb-1 text-center text-[10px] text-slate-400">{colFormat(c, j)}</div>
          ))}
          {rows.map((r, i) => (
            <React.Fragment key={`${r}-${i}`}>
              <div className="truncate pr-2 text-[11px] leading-[22px] text-slate-600">{r}</div>
              {cols.map((c, j) => {
                const v = values[i][j];
                return (
                  <div
                    key={j}
                    role="img"
                    aria-label={`${r}, ${c}: ${format(v)}`}
                    tabIndex={-1}
                    onPointerEnter={() => setHover({ i, j })}
                    onPointerLeave={() => setHover(null)}
                    onClick={onCellClick ? () => onCellClick(i, j) : undefined}
                    className={cn('rounded-[3px]', hover && hover.i === i && hover.j === j && 'ring-2 ring-slate-900', onCellClick && 'cursor-pointer')}
                    style={{ height: cellH, background: seqColor((v - min) / (max - min || 1)) }}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
        <span>{format(min)}</span>
        <div className="h-2 w-28 rounded-full" style={{ background: `linear-gradient(90deg, ${seqColor(0)}, ${seqColor(0.5)}, ${seqColor(1)})` }} />
        <span>{format(max)}</span>
        {hover && (
          <span className="ml-auto font-medium text-slate-700">
            {rows[hover.i]} · {colFormat(cols[hover.j], hover.j)}: <b className="text-slate-900">{format(values[hover.i][hover.j])}</b>
          </span>
        )}
      </div>
    </div>
  );
}

export function Sparkline({ values, color = SERIES[0], width = 96, height = 28 }) {
  if (!values?.length) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * (width - 4) + 2},${height - 3 - ((v - min) / (max - min || 1)) * (height - 6)}`);
  return (
    <svg width={width} height={height} aria-hidden="true">
      <polyline points={pts.join(' ')} fill="none" stroke={INK.deEmphasis} strokeWidth="1.5" />
      <circle cx={pts[pts.length - 1].split(',')[0]} cy={pts[pts.length - 1].split(',')[1]} r="3" fill={color} />
    </svg>
  );
}
