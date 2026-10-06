import React, { useMemo, useState } from 'react';
import { Activity, ListChecks, Pause, Play } from 'lucide-react';
import data from '@/data/dashboards/respira-ai-respiratory-screening.json';
import { ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, Field, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useLive, useRange } from '@/components/dash/ui';
import { SERIES, fmt, seqColor, sum } from '@/components/dash/theme';

const STATUS_TONE = { 'Awaiting review': 'warning', Reviewed: 'good', Referred: 'serious' };
const riskTone = (s) => (s >= 0.6 ? 'critical' : s >= 0.35 ? 'warning' : 'good');
const riskLabel = (s) => (s >= 0.6 ? 'Needs doctor' : s >= 0.35 ? 'Borderline' : 'Low concern');
const sampleFor = (p) => (p.score >= 0.6 ? 'crackles' : p.score >= 0.35 ? 'wheeze' : 'normal');

function Waveform({ wave, progress }) {
  const w = 600;
  const h = 90;
  const max = Math.max(...wave.map(Math.abs), 1);
  const pts = wave.map((v, i) => `${(i / (wave.length - 1)) * w},${h / 2 - (v / max) * (h / 2 - 4)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" preserveAspectRatio="none" aria-label="Breath sound waveform">
      <line x1="0" x2={w} y1={h / 2} y2={h / 2} stroke="#E2E8F0" />
      <polyline points={pts} fill="none" stroke={SERIES[0]} strokeWidth="1.2" />
      <line x1={progress * w} x2={progress * w} y1="0" y2={h} stroke="#0F172A" strokeWidth="2" />
    </svg>
  );
}

function Spectrogram({ spec, progress }) {
  const cols = spec[0].length;
  return (
    <div className="relative">
      <div className="grid gap-px overflow-hidden rounded-md" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {[...spec].reverse().flatMap((row, i) => row.map((v, j) => <div key={`${i}-${j}`} className="h-[5px]" style={{ background: seqColor(v) }} />))}
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-slate-900" style={{ left: `${progress * 100}%` }} />
      <div className="mt-1 flex justify-between text-[10px] text-slate-500">
        <span>0 s</span>
        <span>Frequency ↑ · darker = louder</span>
        <span>12 s</span>
      </div>
    </div>
  );
}

export default function RespiraDashboard({ project }) {
  const [view, setView] = useState('queue');
  const [range, setRange] = useState(30);
  const [clinic, setClinic] = useState('All clinics');
  const [patients, setPatients] = useState(data.patients);
  const [selId, setSelId] = useState(data.patients[0].id);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [note, setNote] = useState('');
  const { cur, prev } = useRange(data.daily, range);

  useLive(() => {
    if (progress >= 1) {
      setPlaying(false);
      setProgress(0);
    } else {
      setProgress(Math.min(1, progress + 0.02));
    }
  }, 240, playing);

  const sel = patients.find((p) => p.id === selId);
  const sample = data.samples[sampleFor(sel)];
  const inClinic = (p) => clinic === 'All clinics' || p.clinic === clinic;
  const awaiting = patients.filter((p) => p.status === 'Awaiting review');
  const decide = (status) => {
    setPatients((ps) => ps.map((p) => (p.id === selId ? { ...p, status, note } : p)));
    setNote('');
    const next = patients.find((p) => p.status === 'Awaiting review' && p.id !== selId && inClinic(p));
    if (next) {
      setSelId(next.id);
      setProgress(0);
    }
  };
  const open = (p) => {
    setSelId(p.id);
    setProgress(0);
    setPlaying(false);
    setView('review');
  };
  const flagRate = useMemo(() => (sum(cur, 'flagged') / sum(cur, 'recordings')) * 100, [cur]);

  const views = [
    { id: 'queue', label: 'Screening queue', icon: ListChecks, badge: awaiting.length },
    { id: 'review', label: 'Recording review', icon: Activity },
    { id: 'trends', label: 'Programme trends', icon: Activity },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'trends' ? setRange : undefined}
      filters={view !== 'review' ? <Select label="Clinic" value={clinic} onChange={setClinic} options={['All clinics', ...data.clinics.map((c) => c.label)]} /> : null}
    >
      {view === 'queue' && (
        <>
          <KpiRow>
            <StatTile label="Awaiting doctor review" value={awaiting.filter(inClinic).length} />
            <StatTile label="Flagged by AI (≥ 0.6)" value={patients.filter((p) => inClinic(p) && p.score >= 0.6).length} hint="Prioritised at the top" />
            <StatTile label="Referred" value={patients.filter((p) => inClinic(p) && p.status === 'Referred').length} />
            <StatTile label="Low SpO₂ (< 92%)" value={patients.filter((p) => inClinic(p) && p.spo2 < 92).length} />
          </KpiRow>
          <Panel title="Patients" subtitle="Sorted by AI screening score · click a patient to listen and review">
            <DataTable
              rows={patients.filter(inClinic)}
              searchKeys={['id', 'name', 'clinic']}
              onRowClick={open}
              columns={[
                { key: 'id', label: 'Patient' },
                { key: 'name', label: 'Name' },
                { key: 'age', label: 'Age', align: 'right', render: (p) => `${p.age} ${p.sex}` },
                { key: 'clinic', label: 'Clinic' },
                { key: 'spo2', label: 'SpO₂', align: 'right', render: (p) => `${p.spo2}%` },
                { key: 'score', label: 'AI screening', render: (p) => <StatusPill tone={riskTone(p.score)}>{riskLabel(p.score)} · {p.score.toFixed(2)}</StatusPill> },
                { key: 'status', label: 'Status', render: (p) => <StatusPill tone={STATUS_TONE[p.status]}>{p.status}</StatusPill> },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'review' && sel && (
        <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          <Panel
            title={`${sel.name} · ${sel.age} ${sel.sex}`}
            subtitle={`${sel.id} · ${sel.clinic} · recorded ${fmt.dateTime(sel.recorded)} · ${sel.site}`}
            actions={
              <Btn onClick={() => setPlaying((p) => !p)}>
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {playing ? 'Pause' : 'Play recording'}
              </Btn>
            }
          >
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-xs font-medium text-slate-500">Waveform</div>
                <Waveform wave={sample.wave} progress={progress} />
              </div>
              <div>
                <div className="mb-1 text-xs font-medium text-slate-500">Spectrogram</div>
                <Spectrogram spec={sample.spec} progress={progress} />
              </div>
              <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                {sampleFor(sel) === 'crackles' && 'Short, sharp bursts during inspiration are visible as vertical streaks in the spectrogram.'}
                {sampleFor(sel) === 'wheeze' && 'A continuous band in the middle frequencies during exhalation suggests a wheeze.'}
                {sampleFor(sel) === 'normal' && 'Smooth breathing pattern without added sounds.'}
              </div>
            </div>
          </Panel>
          <div className="space-y-4">
            <Panel title="AI screening hint">
              <Meter value={sel.score * 100} max={100} label={riskLabel(sel.score)} right={sel.score.toFixed(2)} tone={riskTone(sel.score)} />
              <p className="mt-2 text-[11px] text-slate-500">A screening aid only. The doctor makes the decision.</p>
              <div className="mt-3">
                <Field label="Symptoms">{sel.symptoms.join(', ')}</Field>
                <Field label="SpO₂">{sel.spo2}%</Field>
                <Field label="Status"><StatusPill tone={STATUS_TONE[sel.status]}>{sel.status}</StatusPill></Field>
                {sel.note && <Field label="Doctor's note">{sel.note}</Field>}
              </div>
            </Panel>
            <Panel title="Doctor's decision">
              <textarea
                className="nb-input min-h-[80px] text-sm"
                placeholder="Notes for the health worker, e.g. start bronchodilator and recheck in 3 days"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Btn onClick={() => decide('Reviewed')} disabled={sel.status !== 'Awaiting review'}>Mark reviewed</Btn>
                <Btn variant="danger" onClick={() => decide('Referred')} disabled={sel.status !== 'Awaiting review'}>Refer to hospital</Btn>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">{awaiting.length} recordings left in the queue.</p>
            </Panel>
          </div>
        </div>
      )}

      {view === 'trends' && (
        <>
          <KpiRow>
            <StatTile label="Recordings" value={fmt.int(sum(cur, 'recordings'))} deltaPct={delta(sum(cur, 'recordings'), sum(prev, 'recordings'))} spark={cur.slice(-14).map((d) => d.recordings)} />
            <StatTile label="Flag rate" value={fmt.pct(flagRate)} />
            <StatTile label="Reviewed by doctors" value={fmt.int(sum(cur, 'reviewed'))} deltaPct={delta(sum(cur, 'reviewed'), sum(prev, 'reviewed'))} />
            <StatTile label="Review coverage" value={fmt.pct((sum(cur, 'reviewed') / sum(cur, 'recordings')) * 100, 0)} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <ChartCard title="Recordings per day" table={{ columns: ['Date', 'Recordings', 'Flagged', 'Reviewed'], rows: cur.map((d) => [fmt.date(d.date), d.recordings, d.flagged, d.reviewed]) }}>
              <LineChart data={cur} series={[{ key: 'recordings', label: 'Recordings' }, { key: 'flagged', label: 'Flagged by AI' }]} format={fmt.int} />
            </ChartCard>
            <ChartCard title="Recordings by clinic" subtitle="Sample period">
              <HBars items={data.clinics} format={fmt.int} />
            </ChartCard>
          </div>
        </>
      )}
    </DashShell>
  );
}
