import React, { useState } from 'react';
import { CalendarHeart, Gauge, LayoutDashboard, Repeat } from 'lucide-react';
import data from '@/data/dashboards/rangoli-rush-puzzle-game.json';
import { BarChart, ChartCard, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, Field, KpiRow, Panel, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { SERIES, fmt, seqColor, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const REVENUE = [
  { key: 'iapRevenue', label: 'In-app purchases' },
  { key: 'adRevenue', label: 'Rewarded ads' },
];

export default function RangoliRushDashboard({ project }) {
  const [view, setView] = useState('overview');
  const [range, setRange] = useState(30);
  const [levels, setLevels] = useState(data.levels);
  const [selLevel, setSelLevel] = useState(12);
  const [events, setEvents] = useState(data.events);
  const { cur, prev } = useRange(data.daily, range);

  const rev = sum(cur, 'iapRevenue') + sum(cur, 'adRevenue');
  const prevRev = sum(prev, 'iapRevenue') + sum(prev, 'adRevenue');
  const lv = levels.find((l) => l.level === selLevel);
  const prevLv = levels.find((l) => l.level === selLevel - 1);
  const dropOff = prevLv ? (1 - lv.players / prevLv.players) * 100 : 0;
  const hard = levels.filter((l) => l.winRate < 0.5);

  const views = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'retention', label: 'Retention', icon: Repeat },
    { id: 'levels', label: 'Level balance', icon: Gauge, badge: hard.filter((l) => !l.rebalanced).length },
    { id: 'events', label: 'Live events', icon: CalendarHeart },
  ];

  return (
    <DashShell name={project.name} accent={project.accent} views={views} view={view} onView={setView} range={range} onRange={view === 'overview' ? setRange : undefined}>
      {view === 'overview' && (
        <>
          <KpiRow>
            <StatTile label="Daily active players" value={fmt.compact(data.daily.at(-1).dau)} deltaPct={delta(data.daily.at(-1).dau, data.daily.at(-8).dau)} hint="vs same day last week" spark={cur.slice(-14).map((d) => d.dau)} />
            <StatTile label="Installs" value={fmt.compact(sum(cur, 'installs'))} deltaPct={delta(sum(cur, 'installs'), sum(prev, 'installs'))} />
            <StatTile label="Revenue" value={fmt.inr(rev)} deltaPct={delta(rev, prevRev)} />
            <StatTile label="Revenue per daily player" value={`₹${(rev / sum(cur, 'dau')).toFixed(2)}`} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Daily active players" subtitle="Festival events drive the spikes" table={{ columns: ['Date', 'DAU', 'Installs'], rows: cur.map((d) => [fmt.date(d.date), d.dau, d.installs]) }}>
              <LineChart data={cur} series={[{ key: 'dau', label: 'Daily active players' }]} format={fmt.compact} area />
            </ChartCard>
            <ChartCard title="Revenue by source" table={{ columns: ['Date', ...REVENUE.map((r) => r.label)], rows: cur.map((d) => [fmt.date(d.date), fmt.inrFull(d.iapRevenue), fmt.inrFull(d.adRevenue)]) }}>
              <BarChart data={cur} xKey="date" xFormat={fmt.date} series={REVENUE} format={fmt.inr} />
            </ChartCard>
          </div>
        </>
      )}

      {view === 'retention' && (
        <ChartCard title="Weekly retention cohorts" subtitle="% of each install week still playing N weeks later · darker = better" table={{ columns: ['Cohort', 'Users', ...[0, 1, 2, 3, 4, 5, 6, 7].map((w) => `W${w}`)], rows: data.cohorts.map((c) => [fmt.date(c.cohort), fmt.int(c.users), ...c.retention.map((r) => `${r}%`)]) }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-1 text-xs">
              <thead>
                <tr className="text-slate-500">
                  <th className="text-left font-medium">Install week</th>
                  <th className="text-right font-medium">Users</th>
                  {[...Array(8).keys()].map((w) => <th key={w} className="font-medium">Week {w}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.cohorts.map((c) => (
                  <tr key={c.cohort}>
                    <td className="whitespace-nowrap pr-2 text-slate-700">{fmt.date(c.cohort)}</td>
                    <td className="pr-2 text-right tabular-nums text-slate-500">{fmt.compact(c.users)}</td>
                    {[...Array(8).keys()].map((w) => {
                      const v = c.retention[w];
                      return (
                        <td key={w} className="h-8 rounded-[3px] text-center tabular-nums" style={{ background: v != null ? seqColor(w === 0 ? 1 : v / 50) : 'transparent', color: v != null && (w === 0 || v > 25) ? '#fff' : '#0F172A' }}>
                          {v != null ? `${Math.round(v)}%` : ''}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      )}

      {view === 'levels' && (
        <>
          <ChartCard title="Players reaching each level" subtitle="Click a level to inspect it · steep drops mark difficulty spikes" table={{ columns: ['Level', 'Players', 'Win rate'], rows: levels.map((l) => [l.level, fmt.int(l.players), fmt.pct(l.winRate * 100, 0)]) }}>
            <BarChart data={levels} xKey="level" series={[{ key: 'players', label: 'Players', color: SERIES[0] }]} format={fmt.compact} xFormat={(v) => `L${v}`} onBarClick={(v) => setSelLevel(v)} activeX={selLevel} />
          </ChartCard>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
            <Panel title={`Level ${lv.level}`} actions={lv.winRate < 0.5 ? <StatusPill tone="critical">Too hard</StatusPill> : <StatusPill tone="good">Balanced</StatusPill>}>
              <Field label="Players reached">{fmt.int(lv.players)}</Field>
              <Field label="Drop-off from previous level">{fmt.pct(dropOff)}</Field>
              <Field label="Win rate">{fmt.pct(lv.winRate * 100, 0)}</Field>
              <Field label="Average attempts">{lv.avgAttempts}</Field>
              <Field label="Booster use">{fmt.pct(lv.boosterUse * 100, 0)}</Field>
              <div className="mt-4">
                {lv.rebalanced ? (
                  <StatusPill tone="good">Rebalance queued for next build</StatusPill>
                ) : (
                  <Btn size="md" onClick={() => setLevels((ls) => ls.map((l) => (l.level === lv.level ? { ...l, rebalanced: true } : l)))} disabled={lv.winRate >= 0.5}>Queue rebalance (+5 moves)</Btn>
                )}
              </div>
            </Panel>
            <Panel title="Difficulty spikes" subtitle="Levels with win rate under 50%">
              <ul className="space-y-2">
                {hard.map((l) => (
                  <li key={l.level}>
                    <button type="button" onClick={() => setSelLevel(l.level)} className={cn('flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm', selLevel === l.level ? 'border-slate-900' : 'border-slate-200 hover:bg-slate-50')}>
                      <span className="font-semibold text-slate-900">Level {l.level}</span>
                      <span className="text-xs text-slate-500">win {Math.round(l.winRate * 100)}% · {l.avgAttempts} attempts</span>
                      {l.rebalanced ? <StatusPill tone="good">Queued</StatusPill> : <StatusPill tone="critical">Review</StatusPill>}
                    </button>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </>
      )}

      {view === 'events' && (
        <Panel title="Festival events" subtitle="Seasonal content drops that bring players back">
          <div className="grid gap-3 md:grid-cols-3">
            {events.map((e) => (
              <div key={e.name} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-900">{e.name}</div>
                  <StatusPill tone={{ Live: 'good', Ended: 'neutral', Scheduled: 'warning', Paused: 'warning' }[e.status]}>{e.status}</StatusPill>
                </div>
                <div className="mt-1 text-xs text-slate-500">Starts {fmt.date(e.start)}</div>
                <div className="mt-3 text-2xl font-semibold text-slate-900">{e.participants ? fmt.compact(e.participants) : '—'}</div>
                <div className="text-xs text-slate-500">participants</div>
                {['Live', 'Paused'].includes(e.status) && (
                  <Btn className="mt-3" variant="outline" onClick={() => setEvents((es) => es.map((x) => (x.name === e.name ? { ...x, status: x.status === 'Live' ? 'Paused' : 'Live' } : x)))}>
                    {e.status === 'Live' ? 'Pause event' : 'Resume event'}
                  </Btn>
                )}
                {e.status === 'Scheduled' && (
                  <Btn className="mt-3" onClick={() => setEvents((es) => es.map((x) => (x.name === e.name ? { ...x, status: 'Live', start: '2026-10-05' } : x)))}>Launch now</Btn>
                )}
              </div>
            ))}
          </div>
        </Panel>
      )}
    </DashShell>
  );
}
