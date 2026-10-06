import React, { useState } from 'react';
import { BellRing, Map, Pause, Play, Radio } from 'lucide-react';
import data from '@/data/dashboards/floodwatch-rainfall-monitoring-dashboard.json';
import { BarChart, ChartCard, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Panel, StatTile, StatusPill, useLive } from '@/components/dash/ui';
import { SERIES, STATUS } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const levelOf = (s, v) => (v >= s.danger ? 'Danger' : v >= s.warning ? 'Warning' : 'Normal');
const TONE = { Danger: 'critical', Warning: 'warning', Normal: 'good', Offline: 'neutral' };
const COLOR = { Danger: STATUS.critical, Warning: STATUS.warning, Normal: STATUS.good, Offline: '#94A3B8' };
const hourLabel = (iso) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit' });

export default function FloodWatchDashboard({ project }) {
  const [view, setView] = useState('map');
  const [hour, setHour] = useState(data.hours.length - 1);
  const [playing, setPlaying] = useState(false);
  const [selId, setSelId] = useState(data.stations[0].id);
  const [acked, setAcked] = useState({});

  useLive(() => setHour((h) => (h >= data.hours.length - 1 ? 0 : h + 1)), 700, playing);

  const status = (s) => (s.online ? levelOf(s, data.readings[s.id][hour]) : 'Offline');
  const sel = data.stations.find((s) => s.id === selId);
  const series = data.hours.map((h, i) => ({ date: h, level: data.readings[sel.id][i], rain: data.rain[sel.id][i] }));
  const alerts = data.alerts.filter((a) => a.hour <= hour);
  const counts = data.stations.reduce((acc, s) => ({ ...acc, [status(s)]: (acc[status(s)] || 0) + 1 }), {});

  const views = [
    { id: 'map', label: 'Live map', icon: Map },
    { id: 'alerts', label: 'Alerts', icon: BellRing, badge: alerts.filter((a) => !acked[a.id]).length },
    { id: 'stations', label: 'Stations', icon: Radio, badge: data.stations.filter((s) => !s.online).length },
  ];

  const timeControl = (
    <div className="flex min-w-[260px] flex-1 items-center gap-2">
      <Btn variant="outline" onClick={() => setPlaying((p) => !p)}>
        {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        {playing ? 'Pause' : 'Replay 48 h'}
      </Btn>
      <input type="range" min="0" max={data.hours.length - 1} value={hour} onChange={(e) => { setPlaying(false); setHour(+e.target.value); }} className="flex-1 accent-slate-900" aria-label="Time" />
      <span className="w-28 text-right text-xs font-semibold tabular-nums text-slate-700">{hourLabel(data.hours[hour])}</span>
    </div>
  );

  return (
    <DashShell name={project.name} accent={project.accent} views={views} view={view} onView={setView} filters={timeControl}>
      {view === 'map' && (
        <>
          <KpiRow>
            <StatTile label="Stations at danger level" value={counts.Danger || 0} />
            <StatTile label="At warning level" value={counts.Warning || 0} />
            <StatTile label="Normal" value={counts.Normal || 0} />
            <StatTile label="Offline stations" value={counts.Offline || 0} hint="Maintenance team alerted" />
          </KpiRow>
          <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
            <Panel title="River and rain gauges · Cauvery basin" subtitle="Drag the time slider or replay the last 48 hours; click a station for details">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#EEF4EA]">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <path d="M5 20 C 25 30, 30 50, 50 52 S 75 70, 95 85" fill="none" stroke="#9EC5F4" strokeWidth="2.2" />
                  <path d="M20 90 C 30 70, 40 62, 50 52" fill="none" stroke="#9EC5F4" strokeWidth="1.4" />
                  <path d="M80 10 C 70 30, 62 40, 50 52" fill="none" stroke="#9EC5F4" strokeWidth="1.4" />
                </svg>
                {data.stations.map((s) => {
                  const st = status(s);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelId(s.id)}
                      title={`${s.name}: ${st}`}
                      className={cn('absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1', selId === s.id && 'z-10')}
                      style={{ left: `${5 + s.x * 90}%`, top: `${5 + s.y * 90}%` }}
                    >
                      <span className={cn('block rounded-full border-2 border-white shadow transition-colors', selId === s.id ? 'h-5 w-5 ring-2 ring-slate-900' : 'h-4 w-4')} style={{ background: COLOR[st] }} />
                      {(selId === s.id || st === 'Danger') && <span className="whitespace-nowrap rounded bg-white/90 px-1 text-[10px] font-semibold text-slate-800 shadow-sm">{s.name}</span>}
                    </button>
                  );
                })}
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-2 rounded-md bg-white/90 px-2 py-1 text-[10px] text-slate-600">
                  {Object.keys(COLOR).map((k) => (
                    <span key={k} className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: COLOR[k] }} />{k}</span>
                  ))}
                </div>
              </div>
            </Panel>
            <div className="space-y-4">
              <Panel title={sel.name} subtitle={`${sel.kind} · warning ${sel.warning} m · danger ${sel.danger} m`} actions={<StatusPill tone={TONE[status(sel)]}>{status(sel)}</StatusPill>}>
                <div className="mb-3 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg bg-slate-50 p-2"><div className="text-xl font-semibold">{sel.online ? `${data.readings[sel.id][hour].toFixed(2)} m` : '—'}</div><div className="text-xs text-slate-500">Water level</div></div>
                  <div className="rounded-lg bg-slate-50 p-2"><div className="text-xl font-semibold">{sel.online ? `${data.rain[sel.id][hour].toFixed(1)} mm` : '—'}</div><div className="text-xs text-slate-500">Rain this hour</div></div>
                </div>
                <LineChart
                  data={series}
                  series={[{ key: 'level', label: 'Water level (m)' }]}
                  format={(v) => `${v.toFixed(0)}m`}
                  xFormat={(v) => new Date(v).toLocaleTimeString('en-IN', { hour: '2-digit' })}
                  threshold={[{ value: sel.danger, label: 'Danger', color: STATUS.critical }, { value: sel.warning, label: 'Warning', color: '#B54708' }]}
                  marker={hour}
                  height={170}
                />
              </Panel>
              <ChartCard title="Hourly rainfall" table={{ columns: ['Hour', 'Rain (mm)'], rows: series.map((d) => [hourLabel(d.date), d.rain]) }}>
                <BarChart data={series} xKey="date" series={[{ key: 'rain', label: 'Rain (mm)', color: SERIES[0] }]} format={(v) => `${v.toFixed(0)}`} xFormat={(v) => new Date(v).toLocaleTimeString('en-IN', { hour: '2-digit' })} height={130} />
              </ChartCard>
            </div>
          </div>
        </>
      )}

      {view === 'alerts' && (
        <Panel title="Threshold alerts" subtitle={`Up to ${hourLabel(data.hours[hour])} · SMS sent to district officials when raised`}>
          {alerts.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No alerts at this point in time.</p>}
          <ul className="divide-y divide-slate-100">
            {alerts.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center gap-3 py-2.5">
                <StatusPill tone={a.level === 'Danger' ? 'critical' : 'warning'}>{a.level}</StatusPill>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900">{a.station}</div>
                  <div className="text-xs text-slate-500">{hourLabel(a.ts)} · level {a.value.toFixed(2)} m</div>
                </div>
                {acked[a.id] ? <StatusPill tone="good">Acknowledged</StatusPill> : <Btn variant="outline" onClick={() => setAcked((x) => ({ ...x, [a.id]: true }))}>Acknowledge</Btn>}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {view === 'stations' && (
        <Panel title="Sensor network" subtitle="Readings at the selected time">
          <DataTable
            rows={data.stations.map((s) => ({ ...s, level: data.readings[s.id][hour], rainNow: data.rain[s.id][hour], status: status(s) }))}
            searchKeys={['name', 'id', 'kind']}
            pageSize={12}
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Station' },
              { key: 'kind', label: 'Type' },
              { key: 'level', label: 'Level', align: 'right', render: (s) => (s.online ? `${s.level.toFixed(2)} m` : '—') },
              { key: 'warning', label: 'Warning at', align: 'right', render: (s) => `${s.warning} m` },
              { key: 'danger', label: 'Danger at', align: 'right', render: (s) => `${s.danger} m` },
              { key: 'rainNow', label: 'Rain', align: 'right', render: (s) => (s.online ? `${s.rainNow.toFixed(1)} mm` : '—') },
              { key: 'status', label: 'Status', render: (s) => <StatusPill tone={TONE[s.status]}>{s.status}</StatusPill> },
            ]}
            onRowClick={(s) => { setSelId(s.id); setView('map'); }}
          />
        </Panel>
      )}
    </DashShell>
  );
}
