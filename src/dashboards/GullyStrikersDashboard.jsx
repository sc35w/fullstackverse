import React, { useState } from 'react';
import { Radio, ShieldAlert, Swords, Trophy } from 'lucide-react';
import data from '@/data/dashboards/gully-strikers-cricket-game.json';
import { BarChart, ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Panel, StatTile, StatusPill, delta, useLive, useRange } from '@/components/dash/ui';
import { SERIES, fmt, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const rnd = (n) => Math.floor(Math.random() * n);
const newMatch = (id) => {
  const [a, b] = [rnd(data.teams.length), rnd(data.teams.length)];
  return { id, home: data.teams[a], away: data.teams[(b === a ? b + 1 : b) % data.teams.length], runs: [rnd(8), 0], balls: 0, city: ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Bengaluru'][rnd(5)] };
};

export default function GullyStrikersDashboard({ project }) {
  const [view, setView] = useState('live');
  const [range, setRange] = useState(30);
  const [live, setLive] = useState(true);
  const [matches, setMatches] = useState(() => [...Array(6)].map((_, i) => ({ ...newMatch(i), balls: rnd(12), runs: [rnd(30), rnd(20)] })));
  const [ccuNow, setCcuNow] = useState(data.ccu[21].value);
  const [flags, setFlags] = useState(data.flags);
  const { cur, prev } = useRange(data.daily, range);

  useLive(() => {
    setCcuNow((c) => Math.max(3000, Math.round(c + (Math.random() - 0.48) * 400)));
    setMatches((ms) =>
      ms.map((m) => {
        if (m.balls >= 24) return newMatch(m.id + 100);
        const shot = [0, 1, 1, 2, 4, 6, 0, 1][rnd(8)];
        const inn = m.balls < 12 ? 0 : 1;
        const runs = [...m.runs];
        runs[inn] += shot;
        return { ...m, balls: m.balls + 1, runs, last: shot };
      })
    );
  }, 1500, live);

  const decide = (id, status) => setFlags((fs) => fs.map((f) => (f.id === id ? { ...f, status } : f)));
  const openFlags = flags.filter((f) => f.status === 'Open');

  const views = [
    { id: 'live', label: 'Live ops', icon: Radio },
    { id: 'matchmaking', label: 'Matchmaking', icon: Swords },
    { id: 'league', label: 'City league', icon: Trophy },
    { id: 'anticheat', label: 'Anti-cheat', icon: ShieldAlert, badge: openFlags.length },
  ];

  return (
    <DashShell name={project.name} accent={project.accent} views={views} view={view} onView={setView} range={range} onRange={view === 'matchmaking' ? setRange : undefined} live={live} onLive={view === 'live' ? setLive : undefined}>
      {view === 'live' && (
        <>
          <KpiRow>
            <StatTile label="Players online now" value={fmt.int(ccuNow)} hint="Updates live" />
            <StatTile label="Matches today" value={fmt.compact(data.daily.at(-1).matches)} />
            <StatTile label="Daily active players" value={fmt.compact(data.daily.at(-1).dau)} deltaPct={delta(data.daily.at(-1).dau, data.daily.at(-8).dau)} hint="vs same day last week" />
            <StatTile label="Avg queue time" value={`${data.daily.at(-1).avgWait.toFixed(1)} s`} />
          </KpiRow>
          <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
            <Panel title="Matches in progress" subtitle={live ? 'Two-over matches, ball by ball' : 'Paused'}>
              <div className="grid gap-2 sm:grid-cols-2">
                {matches.map((m) => {
                  const inn = m.balls < 12 ? 0 : 1;
                  const over = `${Math.floor((m.balls % 12) / 6)}.${(m.balls % 12) % 6}`;
                  return (
                    <div key={m.id} className="rounded-lg border border-slate-200 p-3 text-xs">
                      <div className="flex justify-between text-slate-500"><span>{m.city}</span><span>{inn === 0 ? '1st innings' : '2nd innings'} · {over} ov</span></div>
                      <div className={cn('mt-1.5 flex justify-between', inn === 0 && 'font-semibold text-slate-900')}><span className="truncate">{m.home}</span><span className="tabular-nums">{m.runs[0]}</span></div>
                      <div className={cn('flex justify-between', inn === 1 && 'font-semibold text-slate-900')}><span className="truncate">{m.away}</span><span className="tabular-nums">{inn === 1 ? m.runs[1] : '—'}</span></div>
                      {m.last != null && (
                        <div className="mt-1.5">
                          {m.last >= 4 ? <StatusPill tone="good">{m.last === 6 ? 'SIX!' : 'FOUR'}</StatusPill> : <span className="text-slate-400">last ball: {m.last === 0 ? 'dot' : `${m.last} run${m.last > 1 ? 's' : ''}`}</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Panel>
            <ChartCard title="Players online by hour" subtitle="Typical day · evening prime time" table={{ columns: ['Hour', 'Players'], rows: data.ccu.map((h) => [h.label, h.value]) }}>
              <BarChart data={data.ccu} series={[{ key: 'value', label: 'Players online' }]} format={fmt.compact} xFormat={(v) => v.slice(0, 2)} />
            </ChartCard>
          </div>
        </>
      )}

      {view === 'matchmaking' && (
        <>
          <KpiRow>
            <StatTile label="Matches played" value={fmt.compact(sum(cur, 'matches'))} deltaPct={delta(sum(cur, 'matches'), sum(prev, 'matches'))} spark={cur.slice(-14).map((d) => d.matches)} />
            <StatTile label="Average queue time" value={`${(sum(cur, 'avgWait') / cur.length).toFixed(1)} s`} deltaPct={delta(sum(cur, 'avgWait'), sum(prev, 'avgWait'))} upIsGood={false} />
            <StatTile label="Matches per player" value={(sum(cur, 'matches') / sum(cur, 'dau')).toFixed(2)} />
            <StatTile label="Regions" value={data.regions.length} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <ChartCard title="Average time to find a match" subtitle="Skill-based matchmaking keeps games close" table={{ columns: ['Date', 'Seconds'], rows: cur.map((d) => [fmt.date(d.date), d.avgWait]) }}>
              <LineChart data={cur} series={[{ key: 'avgWait', label: 'Queue time (s)', color: SERIES[1] }]} format={(v) => `${v.toFixed(0)}s`} threshold={{ value: 15, label: 'Target < 15 s' }} />
            </ChartCard>
            <ChartCard title="Players by city">
              <HBars items={data.regions} format={fmt.compact} />
            </ChartCard>
          </div>
        </>
      )}

      {view === 'league' && (
        <Panel title="Season 4 · City league table">
          <DataTable
            rows={data.league.map((t, i) => ({ ...t, pos: i + 1 }))}
            rowKey="team"
            pageSize={10}
            columns={[
              { key: 'pos', label: '#', align: 'right' },
              { key: 'team', label: 'Team', render: (t) => <span className={t.pos <= 4 ? 'font-semibold text-slate-900' : ''}>{t.team}</span> },
              { key: 'played', label: 'P', align: 'right' },
              { key: 'won', label: 'W', align: 'right' },
              { key: 'lost', label: 'L', align: 'right' },
              { key: 'nrr', label: 'NRR', align: 'right', render: (t) => (t.nrr > 0 ? `+${t.nrr.toFixed(2)}` : t.nrr.toFixed(2)) },
              { key: 'points', label: 'Pts', align: 'right', render: (t) => <b>{t.points}</b> },
              { key: 'q', label: '', sort: false, render: (t) => t.pos <= 4 && <StatusPill tone="good">Playoffs</StatusPill> },
            ]}
          />
        </Panel>
      )}

      {view === 'anticheat' && (
        <Panel title="Suspicious accounts" subtitle="Server-side checks flag impossible play; a reviewer decides">
          <ul className="divide-y divide-slate-100">
            {flags.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center gap-3 py-2.5">
                <StatusPill tone={f.confidence >= 85 ? 'critical' : 'serious'}>{f.confidence}% confidence</StatusPill>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900">{f.player}</div>
                  <div className="text-xs text-slate-500">{f.signal} · {f.matches} matches · {fmt.dateTime(f.ts)}</div>
                </div>
                {f.status === 'Open' ? (
                  <div className="flex gap-1.5">
                    <Btn variant="outline" onClick={() => decide(f.id, 'Cleared')}>Clear</Btn>
                    <Btn variant="danger" onClick={() => decide(f.id, 'Banned')}>Ban & reset scores</Btn>
                  </div>
                ) : (
                  <StatusPill tone={f.status === 'Banned' ? 'critical' : 'good'}>{f.status}</StatusPill>
                )}
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </DashShell>
  );
}
