import React, { useMemo, useState } from 'react';
import { ClipboardList, LayoutDashboard, Warehouse } from 'lucide-react';
import data from '@/data/dashboards/sparesphere-industrial-parts-marketplace.json';
import { ChartCard, HBars, Heatmap, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, Drawer, Field, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { fmt, sum } from '@/components/dash/theme';

const ORDER_TONE = { Processing: 'warning', Packed: 'neutral', Dispatched: 'neutral', Delivered: 'good', 'On hold': 'critical' };
const RFQ_TONE = { New: 'warning', Quoted: 'neutral', Negotiating: 'serious', Won: 'good', Lost: 'critical' };

export default function SpareSphereDashboard({ project }) {
  const [view, setView] = useState('overview');
  const [range, setRange] = useState(30);
  const [depot, setDepot] = useState('All depots');
  const [rfqs, setRfqs] = useState(data.rfqs);
  const [low, setLow] = useState(data.lowStock);
  const [openRfq, setOpenRfq] = useState(null);
  const [quote, setQuote] = useState({ price: '', days: '3' });
  const { cur, prev } = useRange(data.daily, range);

  const byDepot = (r) => depot === 'All depots' || r.depot === depot;
  const rev = sum(cur, 'revenue');
  const ord = sum(cur, 'orders');
  const prevRev = sum(prev, 'revenue');
  const prevOrd = sum(prev, 'orders');
  const won = rfqs.filter((r) => r.status === 'Won').length;
  const decided = rfqs.filter((r) => ['Won', 'Lost'].includes(r.status)).length;
  const newRfqs = rfqs.filter((r) => r.status === 'New').length;

  const sendQuote = () => {
    setRfqs((rs) => rs.map((r) => (r.id === openRfq.id ? { ...r, status: 'Quoted', estimate: Number(quote.price) || r.estimate, leadDays: quote.days } : r)));
    setOpenRfq(null);
  };

  const stockRows = useMemo(() => data.depots.map((d, i) => ({ depot: d, i })).filter((d) => depot === 'All depots' || d.depot === depot), [depot]);

  const views = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'rfq', label: 'Quote requests', icon: ClipboardList, badge: newRfqs },
    { id: 'inventory', label: 'Inventory', icon: Warehouse, badge: low.filter((l) => !l.ordered).length },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'overview' ? setRange : undefined}
      filters={<Select label="Depot" value={depot} onChange={setDepot} options={['All depots', ...data.depots]} />}
    >
      {view === 'overview' && (
        <>
          <KpiRow>
            <StatTile label="Gross order value" value={fmt.inr(rev)} deltaPct={delta(rev, prevRev)} spark={cur.slice(-14).map((d) => d.revenue)} />
            <StatTile label="Orders" value={fmt.int(ord)} deltaPct={delta(ord, prevOrd)} />
            <StatTile label="Average order value" value={fmt.inr(rev / ord)} deltaPct={delta(rev / ord, prevRev / prevOrd)} />
            <StatTile label="Quote win rate" value={fmt.pct((won / Math.max(decided, 1)) * 100, 0)} hint={`${won} won of ${decided} decided`} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <ChartCard
              title="Order value"
              subtitle="Daily gross order value, all suppliers"
              table={{ columns: ['Date', 'Order value', 'Orders'], rows: cur.map((d) => [fmt.date(d.date), fmt.inrFull(d.revenue), d.orders]) }}
            >
              <LineChart data={cur} series={[{ key: 'revenue', label: 'Order value' }]} format={fmt.inr} area />
            </ChartCard>
            <ChartCard title="Revenue by category" subtitle="Sample period">
              <HBars items={data.categoryRevenue} format={fmt.inr} />
            </ChartCard>
          </div>
          <Panel title="Recent orders" subtitle="Routed to the depot nearest the delivery site">
            <DataTable
              rows={data.orders.filter(byDepot)}
              searchKeys={['id', 'buyer', 'category']}
              columns={[
                { key: 'id', label: 'Order' },
                { key: 'buyer', label: 'Buyer' },
                { key: 'category', label: 'Category' },
                { key: 'depot', label: 'Depot' },
                { key: 'items', label: 'Lines', align: 'right' },
                { key: 'value', label: 'Value', align: 'right', render: (r) => fmt.inrFull(r.value) },
                { key: 'status', label: 'Status', render: (r) => <StatusPill tone={ORDER_TONE[r.status]}>{r.status}</StatusPill> },
                { key: 'eta', label: 'ETA', render: (r) => (r.eta ? fmt.date(r.eta) : '—') },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'rfq' && (
        <>
          <KpiRow>
            <StatTile label="New requests" value={newRfqs} hint="Waiting for a quote" />
            <StatTile label="Urgent" value={rfqs.filter((r) => r.urgent && r.status === 'New').length} hint="Breakdown orders" />
            <StatTile label="Pipeline value" value={fmt.inr(sum(rfqs.filter((r) => ['New', 'Quoted', 'Negotiating'].includes(r.status)), 'estimate'))} />
            <StatTile label="Win rate" value={fmt.pct((won / Math.max(decided, 1)) * 100, 0)} />
          </KpiRow>
          <Panel title="Request-for-quote queue" subtitle="Click a request to price it and send a quote">
            <DataTable
              rows={rfqs}
              searchKeys={['id', 'buyer', 'machine']}
              onRowClick={(r) => {
                setOpenRfq(r);
                setQuote({ price: String(r.estimate), days: '3' });
              }}
              columns={[
                { key: 'id', label: 'RFQ' },
                { key: 'buyer', label: 'Buyer' },
                { key: 'machine', label: 'Machine' },
                { key: 'parts', label: 'Parts', align: 'right' },
                { key: 'estimate', label: 'Estimate', align: 'right', render: (r) => fmt.inrFull(r.estimate) },
                { key: 'due', label: 'Due', render: (r) => <span>{fmt.date(r.due)} {r.urgent && <StatusPill tone="critical">Urgent</StatusPill>}</span> },
                { key: 'status', label: 'Status', render: (r) => <StatusPill tone={RFQ_TONE[r.status]}>{r.status}</StatusPill> },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'inventory' && (
        <>
          <ChartCard title="Stock by depot and category" subtitle="Units on hand · pale cells are running low">
            <Heatmap rows={stockRows.map((d) => d.depot)} cols={data.categories} values={stockRows.map((d) => data.stock[d.i])} colFormat={(c) => c.split(' ')[0]} cellH={26} />
          </ChartCard>
          <Panel title="Below reorder level" subtitle="Raise a purchase order to the OEM or distributor">
            <div className="grid gap-3 md:grid-cols-2">
              {low.filter(byDepot).map((l) => (
                <div key={l.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{l.name}</div>
                      <div className="text-xs text-slate-500">{l.id} · {l.depot} · lead time {l.leadDays} days</div>
                    </div>
                    {l.ordered ? (
                      <StatusPill tone="good">PO raised</StatusPill>
                    ) : (
                      <Btn onClick={() => setLow((ls) => ls.map((x) => (x.id === l.id ? { ...x, ordered: true } : x)))}>Reorder {l.reorder * 2}</Btn>
                    )}
                  </div>
                  <div className="mt-3">
                    <Meter value={l.qty} max={l.reorder} label="On hand vs reorder level" right={`${l.qty} / ${l.reorder}`} tone={l.qty < l.reorder / 3 ? 'critical' : 'warning'} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </>
      )}

      <Drawer open={!!openRfq} title={openRfq ? `${openRfq.id} · ${openRfq.buyer}` : ''} onClose={() => setOpenRfq(null)}>
        {openRfq && (
          <div>
            <Field label="Machine">{openRfq.machine}</Field>
            <Field label="Part lines">{openRfq.parts}</Field>
            <Field label="Total quantity">{openRfq.qty}</Field>
            <Field label="Needed by">{fmt.date(openRfq.due)}</Field>
            <Field label="Status"><StatusPill tone={RFQ_TONE[openRfq.status]}>{openRfq.status}</StatusPill></Field>
            <div className="mt-5 space-y-3">
              <label className="block text-sm">
                <span className="text-slate-600">Quote amount (₹)</span>
                <input className="field mt-1" value={quote.price} onChange={(e) => setQuote({ ...quote, price: e.target.value.replace(/\D/g, '') })} />
              </label>
              <label className="block text-sm">
                <span className="text-slate-600">Dispatch within</span>
                <select className="field mt-1" value={quote.days} onChange={(e) => setQuote({ ...quote, days: e.target.value })}>
                  {['1', '3', '5', '7', '14'].map((d) => (
                    <option key={d} value={d}>{d} days</option>
                  ))}
                </select>
              </label>
              <Btn size="md" className="w-full" onClick={sendQuote} disabled={!['New', 'Negotiating'].includes(openRfq.status)}>
                Send quote to buyer
              </Btn>
              {!['New', 'Negotiating'].includes(openRfq.status) && <p className="text-xs text-slate-500">This request has already been quoted or closed.</p>}
            </div>
          </div>
        )}
      </Drawer>
    </DashShell>
  );
}

