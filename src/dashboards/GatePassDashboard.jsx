import React, { useState } from 'react';
import { BarChart3, DoorOpen, UserCheck } from 'lucide-react';
import data from '@/data/dashboards/gatepass-visitor-management.json';
import { BarChart, ChartCard, Heatmap } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Panel, StatTile, StatusPill, delta, useLive, useRange } from '@/components/dash/ui';
import { fmt, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const TYPE_SERIES = [
  { key: 'delivery', label: 'Delivery' },
  { key: 'guest', label: 'Guest' },
  { key: 'staff', label: 'Domestic staff' },
  { key: 'cab', label: 'Cab' },
  { key: 'service', label: 'Service' },
];
const NAMES = ['Swiggy', 'Zomato', 'Amazon', 'Blinkit', 'Urban Company'];

export default function GatePassDashboard({ project }) {
  const [view, setView] = useState('gate');
  const [range, setRange] = useState(30);
  const [live, setLive] = useState(true);
  const [log, setLog] = useState(data.log);
  const [pending, setPending] = useState(data.pending);
  const [form, setForm] = useState({ name: '', type: 'Guest', flat: '' });
  const { cur, prev } = useRange(data.daily, range);

  useLive(() => {
    setPending((p) => p.map((x) => ({ ...x, waiting: x.waiting + 5 })));
    if (Math.random() < 0.35) {
      setPending((p) => [...p, { id: `REQ-${Date.now()}`, name: NAMES[Math.floor(Math.random() * NAMES.length)], type: 'Delivery', flat: `${'ABCD'[Math.floor(Math.random() * 4)]}-${1 + Math.floor(Math.random() * 18)}0${1 + Math.floor(Math.random() * 4)}`, waiting: 0, fresh: true }]);
    }
  }, 5000, live);

  const decide = (req, approved) => {
    setPending((p) => p.filter((x) => x.id !== req.id));
    if (approved) setLog((l) => [{ id: `GP-${Date.now()}`, name: req.name, type: req.type, flat: req.flat, in: new Date().toISOString(), out: null, approvedBy: 'Resident app', gate: 'Main gate', fresh: true }, ...l]);
  };
  const checkIn = (e) => {
    e.preventDefault();
    if (!form.name || !form.flat) return;
    setPending((p) => [...p, { id: `REQ-${Date.now()}`, name: form.name, type: form.type, flat: form.flat.toUpperCase(), waiting: 0, fresh: true }]);
    setForm({ name: '', type: 'Guest', flat: '' });
  };
  const total = (rows) => sum(rows.map((r) => TYPE_SERIES.reduce((a, s) => a + r[s.key], 0)));
  const inside = log.filter((l) => !l.out);

  const views = [
    { id: 'gate', label: 'Gate console', icon: DoorOpen, badge: pending.length },
    { id: 'footfall', label: 'Footfall', icon: BarChart3 },
    { id: 'staff', label: 'Staff attendance', icon: UserCheck },
  ];

  return (
    <DashShell name={project.name} accent={project.accent} views={views} view={view} onView={setView} range={range} onRange={view === 'footfall' ? setRange : undefined} live={live} onLive={view === 'gate' ? setLive : undefined}>
      {view === 'gate' && (
        <>
          <KpiRow>
            <StatTile label="Waiting at gate" value={pending.length} hint="Resident approval requested" />
            <StatTile label="Inside right now" value={inside.length} />
            <StatTile label="Entries today" value={data.daily.at(-1).delivery + data.daily.at(-1).guest + data.daily.at(-1).cab + log.filter((l) => l.fresh).length} />
            <StatTile label="Pre-approved passes" value={log.filter((l) => l.approvedBy === 'Pre-approved pass').length} hint="No call to the flat needed" />
          </KpiRow>
          <div className="grid gap-4 xl:grid-cols-[1fr_1.3fr]">
            <div className="space-y-4">
              <Panel title="New check-in" subtitle="The resident gets an approve/deny notification">
                <form onSubmit={checkIn} className="grid grid-cols-[1fr_96px] gap-2 sm:grid-cols-[1fr_1fr_96px]">
                  <input className="nb-input col-span-2 text-sm sm:col-span-3" placeholder="Visitor name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <select className="nb-input text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {['Guest', 'Delivery', 'Service', 'Cab'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <input className="nb-input text-sm" placeholder="Flat" value={form.flat} onChange={(e) => setForm({ ...form, flat: e.target.value })} />
                  <Btn type="submit" size="md" className="col-span-2 sm:col-span-1">Notify resident</Btn>
                </form>
              </Panel>
              <Panel title="Waiting for approval" subtitle={live ? 'Waiting time updates live' : 'Paused'}>
                {pending.length === 0 && <p className="py-6 text-center text-sm text-slate-500">No one waiting.</p>}
                <ul className="space-y-2">
                  {pending.map((p) => (
                    <li key={p.id} className={cn('flex flex-wrap items-center gap-2 rounded-lg border p-2.5', p.fresh ? 'border-[#2a78d6]/40 bg-blue-50/40' : 'border-slate-200')}>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.type} · Flat {p.flat}</div>
                      </div>
                      <StatusPill tone={p.waiting > 120 ? 'critical' : p.waiting > 45 ? 'warning' : 'neutral'}>{p.waiting < 60 ? `${p.waiting}s` : `${Math.floor(p.waiting / 60)}m ${p.waiting % 60}s`}</StatusPill>
                      <Btn variant="danger" onClick={() => decide(p, false)}>Deny</Btn>
                      <Btn onClick={() => decide(p, true)}>Approve entry</Btn>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
            <Panel title="Gate log" subtitle="Every entry with time, flat and approver">
              <DataTable
                rows={log}
                searchKeys={['name', 'flat', 'type']}
                pageSize={10}
                columns={[
                  { key: 'in', label: 'In', render: (l) => fmt.time(l.in) },
                  { key: 'name', label: 'Visitor', render: (l) => <span className={l.fresh ? 'font-semibold text-slate-900' : ''}>{l.name}</span> },
                  { key: 'type', label: 'Type' },
                  { key: 'flat', label: 'Flat' },
                  { key: 'approvedBy', label: 'Approved via' },
                  {
                    key: 'out',
                    label: 'Status',
                    render: (l) => (l.out ? <StatusPill>Exited</StatusPill> : <Btn variant="outline" onClick={() => setLog((ls) => ls.map((x) => (x.id === l.id ? { ...x, out: 'done' } : x)))}>Mark exit</Btn>),
                  },
                ]}
              />
            </Panel>
          </div>
        </>
      )}

      {view === 'footfall' && (
        <>
          <KpiRow>
            <StatTile label="Total entries" value={fmt.int(total(cur))} deltaPct={delta(total(cur), total(prev))} />
            <StatTile label="Deliveries" value={fmt.int(sum(cur, 'delivery'))} deltaPct={delta(sum(cur, 'delivery'), sum(prev, 'delivery'))} />
            <StatTile label="Guests" value={fmt.int(sum(cur, 'guest'))} deltaPct={delta(sum(cur, 'guest'), sum(prev, 'guest'))} />
            <StatTile label="Average per day" value={fmt.int(total(cur) / cur.length)} />
          </KpiRow>
          <ChartCard title="Entries by visitor type" table={{ columns: ['Date', ...TYPE_SERIES.map((s) => s.label)], rows: cur.map((d) => [fmt.date(d.date), ...TYPE_SERIES.map((s) => d[s.key])]) }}>
            <BarChart data={cur} xKey="date" xFormat={fmt.date} series={TYPE_SERIES} format={fmt.int} />
          </ChartCard>
          <ChartCard title="Busy hours at the gate" subtitle="Average entries by weekday and hour · plan guard shifts around the peaks">
            <Heatmap rows={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} cols={[...Array(24).keys()]} values={data.heat} colFormat={(c) => (c % 3 === 0 ? `${c}h` : '')} />
          </ChartCard>
        </>
      )}

      {view === 'staff' && (
        <Panel title="Domestic staff attendance" subtitle="Last 4 weeks · green = present">
          <div className="space-y-2">
            {data.staff.map((s) => {
              const present = s.attendance.filter(Boolean).length;
              return (
                <div key={s.id} className="grid items-center gap-2 md:grid-cols-[200px_1fr_90px]">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.role} · {s.flats} flats</div>
                  </div>
                  <div className="flex gap-[3px]">
                    {s.attendance.map((a, i) => (
                      <span key={i} title={a ? 'Present' : 'Absent'} className="h-4 flex-1 rounded-[2px]" style={{ background: a ? '#0ca30c' : '#E2E8F0' }} />
                    ))}
                  </div>
                  <div className="text-right text-xs font-semibold tabular-nums text-slate-700">{Math.round((present / s.attendance.length) * 100)}%</div>
                </div>
              );
            })}
          </div>
        </Panel>
      )}
    </DashShell>
  );
}
