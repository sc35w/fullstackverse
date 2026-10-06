import React, { useRef, useState } from 'react';
import { CheckSquare, FolderKanban, Pause, Play, Square, Undo2 } from 'lucide-react';
import data from '@/data/dashboards/framewise-video-annotation-platform.json';
import { ChartCard, HBars, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useLive, useRange } from '@/components/dash/ui';
import { SERIES, fmt, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const CLASS_COLOR = { person: SERIES[0], car: SERIES[1], truck: SERIES[6], bike: SERIES[5], helmet: SERIES[3], forklift: SERIES[7] };
const TONE = { Approved: 'good', 'In review': 'warning', Labelling: 'neutral', 'Changes requested': 'serious', 'Not started': 'neutral' };

function Annotator() {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hidden, setHidden] = useState({});
  const [cls, setCls] = useState('person');
  const [mine, setMine] = useState([]);
  const [draft, setDraft] = useState(null);
  const ref = useRef(null);

  useLive(() => setFrame((f) => (f + 1) % data.frames), 160, playing);

  const pos = (e) => {
    const r = ref.current.getBoundingClientRect();
    return [Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))];
  };
  const down = (e) => {
    setPlaying(false);
    const [x, y] = pos(e);
    setDraft({ x0: x, y0: y, x1: x, y1: y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    if (!draft) return;
    const [x, y] = pos(e);
    setDraft((d) => ({ ...d, x1: x, y1: y }));
  };
  const up = () => {
    if (draft && Math.abs(draft.x1 - draft.x0) > 0.02 && Math.abs(draft.y1 - draft.y0) > 0.02) {
      setMine((m) => [...m, { id: Date.now(), cls, frame, x: Math.min(draft.x0, draft.x1), y: Math.min(draft.y0, draft.y1), w: Math.abs(draft.x1 - draft.x0), h: Math.abs(draft.y1 - draft.y0) }]);
    }
    setDraft(null);
  };

  const box = (b, color, label, key, dashed) => (
    <div key={key} className={cn('pointer-events-none absolute rounded-[2px] border-2', dashed && 'border-dashed')} style={{ left: `${b.x * 100}%`, top: `${b.y * 100}%`, width: `${b.w * 100}%`, height: `${b.h * 100}%`, borderColor: color }}>
      <span className="absolute -top-4 left-0 whitespace-nowrap rounded-[2px] px-1 text-[9px] font-semibold text-white" style={{ background: color }}>{label}</span>
    </div>
  );

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_260px]">
      <Panel title="CLIP-1407 · Warehouse safety v4" subtitle="Drag on the frame to draw a box with the selected class">
        <div
          ref={ref}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          className="relative aspect-video w-full cursor-crosshair touch-none select-none overflow-hidden rounded-lg bg-slate-700"
        >
          {/* simple warehouse scene */}
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-slate-600" />
          <div className="absolute bottom-[38%] left-[2%] h-[46%] w-[20%] bg-slate-500/60" />
          <div className="absolute bottom-[38%] right-[3%] h-[52%] w-[16%] bg-slate-500/50" />
          <div className="absolute bottom-[38%] left-[40%] h-[28%] w-[12%] bg-amber-700/50" />
          {data.tracks.filter((t) => !hidden[t.cls]).map((t) => {
            const [x, y, w, h] = t.boxes[frame];
            return box({ x, y, w, h }, CLASS_COLOR[t.cls], `${t.cls} #${t.id}`, t.id);
          })}
          {mine.filter((m) => m.frame === frame && !hidden[m.cls]).map((m) => box(m, CLASS_COLOR[m.cls], `${m.cls} (you)`, m.id, true))}
          {draft && box({ x: Math.min(draft.x0, draft.x1), y: Math.min(draft.y0, draft.y1), w: Math.abs(draft.x1 - draft.x0), h: Math.abs(draft.y1 - draft.y0) }, CLASS_COLOR[cls], cls, 'draft', true)}
          <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] tabular-nums text-white">frame {frame + 1}/{data.frames}</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Btn variant="outline" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? 'Pause' : 'Play'}
          </Btn>
          <input type="range" min="0" max={data.frames - 1} value={frame} onChange={(e) => { setPlaying(false); setFrame(+e.target.value); }} className="flex-1 accent-slate-900" aria-label="Frame" />
        </div>
        <div className="mt-2 flex gap-[2px]">
          {[...Array(data.frames)].map((_, i) => (
            <button key={i} type="button" onClick={() => setFrame(i)} aria-label={`Frame ${i + 1}`} className={cn('h-2 flex-1 rounded-[1px]', i === frame ? 'bg-slate-900' : mine.some((m) => m.frame === i) ? 'bg-[#eda100]' : 'bg-slate-200')} />
          ))}
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Tracked objects are interpolated between keyframes; yellow ticks mark frames with your boxes.</p>
      </Panel>
      <div className="space-y-4">
        <Panel title="Classes" subtitle="Pick a class to draw · eye to show/hide">
          <ul className="space-y-1">
            {data.classNames.map((c) => (
              <li key={c} className={cn('flex items-center gap-2 rounded-lg px-2 py-1.5', cls === c && 'bg-slate-100')}>
                <button type="button" onClick={() => setCls(c)} className="flex flex-1 items-center gap-2 text-left text-sm">
                  <span className="h-3 w-3 rounded-[2px]" style={{ background: CLASS_COLOR[c] }} />
                  {c}
                </button>
                <button type="button" onClick={() => setHidden((h) => ({ ...h, [c]: !h[c] }))} className="text-slate-400 hover:text-slate-700" aria-label={`${hidden[c] ? 'Show' : 'Hide'} ${c}`}>
                  {hidden[c] ? <Square className="h-4 w-4" /> : <CheckSquare className="h-4 w-4" />}
                </button>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={`Your labels (${mine.length})`} actions={<Btn variant="ghost" onClick={() => setMine((m) => m.slice(0, -1))} disabled={!mine.length}><Undo2 className="h-3.5 w-3.5" />Undo</Btn>}>
          {mine.length === 0 ? (
            <p className="text-xs text-slate-500">No boxes yet. Drag on the frame to add one.</p>
          ) : (
            <ul className="max-h-40 space-y-1 overflow-y-auto text-xs">
              {mine.map((m) => (
                <li key={m.id} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: CLASS_COLOR[m.cls] }} />
                  {m.cls} · frame {m.frame + 1}
                </li>
              ))}
            </ul>
          )}
          <Btn className="mt-3 w-full" disabled={!mine.length} onClick={() => setMine([])}>Submit {mine.length || ''} for review</Btn>
        </Panel>
      </div>
    </div>
  );
}

export default function FramewiseDashboard({ project }) {
  const [view, setView] = useState('projects');
  const [range, setRange] = useState(30);
  const [dataset, setDataset] = useState('All datasets');
  const [clips, setClips] = useState(data.clips);
  const { cur, prev } = useRange(data.daily, range);

  const datasets = ['All datasets', ...new Set(data.clips.map((c) => c.dataset))];
  const inSet = (c) => dataset === 'All datasets' || c.dataset === dataset;
  const review = clips.filter((c) => c.status === 'In review');
  const setStatus = (id, status) => setClips((cs) => cs.map((c) => (c.id === id ? { ...c, status } : c)));
  const rejRate = (sum(cur, 'rejected') / sum(cur, 'labels')) * 100;
  const prevRej = (sum(prev, 'rejected') / Math.max(sum(prev, 'labels'), 1)) * 100;

  const views = [
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'annotate', label: 'Annotate', icon: Square },
    { id: 'review', label: 'Review queue', icon: CheckSquare, badge: review.length },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'projects' ? setRange : undefined}
      filters={view !== 'annotate' ? <Select label="Dataset" value={dataset} onChange={setDataset} options={datasets} /> : null}
    >
      {view === 'projects' && (
        <>
          <KpiRow>
            <StatTile label="Labels created" value={fmt.compact(sum(cur, 'labels'))} deltaPct={delta(sum(cur, 'labels'), sum(prev, 'labels'))} spark={cur.slice(-14).map((d) => d.labels)} />
            <StatTile label="Frames completed" value={fmt.compact(sum(cur, 'frames'))} deltaPct={delta(sum(cur, 'frames'), sum(prev, 'frames'))} />
            <StatTile label="Rejection rate" value={fmt.pct(rejRate)} deltaPct={rejRate - prevRej} deltaUnit="pts" upIsGood={false} />
            <StatTile label="Clips approved" value={`${clips.filter((c) => inSet(c) && c.status === 'Approved').length}/${clips.filter(inSet).length}`} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <ChartCard title="Labels per day" table={{ columns: ['Date', 'Labels', 'Frames', 'Rejected'], rows: cur.map((d) => [fmt.date(d.date), d.labels, d.frames, d.rejected]) }}>
              <LineChart data={cur} series={[{ key: 'labels', label: 'Labels' }]} format={fmt.compact} area />
            </ChartCard>
            <ChartCard title="Labels by class" subtitle="Dataset balance">
              <HBars items={[...data.classes].sort((a, b) => b.value - a.value).map((c) => ({ ...c, color: CLASS_COLOR[c.label] }))} format={fmt.compact} />
            </ChartCard>
          </div>
          <Panel title="Clips" subtitle="Progress and inter-annotator agreement">
            <DataTable
              rows={clips.filter(inSet)}
              searchKeys={['id', 'dataset', 'assignee']}
              columns={[
                { key: 'id', label: 'Clip' },
                { key: 'dataset', label: 'Dataset' },
                { key: 'assignee', label: 'Assignee' },
                { key: 'done', label: 'Progress', sortValue: (c) => c.done / c.frames, render: (c) => <div className="w-36"><Meter value={c.done} max={c.frames} right={`${Math.round((c.done / c.frames) * 100)}%`} /></div> },
                { key: 'labels', label: 'Labels', align: 'right', render: (c) => fmt.int(c.labels) },
                { key: 'agreement', label: 'Agreement', align: 'right', render: (c) => fmt.pct(c.agreement * 100, 0) },
                { key: 'status', label: 'Status', render: (c) => <StatusPill tone={TONE[c.status]}>{c.status}</StatusPill> },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'annotate' && <Annotator />}

      {view === 'review' && (
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Panel title="Waiting for review" subtitle="Approve clips or send them back with changes">
            {review.filter(inSet).length === 0 && <p className="py-8 text-center text-sm text-slate-500">Nothing left to review.</p>}
            <ul className="divide-y divide-slate-100">
              {review.filter(inSet).map((c) => (
                <li key={c.id} className="flex flex-wrap items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-900">{c.id} · {c.dataset}</div>
                    <div className="text-xs text-slate-500">{c.assignee} · {fmt.int(c.labels)} labels · agreement {Math.round(c.agreement * 100)}%</div>
                  </div>
                  <Btn variant="outline" onClick={() => setStatus(c.id, 'Changes requested')}>Request changes</Btn>
                  <Btn onClick={() => setStatus(c.id, 'Approved')}>Approve</Btn>
                </li>
              ))}
            </ul>
          </Panel>
          <ChartCard title="Annotator output" subtitle="Labels in the sample period">
            <HBars items={[...data.annotators].sort((a, b) => b.value - a.value)} format={fmt.compact} />
          </ChartCard>
        </div>
      )}
    </DashShell>
  );
}
