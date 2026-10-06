import React, { useState } from 'react';
import { CalendarDays, Home, Wrench } from 'lucide-react';
import data from '@/data/dashboards/nestfinder-rental-property-platform.json';
import { BarChart, ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { SERIES, fmt, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const RENT_TONE = { Paid: 'good', Due: 'warning', Overdue: 'critical', Vacant: 'neutral', 'Reminder sent': 'warning' };
const TICKET_FLOW = ['Open', 'Assigned', 'In progress', 'Done'];
const PRIORITY_TONE = { High: 'critical', Medium: 'warning', Low: 'neutral' };

export default function NestFinderDashboard({ project }) {
  const [view, setView] = useState('portfolio');
  const [range, setRange] = useState(30);
  const [locality, setLocality] = useState('All localities');
  const [props, setProps] = useState(data.properties);
  const [tickets, setTickets] = useState(data.tickets);
  const [visits, setVisits] = useState(data.visits);
  const { cur, prev } = useRange(data.daily, range);

  const inLoc = (p) => locality === 'All localities' || p.locality === locality;
  const shown = props.filter(inLoc);
  const occupied = shown.filter((p) => p.occupied);
  const rentRoll = sum(occupied, 'rent');
  const collected = sum(occupied.filter((p) => p.rentStatus === 'Paid'), 'rent');
  const days = [...new Set(visits.map((v) => v.date))].slice(0, 6);
  const moveTicket = (id, dir) => setTickets((ts) => ts.map((t) => (t.id === id ? { ...t, status: TICKET_FLOW[Math.min(TICKET_FLOW.length - 1, Math.max(0, TICKET_FLOW.indexOf(t.status) + dir))] } : t)));

  const views = [
    { id: 'portfolio', label: 'Properties', icon: Home, badge: props.filter((p) => p.rentStatus === 'Overdue').length },
    { id: 'visits', label: 'Visits', icon: CalendarDays, badge: visits.filter((v) => v.status === 'Requested').length },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, badge: tickets.filter((t) => t.status !== 'Done').length },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'portfolio' ? setRange : undefined}
      filters={view === 'portfolio' ? <Select label="Locality" value={locality} onChange={setLocality} options={['All localities', ...data.localityRent.map((l) => l.label)]} /> : null}
    >
      {view === 'portfolio' && (
        <>
          <KpiRow>
            <StatTile label="Occupancy" value={fmt.pct((occupied.length / Math.max(shown.length, 1)) * 100, 0)} hint={`${occupied.length} of ${shown.length} homes let`} />
            <StatTile label="Rent collected this month" value={fmt.inrFull(collected)} hint={`of ${fmt.inrFull(rentRoll)} due`} />
            <StatTile label="Enquiries" value={fmt.int(sum(cur, 'enquiries'))} deltaPct={delta(sum(cur, 'enquiries'), sum(prev, 'enquiries'))} spark={cur.slice(-14).map((d) => d.enquiries)} />
            <StatTile label="Site visits" value={fmt.int(sum(cur, 'visits'))} deltaPct={delta(sum(cur, 'visits'), sum(prev, 'visits'))} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <ChartCard title="Collection progress" subtitle="Rent collected vs due this month">
              <Meter value={collected} max={rentRoll} label="Collected" right={fmt.pct((collected / Math.max(rentRoll, 1)) * 100, 0)} tone={collected / rentRoll > 0.85 ? 'good' : 'warning'} />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                {['Paid', 'Due', 'Overdue'].map((s) => (
                  <div key={s} className="rounded-lg bg-slate-50 p-2">
                    <div className="text-lg font-semibold text-slate-900">{occupied.filter((p) => p.rentStatus === s).length}</div>
                    <StatusPill tone={RENT_TONE[s]}>{s}</StatusPill>
                  </div>
                ))}
              </div>
            </ChartCard>
            <ChartCard title="Average asking rent by locality" subtitle="Click to filter">
              <HBars items={data.localityRent} format={fmt.inr} active={locality === 'All localities' ? null : locality} onClick={(l) => setLocality(l === locality ? 'All localities' : l)} />
            </ChartCard>
          </div>
          <ChartCard title="Enquiries per day" table={{ columns: ['Date', 'Enquiries', 'Visits'], rows: cur.map((d) => [fmt.date(d.date), d.enquiries, d.visits]) }}>
            <LineChart data={cur} series={[{ key: 'enquiries', label: 'Enquiries' }, { key: 'visits', label: 'Site visits' }]} format={fmt.int} height={200} />
          </ChartCard>
          <Panel title="Homes" subtitle="Send a rent reminder to tenants who haven't paid">
            <DataTable
              rows={shown}
              searchKeys={['title', 'locality', 'tenant']}
              columns={[
                { key: 'title', label: 'Home' },
                { key: 'locality', label: 'Locality' },
                { key: 'rent', label: 'Rent', align: 'right', render: (p) => fmt.inrFull(p.rent) },
                { key: 'tenant', label: 'Tenant', render: (p) => p.tenant || '—' },
                { key: 'leaseEnd', label: 'Lease ends', render: (p) => (p.leaseEnd ? fmt.date(p.leaseEnd) : '—') },
                { key: 'rentStatus', label: 'Rent', render: (p) => <StatusPill tone={RENT_TONE[p.rentStatus]}>{p.rentStatus}</StatusPill> },
                {
                  key: 'act',
                  label: '',
                  sort: false,
                  render: (p) => ['Due', 'Overdue'].includes(p.rentStatus) && <Btn variant="outline" onClick={() => setProps((ps) => ps.map((x) => (x.id === p.id ? { ...x, rentStatus: 'Reminder sent' } : x)))}>Send reminder</Btn>,
                },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'visits' && (
        <Panel title="Viewing schedule" subtitle="Confirm requested visits; tenants get an SMS with the address">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {days.map((d) => (
              <div key={d} className="min-w-0 rounded-lg bg-slate-50 p-2">
                <div className="mb-2 text-xs font-semibold text-slate-700">{new Date(`${d}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
                <div className="space-y-2">
                  {visits.filter((v) => v.date === d).map((v) => (
                    <div key={v.id} className={cn('rounded-md border bg-white p-2 text-[11px]', v.status === 'Requested' ? 'border-[#C29331]' : 'border-slate-200')}>
                      <div className="font-semibold text-slate-900">{v.slot} · {v.visitor}</div>
                      <div className="truncate text-slate-500">{v.property}</div>
                      <div className="mt-1.5">
                        {v.status === 'Requested' ? (
                          <Btn onClick={() => setVisits((vs) => vs.map((x) => (x.id === v.id ? { ...x, status: 'Confirmed' } : x)))}>Confirm</Btn>
                        ) : (
                          <StatusPill tone={v.status === 'Confirmed' ? 'good' : 'warning'}>{v.status}</StatusPill>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {view === 'maintenance' && (
        <>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {TICKET_FLOW.map((col) => (
              <div key={col} className="rounded-xl bg-slate-100/70 p-2">
                <div className="mb-2 flex items-center justify-between px-1 text-xs font-semibold text-slate-700">
                  {col} <span className="rounded-sm bg-white px-2 text-slate-500">{tickets.filter((t) => t.status === col).length}</span>
                </div>
                <div className="space-y-2">
                  {tickets.filter((t) => t.status === col).map((t) => (
                    <div key={t.id} className="rounded-lg border border-slate-200 bg-white p-2.5 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-900">{t.issue}</span>
                        <StatusPill tone={PRIORITY_TONE[t.priority]}>{t.priority}</StatusPill>
                      </div>
                      <div className="mt-1 text-slate-500">{t.property} · raised {fmt.date(t.raised)}</div>
                      <div className="mt-2 flex gap-1.5">
                        {col !== 'Open' && <Btn variant="ghost" onClick={() => moveTicket(t.id, -1)}>← Back</Btn>}
                        {col !== 'Done' && <Btn variant="outline" onClick={() => moveTicket(t.id, 1)}>Move to {TICKET_FLOW[TICKET_FLOW.indexOf(col) + 1]} →</Btn>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ChartCard title="Tickets by stage" table={{ columns: ['Stage', 'Tickets'], rows: TICKET_FLOW.map((s) => [s, tickets.filter((t) => t.status === s).length]) }}>
            <BarChart data={TICKET_FLOW.map((s) => ({ label: s, value: tickets.filter((t) => t.status === s).length }))} series={[{ key: 'value', label: 'Tickets', color: SERIES[0] }]} format={fmt.int} height={160} />
          </ChartCard>
        </>
      )}
    </DashShell>
  );
}
