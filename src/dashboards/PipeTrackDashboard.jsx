import React, { useMemo, useState } from 'react';
import { Activity, KanbanSquare, Target } from 'lucide-react';
import data from '@/data/dashboards/pipetrack-sales-activity-tracker.json';
import { BarChart, ChartCard } from '@/components/dash/charts';
import { Btn, DashShell, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { fmt, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const ACTIVITY = [
  { key: 'calls', label: 'Calls' },
  { key: 'meetings', label: 'Meetings' },
  { key: 'demos', label: 'Demos' },
  { key: 'proposals', label: 'Proposals' },
];

export default function PipeTrackDashboard({ project }) {
  const [view, setView] = useState('pipeline');
  const [range, setRange] = useState(30);
  const [owner, setOwner] = useState('Whole team');
  const [deals, setDeals] = useState(data.deals);
  const [expanded, setExpanded] = useState({});
  const { cur, prev } = useRange(data.daily, range);

  const mine = (d) => owner === 'Whole team' || d.owner === owner;
  const open = deals.filter((d) => mine(d) && d.stage !== 'Won');
  const weighted = sum(open.map((d) => (d.value * d.probability) / 100));
  const move = (id, dir) =>
    setDeals((ds) =>
      ds.map((d) => {
        if (d.id !== id) return d;
        const i = Math.min(data.stages.length - 1, Math.max(0, data.stages.indexOf(d.stage) + dir));
        return { ...d, stage: data.stages[i], probability: [10, 25, 40, 60, 80, 100][i] };
      })
    );
  const overdue = (d) => d.due < '2026-10-05' && d.stage !== 'Won';
  const reps = useMemo(() => [...data.reps].sort((a, b) => b.achieved / b.target - a.achieved / a.target), []);

  const views = [
    { id: 'pipeline', label: 'Pipeline', icon: KanbanSquare, badge: deals.filter((d) => mine(d) && overdue(d)).length },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'targets', label: 'Targets', icon: Target },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'activity' ? setRange : undefined}
      filters={view === 'pipeline' ? <Select label="Owner" value={owner} onChange={setOwner} options={['Whole team', ...data.reps.map((r) => r.name)]} /> : null}
    >
      {view === 'pipeline' && (
        <>
          <KpiRow>
            <StatTile label="Open pipeline" value={fmt.inr(sum(open, 'value'))} hint={`${open.length} open deals`} />
            <StatTile label="Weighted forecast" value={fmt.inr(weighted)} hint="Value × stage probability" />
            <StatTile label="Won" value={fmt.inr(sum(deals.filter((d) => mine(d) && d.stage === 'Won'), 'value'))} />
            <StatTile label="Overdue next steps" value={deals.filter((d) => mine(d) && overdue(d)).length} />
          </KpiRow>
          <div className="overflow-x-auto pb-1">
            <div className="grid min-w-[1080px] grid-cols-6 gap-2">
              {data.stages.map((stage) => {
                const col = deals.filter((d) => mine(d) && d.stage === stage);
                return (
                  <div key={stage} className="rounded-xl bg-slate-100/70 p-2">
                    <div className="mb-2 px-1">
                      <div className="text-xs font-semibold text-slate-800">{stage}</div>
                      <div className="text-[11px] text-slate-500">{col.length} · {fmt.inr(sum(col, 'value'))}</div>
                    </div>
                    <div className="space-y-2">
                      {(expanded[stage] ? col : col.slice(0, 5)).map((d) => (
                        <div key={d.id} className={cn('rounded-lg border bg-white p-2 text-[11px]', overdue(d) ? 'border-[#fab219]' : 'border-slate-200')}>
                          <div className="font-semibold text-slate-900">{d.company}</div>
                          <div className="text-slate-500">{fmt.inr(d.value)} · {d.owner.split(' ')[0]}</div>
                          <div className="mt-1 text-slate-600">Next: {d.nextStep}</div>
                          <div className="mt-1">{overdue(d) ? <StatusPill tone="warning">Due {fmt.date(d.due)}</StatusPill> : <span className="text-slate-400">Due {fmt.date(d.due)}</span>}</div>
                          <div className="mt-1.5 flex gap-1">
                            {stage !== 'Lead' && <Btn variant="ghost" onClick={() => move(d.id, -1)}>←</Btn>}
                            {stage !== 'Won' && <Btn variant="outline" onClick={() => move(d.id, 1)}>Advance →</Btn>}
                          </div>
                        </div>
                      ))}
                      {col.length > 5 && (
                        <button type="button" onClick={() => setExpanded((x) => ({ ...x, [stage]: !x[stage] }))} className="w-full rounded-md py-1 text-[11px] font-medium text-slate-600 hover:bg-white">
                          {expanded[stage] ? 'Show less' : `+${col.length - 5} more`}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {view === 'activity' && (
        <>
          <KpiRow>
            {ACTIVITY.map((a) => (
              <StatTile key={a.key} label={a.label} value={fmt.int(sum(cur, a.key))} deltaPct={delta(sum(cur, a.key), sum(prev, a.key))} />
            ))}
          </KpiRow>
          <ChartCard
            title="Team activity per day"
            subtitle="Logged from web and the mobile app"
            table={{ columns: ['Date', ...ACTIVITY.map((a) => a.label)], rows: cur.map((d) => [fmt.date(d.date), ...ACTIVITY.map((a) => d[a.key])]) }}
          >
            <BarChart data={cur} xKey="date" xFormat={fmt.date} series={ACTIVITY.slice(1)} format={fmt.int} />
          </ChartCard>
          <ChartCard title="Calls per day" subtitle="Shown separately; calls are on a much larger scale" table={{ columns: ['Date', 'Calls'], rows: cur.map((d) => [fmt.date(d.date), d.calls]) }}>
            <BarChart data={cur} xKey="date" xFormat={fmt.date} series={[{ key: 'calls', label: 'Calls' }]} format={fmt.int} height={150} />
          </ChartCard>
        </>
      )}

      {view === 'targets' && (
        <Panel title="Quarter targets" subtitle="Closed revenue against each rep's target">
          <ul className="divide-y divide-slate-100">
            {reps.map((r) => {
              const pct = (r.achieved / r.target) * 100;
              return (
                <li key={r.name} className="grid items-center gap-3 py-3 md:grid-cols-[180px_1fr_260px]">
                  <div className="text-sm font-semibold text-slate-900">{r.name}</div>
                  <Meter value={r.achieved} max={r.target} right={`${fmt.inr(r.achieved)} / ${fmt.inr(r.target)} · ${pct.toFixed(0)}%`} tone={pct >= 100 ? 'good' : pct < 50 ? 'critical' : undefined} />
                  <div className="flex gap-3 text-[11px] text-slate-500">
                    <span>{r.calls} calls</span>
                    <span>{r.meetings} meetings</span>
                    <span>{r.demos} demos</span>
                    <span>{r.proposals} proposals</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      )}
    </DashShell>
  );
}
