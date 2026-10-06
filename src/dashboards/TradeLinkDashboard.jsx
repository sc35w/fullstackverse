import React, { useMemo, useState } from 'react';
import { BadgePercent, LayoutDashboard, Wallet } from 'lucide-react';
import data from '@/data/dashboards/tradelink-distributor-ordering-app.json';
import { BarChart, ChartCard, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Meter, Panel, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { SERIES, STATUS, fmt, sum } from '@/components/dash/theme';

const TONE = { 'Credit hold': 'critical', Confirmed: 'warning', Packed: 'neutral', Dispatched: 'neutral', Delivered: 'good', Rejected: 'neutral' };
const AGING_SERIES = [
  { key: 'b0', label: '0–30 days', color: SERIES[0] },
  { key: 'b1', label: '31–60 days', color: SERIES[3] },
  { key: 'b2', label: '61–90 days', color: STATUS.serious },
  { key: 'b3', label: '90+ days', color: STATUS.critical },
];

export default function TradeLinkDashboard({ project }) {
  const [view, setView] = useState('orders');
  const [range, setRange] = useState(30);
  const [orders, setOrders] = useState(data.orders);
  const { cur, prev } = useRange(data.daily, range);

  const val = sum(cur, 'orderValue');
  const col = sum(cur, 'collections');
  const holds = orders.filter((o) => o.status === 'Credit hold');
  const setStatus = (id, status) => setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
  const aging = useMemo(
    () => [...data.dealers].sort((a, b) => b.outstanding - a.outstanding).slice(0, 12).map((d) => ({ label: d.name.split(' ')[0] + ' · ' + d.town, b0: d.aging[0], b1: d.aging[1], b2: d.aging[2], b3: d.aging[3] })),
    []
  );

  const views = [
    { id: 'orders', label: 'Dealer orders', icon: LayoutDashboard, badge: holds.length },
    { id: 'credit', label: 'Credit & collections', icon: Wallet },
    { id: 'schemes', label: 'Schemes', icon: BadgePercent },
  ];

  return (
    <DashShell name={project.name} accent={project.accent} views={views} view={view} onView={setView} range={range} onRange={view !== 'schemes' ? setRange : undefined}>
      {view === 'orders' && (
        <>
          <KpiRow>
            <StatTile label="Order value" value={fmt.inr(val)} deltaPct={delta(val, sum(prev, 'orderValue'))} spark={cur.slice(-14).map((d) => d.orderValue)} />
            <StatTile label="Orders from dealers" value={fmt.int(sum(cur, 'orders'))} deltaPct={delta(sum(cur, 'orders'), sum(prev, 'orders'))} />
            <StatTile label="On credit hold" value={holds.length} hint="Would exceed the dealer's credit limit" />
            <StatTile label="Active dealers" value={data.dealers.length} />
          </KpiRow>
          <ChartCard title="Order value per day" subtitle="Orders placed in the dealer app" table={{ columns: ['Date', 'Order value', 'Orders'], rows: cur.map((d) => [fmt.date(d.date), fmt.inrFull(d.orderValue), d.orders]) }}>
            <BarChart data={cur} xKey="date" xFormat={fmt.date} series={[{ key: 'orderValue', label: 'Order value' }]} format={fmt.inr} />
          </ChartCard>
          <Panel title="Today's orders" subtitle="Approve or reject orders held for credit">
            <DataTable
              rows={orders}
              searchKeys={['id', 'dealer', 'town', 'topSku']}
              columns={[
                { key: 'id', label: 'Order' },
                { key: 'dealer', label: 'Dealer' },
                { key: 'town', label: 'Town' },
                { key: 'topSku', label: 'Main item' },
                { key: 'lines', label: 'Lines', align: 'right' },
                { key: 'value', label: 'Value', align: 'right', render: (o) => fmt.inrFull(o.value) },
                { key: 'status', label: 'Status', render: (o) => <StatusPill tone={TONE[o.status]}>{o.status}</StatusPill> },
                {
                  key: 'act',
                  label: '',
                  sort: false,
                  render: (o) =>
                    o.status === 'Credit hold' && (
                      <div className="flex gap-1.5">
                        <Btn onClick={() => setStatus(o.id, 'Confirmed')}>Approve</Btn>
                        <Btn variant="danger" onClick={() => setStatus(o.id, 'Rejected')}>Reject</Btn>
                      </div>
                    ),
                },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'credit' && (
        <>
          <KpiRow>
            <StatTile label="Total outstanding" value={fmt.inr(sum(data.dealers, 'outstanding'))} />
            <StatTile label="Collected" value={fmt.inr(col)} deltaPct={delta(col, sum(prev, 'collections'))} />
            <StatTile label="Over 90 days" value={fmt.inr(sum(data.dealers.map((d) => d.aging[3])))} hint="Needs follow-up" />
            <StatTile label="Dealers over limit" value={data.dealers.filter((d) => d.outstanding > d.limit).length} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Collections per day" table={{ columns: ['Date', 'Collected'], rows: cur.map((d) => [fmt.date(d.date), fmt.inrFull(d.collections)]) }}>
              <LineChart data={cur} series={[{ key: 'collections', label: 'Collections', color: SERIES[2] }]} format={fmt.inr} area />
            </ChartCard>
            <ChartCard
              title="Outstanding by age"
              subtitle="Top 12 dealers by balance"
              table={{ columns: ['Dealer', ...AGING_SERIES.map((s) => s.label)], rows: aging.map((a) => [a.label, ...AGING_SERIES.map((s) => fmt.inrFull(a[s.key]))]) }}
            >
              <BarChart data={aging} series={AGING_SERIES} format={fmt.inr} xFormat={(v) => v.split(' ')[0]} />
            </ChartCard>
          </div>
          <Panel title="Dealer credit" subtitle="Balance against credit limit">
            <DataTable
              rows={data.dealers}
              searchKeys={['name', 'town', 'rep']}
              columns={[
                { key: 'name', label: 'Dealer' },
                { key: 'town', label: 'Town' },
                { key: 'rep', label: 'Sales rep' },
                {
                  key: 'outstanding',
                  label: 'Credit used',
                  sortValue: (d) => d.outstanding / d.limit,
                  render: (d) => (
                    <div className="w-44">
                      <Meter value={d.outstanding} max={d.limit} right={`${Math.round((d.outstanding / d.limit) * 100)}%`} tone={d.outstanding > d.limit ? 'critical' : d.outstanding > d.limit * 0.8 ? 'warning' : undefined} />
                    </div>
                  ),
                },
                { key: 'limit', label: 'Limit', align: 'right', render: (d) => fmt.inr(d.limit) },
                { key: 'orders30', label: 'Orders (30d)', align: 'right' },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'schemes' && (
        <Panel title="Trade schemes" subtitle="Offers pushed to dealers in the app">
          <div className="grid gap-3 md:grid-cols-2">
            {data.schemes.map((s) => (
              <div key={s.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-900">{s.name}</div>
                  <StatusPill tone={{ Live: 'good', Ended: 'neutral', Scheduled: 'warning' }[s.status]}>{s.status}</StatusPill>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-slate-500">Dealers enrolled</div>
                    <div className="text-lg font-semibold text-slate-900">{s.dealers}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Order uplift</div>
                    <div className="text-lg font-semibold text-slate-900">{s.uplift ? `+${s.uplift}%` : '—'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </DashShell>
  );
}
