import React, { useState } from 'react';
import { AlertTriangle, LayoutDashboard, ShieldCheck } from 'lucide-react';
import data from '@/data/dashboards/paynest-digital-wallet-app.json';
import { ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useLive, useRange } from '@/components/dash/ui';
import { SERIES, fmt, sum } from '@/components/dash/theme';

const REFUND_TONE = { 'Auto-refunded': 'good', 'Refund pending': 'warning', 'Not applicable': 'neutral', 'Refund initiated': 'good' };
const SIGNALS = ['Velocity: 9 txns in 2 min', 'New device + high value transfer', 'Beneficiary added and paid within 1 min', 'Location jump: 2 cities in 10 min'];

export default function PayNestDashboard({ project }) {
  const [view, setView] = useState('overview');
  const [range, setRange] = useState(30);
  const [live, setLive] = useState(true);
  const [failed, setFailed] = useState(data.failed);
  const [fraud, setFraud] = useState(data.fraud);
  const [type, setType] = useState('All types');
  const { cur, prev } = useRange(data.daily, range);

  useLive(() => {
    if (Math.random() < 0.4) {
      setFraud((f) => [
        { id: `FR-L${Date.now()}`, user: ['Kavya R.', 'Imran K.', 'Rohan M.', 'Sneha P.'][Math.floor(Math.random() * 4)], amount: Math.round(5 + Math.random() * 60) * 1000, signal: SIGNALS[Math.floor(Math.random() * SIGNALS.length)], score: Math.round(65 + Math.random() * 34), ts: new Date().toISOString(), status: 'Pending', fresh: true },
        ...f,
      ]);
    }
  }, 6000, live);

  const vol = sum(cur, 'volume');
  const tx = sum(cur, 'txns');
  const fail = sum(cur, 'failed');
  const succ = 100 - (fail / tx) * 100;
  const prevSucc = 100 - (sum(prev, 'failed') / sum(prev, 'txns')) * 100;
  const pending = fraud.filter((f) => f.status === 'Pending');
  const decide = (id, status) => setFraud((fs) => fs.map((f) => (f.id === id ? { ...f, status, fresh: false } : f)));

  const views = [
    { id: 'overview', label: 'Payments', icon: LayoutDashboard },
    { id: 'failed', label: 'Failed transactions', icon: AlertTriangle, badge: failed.filter((f) => f.refund === 'Refund pending').length },
    { id: 'fraud', label: 'Fraud review', icon: ShieldCheck, badge: pending.length },
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
      live={live}
      onLive={view === 'fraud' ? setLive : undefined}
      filters={view === 'failed' ? <Select label="Type" value={type} onChange={setType} options={['All types', 'Bill pay', 'Send money', 'Recharge', 'Scan & pay']} /> : null}
    >
      {view === 'overview' && (
        <>
          <KpiRow>
            <StatTile label="Payment volume" value={fmt.inr(vol)} deltaPct={delta(vol, sum(prev, 'volume'))} spark={cur.slice(-14).map((d) => d.volume)} />
            <StatTile label="Transactions" value={fmt.compact(tx)} deltaPct={delta(tx, sum(prev, 'txns'))} />
            <StatTile label="Success rate" value={fmt.pct(succ, 2)} deltaPct={succ - prevSucc} deltaUnit="pts" />
            <StatTile label="New users" value={fmt.compact(sum(cur, 'newUsers'))} deltaPct={delta(sum(cur, 'newUsers'), sum(prev, 'newUsers'))} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Daily payment volume" table={{ columns: ['Date', 'Volume', 'Transactions'], rows: cur.map((d) => [fmt.date(d.date), fmt.inrFull(d.volume), fmt.int(d.txns)]) }}>
              <LineChart data={cur} series={[{ key: 'volume', label: 'Volume' }]} format={fmt.inr} area />
            </ChartCard>
            <ChartCard title="Success rate" subtitle="Share of transactions completed" table={{ columns: ['Date', 'Success rate'], rows: cur.map((d) => [fmt.date(d.date), fmt.pct(d.successRate, 2)]) }}>
              <LineChart data={cur} series={[{ key: 'successRate', label: 'Success rate', color: SERIES[2] }]} format={(v) => `${v.toFixed(0)}%`} yMax={100} threshold={{ value: 98.5, label: 'SLA 98.5%' }} />
            </ChartCard>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Bill payments by category" subtitle="Sample period">
              <HBars items={data.billers} format={fmt.inr} />
            </ChartCard>
            <ChartCard title="Payment mix" subtitle="Share of transactions">
              <div className="space-y-3">
                {data.mix.map((m) => (
                  <Meter key={m.label} label={m.label} right={`${m.value}%`} value={m.value} max={100} />
                ))}
              </div>
            </ChartCard>
          </div>
        </>
      )}

      {view === 'failed' && (
        <Panel title="Failed transactions" subtitle="Trigger refunds for payments still pending">
          <DataTable
            rows={failed.filter((f) => type === 'All types' || f.type === type)}
            searchKeys={['id', 'user', 'reason']}
            columns={[
              { key: 'id', label: 'Transaction' },
              { key: 'ts', label: 'Time', render: (f) => fmt.dateTime(f.ts) },
              { key: 'user', label: 'User' },
              { key: 'type', label: 'Type' },
              { key: 'amount', label: 'Amount', align: 'right', render: (f) => fmt.inrFull(f.amount) },
              { key: 'reason', label: 'Failure reason' },
              { key: 'refund', label: 'Refund', render: (f) => <StatusPill tone={REFUND_TONE[f.refund]}>{f.refund}</StatusPill> },
              {
                key: 'act',
                label: '',
                sort: false,
                render: (f) => f.refund === 'Refund pending' && <Btn onClick={() => setFailed((fs) => fs.map((x) => (x.id === f.id ? { ...x, refund: 'Refund initiated' } : x)))}>Refund now</Btn>,
              },
            ]}
          />
        </Panel>
      )}

      {view === 'fraud' && (
        <>
          <KpiRow>
            <StatTile label="Pending review" value={pending.length} />
            <StatTile label="Amount at risk" value={fmt.inrFull(sum(pending, 'amount'))} />
            <StatTile label="Blocked this session" value={fraud.filter((f) => f.status === 'Blocked').length} />
            <StatTile label="Allowed this session" value={fraud.filter((f) => f.status === 'Allowed').length} />
          </KpiRow>
          <Panel title="Fraud review queue" subtitle={live ? 'New risk signals arrive automatically' : 'Paused'}>
            <ul className="divide-y divide-slate-100">
              {fraud.slice(0, 14).map((f) => (
                <li key={f.id} className={`flex flex-wrap items-center gap-3 py-2.5 ${f.fresh ? 'bg-blue-50/40' : ''}`}>
                  <div className="w-24">
                    <StatusPill tone={f.score >= 85 ? 'critical' : 'serious'}>Risk {f.score}</StatusPill>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-900">{f.signal}</div>
                    <div className="text-xs text-slate-500">{f.user} · {fmt.inrFull(f.amount)} · {fmt.time(f.ts)}</div>
                  </div>
                  {f.status === 'Pending' ? (
                    <div className="flex gap-1.5">
                      <Btn variant="outline" onClick={() => decide(f.id, 'Allowed')}>Allow</Btn>
                      <Btn variant="danger" onClick={() => decide(f.id, 'Blocked')}>Block & freeze</Btn>
                    </div>
                  ) : (
                    <StatusPill tone={f.status === 'Blocked' ? 'critical' : 'good'}>{f.status}</StatusPill>
                  )}
                </li>
              ))}
            </ul>
          </Panel>
        </>
      )}
    </DashShell>
  );
}
