import React, { useMemo, useState } from 'react';
import { BarChart3, Camera, MonitorPlay } from 'lucide-react';
import data from '@/data/dashboards/vigilo-ai-safety-monitoring.json';
import { BarChart, ChartCard, HBars, Heatmap, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Panel, Select, StatTile, StatusPill, delta, useLive, useRange } from '@/components/dash/ui';
import { SERIES, fmt, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const TYPE_SERIES = [
  { key: 'helmet', label: 'Missing helmet' },
  { key: 'vest', label: 'Missing vest' },
  { key: 'proximity', label: 'Forklift proximity' },
  { key: 'zone', label: 'Restricted zone' },
  { key: 'exit', label: 'Blocked exit' },
];
const SEV_TONE = { critical: 'critical', serious: 'serious', warning: 'warning' };

function CameraTile({ cam, events, tick, big, onClick }) {
  const recent = events.filter((e) => e.camera === cam.id && e.status !== 'Resolved').slice(0, 2);
  const offline = cam.status === 'Offline' || cam.disabled;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('group relative overflow-hidden rounded-lg bg-slate-800 text-left', big ? 'aspect-video' : 'aspect-[4/3]')}
    >
      {/* scene */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-slate-700" />
      <div className="absolute bottom-[40%] left-[8%] h-[30%] w-[30%] bg-slate-600/70" />
      <div className="absolute bottom-[40%] right-[10%] h-[45%] w-[22%] bg-slate-600/60" />
      {!offline && (
        <>
          <div
            className="absolute rounded-[2px] border-2 border-[#2a78d6] transition-all duration-1000"
            style={{ left: `${18 + ((tick * 3 + cam.id.length * 7) % 40)}%`, top: '36%', width: '10%', height: '42%' }}
          >
            <span className="absolute -top-3.5 left-0 rounded-[2px] bg-[#2a78d6] px-1 text-[8px] font-semibold text-white">person 0.94</span>
          </div>
          {recent.length > 0 && (
            <div className="absolute rounded-[2px] border-2 border-[#9B2C22]" style={{ left: '58%', top: '30%', width: '14%', height: '48%' }}>
              <span className="absolute -top-3.5 left-0 whitespace-nowrap rounded-[2px] bg-[#9B2C22] px-1 text-[8px] font-semibold text-white">
                {recent[0].type}
              </span>
            </div>
          )}
        </>
      )}
      {offline && <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-400">{cam.disabled ? 'Disabled' : 'No signal'}</div>}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-2 py-1 text-[10px] text-white">
        <span className="font-semibold">{cam.id} · {cam.name}</span>
        {!offline && (
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#EF4444' }} /> LIVE
          </span>
        )}
      </div>
    </button>
  );
}

export default function VigiloDashboard({ project }) {
  const [view, setView] = useState('live');
  const [range, setRange] = useState(30);
  const [live, setLive] = useState(true);
  const [zone, setZone] = useState('All zones');
  const [events, setEvents] = useState(data.events);
  const [cameras, setCameras] = useState(data.cameras);
  const [focus, setFocus] = useState(null);
  const [tick, setTick] = useState(0);
  const { cur, prev } = useRange(data.daily, range);

  // Simulated live stream: a new detection every few seconds.
  useLive(() => {
    setTick((t) => t + 1);
    if (Math.random() < 0.55) {
      const cams = cameras.filter((c) => c.status !== 'Offline' && !c.disabled);
      const cam = cams[Math.floor(Math.random() * cams.length)];
      const t = data.types[Math.floor(Math.random() * (data.types.length - 1))];
      setEvents((ev) => [
        { id: `EV-L${Date.now()}`, ts: new Date().toISOString(), type: t.type, severity: t.severity, camera: cam.id, zone: cam.zone, confidence: +(0.8 + Math.random() * 0.19).toFixed(2), status: 'Open', fresh: true },
        ...ev,
      ].slice(0, 120));
    }
  }, 3500, live);

  const inZone = (e) => zone === 'All zones' || e.zone === zone;
  const open = events.filter((e) => e.status === 'Open');
  const camsShown = cameras.filter(inZone);
  const totals = (rows) => sum(rows.map((r) => TYPE_SERIES.reduce((a, s) => a + r[s.key], 0)));
  const setStatus = (id, status) => setEvents((ev) => ev.map((e) => (e.id === id ? { ...e, status, fresh: false } : e)));

  const zoneTotals = useMemo(
    () => data.zones.map((z, i) => ({ label: z, value: sum(data.zoneHour[i]) })).sort((a, b) => b.value - a.value),
    []
  );

  const views = [
    { id: 'live', label: 'Live monitor', icon: MonitorPlay, badge: open.length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'cameras', label: 'Cameras', icon: Camera },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'analytics' ? setRange : undefined}
      live={live}
      onLive={setLive}
      filters={<Select label="Zone" value={zone} onChange={setZone} options={['All zones', ...data.zones]} />}
    >
      {view === 'live' && (
        <>
          <KpiRow>
            <StatTile label="Open alerts" value={open.filter(inZone).length} hint="Need a supervisor response" />
            <StatTile label="PPE compliance today" value={fmt.pct(data.daily.at(-1).compliance)} deltaPct={data.daily.at(-1).compliance - data.daily.at(-2).compliance} deltaUnit="pts" />
            <StatTile label="Cameras online" value={`${cameras.filter((c) => c.status !== 'Offline' && !c.disabled).length}/${cameras.length}`} />
            <StatTile label="Detections (shown)" value={events.filter(inZone).length} hint="Last 48 hours + live" />
          </KpiRow>
          <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
            <Panel title="Camera wall" subtitle="Click a feed to enlarge it">
              {focus && (
                <div className="mb-3">
                  <CameraTile cam={cameras.find((c) => c.id === focus)} events={events} tick={tick} big onClick={() => setFocus(null)} />
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {camsShown.slice(0, 9).map((c) => (
                  <CameraTile key={c.id} cam={c} events={events} tick={tick} onClick={() => setFocus(c.id === focus ? null : c.id)} />
                ))}
              </div>
            </Panel>
            <Panel title="Alert stream" subtitle={live ? 'New detections arrive automatically' : 'Paused'}>
              <ul className="max-h-[460px] space-y-2 overflow-y-auto pr-1">
                {events.filter(inZone).slice(0, 25).map((e) => (
                  <li key={e.id} className={cn('rounded-lg border p-2.5', e.fresh ? 'border-ink bg-surface-alt/60' : 'border-slate-200')}>
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusPill tone={SEV_TONE[e.severity]}>{e.type}</StatusPill>
                      <span className="text-[11px] text-slate-500">{e.camera} · {e.zone}</span>
                      <span className="ml-auto text-[11px] tabular-nums text-slate-500">{fmt.time(e.ts)}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500">Confidence {Math.round(e.confidence * 100)}%</span>
                      {e.status === 'Open' && (
                        <div className="flex gap-1.5">
                          <Btn variant="outline" onClick={() => setStatus(e.id, 'Acknowledged')}>Acknowledge</Btn>
                          <Btn onClick={() => setStatus(e.id, 'Resolved')}>Resolve</Btn>
                        </div>
                      )}
                      {e.status === 'Acknowledged' && <Btn onClick={() => setStatus(e.id, 'Resolved')}>Resolve</Btn>}
                      {e.status === 'Resolved' && <StatusPill tone="good">Resolved</StatusPill>}
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </>
      )}

      {view === 'analytics' && (
        <>
          <KpiRow>
            <StatTile label="Violations" value={fmt.int(totals(cur))} deltaPct={delta(totals(cur), totals(prev))} upIsGood={false} />
            <StatTile label="Avg PPE compliance" value={fmt.pct(sum(cur, 'compliance') / cur.length)} deltaPct={sum(cur, 'compliance') / cur.length - sum(prev, 'compliance') / Math.max(prev.length, 1)} deltaUnit="pts" />
            <StatTile label="Forklift near-misses" value={fmt.int(sum(cur, 'proximity'))} deltaPct={delta(sum(cur, 'proximity'), sum(prev, 'proximity'))} upIsGood={false} />
            <StatTile label="Blocked exits" value={fmt.int(sum(cur, 'exit'))} deltaPct={delta(sum(cur, 'exit'), sum(prev, 'exit'))} upIsGood={false} />
          </KpiRow>
          <ChartCard
            title="Violations by type"
            subtitle="Daily detections across all cameras"
            table={{ columns: ['Date', ...TYPE_SERIES.map((s) => s.label)], rows: cur.map((r) => [fmt.date(r.date), ...TYPE_SERIES.map((s) => r[s.key])]) }}
          >
            <BarChart data={cur} xKey="date" xFormat={fmt.date} series={TYPE_SERIES} format={fmt.int} />
          </ChartCard>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard
              title="PPE compliance"
              subtitle="Share of detected workers wearing required PPE"
              table={{ columns: ['Date', 'Compliance'], rows: cur.map((r) => [fmt.date(r.date), fmt.pct(r.compliance)]) }}
            >
              <LineChart data={cur} series={[{ key: 'compliance', label: 'Compliance', color: SERIES[2] }]} format={(v) => `${Math.round(v)}%`} yMax={100} threshold={{ value: 95, label: 'Target 95%' }} />
            </ChartCard>
            <ChartCard title="Violations by zone" subtitle="Whole sample period · click a zone to filter">
              <HBars items={zoneTotals} format={fmt.int} active={zone === 'All zones' ? null : zone} onClick={(z) => setZone(z === zone ? 'All zones' : z)} />
            </ChartCard>
          </div>
          <ChartCard title="When and where violations happen" subtitle="Detections by zone and hour of day (darker = more)">
            <Heatmap rows={data.zones} cols={[...Array(24).keys()]} values={data.zoneHour} colFormat={(c) => (c % 3 === 0 ? `${c}h` : '')} />
          </ChartCard>
        </>
      )}

      {view === 'cameras' && (
        <Panel title="Camera fleet" subtitle="Models run on edge devices at each site">
          <DataTable
            rows={camsShown}
            searchKeys={['id', 'name', 'zone', 'model']}
            columns={[
              { key: 'id', label: 'Camera' },
              { key: 'name', label: 'Location' },
              { key: 'zone', label: 'Zone' },
              { key: 'model', label: 'AI model' },
              { key: 'fps', label: 'FPS', align: 'right' },
              {
                key: 'status',
                label: 'Status',
                render: (c) => (c.disabled ? <StatusPill>Disabled</StatusPill> : <StatusPill tone={{ Online: 'good', Degraded: 'warning', Offline: 'critical' }[c.status]}>{c.status}</StatusPill>),
              },
              {
                key: 'act',
                label: '',
                sort: false,
                render: (c) => (
                  <Btn variant="outline" onClick={() => setCameras((cs) => cs.map((x) => (x.id === c.id ? { ...x, disabled: !x.disabled } : x)))}>
                    {c.disabled ? 'Enable' : 'Disable'}
                  </Btn>
                ),
              },
            ]}
          />
        </Panel>
      )}
    </DashShell>
  );
}
