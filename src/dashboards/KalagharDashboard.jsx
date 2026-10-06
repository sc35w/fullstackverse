import React, { useState } from 'react';
import { Banknote, LayoutDashboard, Truck } from 'lucide-react';
import data from '@/data/dashboards/kalaghar-artisan-jewellery-store.json';
import { ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { SERIES, fmt, sum } from '@/components/dash/theme';

const SHIP_TONE = { 'Awaiting pickup': 'warning', 'In transit': 'neutral', Delivered: 'good', Delayed: 'critical' };

export default function KalagharDashboard({ project }) {
  const [view, setView] = useState('sales');
  const [range, setRange] = useState(30);
  const [craft, setCraft] = useState('All crafts');
  const [artisans, setArtisans] = useState(data.artisans);
  const { cur, prev } = useRange(data.daily, range);

  const crafts = ['All crafts', ...data.craftSales.map((c) => c.label)];
  const byCraft = (r) => craft === 'All crafts' || r.craft === craft;
  const rev = sum(cur, 'revenue');
  const ord = sum(cur, 'orders');
  const pending = sum(artisans.filter(byCraft), 'pending');
  const pay = (id) => setArtisans((as) => as.map((a) => (a.id === id ? { ...a, pending: 0, lastPayout: '2026-10-05', paid: true } : a)));

  const views = [
    { id: 'sales', label: 'Sales', icon: LayoutDashboard },
    { id: 'payouts', label: 'Artisan payouts', icon: Banknote, badge: artisans.filter((a) => a.pending > 0).length },
    { id: 'shipping', label: 'Shipping', icon: Truck, badge: data.orders.filter((o) => o.status === 'Delayed').length },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'sales' ? setRange : undefined}
      filters={<Select label="Craft" value={craft} onChange={setCraft} options={crafts} />}
    >
      {view === 'sales' && (
        <>
          <KpiRow>
            <StatTile label="Revenue" value={fmt.inr(rev)} deltaPct={delta(rev, sum(prev, 'revenue'))} spark={cur.slice(-14).map((d) => d.revenue)} />
            <StatTile label="Orders" value={fmt.int(ord)} deltaPct={delta(ord, sum(prev, 'orders'))} />
            <StatTile label="Active artisans" value={artisans.filter(byCraft).length} hint={`${new Set(artisans.map((a) => a.region)).size} states represented`} />
            <StatTile label="Average rating" value={`${(sum(artisans.filter(byCraft), 'rating') / Math.max(artisans.filter(byCraft).length, 1)).toFixed(2)} ★`} />
          </KpiRow>
          <ChartCard
            title="Daily revenue"
            subtitle="All crafts"
            table={{ columns: ['Date', 'Revenue', 'Orders'], rows: cur.map((d) => [fmt.date(d.date), fmt.inrFull(d.revenue), d.orders]) }}
          >
            <LineChart data={cur} series={[{ key: 'revenue', label: 'Revenue' }]} format={fmt.inr} area />
          </ChartCard>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Sales by craft" subtitle="Click a craft to filter the dashboard">
              <HBars items={data.craftSales} format={fmt.inr} active={craft === 'All crafts' ? null : craft} onClick={(c) => setCraft(c === craft ? 'All crafts' : c)} />
            </ChartCard>
            <ChartCard title="Sales by artisan's state" subtitle="Where the makers are">
              <HBars items={data.regionSales} format={fmt.inr} color={SERIES[1]} />
            </ChartCard>
          </div>
        </>
      )}

      {view === 'payouts' && (
        <>
          <KpiRow>
            <StatTile label="Pending payouts" value={fmt.inrFull(pending)} />
            <StatTile label="Artisans awaiting payment" value={artisans.filter((a) => byCraft(a) && a.pending > 0).length} />
            <StatTile label="Paid this session" value={artisans.filter((a) => a.paid).length} />
            <StatTile label="Lifetime artisan sales" value={fmt.inr(sum(artisans.filter(byCraft), 'sales'))} />
          </KpiRow>
          <Panel title="Artisan payouts" subtitle="Release payment to an artisan's bank account">
            <DataTable
              rows={artisans.filter(byCraft)}
              searchKeys={['name', 'craft', 'region']}
              columns={[
                { key: 'name', label: 'Artisan' },
                { key: 'craft', label: 'Craft' },
                { key: 'region', label: 'State' },
                { key: 'products', label: 'Products', align: 'right' },
                { key: 'sales', label: 'Sales', align: 'right', render: (a) => fmt.inrFull(a.sales) },
                { key: 'pending', label: 'Pending', align: 'right', render: (a) => (a.pending ? fmt.inrFull(a.pending) : '—') },
                { key: 'lastPayout', label: 'Last payout', render: (a) => fmt.date(a.lastPayout) },
                {
                  key: 'act',
                  label: '',
                  sort: false,
                  render: (a) => (a.pending > 0 ? <Btn onClick={() => pay(a.id)}>Release payout</Btn> : <StatusPill tone="good">Settled</StatusPill>),
                },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'shipping' && (
        <>
          <KpiRow>
            {Object.keys(SHIP_TONE).map((s) => (
              <StatTile key={s} label={s} value={data.orders.filter((o) => byCraft(o) && o.status === s).length} />
            ))}
          </KpiRow>
          <Panel title="Shipments" subtitle="Courier labels and tracking are created automatically">
            <DataTable
              rows={data.orders.filter(byCraft)}
              searchKeys={['id', 'customer', 'artisan', 'courier']}
              columns={[
                { key: 'id', label: 'Order' },
                { key: 'date', label: 'Date', render: (o) => fmt.date(o.date) },
                { key: 'customer', label: 'Customer' },
                { key: 'craft', label: 'Craft' },
                { key: 'artisan', label: 'Artisan' },
                { key: 'courier', label: 'Courier' },
                { key: 'value', label: 'Value', align: 'right', render: (o) => fmt.inrFull(o.value) },
                { key: 'status', label: 'Status', render: (o) => <StatusPill tone={SHIP_TONE[o.status]}>{o.status}</StatusPill> },
              ]}
            />
          </Panel>
        </>
      )}
    </DashShell>
  );
}
