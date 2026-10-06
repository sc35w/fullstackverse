import React, { useState } from 'react';
import { FileText, LineChart as LineIcon, Users } from 'lucide-react';
import data from '@/data/dashboards/gridmind-energy-automation-website.json';
import { BarChart, ChartCard, HBars } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { fmt, sum } from '@/components/dash/theme';

const CHANNELS = [
  { key: 'organic', label: 'Organic search' },
  { key: 'direct', label: 'Direct' },
  { key: 'paid', label: 'Paid' },
  { key: 'referral', label: 'Referral' },
  { key: 'social', label: 'Social' },
];
const STAGE_TONE = { New: 'warning', Contacted: 'neutral', 'Demo scheduled': 'serious', Proposal: 'neutral', Won: 'good' };
const CONTENT_TONE = { Published: 'good', 'In review': 'warning', Draft: 'neutral' };

export default function GridMindDashboard({ project }) {
  const [view, setView] = useState('traffic');
  const [range, setRange] = useState(30);
  const [interest, setInterest] = useState('All products');
  const [leads, setLeads] = useState(data.leads);
  const [content, setContent] = useState(data.content);
  const { cur, prev } = useRange(data.daily, range);

  const ses = sum(cur, 'sessions');
  const lds = sum(cur, 'leads');
  const conv = (lds / ses) * 100;
  const prevConv = (sum(prev, 'leads') / sum(prev, 'sessions')) * 100;
  const v = data.vitals;
  const shownLeads = leads.filter((l) => interest === 'All products' || l.interest === interest);

  const views = [
    { id: 'traffic', label: 'Website traffic', icon: LineIcon },
    { id: 'leads', label: 'Demo requests', icon: Users, badge: leads.filter((l) => l.stage === 'New').length },
    { id: 'content', label: 'Content (CMS)', icon: FileText, badge: content.filter((c) => c.status === 'In review').length },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'traffic' ? setRange : undefined}
      filters={view === 'leads' ? <Select label="Product" value={interest} onChange={setInterest} options={['All products', 'SCADA Suite', 'Energy Analytics', 'Remote monitoring']} /> : null}
    >
      {view === 'traffic' && (
        <>
          <KpiRow>
            <StatTile label="Sessions" value={fmt.compact(ses)} deltaPct={delta(ses, sum(prev, 'sessions'))} spark={cur.slice(-14).map((d) => d.sessions)} />
            <StatTile label="Demo requests" value={fmt.int(lds)} deltaPct={delta(lds, sum(prev, 'leads'))} />
            <StatTile label="Visitor → lead rate" value={fmt.pct(conv, 2)} deltaPct={conv - prevConv} deltaUnit="pts" />
            <StatTile label="Performance score" value={`${v.score}/100`} hint={`LCP ${v.lcp}s · CLS ${v.cls} · INP ${v.inp}ms`} />
          </KpiRow>
          <ChartCard title="Sessions by channel" table={{ columns: ['Date', ...CHANNELS.map((c) => c.label)], rows: cur.map((d) => [fmt.date(d.date), ...CHANNELS.map((c) => d[c.key])]) }}>
            <BarChart data={cur} xKey="date" xFormat={fmt.date} series={CHANNELS} format={fmt.compact} />
          </ChartCard>
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <Panel title="Top pages">
              <DataTable
                rows={data.pages}
                rowKey="path"
                columns={[
                  { key: 'title', label: 'Page', render: (p) => <div><div className="font-medium text-slate-900">{p.title}</div><div className="text-[10px] text-slate-400">{p.path}</div></div> },
                  { key: 'views', label: 'Views', align: 'right', render: (p) => fmt.int(p.views) },
                  { key: 'avgTime', label: 'Avg time', align: 'right', render: (p) => `${Math.floor(p.avgTime / 60)}m ${p.avgTime % 60}s` },
                  { key: 'bounce', label: 'Bounce', align: 'right', render: (p) => fmt.pct(p.bounce, 0) },
                ]}
              />
            </Panel>
            <ChartCard title="Visitors by country" subtitle="Share of sessions">
              <HBars items={data.countries} format={(x) => `${x}%`} />
            </ChartCard>
          </div>
        </>
      )}

      {view === 'leads' && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {data.stages.map((s) => (
              <div key={s} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="text-xs text-slate-500">{s}</div>
                <div className="text-2xl font-semibold text-slate-900">{shownLeads.filter((l) => l.stage === s).length}</div>
              </div>
            ))}
          </div>
          <Panel title="Demo requests" subtitle="Leads arrive from the website forms; update the stage as sales follows up">
            <DataTable
              rows={shownLeads}
              searchKeys={['name', 'company', 'role', 'source']}
              columns={[
                { key: 'date', label: 'Date', render: (l) => fmt.date(l.date) },
                { key: 'name', label: 'Contact', render: (l) => <div><div className="font-medium text-slate-900">{l.name}</div><div className="text-[10px] text-slate-500">{l.role}</div></div> },
                { key: 'company', label: 'Company' },
                { key: 'country', label: 'Country' },
                { key: 'interest', label: 'Interested in' },
                { key: 'source', label: 'Source' },
                {
                  key: 'stage',
                  label: 'Stage',
                  render: (l) => (
                    <select className="rounded-md border border-slate-200 bg-white px-1.5 py-1 text-xs" value={l.stage} onChange={(e) => setLeads((ls) => ls.map((x) => (x.id === l.id ? { ...x, stage: e.target.value } : x)))}>
                      {data.stages.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  ),
                },
                { key: 'pill', label: '', sort: false, render: (l) => <StatusPill tone={STAGE_TONE[l.stage]}>{l.stage}</StatusPill> },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'content' && (
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Panel title="Content" subtitle="Approve reviews and publish without a developer">
            <ul className="divide-y divide-slate-100">
              {content.map((c) => (
                <li key={c.id} className="flex flex-wrap items-center gap-3 py-2.5">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-900">{c.title}</div>
                    <div className="text-xs text-slate-500">{c.type} · {c.author} · updated {fmt.date(c.updated)}</div>
                  </div>
                  <StatusPill tone={CONTENT_TONE[c.status]}>{c.status}</StatusPill>
                  {c.status === 'Draft' && <Btn variant="outline" onClick={() => setContent((cs) => cs.map((x) => (x.id === c.id ? { ...x, status: 'In review' } : x)))}>Send for review</Btn>}
                  {c.status === 'In review' && <Btn onClick={() => setContent((cs) => cs.map((x) => (x.id === c.id ? { ...x, status: 'Published', updated: '2026-10-05' } : x)))}>Approve & publish</Btn>}
                  {c.status === 'Published' && <Btn variant="ghost" onClick={() => setContent((cs) => cs.map((x) => (x.id === c.id ? { ...x, status: 'Draft' } : x)))}>Unpublish</Btn>}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Core Web Vitals" subtitle="Field data from real visitors">
            <div className="space-y-4">
              <Meter label="Largest Contentful Paint" right={`${v.lcp} s`} value={2.5 - v.lcp} max={2.5} tone="good" />
              <Meter label="Cumulative Layout Shift" right={v.cls} value={0.1 - v.cls} max={0.1} tone="good" />
              <Meter label="Interaction to Next Paint" right={`${v.inp} ms`} value={200 - v.inp} max={200} tone="good" />
              <p className="text-xs text-slate-500">Bars show headroom against Google's "good" thresholds (2.5 s, 0.1, 200 ms).</p>
            </div>
          </Panel>
        </div>
      )}
    </DashShell>
  );
}
