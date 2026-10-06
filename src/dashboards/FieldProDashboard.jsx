import React, { useState } from 'react';
import { CalendarRange, FileClock, Ticket } from 'lucide-react';
import data from '@/data/dashboards/fieldpro-service-operations.json';
import { ChartCard, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useLive, useRange } from '@/components/dash/ui';
import { SERIES, fmt, sum } from '@/components/dash/theme';

const TYPE_COLOR = { PM: SERIES[0], Breakdown: SERIES[7], Install: SERIES[2] };
const slaTone = (t) => {
  const r = t.ageHours / t.slaHours;
  return r >= 1 ? 'critical' : r >= 0.75 ? 'warning' : 'good';
};

export default function FieldProDashboard({ project }) {
  const [view, setView] = useState('tickets');
  const [range, setRange] = useState(30);
  const [live, setLive] = useState(true);
  const [prio, setPrio] = useState('All priorities');
  const [tickets, setTickets] = useState(data.tickets);
  const [contracts, setContracts] = useState(data.contracts);
  const { cur, prev } = useRange(data.daily, range);

  // SLA clocks keep running.
  useLive(() => setTickets((ts) => ts.map((t) => ({ ...t, ageHours: +(t.ageHours + 0.1).toFixed(1) }))), 3000, live);

  const assign = (id, tech) => setTickets((ts) => ts.map((t) => (t.id === id ? { ...t, tech, status: tech ? 'Assigned' : 'Open' } : t)));
  const close = (id) => setTickets((ts) => ts.filter((t) => t.id !== id));
  const shown = tickets.filter((t) => prio === 'All priorities' || t.priority === prio);
  const breached = tickets.filter((t) => t.ageHours > t.slaHours).length;
  const expiring = contracts.filter((c) => c.expires <= '2026-11-05');

  const views = [
    { id: 'tickets', label: 'Service tickets', icon: Ticket, badge: breached },
    { id: 'schedule', label: 'Technician schedule', icon: CalendarRange },
    { id: 'contracts', label: 'AMC renewals', icon: FileClock, badge: expiring.filter((c) => c.renewal === 'Not contacted').length },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'tickets' ? setRange : undefined}
      live={live}
      onLive={view === 'tickets' ? setLive : undefined}
      filters={view === 'tickets' ? <Select label="Priority" value={prio} onChange={setPrio} options={['All priorities', 'P1', 'P2', 'P3']} /> : null}
    >
      {view === 'tickets' && (
        <>
          <KpiRow>
            <StatTile label="Open tickets" value={tickets.length} />
            <StatTile label="SLA breached" value={breached} hint="Past response deadline" />
            <StatTile label="Unassigned" value={tickets.filter((t) => !t.tech).length} />
            <StatTile label="Tickets closed" value={fmt.int(sum(cur, 'closed'))} deltaPct={delta(sum(cur, 'closed'), sum(prev, 'closed'))} />
          </KpiRow>
          <Panel title="Ticket queue" subtitle="Sorted by SLA risk; timers update live">
            <DataTable
              rows={shown}
              searchKeys={['id', 'client', 'asset', 'issue']}
              columns={[
                { key: 'id', label: 'Ticket' },
                { key: 'priority', label: 'P', render: (t) => <StatusPill tone={{ P1: 'critical', P2: 'warning', P3: 'neutral' }[t.priority]}>{t.priority}</StatusPill> },
                { key: 'client', label: 'Client' },
                { key: 'asset', label: 'Asset' },
                { key: 'issue', label: 'Issue' },
                {
                  key: 'ageHours',
                  label: 'SLA',
                  sortValue: (t) => t.ageHours / t.slaHours,
                  render: (t) => (
                    <div className="w-32">
                      <Meter value={Math.min(t.ageHours, t.slaHours)} max={t.slaHours} right={`${t.ageHours}h / ${t.slaHours}h`} tone={slaTone(t)} />
                    </div>
                  ),
                },
                {
                  key: 'tech',
                  label: 'Technician',
                  render: (t) => (
                    <select className="rounded-md border border-slate-200 bg-white px-1.5 py-1 text-xs" value={t.tech || ''} onChange={(e) => assign(t.id, e.target.value || null)}>
                      <option value="">Unassigned</option>
                      {data.techs.map((x) => <option key={x.name} value={x.name}>{x.name} ({x.skill})</option>)}
                    </select>
                  ),
                },
                { key: 'act', label: '', sort: false, render: (t) => t.tech && <Btn variant="outline" onClick={() => close(t.id)}>Close</Btn> },
              ]}
            />
          </Panel>
          <ChartCard title="Tickets opened vs closed" table={{ columns: ['Date', 'Opened', 'Closed', 'Planned maintenance'], rows: cur.map((d) => [fmt.date(d.date), d.opened, d.closed, d.pm]) }}>
            <LineChart data={cur} series={[{ key: 'opened', label: 'Opened' }, { key: 'closed', label: 'Closed' }]} format={fmt.int} height={200} />
          </ChartCard>
        </>
      )}

      {view === 'schedule' && (
        <Panel title="This week's schedule" subtitle="Visits per technician and day">
          <div className="mb-3 flex flex-wrap gap-3 text-xs text-slate-600">
            {Object.entries(TYPE_COLOR).map(([k, c]) => (
              <span key={k} className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: c }} />{k === 'PM' ? 'Planned maintenance' : k}</span>
            ))}
          </div>
          <div className="overflow-x-auto">
            <div className="grid min-w-[860px] gap-1" style={{ gridTemplateColumns: '170px repeat(6, 1fr)' }}>
              <div />
              {data.days.map((d) => (
                <div key={d} className="px-1 text-xs font-semibold text-slate-600">{new Date(`${d}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })}</div>
              ))}
              {data.schedule.map((row) => (
                <React.Fragment key={row.tech}>
                  <div className="py-1 pr-2">
                    <div className="truncate text-xs font-semibold text-slate-900">{row.tech}</div>
                    <div className="text-[10px] text-slate-500">{row.skill}</div>
                  </div>
                  {row.days.map((visits, i) => (
                    <div key={i} className="space-y-1 rounded-md bg-slate-50 p-1">
                      {visits.map((v, j) => (
                        <div key={j} className="rounded border-l-[3px] bg-white px-1.5 py-1 text-[10px] leading-tight" style={{ borderLeftColor: TYPE_COLOR[v.type] }}>
                          <div className="font-semibold text-slate-800">{v.slot}</div>
                          <div className="truncate text-slate-500">{v.client}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Panel>
      )}

      {view === 'contracts' && (
        <>
          <KpiRow>
            <StatTile label="Contracts expiring in 30 days" value={expiring.length} />
            <StatTile label="Value up for renewal" value={fmt.inr(sum(expiring, 'value'))} />
            <StatTile label="Renewal quotes sent" value={contracts.filter((c) => c.renewal === 'Quote sent').length} />
            <StatTile label="Total AMC value" value={fmt.inr(sum(contracts, 'value'))} />
          </KpiRow>
          <Panel title="Annual maintenance contracts" subtitle="Send renewal quotes before contracts lapse">
            <DataTable
              rows={contracts}
              searchKeys={['id', 'client']}
              columns={[
                { key: 'id', label: 'Contract' },
                { key: 'client', label: 'Client' },
                { key: 'assets', label: 'Assets', align: 'right' },
                { key: 'value', label: 'Value', align: 'right', render: (c) => fmt.inrFull(c.value) },
                { key: 'visitsDone', label: 'Visits', render: (c) => <div className="w-24"><Meter value={c.visitsDone} max={c.visitsTotal} right={`${c.visitsDone}/${c.visitsTotal}`} /></div> },
                { key: 'expires', label: 'Expires', render: (c) => <StatusPill tone={c.expires < '2026-10-05' ? 'critical' : c.expires <= '2026-11-05' ? 'warning' : 'neutral'}>{fmt.date(c.expires)}</StatusPill> },
                {
                  key: 'renewal',
                  label: 'Renewal',
                  render: (c) => (c.renewal === 'Quote sent' ? <StatusPill tone="good">Quote sent</StatusPill> : <Btn variant="outline" onClick={() => setContracts((cs) => cs.map((x) => (x.id === c.id ? { ...x, renewal: 'Quote sent' } : x)))}>Send renewal quote</Btn>),
                },
              ]}
            />
          </Panel>
        </>
      )}
    </DashShell>
  );
}
