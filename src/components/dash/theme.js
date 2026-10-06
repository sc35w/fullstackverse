// Chart colour roles for the portfolio dashboards.
// Categorical order is the dataviz reference palette, validated (light mode,
// white surface): all checks pass; slots 3-5 are below 3:1 contrast, so every
// chart ships a legend for >= 2 series and a table view.
export const SERIES = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'];

// Reserved status colours, always shown with an icon + label.
export const STATUS = {
  good: '#0ca30c',
  warning: '#fab219',
  serious: '#ec835a',
  critical: '#d03b3b',
};

// Sequential blue ramp (100 -> 700) for heatmaps and magnitude.
export const SEQ = ['#cde2fb', '#b7d3f6', '#9ec5f4', '#86b6ef', '#6da7ec', '#5598e7', '#3987e5', '#2a78d6', '#256abf', '#1c5cab', '#184f95', '#104281', '#0d366b'];

export const INK = {
  primary: '#0F172A',
  secondary: '#475569',
  muted: '#898781',
  grid: '#EEF0F3',
  axis: '#CBD5E1',
  deEmphasis: '#CBD5E1',
};

export const fmt = {
  int: (v) => Math.round(v).toLocaleString('en-IN'),
  compact: (v) => {
    const a = Math.abs(v);
    if (a >= 1e7) return `${(v / 1e7).toFixed(1)}Cr`;
    if (a >= 1e5) return `${(v / 1e5).toFixed(1)}L`;
    if (a >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
    return `${Math.round(v)}`;
  },
  inr: (v) => `₹${fmt.compact(v)}`,
  inrFull: (v) => `₹${Math.round(v).toLocaleString('en-IN')}`,
  pct: (v, d = 1) => `${Number(v).toFixed(d)}%`,
  dec: (v, d = 1) => Number(v).toFixed(d),
  date: (s) => new Date(`${s}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  time: (s) => new Date(s).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  dateTime: (s) => new Date(s).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
};

export const seqColor = (t) => SEQ[Math.max(0, Math.min(SEQ.length - 1, Math.round(t * (SEQ.length - 1))))];

export const sum = (arr, key) => arr.reduce((a, r) => a + (key ? r[key] : r), 0);
export const avg = (arr, key) => (arr.length ? sum(arr, key) / arr.length : 0);
