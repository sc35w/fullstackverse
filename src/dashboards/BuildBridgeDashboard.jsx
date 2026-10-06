import React, { useState } from 'react';
import { HardHat, LayoutDashboard, ShieldCheck } from 'lucide-react';
import data from '@/data/dashboards/buildbridge-contractor-network-app.json';
import { ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, Drawer, Field, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { fmt, sum } from '@/components/dash/theme';

const JOB_TONE = { 'In progress': 'neutral', 'Awaiting approval': 'warning', Disputed: 'critical', Completed: 'good' };

export default function BuildBridgeDashboard({ project }) {
  const [view, setView] = useState('jobs');
  const [range, setRange] = useState(30);
  const [trade, setTrade] = useState('All trades');
  const [jobs, setJobs] = useState(data.jobs);
  const [contractors, setContractors] = useState(data.contractors);
  const [sel, setSel] = useState(null);
  const { cur, prev } = useRange(data.daily, range);

  const inTrade = (r) => trade === 'All trades' || r.trade === trade;
  const job = jobs.find((j) => j.id === sel);
  const release = (j) => {
    const done = j.done + 1;
    const updated = { ...j, done, escrow: Math.round((j.value * (j.milestones - done)) / j.milestones), status: done === j.milestones ? 'Completed' : 'In progress' };
    setJobs((js) => js.map((x) => (x.id === j.id ? updated : x)));
  };
  const resolve = (j) => setJobs((js) => js.map((x) => (x.id === j.id ? { ...x, status: 'In progress' } : x)));

  const views = [
    { id: 'jobs', label: 'Jobs & escrow', icon: LayoutDashboard, badge: jobs.filter((j) => j.status === 'Awaiting approval' || j.status === 'Disputed').length },
    { id: 'contractors', label: 'Contractors', icon: HardHat, badge: contractors.filter((c) => !c.verified).length },
    { id: 'growth', label: 'Marketplace', icon: ShieldCheck },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'growth' ? setRange : undefined}
      filters={view !== 'growth' ? <Select label="Trade" value={trade} onChange={setTrade} options={['All trades', ...data.trades]} /> : null}
    >
      {view === 'jobs' && (
        <>
          <KpiRow>
            <StatTile label="Active jobs" value={jobs.filter((j) => inTrade(j) && j.status !== 'Completed').length} />
            <StatTile label="Held in escrow" value={fmt.inr(sum(jobs.filter(inTrade), 'escrow'))} hint="Released milestone by milestone" />
            <StatTile label="Awaiting approval" value={jobs.filter((j) => inTrade(j) && j.status === 'Awaiting approval').length} />
            <StatTile label="Disputes" value={jobs.filter((j) => inTrade(j) && j.status === 'Disputed').length} />
          </KpiRow>
          <Panel title="Jobs" subtitle="Click a job to release the next milestone payment">
            <DataTable
              rows={jobs.filter(inTrade)}
              searchKeys={['id', 'title', 'customer', 'contractor', 'city']}
              onRowClick={(j) => setSel(j.id)}
              columns={[
                { key: 'id', label: 'Job' },
                { key: 'title', label: 'Work' },
                { key: 'customer', label: 'Homeowner' },
                { key: 'contractor', label: 'Contractor' },
                { key: 'done', label: 'Milestones', sortValue: (j) => j.done / j.milestones, render: (j) => <div className="w-32"><Meter value={j.done} max={j.milestones} right={`${j.done}/${j.milestones}`} tone={j.done === j.milestones ? 'good' : undefined} /></div> },
                { key: 'escrow', label: 'In escrow', align: 'right', render: (j) => fmt.inrFull(j.escrow) },
                { key: 'status', label: 'Status', render: (j) => <StatusPill tone={JOB_TONE[j.status]}>{j.status}</StatusPill> },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'contractors' && (
        <Panel title="Contractor directory" subtitle="Verify ID documents before a contractor can receive leads">
          <DataTable
            rows={contractors.filter(inTrade)}
            searchKeys={['name', 'trade', 'city']}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'trade', label: 'Trade' },
              { key: 'city', label: 'City' },
              { key: 'rating', label: 'Rating', align: 'right', render: (c) => `★ ${c.rating}` },
              { key: 'jobs', label: 'Jobs done', align: 'right' },
              { key: 'response', label: 'Avg response', align: 'right', render: (c) => (c.response < 60 ? `${c.response} min` : `${(c.response / 60).toFixed(1)} h`) },
              { key: 'earnings30', label: 'Earned (30d)', align: 'right', render: (c) => fmt.inr(c.earnings30) },
              {
                key: 'verified',
                label: 'Verification',
                render: (c) =>
                  c.verified ? (
                    <StatusPill tone="good">Verified</StatusPill>
                  ) : (
                    <Btn onClick={() => setContractors((cs) => cs.map((x) => (x.id === c.id ? { ...x, verified: true } : x)))}>Verify ID</Btn>
                  ),
              },
            ]}
          />
        </Panel>
      )}

      {view === 'growth' && (
        <>
          <KpiRow>
            <StatTile label="Job requests" value={fmt.int(sum(cur, 'requests'))} deltaPct={delta(sum(cur, 'requests'), sum(prev, 'requests'))} spark={cur.slice(-14).map((d) => d.requests)} />
            <StatTile label="Quotes sent" value={fmt.int(sum(cur, 'quotes'))} deltaPct={delta(sum(cur, 'quotes'), sum(prev, 'quotes'))} />
            <StatTile label="Quotes per request" value={(sum(cur, 'quotes') / sum(cur, 'requests')).toFixed(1)} hint="Homeowners compare options" />
            <StatTile label="Jobs completed" value={fmt.int(sum(cur, 'completed'))} deltaPct={delta(sum(cur, 'completed'), sum(prev, 'completed'))} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <ChartCard title="Requests and completions" table={{ columns: ['Date', 'Requests', 'Quotes', 'Completed'], rows: cur.map((d) => [fmt.date(d.date), d.requests, d.quotes, d.completed]) }}>
              <LineChart data={cur} series={[{ key: 'requests', label: 'Job requests' }, { key: 'completed', label: 'Completed' }]} format={fmt.int} />
            </ChartCard>
            <ChartCard title="Demand by trade" subtitle="Sample period">
              <HBars items={data.tradeJobs} format={fmt.int} active={trade === 'All trades' ? null : trade} onClick={(t) => setTrade(t === trade ? 'All trades' : t)} />
            </ChartCard>
          </div>
        </>
      )}

      <Drawer open={!!job} title={job ? `${job.id} · ${job.title}` : ''} onClose={() => setSel(null)}>
        {job && (
          <div>
            <Field label="Homeowner">{job.customer}</Field>
            <Field label="Contractor">{job.contractor}</Field>
            <Field label="City">{job.city}</Field>
            <Field label="Job value">{fmt.inrFull(job.value)}</Field>
            <Field label="Status"><StatusPill tone={JOB_TONE[job.status]}>{job.status}</StatusPill></Field>
            <div className="mt-5 text-sm font-semibold text-slate-900">Milestone payments</div>
            <ol className="mt-2 space-y-2">
              {[...Array(job.milestones)].map((_, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <span>Milestone {i + 1} · {fmt.inrFull(job.value / job.milestones)}</span>
                  {i < job.done ? <StatusPill tone="good">Released</StatusPill> : i === job.done ? <StatusPill tone="warning">Next</StatusPill> : <StatusPill>Held</StatusPill>}
                </li>
              ))}
            </ol>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.status === 'Disputed' ? (
                <Btn size="md" onClick={() => resolve(job)}>Mark dispute resolved</Btn>
              ) : (
                <Btn size="md" onClick={() => release(job)} disabled={job.done >= job.milestones}>Approve & release milestone {Math.min(job.done + 1, job.milestones)}</Btn>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </DashShell>
  );
}
