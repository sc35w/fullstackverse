import React, { useState } from 'react';
import { LayoutDashboard, ShieldAlert } from 'lucide-react';
import data from '@/data/dashboards/bazaarly-classifieds-marketplace.json';
import { ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { SERIES, fmt, sum } from '@/components/dash/theme';

export default function BazaarlyDashboard({ project }) {
  const [view, setView] = useState('overview');
  const [range, setRange] = useState(30);
  const [cat, setCat] = useState('All categories');
  const [queue, setQueue] = useState(data.queue);
  const [decided, setDecided] = useState({ approved: 0, removed: 0 });
  const { cur, prev } = useRange(data.daily, range);

  const decide = (id, outcome) => {
    setQueue((q) => q.filter((x) => x.id !== id));
    setDecided((d) => ({ ...d, [outcome]: d[outcome] + 1 }));
  };
  const shown = queue.filter((q) => cat === 'All categories' || q.category === cat);

  const views = [
    { id: 'overview', label: 'Marketplace', icon: LayoutDashboard },
    { id: 'moderation', label: 'Moderation', icon: ShieldAlert, badge: queue.length },
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
      filters={view === 'moderation' ? <Select label="Category" value={cat} onChange={setCat} options={['All categories', ...data.categoryAds.map((c) => c.label)]} /> : null}
    >
      {view === 'overview' && (
        <>
          <KpiRow>
            <StatTile label="New ads posted" value={fmt.compact(sum(cur, 'newAds'))} deltaPct={delta(sum(cur, 'newAds'), sum(prev, 'newAds'))} spark={cur.slice(-14).map((d) => d.newAds)} />
            <StatTile label="Buyer–seller chats" value={fmt.compact(sum(cur, 'chats'))} deltaPct={delta(sum(cur, 'chats'), sum(prev, 'chats'))} />
            <StatTile label="Promotion revenue" value={fmt.inr(sum(cur, 'promoRevenue'))} deltaPct={delta(sum(cur, 'promoRevenue'), sum(prev, 'promoRevenue'))} />
            <StatTile label="Chats per ad" value={(sum(cur, 'chats') / sum(cur, 'newAds')).toFixed(1)} hint="Marketplace liquidity" />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="New ads per day" table={{ columns: ['Date', 'New ads', 'Chats'], rows: cur.map((d) => [fmt.date(d.date), d.newAds, d.chats]) }}>
              <LineChart data={cur} series={[{ key: 'newAds', label: 'New ads' }]} format={fmt.compact} area />
            </ChartCard>
            <ChartCard title="Promotion revenue per day" table={{ columns: ['Date', 'Revenue'], rows: cur.map((d) => [fmt.date(d.date), fmt.inrFull(d.promoRevenue)]) }}>
              <LineChart data={cur} series={[{ key: 'promoRevenue', label: 'Promotion revenue', color: SERIES[1] }]} format={fmt.inr} area />
            </ChartCard>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <ChartCard title="Active ads by category">
              <HBars items={data.categoryAds} format={fmt.compact} />
            </ChartCard>
            <ChartCard title="Active ads by city">
              <HBars items={data.cityAds} format={fmt.compact} color={SERIES[2]} />
            </ChartCard>
            <ChartCard title="Revenue by promotion type" subtitle="Sample period">
              <HBars items={data.promotions} format={fmt.inr} color={SERIES[1]} />
            </ChartCard>
          </div>
        </>
      )}

      {view === 'moderation' && (
        <>
          <KpiRow>
            <StatTile label="Waiting for review" value={queue.length} />
            <StatTile label="High risk (≥ 80)" value={queue.filter((q) => q.risk >= 80).length} />
            <StatTile label="Approved this session" value={decided.approved} />
            <StatTile label="Removed this session" value={decided.removed} />
          </KpiRow>
          <Panel title="Review queue" subtitle="Ads flagged by automatic checks, highest risk first">
            {shown.length === 0 && <p className="py-10 text-center text-sm text-slate-500">Queue is clear. Nice work.</p>}
            <div className="grid gap-3 md:grid-cols-2">
              {shown.slice(0, 10).map((q) => (
                <div key={q.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">{q.title}</div>
                      <div className="text-xs text-slate-500">
                        {q.category} · {q.city} · {fmt.inrFull(q.price)} · by {q.seller}
                      </div>
                    </div>
                    <StatusPill tone={q.risk >= 80 ? 'critical' : q.risk >= 60 ? 'serious' : 'warning'}>Risk {q.risk}</StatusPill>
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    Flag: <b className="text-slate-900">{q.reason}</b>
                  </div>
                  <div className="mt-2">
                    <Meter value={q.risk} max={100} tone={q.risk >= 80 ? 'critical' : 'warning'} />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Btn variant="outline" onClick={() => decide(q.id, 'approved')}>Approve</Btn>
                    <Btn variant="danger" onClick={() => decide(q.id, 'removed')}>Remove ad</Btn>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </>
      )}
    </DashShell>
  );
}
