// Chart colour roles for the portfolio dashboards.
// Categorical order is the dataviz reference palette, validated (light mode):
// all checks pass; slots 3-5 are below 3:1 contrast, so every chart ships a
// legend for >= 2 series and a table view. Used only for multi-series charts.
export const SERIES = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'];

// Reserved status colours (muted earth tones), always shown with an icon + label.
export const STATUS = {
  good: '#56603A',
  warning: '#C29331',
  serious: '#B0623A',
  critical: '#9B2C22',
};

// Sequential warm ramp (light stone -> ink), monotonic in lightness; one hue
// family, used for heatmaps and magnitude.
export const SEQ = ['#EDE7DC', '#D6D0C6', '#C3BDB4', '#B1ACA3', '#A19C93', '#918C84', '#817D75', '#726E67', '#646059', '#55514B', '#47433E', '#393630', '#2B2823'];

// Single-series mark colour: data in ink, so colour appears only where
// several series must be told apart (then SERIES, the validated palette).
export const MARK = '#3A3630';

export const INK = {
  primary: '#211F1A',
  secondary: '#686158',
  muted: '#8A837A',
  grid: '#E6E0D6',
  axis: '#BEB5A8',
  deEmphasis: '#BEB5A8',
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
