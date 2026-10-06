import React, { useState } from 'react';
import { Inbox, LineChart as LineIcon } from 'lucide-react';
import data from '@/data/dashboards/atelier-nine-interior-studio-website.json';
import { ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, Drawer, Field, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { SERIES, fmt, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const STATUS_TONE = { New: 'warning', 'Call booked': 'neutral', 'Site visit': 'serious', 'Proposal sent': 'good', Declined: 'neutral' };
const fitTone = (f) => (f >= 80 ? 'good' : f >= 55 ? 'warning' : 'critical');

export default function AtelierNineDashboard({ project }) {
  const [view, setView] = useState('enquiries');
  const [range, setRange] = useState(30);
  const [type, setType] = useState('All types');
  const [enq, setEnq] = useState(data.enquiries);
  const [sel, setSel] = useState(null);
  const [slot, setSlot] = useState('Tue 11:00');
  const [all, setAll] = useState(false);
  const { cur, prev } = useRange(data.daily, range);

  const shown = enq.filter((e) => type === 'All types' || e.type === type);
  const item = enq.find((e) => e.id === sel);
  const update = (id, status) => setEnq((es) => es.map((e) => (e.id === id ? { ...e, status } : e)));

  const views = [
    { id: 'enquiries', label: 'Enquiries', icon: Inbox, badge: enq.filter((e) => e.status === 'New').length },
    { id: 'site', label: 'Website', icon: LineIcon },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'site' ? setRange : undefined}
      filters={view === 'enquiries' ? <Select label="Project type" value={type} onChange={setType} options={['All types', 'Residential', 'Hospitality', 'Workplace']} /> : null}
    >
      {view === 'enquiries' && (
        <>
          <KpiRow>
            <StatTile label="New enquiries" value={shown.filter((e) => e.status === 'New').length} />
            <StatTile label="Strong fit (80+)" value={shown.filter((e) => e.fit >= 80).length} hint="Budget, size and timeline match" />
            <StatTile label="Calls booked" value={shown.filter((e) => e.status === 'Call booked').length} />
            <StatTile label="Proposals sent" value={shown.filter((e) => e.status === 'Proposal sent').length} />
          </KpiRow>
          <Panel title="Enquiries, best fit first" subtitle="The website form asks for type, size, budget and timeline, so the studio can prioritise">
            <div className="grid gap-3 md:grid-cols-2">
              {(all ? shown : shown.slice(0, 8)).map((e) => (
                <button key={e.id} type="button" onClick={() => setSel(e.id)} className={cn('rounded-lg border p-3 text-left transition-colors hover:bg-slate-50', e.status === 'Declined' ? 'border-slate-100 opacity-60' : 'border-slate-200')}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{e.name}</div>
                      <div className="text-xs text-slate-500">{e.type} · {fmt.int(e.size)} sq ft · {e.city}</div>
                    </div>
                    <StatusPill tone={STATUS_TONE[e.status]}>{e.status}</StatusPill>
                  </div>
                  <div className="mt-2 text-xs text-slate-600">Budget {e.budget} · start {e.timeline.toLowerCase()} · via {e.source}</div>
                  <div className="mt-2"><Meter label="Fit score" right={e.fit} value={e.fit} max={100} tone={fitTone(e.fit)} /></div>
                </button>
              ))}
            </div>
            {shown.length > 8 && (
              <div className="mt-3 text-center">
                <Btn variant="outline" onClick={() => setAll((a) => !a)}>{all ? 'Show top 8' : `Show all ${shown.length}`}</Btn>
              </div>
            )}
          </Panel>
        </>
      )}

      {view === 'site' && (
        <>
          <KpiRow>
            <StatTile label="Sessions" value={fmt.compact(sum(cur, 'sessions'))} deltaPct={delta(sum(cur, 'sessions'), sum(prev, 'sessions'))} spark={cur.slice(-14).map((d) => d.sessions)} />
            <StatTile label="Enquiries" value={fmt.int(sum(cur, 'enquiries'))} deltaPct={delta(sum(cur, 'enquiries'), sum(prev, 'enquiries'))} />
            <StatTile label="Enquiry rate" value={fmt.pct((sum(cur, 'enquiries') / sum(cur, 'sessions')) * 100, 2)} />
            <StatTile label="Most viewed project" value={data.projectViews[0].label.split(' ').slice(0, 2).join(' ')} hint={`${fmt.int(data.projectViews[0].value)} views`} />
          </KpiRow>
          <ChartCard title="Visitors and enquiries" subtitle="Two charts, one per measure" table={{ columns: ['Date', 'Sessions', 'Enquiries'], rows: cur.map((d) => [fmt.date(d.date), d.sessions, d.enquiries]) }}>
            <LineChart data={cur} series={[{ key: 'sessions', label: 'Sessions' }]} format={fmt.compact} area height={170} />
            <div className="mt-2 border-t border-slate-100 pt-2">
              <LineChart data={cur} series={[{ key: 'enquiries', label: 'Enquiries', color: SERIES[1] }]} format={fmt.int} height={120} />
            </div>
          </ChartCard>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Project page views" subtitle="Which case studies attract clients">
              <HBars items={data.projectViews} format={fmt.int} />
            </ChartCard>
            <ChartCard title="Enquiry sources" subtitle="Share of enquiries">
              <HBars items={data.sources} format={(x) => `${x}%`} color={SERIES[1]} />
            </ChartCard>
          </div>
        </>
      )}

      <Drawer open={!!item} title={item ? item.name : ''} onClose={() => setSel(null)}>
        {item && (
          <div>
            <Field label="Project type">{item.type}</Field>
            <Field label="Size">{fmt.int(item.size)} sq ft</Field>
            <Field label="City">{item.city}</Field>
            <Field label="Budget">{item.budget}</Field>
            <Field label="Timeline">{item.timeline}</Field>
            <Field label="Found us via">{item.source}</Field>
            <Field label="Fit score"><StatusPill tone={fitTone(item.fit)}>{item.fit} / 100</StatusPill></Field>
            <div className="mt-5 space-y-3">
              <label className="block text-sm">
                <span className="text-slate-600">Discovery call slot</span>
                <select className="field mt-1" value={slot} onChange={(e) => setSlot(e.target.value)}>
                  {['Tue 11:00', 'Tue 16:00', 'Wed 12:30', 'Thu 10:00', 'Fri 15:30'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <div className="flex flex-wrap gap-2">
                <Btn size="md" onClick={() => update(item.id, 'Call booked')} disabled={item.status !== 'New'}>Book call · {slot}</Btn>
                <Btn size="md" variant="outline" onClick={() => update(item.id, 'Site visit')} disabled={!['New', 'Call booked'].includes(item.status)}>Schedule site visit</Btn>
                <Btn size="md" variant="danger" onClick={() => update(item.id, 'Declined')} disabled={item.status === 'Declined'}>Politely decline</Btn>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </DashShell>
  );
}
