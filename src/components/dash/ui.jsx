// Dashboard chrome and controls shared by every portfolio dashboard.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertOctagon, AlertTriangle, ArrowDown, ArrowUp, CheckCircle2, ChevronDown, ChevronUp, Circle, Clock, Pause, Play, Search, X } from 'lucide-react';
import { Sparkline } from './charts';
import { STATUS, fmt } from './theme';
import { cn } from '@/lib/utils';

export const RANGES = [
  { id: 7, label: 'Last 7 days' },
  { id: 30, label: 'Last 30 days' },
  { id: 90, label: 'Last 90 days' },
];

// Slice a daily series to the selected range, plus the previous period for deltas.
export function useRange(daily, days) {
  return useMemo(() => {
    const cur = daily.slice(-days);
    const prev = daily.slice(-days * 2, -days);
    return { cur, prev };
  }, [daily, days]);
}

export const delta = (cur, prev) => (prev ? ((cur - prev) / prev) * 100 : 0);

// Runs fn every `ms` while `on` is true (simulated live data).
export function useLive(fn, ms, on = true) {
  const saved = useRef(fn);
  saved.current = fn;
  useEffect(() => {
    if (!on) return undefined;
    const id = setInterval(() => saved.current(), ms);
    return () => clearInterval(id);
  }, [ms, on]);
}

export function DashShell({ name, accent, views, view, onView, range, onRange, live, onLive, filters, children }) {
  return (
    <div className="overflow-hidden rounded-sm border border-line-dark bg-canvas">
      <div className="flex min-h-[640px] flex-col md:flex-row">
        {/* Sidebar (tabs on small screens) */}
        <aside className="shrink-0 border-b border-line bg-surface md:w-56 md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 px-4 py-3 md:py-4">
            <span className="block h-2 w-2 bg-ink" aria-hidden="true" />
            <span className="truncate font-display text-lg tracking-[-0.03em] text-ink">{name}</span>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-col md:overflow-visible">
            {views.map((v) => {
              const Icon = v.icon;
              const on = v.id === view;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onView(v.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-2.5 rounded-sm px-3 py-2 text-left text-sm transition-colors',
                    on ? 'bg-ink text-canvas' : 'text-ink-2 hover:bg-surface-alt hover:text-ink'
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {v.label}
                  {v.badge ? (
                    <span className={cn('ml-auto font-mono text-[10px]', on ? 'text-line-dark' : 'text-ink-3')}>
                      {v.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Filter row: date range first, then project filters, then live toggle */}
          <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
            {onRange && (
              <div className="flex rounded-sm border border-line p-0.5" role="group" aria-label="Date range">
                {RANGES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onRange(r.id)}
                    className={cn('rounded-sm px-2.5 py-1 text-xs', range === r.id ? 'bg-ink text-canvas' : 'text-ink-2 hover:text-ink')}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
            {filters}
            <div className="ml-auto flex items-center gap-2">
              {onLive && (
                <button
                  type="button"
                  onClick={() => onLive(!live)}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1 text-xs text-ink-2 hover:border-ink-3"
                >
                  {live ? (
                    <>
                      <span className="h-2 w-2 rounded-full" style={{ background: STATUS.good }} /> Live
                      <Pause className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-slate-300" /> Paused
                      <Play className="h-3 w-3" />
                    </>
                  )}
                </button>
              )}
              <span className="meta rounded-sm border border-line px-2 py-1 !text-[10px]">Sample data</span>
            </div>
          </div>
          <div className="space-y-4 p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Select({ value, onChange, options, label }) {
  return (
    <label className="inline-flex items-center gap-1.5 text-xs text-slate-500">
      <span className="sr-only sm:not-sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-sm border border-line bg-surface px-2 py-1 text-xs text-ink outline-none focus:border-ink"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export function StatTile({ label, value, deltaPct, deltaUnit = '%', upIsGood = true, spark, hero, hint }) {
  const up = deltaPct >= 0;
  const good = up === upIsGood;
  return (
    <div className="min-w-0 rounded-sm border border-line bg-surface p-5">
      <div className="meta">{label}</div>
      <div className="mt-1 flex items-end justify-between gap-2">
        <div className={cn('mt-1 font-display tracking-[-0.03em] text-ink', hero ? 'text-5xl' : 'text-[2rem] leading-tight')}>{value}</div>
        {spark && <Sparkline values={spark} />}
      </div>
      {deltaPct != null && Number.isFinite(deltaPct) && (
        <div className={cn('mt-1 inline-flex items-center gap-0.5 text-xs font-medium', good ? 'text-[#3E5424]' : 'text-[#8E2A1C]')}>
          {up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {Math.abs(deltaPct).toFixed(1)}{deltaUnit === 'pts' ? ' pts' : '%'} <span className="font-normal text-ink-3">vs previous period</span>
        </div>
      )}
      {hint && <div className="mt-1 text-xs text-ink-3">{hint}</div>}
    </div>
  );
}

export function KpiRow({ children }) {
  return <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{children}</div>;
}

// Status pill: colour + icon + label, never colour alone.
const STATUS_MAP = {
  good: { icon: CheckCircle2, color: '#4F6B2E', bg: '#E9EBDD', fg: '#3E5424' },
  warning: { icon: Clock, color: '#9A6B16', bg: '#F2E8CF', fg: '#6E4C10' },
  serious: { icon: AlertTriangle, color: '#A4532A', bg: '#F2E1D3', fg: '#7A3D1F' },
  critical: { icon: AlertOctagon, color: '#9B2C22', bg: '#F1DAD4', fg: '#7C231B' },
  neutral: { icon: Circle, color: '#8A837A', bg: '#EAE4DA', fg: '#4A453E' },
};

export function StatusPill({ tone = 'neutral', children }) {
  const s = STATUS_MAP[tone] || STATUS_MAP.neutral;
  const Icon = s.icon;
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-1.5 py-0.5 text-[11px] font-medium" style={{ background: s.bg, color: s.fg }}>
      <Icon className="h-3 w-3" style={{ color: s.color }} />
      {children}
    </span>
  );
}

export function Meter({ value, max = 100, label, right, tone }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = tone === 'critical' ? '#9B2C22' : tone === 'warning' ? '#B07A1B' : tone === 'good' ? '#56603A' : '#3A3630';
  const track = '#E6E0D6';
  return (
    <div className="min-w-0">
      {(label || right) && (
        <div className="mb-1 flex justify-between gap-2 text-xs">
          <span className="truncate text-ink-2">{label}</span>
          <span className="font-mono text-[11px] tabular-nums text-ink">{right}</span>
        </div>
      )}
      <div className="h-1.5" style={{ background: track }}>
        <div className="h-1.5 transition-[width] duration-500" style={{ width: `${pct}%`, background: fill }} />
      </div>
    </div>
  );
}

export function Btn({ children, onClick, variant = 'primary', size = 'sm', disabled, className, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-45',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-2 text-sm',
        variant === 'primary' && 'bg-ink text-canvas hover:bg-ink-hover',
        variant === 'outline' && 'border border-line-dark bg-transparent text-ink hover:border-ink',
        variant === 'danger' && 'border border-[#D9B7AE] bg-transparent text-[#8E2A1C] hover:border-[#8E2A1C]',
        variant === 'ghost' && 'text-ink-2 hover:text-ink',
        className
      )}
    >
      {children}
    </button>
  );
}

// Sortable, searchable, paginated table. columns: [{key, label, render?, sort?, align?}]
export function DataTable({ columns, rows, searchKeys, onRowClick, pageSize = 8, empty = 'No records', toolbar, rowKey = 'id', selectedKey }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(0);
  const filtered = useMemo(() => {
    let r = rows;
    if (q && searchKeys) {
      const s = q.toLowerCase();
      r = r.filter((row) => searchKeys.some((k) => String(row[k] ?? '').toLowerCase().includes(s)));
    }
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      const get = col?.sortValue || ((row) => row[sort.key]);
      r = [...r].sort((a, b) => {
        const x = get(a);
        const y = get(b);
        return (x > y ? 1 : x < y ? -1 : 0) * (sort.dir === 'asc' ? 1 : -1);
      });
    }
    return r;
  }, [rows, q, sort, searchKeys, columns]);
  useEffect(() => setPage(0), [q, rows.length]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const shown = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div>
      {(searchKeys || toolbar) && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {searchKeys && (
            <label className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                className="w-44 rounded-sm border border-line bg-surface py-1 pl-7 pr-2 text-xs outline-none focus:border-ink"
              />
            </label>
          )}
          {toolbar}
          <span className="ml-auto text-xs text-slate-500">{filtered.length} records</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-xs">
          <thead>
            <tr className="border-b border-line-dark font-mono text-[10px] uppercase tracking-wider text-ink-3">
              {columns.map((c) => (
                <th key={c.key} className={cn('py-2 pr-3 font-medium', c.align === 'right' && 'text-right')}>
                  {c.sort === false ? (
                    c.label
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-0.5 uppercase hover:text-ink"
                      onClick={() => setSort((s) => (s?.key === c.key ? { key: c.key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key: c.key, dir: 'desc' }))}
                    >
                      {c.label}
                      {sort?.key === c.key && (sort.dir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tabular-nums text-ink-2">
            {shown.map((row) => (
              <tr
                key={row[rowKey]}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  'border-b border-line',
                  onRowClick && 'cursor-pointer hover:bg-surface-alt/60',
                  selectedKey != null && selectedKey === row[rowKey] && 'bg-surface-alt'
                )}
              >
                {columns.map((c) => (
                  <td key={c.key} className={cn('py-2 pr-3 align-middle', c.align === 'right' && 'text-right')}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
            {!shown.length && (
              <tr>
                <td colSpan={columns.length} className="py-6 text-center text-slate-400">{empty}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <div className="mt-2 flex items-center justify-end gap-2 text-xs text-slate-500">
          <Btn variant="ghost" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Prev</Btn>
          <span>
            {page + 1} / {pages}
          </span>
          <Btn variant="ghost" onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1}>Next</Btn>
        </div>
      )}
    </div>
  );
}

// Right-hand detail panel inside the dashboard frame.
export function Drawer({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-[#211F1A]/35" onClick={onClose}>
      <div
        role="dialog"
        aria-label={title}
        className="h-full w-full max-w-md overflow-y-auto border-l border-line bg-surface p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="display-3 !text-2xl">{title}</div>
          <button type="button" onClick={onClose} className="rounded-sm p-1 text-ink-2 hover:text-ink" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line py-2.5 text-sm">
      <span className="text-ink-3">{label}</span>
      <span className="text-right text-ink">{children}</span>
    </div>
  );
}

export function Panel({ title, subtitle, actions, children, className }) {
  return (
    <section className={cn('min-w-0 rounded-sm border border-line bg-surface p-5', className)}>
      {(title || actions) && (
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="text-[15px] font-medium text-ink">{title}</div>
            {subtitle && <p className="text-xs text-ink-3">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

// Event feed for "live" streams.
export function Feed({ items, render, max = 8 }) {
  return (
    <ul className="divide-y divide-line">
      {items.slice(0, max).map((it) => (
        <li key={it.id} className="py-2 first:pt-0 last:pb-0">{render(it)}</li>
      ))}
    </ul>
  );
}

export { fmt };
