import React, { useMemo, useState } from 'react';
import { BarChart3, Map, Users } from 'lucide-react';
import data from '@/data/dashboards/dashdrop-same-day-courier-app.json';
import { BarChart, ChartCard, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Panel, StatTile, StatusPill, delta, useLive, useRange } from '@/components/dash/ui';
import { SERIES, STATUS, fmt, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const [GW, GH] = data.grid;
const RIDER_TONE = { Delivering: 'good', 'To pickup': 'warning', Idle: 'neutral', Offline: 'neutral' };
const RIDER_COLOR = { Delivering: SERIES[0], 'To pickup': SERIES[1], Idle: '#94A3B8', Offline: '#CBD5E1' };

// Position along a polyline route at t in [0, 1).
function along(route, t) {
  const segs = route.slice(1).map((p, i) => [route[i], p, Math.abs(p[0] - route[i][0]) + Math.abs(p[1] - route[i][1])]);
  const total = segs.reduce((a, s) => a + s[2], 0) || 1;
  let d = (t % 1) * total;
  for (const [a, b, len] of segs) {
    if (d <= len) {
      const k = len ? d / len : 0;
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    }
    d -= len;
  }
  return route[route.length - 1];
}

function CityMap({ riders, orders, t, selected, onSelectOrder, onSelectRider }) {
  // 5% inset so riders and orders on the outer streets stay fully visible.
  const X = (x) => 5 + (x / GW) * 90;
  const Y = (y) => 6 + (y / GH) * 88;
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-[#EEF2F7]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {[...Array(GW + 1)].map((_, i) => <line key={`v${i}`} x1={X(i)} x2={X(i)} y1="0" y2="100" stroke="#fff" strokeWidth={i % 4 === 0 ? 1.4 : 0.6} />)}
        {[...Array(GH + 1)].map((_, i) => <line key={`h${i}`} y1={Y(i)} y2={Y(i)} x1="0" x2="100" stroke="#fff" strokeWidth={i % 4 === 0 ? 1.4 : 0.6} />)}
        <path d="M0 62 C 20 58, 35 70, 55 64 S 85 52, 100 56" fill="none" stroke="#BFD7F2" strokeWidth="2.4" />
        {riders.filter((r) => r.status === 'Delivering' || r.status === 'To pickup').map((r) => (
          <polyline key={r.id} points={r.route.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} fill="none" stroke={RIDER_COLOR[r.status]} strokeOpacity="0.35" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {orders.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onSelectOrder(o.id)}
          title={`${o.id}: ${o.from} → ${o.to}`}
          className={cn('absolute -translate-x-1/2 -translate-y-1/2 rounded-[3px] border-2 border-white shadow', selected === o.id ? 'h-4 w-4 ring-2 ring-slate-900' : 'h-3 w-3')}
          style={{ left: `${X(o.pickup[0])}%`, top: `${Y(o.pickup[1])}%`, background: o.priority ? STATUS.critical : STATUS.warning }}
        />
      ))}
      {riders.filter((r) => r.status !== 'Offline').map((r, i) => {
        const moving = r.status === 'Delivering' || r.status === 'To pickup';
        const [x, y] = moving ? along(r.route, t / 40 + i * 0.13) : r.route[0];
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelectRider(r.id)}
            title={`${r.name} · ${r.status}`}
            className="absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white shadow transition-[left,top] duration-700 ease-linear"
            style={{ left: `${X(x)}%`, top: `${Y(y)}%`, background: RIDER_COLOR[r.status] }}
          >
            {r.name.charAt(0)}
          </button>
        );
      })}
      <div className="absolute bottom-2 left-2 flex flex-wrap gap-2 rounded-md bg-white/90 px-2 py-1 text-[10px] text-slate-600">
        {['Delivering', 'To pickup', 'Idle'].map((s) => (
          <span key={s} className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: RIDER_COLOR[s] }} />{s}</span>
        ))}
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-[2px]" style={{ background: STATUS.warning }} />Waiting order</span>
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-[2px]" style={{ background: STATUS.critical }} />Priority</span>
      </div>
    </div>
  );
}

const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

export default function DashDropDashboard({ project }) {
  const [view, setView] = useState('dispatch');
  const [range, setRange] = useState(30);
  const [live, setLive] = useState(true);
  const [t, setT] = useState(0);
  const [riders, setRiders] = useState(data.riders);
  const [orders, setOrders] = useState(data.orders);
  const [sel, setSel] = useState(data.orders[0]?.id);
  const [log, setLog] = useState([]);
  const { cur, prev } = useRange(data.daily, range);

  useLive(() => setT((x) => x + 1), 1000, live);

  const order = orders.find((o) => o.id === sel);
  const suggestions = useMemo(
    () => (order ? riders.filter((r) => r.status === 'Idle' || r.status === 'Delivering').map((r) => ({ ...r, km: dist(r.route[0], order.pickup) * 0.8 })).sort((a, b) => a.km - b.km).slice(0, 4) : []),
    [order, riders]
  );
  const assign = (rider) => {
    setOrders((os) => os.filter((o) => o.id !== order.id));
    setRiders((rs) => rs.map((r) => (r.id === rider.id ? { ...r, status: 'To pickup', route: [r.route[0], [order.pickup[0], r.route[0][1]], order.pickup, ...r.route.slice(1, 3)] } : r)));
    setLog((l) => [{ id: order.id, rider: rider.name, at: new Date().toISOString() }, ...l]);
    const next = orders.find((o) => o.id !== order.id);
    setSel(next?.id);
  };

  const deliveries = sum(cur, 'deliveries');
  const onTime = (sum(cur, 'onTime') / deliveries) * 100;
  const prevOnTime = (sum(prev, 'onTime') / Math.max(sum(prev, 'deliveries'), 1)) * 100;

  const views = [
    { id: 'dispatch', label: 'Live dispatch', icon: Map, badge: orders.length },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'riders', label: 'Riders', icon: Users },
  ];

  return (
    <DashShell name={project.name} accent={project.accent} views={views} view={view} onView={setView} range={range} onRange={view === 'performance' ? setRange : undefined} live={live} onLive={setLive}>
      {view === 'dispatch' && (
        <>
          <KpiRow>
            <StatTile label="Orders waiting" value={orders.length} hint="Unassigned pickups" />
            <StatTile label="Riders on a trip" value={riders.filter((r) => ['Delivering', 'To pickup'].includes(r.status)).length} />
            <StatTile label="Idle riders" value={riders.filter((r) => r.status === 'Idle').length} />
            <StatTile label="Assigned this session" value={log.length} />
          </KpiRow>
          <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
            <Panel title="City map · Bengaluru" subtitle="Riders move live; click an order square to dispatch it">
              <CityMap riders={riders} orders={orders} t={t} selected={sel} onSelectOrder={setSel} onSelectRider={() => setView('riders')} />
            </Panel>
            <div className="space-y-4">
              <Panel title={order ? `Dispatch ${order.id}` : 'All orders dispatched'} subtitle={order ? `${order.from} → ${order.to} · ${order.size} · ₹${order.fare}` : 'New orders will appear here'}>
                {order && (
                  <>
                    {order.priority && <div className="mb-2"><StatusPill tone="critical">Priority delivery</StatusPill></div>}
                    <div className="mb-2 text-xs font-medium text-slate-500">Nearest available riders</div>
                    <ul className="space-y-2">
                      {suggestions.map((r) => (
                        <li key={r.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 p-2">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-900">{r.name}</div>
                            <div className="text-[11px] text-slate-500">{r.vehicle} · {r.km.toFixed(1)} km away · ★ {r.rating}</div>
                          </div>
                          <Btn onClick={() => assign(r)}>Assign</Btn>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Panel>
              <Panel title="Waiting orders">
                <ul className="max-h-56 space-y-1 overflow-y-auto">
                  {orders.map((o) => (
                    <li key={o.id}>
                      <button type="button" onClick={() => setSel(o.id)} className={cn('flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs', sel === o.id ? 'bg-slate-100' : 'hover:bg-slate-50')}>
                        <span className="truncate"><b className="text-slate-900">{o.id}</b> · {o.from} → {o.to}</span>
                        <span className="shrink-0 tabular-nums text-slate-500">₹{o.fare}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </div>
        </>
      )}

      {view === 'performance' && (
        <>
          <KpiRow>
            <StatTile label="Deliveries" value={fmt.compact(deliveries)} deltaPct={delta(deliveries, sum(prev, 'deliveries'))} spark={cur.slice(-14).map((d) => d.deliveries)} />
            <StatTile label="On-time rate" value={fmt.pct(onTime)} deltaPct={onTime - prevOnTime} deltaUnit="pts" />
            <StatTile label="Revenue" value={fmt.inr(sum(cur, 'revenue'))} deltaPct={delta(sum(cur, 'revenue'), sum(prev, 'revenue'))} />
            <StatTile label="Revenue per delivery" value={`₹${Math.round(sum(cur, 'revenue') / deliveries)}`} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <ChartCard title="Deliveries per day" table={{ columns: ['Date', 'Deliveries', 'On time'], rows: cur.map((d) => [fmt.date(d.date), d.deliveries, d.onTime]) }}>
              <LineChart data={cur} series={[{ key: 'deliveries', label: 'Deliveries' }, { key: 'onTime', label: 'On time' }]} format={fmt.compact} />
            </ChartCard>
            <ChartCard title="Bookings by hour" subtitle="Lunch and evening peaks" table={{ columns: ['Hour', 'Bookings'], rows: data.hours.map((h) => [h.label, h.value]) }}>
              <BarChart data={data.hours} series={[{ key: 'value', label: 'Bookings', color: SERIES[1] }]} format={fmt.int} xFormat={(v) => v.replace(':00', 'h')} />
            </ChartCard>
          </div>
        </>
      )}

      {view === 'riders' && (
        <Panel title="Rider fleet" subtitle="Today's trips and earnings">
          <DataTable
            rows={riders}
            searchKeys={['name', 'id', 'vehicle']}
            columns={[
              { key: 'id', label: 'Rider ID' },
              { key: 'name', label: 'Name' },
              { key: 'vehicle', label: 'Vehicle' },
              { key: 'status', label: 'Status', render: (r) => <StatusPill tone={RIDER_TONE[r.status]}>{r.status}</StatusPill> },
              { key: 'trips', label: 'Trips today', align: 'right' },
              { key: 'earnings', label: 'Earnings', align: 'right', render: (r) => fmt.inrFull(r.earnings) },
              { key: 'rating', label: 'Rating', align: 'right', render: (r) => `★ ${r.rating}` },
            ]}
          />
        </Panel>
      )}
    </DashShell>
  );
}
