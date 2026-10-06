import React, { useState } from 'react';
import { Boxes, LayoutDashboard, ShoppingBag, Ticket } from 'lucide-react';
import data from '@/data/dashboards/casaloom-home-decor-store.json';
import { BarChart, ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, Drawer, Field, KpiRow, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { SERIES, fmt, sum } from '@/components/dash/theme';

const TONE = { New: 'warning', Packed: 'neutral', Shipped: 'neutral', Delivered: 'good', 'Return requested': 'serious', Cancelled: 'critical' };
const NEXT = { New: 'Packed', Packed: 'Shipped', Shipped: 'Delivered' };

export default function CasaloomDashboard({ project }) {
  const [view, setView] = useState('sales');
  const [range, setRange] = useState(30);
  const [status, setStatus] = useState('All statuses');
  const [orders, setOrders] = useState(data.orders);
  const [coupons, setCoupons] = useState(data.coupons);
  const [sel, setSel] = useState(null);
  const { cur, prev } = useRange(data.daily, range);

  const rev = sum(cur, 'revenue');
  const ord = sum(cur, 'orders');
  const ses = sum(cur, 'sessions');
  const pRev = sum(prev, 'revenue');
  const pOrd = sum(prev, 'orders');
  const pSes = sum(prev, 'sessions');
  const advance = (o) => {
    const next = NEXT[o.status];
    if (!next) return;
    setOrders((os) => os.map((x) => (x.id === o.id ? { ...x, status: next } : x)));
    setSel((s) => (s && s.id === o.id ? { ...s, status: next } : s));
  };

  const views = [
    { id: 'sales', label: 'Sales', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: orders.filter((o) => o.status === 'New').length },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'offers', label: 'Offers', icon: Ticket },
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
      filters={view === 'orders' ? <Select label="Status" value={status} onChange={setStatus} options={['All statuses', ...Object.keys(TONE)]} /> : null}
    >
      {view === 'sales' && (
        <>
          <KpiRow>
            <StatTile label="Revenue" value={fmt.inr(rev)} deltaPct={delta(rev, pRev)} spark={cur.slice(-14).map((d) => d.revenue)} />
            <StatTile label="Orders" value={fmt.int(ord)} deltaPct={delta(ord, pOrd)} />
            <StatTile label="Conversion rate" value={fmt.pct((ord / ses) * 100, 2)} deltaPct={(ord / ses - pOrd / pSes) * 100} deltaUnit="pts" />
            <StatTile label="Average order value" value={fmt.inrFull(rev / ord)} deltaPct={delta(rev / ord, pRev / pOrd)} />
          </KpiRow>
          <ChartCard
            title="Revenue and orders"
            subtitle="Two measures on separate charts so neither scale distorts the other"
            table={{ columns: ['Date', 'Revenue', 'Orders', 'Sessions'], rows: cur.map((d) => [fmt.date(d.date), fmt.inrFull(d.revenue), d.orders, d.sessions]) }}
          >
            <LineChart data={cur} series={[{ key: 'revenue', label: 'Revenue' }]} format={fmt.inr} area height={190} />
            <div className="mt-2 border-t border-slate-100 pt-2">
              <BarChart data={cur} xKey="date" xFormat={fmt.date} series={[{ key: 'orders', label: 'Orders', color: SERIES[1] }]} format={fmt.int} height={130} />
            </div>
          </ChartCard>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Checkout funnel" subtitle="Last 30 days · where shoppers drop off">
              <HBars items={data.funnel} format={fmt.compact} />
              <p className="mt-3 text-xs text-slate-500">
                Cart → purchase: <b className="text-slate-900">{fmt.pct((data.funnel[4].value / data.funnel[2].value) * 100)}</b> · one-page checkout targets the cart-to-checkout drop.
              </p>
            </ChartCard>
            <ChartCard title="Revenue by room" subtitle="Shop-by-room collections">
              <HBars items={data.roomRevenue} format={fmt.inr} color={SERIES[1]} />
            </ChartCard>
          </div>
        </>
      )}

      {view === 'orders' && (
        <Panel title="Orders" subtitle="Click an order to view it and move it to the next stage">
          <DataTable
            rows={orders.filter((o) => status === 'All statuses' || o.status === status)}
            searchKeys={['id', 'customer', 'city']}
            onRowClick={setSel}
            columns={[
              { key: 'id', label: 'Order' },
              { key: 'date', label: 'Date', render: (o) => fmt.date(o.date) },
              { key: 'customer', label: 'Customer' },
              { key: 'city', label: 'City' },
              { key: 'items', label: 'Items', align: 'right' },
              { key: 'value', label: 'Total', align: 'right', render: (o) => fmt.inrFull(o.value) },
              { key: 'payment', label: 'Payment' },
              { key: 'status', label: 'Status', render: (o) => <StatusPill tone={TONE[o.status]}>{o.status}</StatusPill> },
            ]}
          />
        </Panel>
      )}

      {view === 'inventory' && (
        <Panel title="Variants" subtitle="Stock by colour; sort by stock to find what to restock first">
          <DataTable
            rows={data.inventory}
            searchKeys={['product', 'variant']}
            pageSize={10}
            columns={[
              { key: 'product', label: 'Product' },
              { key: 'variant', label: 'Colour' },
              { key: 'price', label: 'Price', align: 'right', render: (v) => fmt.inrFull(v.price) },
              { key: 'sold30', label: 'Sold (30d)', align: 'right' },
              { key: 'stock', label: 'In stock', align: 'right' },
              {
                key: 'cover',
                label: 'Days of cover',
                align: 'right',
                sortValue: (v) => v.stock / Math.max(v.sold30 / 30, 0.1),
                render: (v) => {
                  const days = Math.round(v.stock / Math.max(v.sold30 / 30, 0.1));
                  return <StatusPill tone={days < 7 ? 'critical' : days < 21 ? 'warning' : 'good'}>{days} days</StatusPill>;
                },
              },
            ]}
          />
        </Panel>
      )}

      {view === 'offers' && (
        <Panel title="Coupons and campaigns" subtitle="Pause or resume offers without a code change">
          <DataTable
            rows={coupons}
            rowKey="id"
            columns={[
              { key: 'id', label: 'Code', render: (c) => <span className="font-mono font-semibold">{c.id}</span> },
              { key: 'type', label: 'Offer' },
              { key: 'uses', label: 'Uses', align: 'right', render: (c) => fmt.int(c.uses) },
              { key: 'revenue', label: 'Revenue', align: 'right', render: (c) => fmt.inr(c.revenue) },
              { key: 'ends', label: 'Ends', render: (c) => fmt.date(c.ends) },
              { key: 'status', label: 'Status', render: (c) => <StatusPill tone={{ Active: 'good', Paused: 'warning', Expired: 'neutral', Scheduled: 'neutral' }[c.status]}>{c.status}</StatusPill> },
              {
                key: 'act',
                label: '',
                sort: false,
                render: (c) =>
                  ['Active', 'Paused'].includes(c.status) && (
                    <Btn variant="outline" onClick={() => setCoupons((cs) => cs.map((x) => (x.id === c.id ? { ...x, status: x.status === 'Active' ? 'Paused' : 'Active' } : x)))}>
                      {c.status === 'Active' ? 'Pause' : 'Resume'}
                    </Btn>
                  ),
              },
            ]}
          />
        </Panel>
      )}

      <Drawer open={!!sel} title={sel ? `Order ${sel.id}` : ''} onClose={() => setSel(null)}>
        {sel && (
          <div>
            <Field label="Customer">{sel.customer}</Field>
            <Field label="City">{sel.city}</Field>
            <Field label="Collection">{sel.room}</Field>
            <Field label="Items">{sel.items}</Field>
            <Field label="Total">{fmt.inrFull(sel.value)}</Field>
            <Field label="Payment">{sel.payment}</Field>
            <Field label="Status"><StatusPill tone={TONE[sel.status]}>{sel.status}</StatusPill></Field>
            <ol className="mt-5 space-y-2 text-sm">
              {['New', 'Packed', 'Shipped', 'Delivered'].map((s, i) => {
                const reached = ['New', 'Packed', 'Shipped', 'Delivered'].indexOf(sel.status) >= i;
                return (
                  <li key={s} className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${reached ? 'bg-[#0ca30c]' : 'bg-slate-200'}`} />
                    <span className={reached ? 'text-slate-900' : 'text-slate-400'}>{s}</span>
                  </li>
                );
              })}
            </ol>
            {NEXT[sel.status] && (
              <Btn size="md" className="mt-5 w-full" onClick={() => advance(sel)}>
                Mark as {NEXT[sel.status]}
              </Btn>
            )}
          </div>
        )}
      </Drawer>
    </DashShell>
  );
}
