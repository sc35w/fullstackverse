import React, { useState } from 'react';
import { Container, LineChart as LineIcon, Search } from 'lucide-react';
import data from '@/data/dashboards/portlane-freight-forwarding-website.json';
import { ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { SERIES, STATUS, fmt, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const last = data.milestones.length - 1;
const shipTone = (s) => (s.step === last ? 'good' : s.delayed ? 'critical' : 'neutral');
const shipLabel = (s) => (s.step === last ? 'Delivered' : s.delayed ? 'Delayed' : data.milestones[s.step]);

function RouteMap({ shipment }) {
  const a = data.ports[shipment.pol];
  const b = data.ports[shipment.pod];
  const progress = shipment.step / last;
  const mx = (a[0] + b[0]) / 2;
  const my = Math.min(a[1], b[1]) - 0.18;
  const q = (t) => [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * mx + t ** 2 * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * my + t ** 2 * b[1]];
  const ship = q(Math.min(1, Math.max(0, (progress - 0.25) / 0.6)));
  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-[#EAF2FB]">
      <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full">
        {/* simplified continents */}
        <path d="M2 4 L18 3 L20 14 L12 18 L4 12 Z" fill="#DCE7D5" />
        <path d="M10 18 L26 16 L30 28 L24 40 L16 38 Z" fill="#DCE7D5" />
        <path d="M28 4 L60 2 L80 8 L82 20 L66 26 L52 22 L40 24 L30 16 Z" fill="#DCE7D5" />
        <path d="M86 12 L98 14 L98 30 L88 26 Z" fill="#DCE7D5" />
        <path d="M62 34 L76 33 L78 42 L66 44 Z" fill="#DCE7D5" />
        {Object.entries(data.ports).map(([name, [x, y]]) => (
          <circle key={name} cx={x * 100} cy={y * 50} r="0.8" fill="#94A3B8" />
        ))}
        <path d={`M${a[0] * 100} ${a[1] * 50} Q ${mx * 100} ${my * 50} ${b[0] * 100} ${b[1] * 50}`} fill="none" stroke={SERIES[0]} strokeWidth="0.6" strokeDasharray="1.2 1" />
        <circle cx={a[0] * 100} cy={a[1] * 50} r="1.4" fill={SERIES[0]} />
        <circle cx={b[0] * 100} cy={b[1] * 50} r="1.4" fill="#0F172A" />
        <circle cx={ship[0] * 100} cy={ship[1] * 50} r="1.8" fill={shipment.delayed ? STATUS.critical : SERIES[1]} stroke="#fff" strokeWidth="0.6" />
      </svg>
      <div className="absolute left-2 top-2 rounded bg-white/90 px-1.5 py-0.5 text-[10px] text-slate-700">{shipment.pol} → {shipment.pod}</div>
    </div>
  );
}

export default function PortLaneDashboard({ project }) {
  const [view, setView] = useState('track');
  const [range, setRange] = useState(30);
  const [mode, setMode] = useState('All modes');
  const [q, setQ] = useState(data.shipments[0].container);
  const [found, setFound] = useState(data.shipments[0]);
  const [miss, setMiss] = useState(false);
  const [doc, setDoc] = useState(null);
  const { cur, prev } = useRange(data.daily, range);

  const search = (e) => {
    e?.preventDefault();
    const s = data.shipments.find((x) => [x.container, x.id].some((v) => v.toLowerCase() === q.trim().toLowerCase()));
    setFound(s || null);
    setMiss(!s);
  };
  const open = (s) => {
    setFound(s);
    setQ(s.container);
    setMiss(false);
    setView('track');
  };
  const inMode = (s) => mode === 'All modes' || s.mode === mode;

  const views = [
    { id: 'track', label: 'Track shipment', icon: Search },
    { id: 'shipments', label: 'My shipments', icon: Container, badge: data.shipments.filter((s) => s.delayed).length },
    { id: 'business', label: 'Business', icon: LineIcon },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'business' ? setRange : undefined}
      filters={view === 'shipments' ? <Select label="Mode" value={mode} onChange={setMode} options={['All modes', 'Sea FCL', 'Sea LCL', 'Air']} /> : null}
    >
      {view === 'track' && (
        <>
          <Panel title="Track a shipment" subtitle="Enter a container or booking number (try one from My shipments)">
            <form onSubmit={search} className="flex flex-wrap gap-2">
              <input className="field max-w-xs font-mono text-sm" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Container or booking number" />
              <Btn type="submit" size="md"><Search className="h-4 w-4" />Track</Btn>
            </form>
            {miss && <p className="mt-2 text-sm text-[#8E2A1C]">No shipment found with that number.</p>}
          </Panel>
          {found && (
            <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
              <Panel
                title={`${found.container} · ${found.customer}`}
                subtitle={`${found.id} · ${found.mode} · ${found.teu} TEU · ${found.vessel} · ETA ${fmt.date(found.eta)}`}
                actions={<StatusPill tone={shipTone(found)}>{shipLabel(found)}</StatusPill>}
              >
                <RouteMap shipment={found} />
              </Panel>
              <Panel title="Milestones" subtitle={`Last update ${fmt.dateTime(found.updated)}`}>
                <ol className="relative space-y-3 border-l-2 border-slate-200 pl-4">
                  {data.milestones.map((m, i) => (
                    <li key={m} className="relative">
                      <span
                        className={cn('absolute -left-[23px] top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white', i < found.step ? 'bg-[#56603A]' : i === found.step ? (found.delayed ? 'bg-[#9B2C22]' : 'bg-ink') : 'bg-slate-200')}
                      />
                      <div className={cn('text-sm', i <= found.step ? 'font-semibold text-slate-900' : 'text-slate-400')}>{m}</div>
                      {i === found.step && found.step !== last && <div className="text-xs text-slate-500">{found.delayed ? 'Delayed: congestion at port, new ETA being confirmed' : 'Current status'}</div>}
                    </li>
                  ))}
                </ol>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Btn variant="outline" onClick={() => setDoc('Bill of lading')}>Bill of lading (PDF)</Btn>
                  <Btn variant="outline" onClick={() => setDoc('Invoice')}>Invoice (PDF)</Btn>
                </div>
                {doc && <p className="mt-2 text-xs text-slate-500">In the live portal, the {doc.toLowerCase()} for {found.id} downloads here.</p>}
              </Panel>
            </div>
          )}
        </>
      )}

      {view === 'shipments' && (
        <Panel title="Active shipments" subtitle="Click a shipment to track it">
          <DataTable
            rows={data.shipments.filter(inMode)}
            searchKeys={['id', 'container', 'customer', 'pol', 'pod']}
            onRowClick={open}
            columns={[
              { key: 'container', label: 'Container', render: (s) => <span className="font-mono">{s.container}</span> },
              { key: 'customer', label: 'Customer' },
              { key: 'mode', label: 'Mode' },
              { key: 'pol', label: 'From' },
              { key: 'pod', label: 'To' },
              { key: 'eta', label: 'ETA', render: (s) => fmt.date(s.eta) },
              { key: 'step', label: 'Status', render: (s) => <StatusPill tone={shipTone(s)}>{shipLabel(s)}</StatusPill> },
            ]}
          />
        </Panel>
      )}

      {view === 'business' && (
        <>
          <KpiRow>
            <StatTile label="TEU moved" value={fmt.int(sum(cur, 'teu'))} deltaPct={delta(sum(cur, 'teu'), sum(prev, 'teu'))} spark={cur.slice(-14).map((d) => d.teu)} />
            <StatTile label="Quote requests" value={fmt.int(sum(cur, 'quotes'))} deltaPct={delta(sum(cur, 'quotes'), sum(prev, 'quotes'))} />
            <StatTile label="Portal logins" value={fmt.compact(sum(cur, 'portalLogins'))} deltaPct={delta(sum(cur, 'portalLogins'), sum(prev, 'portalLogins'))} hint="Customers self-serving instead of emailing" />
            <StatTile label="Shipments delayed" value={data.shipments.filter((s) => s.delayed).length} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <ChartCard title="Customer portal logins" table={{ columns: ['Date', 'Logins', 'Quotes', 'TEU'], rows: cur.map((d) => [fmt.date(d.date), d.portalLogins, d.quotes, d.teu]) }}>
              <LineChart data={cur} series={[{ key: 'portalLogins', label: 'Portal logins' }]} format={fmt.int} area />
            </ChartCard>
            <ChartCard title="Top trade lanes" subtitle="TEU in the sample period">
              <HBars items={data.lanes} format={fmt.int} />
            </ChartCard>
          </div>
        </>
      )}
    </DashShell>
  );
}
