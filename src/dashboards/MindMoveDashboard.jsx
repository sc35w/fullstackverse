import React, { useState } from 'react';
import { Activity, CalendarCheck, Dumbbell, Trophy } from 'lucide-react';
import data from '@/data/dashboards/mindmove-fitness-mindfulness-app.json';
import { BarChart, ChartCard, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, KpiRow, Meter, Panel, StatTile, useRange } from '@/components/dash/ui';
import { SERIES, avg, fmt, seqColor } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const MOODS = ['😞', '😕', '😐', '🙂', '😄'];

// Consecutive days up to today; if today isn't done yet, the streak runs to yesterday.
function streak(log) {
  let n = 0;
  let i = log.at(-1) ? log.length - 1 : log.length - 2;
  for (; i >= 0 && log[i]; i--) n++;
  return n;
}

export default function MindMoveDashboard({ project }) {
  const [view, setView] = useState('today');
  const [range, setRange] = useState(30);
  const [log, setLog] = useState(() => Object.fromEntries(Object.entries(data.habitLog).map(([k, v]) => [k, [...v.slice(0, -1), 0]])));
  const [mood, setMood] = useState(null);
  const [workouts, setWorkouts] = useState(data.workouts);
  const [form, setForm] = useState({ kind: 'Run', minutes: '30' });
  const [mySteps, setMySteps] = useState(data.challenge.find((c) => c.name === 'You').value);
  const { cur } = useRange(data.daily, range);
  const today = data.daily.at(-1);
  const g = data.goals;

  const toggle = (id) => setLog((l) => ({ ...l, [id]: [...l[id].slice(0, -1), l[id].at(-1) ? 0 : 1] }));
  const doneToday = data.habits.filter((h) => log[h.id].at(-1)).length;
  const moodGrid = cur.slice(-35);
  const board = data.challenge.map((c) => (c.name === 'You' ? { ...c, value: mySteps } : c)).sort((a, b) => b.value - a.value);
  const addWorkout = () => {
    const mins = Math.max(5, Number(form.minutes) || 0);
    setWorkouts((w) => [{ id: `W-new-${Date.now()}`, kind: form.kind, date: '2026-10-05', minutes: mins, calories: Math.round(mins * 7.5), effort: 6, fresh: true }, ...w]);
  };

  const views = [
    { id: 'today', label: 'Today', icon: CalendarCheck, badge: data.habits.length - doneToday },
    { id: 'trends', label: 'Trends', icon: Activity },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'challenge', label: 'Challenge', icon: Trophy },
  ];

  return (
    <DashShell name={project.name} accent={project.accent} views={views} view={view} onView={setView} range={range} onRange={view === 'trends' ? setRange : undefined}>
      {view === 'today' && (
        <>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <Panel title="Today's goals" subtitle="Synced from your phone and watch">
              <div className="space-y-4">
                <Meter label="Steps" value={today.steps} max={g.steps} right={`${fmt.int(today.steps)} / ${fmt.int(g.steps)}`} tone={today.steps >= g.steps ? 'good' : undefined} />
                <Meter label="Active minutes" value={today.activeMin} max={g.activeMin} right={`${today.activeMin} / ${g.activeMin}`} tone={today.activeMin >= g.activeMin ? 'good' : undefined} />
                <Meter label="Sleep last night" value={today.sleep} max={g.sleep} right={`${today.sleep.toFixed(1)} h / ${g.sleep} h`} tone={today.sleep >= g.sleep ? 'good' : undefined} />
                <Meter label="Mindful minutes" value={today.mindful} max={g.mindful} right={`${today.mindful} / ${g.mindful}`} tone={today.mindful >= g.mindful ? 'good' : undefined} />
              </div>
            </Panel>
            <Panel title={`Habits · ${doneToday}/${data.habits.length} done`} subtitle="Tap to check off; streaks update instantly">
              <ul className="space-y-2">
                {data.habits.map((h) => {
                  const done = !!log[h.id].at(-1);
                  return (
                    <li key={h.id}>
                      <button
                        type="button"
                        onClick={() => toggle(h.id)}
                        className={cn('flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-colors', done ? 'border-[#56603A]/40 bg-[#E9EBDD]' : 'border-slate-200 hover:bg-slate-50')}
                      >
                        <span className={cn('flex h-5 w-5 items-center justify-center rounded-full border-2 text-[11px] font-bold', done ? 'border-[#56603A] bg-[#56603A] text-white' : 'border-slate-300')}>{done ? '✓' : ''}</span>
                        <span className="flex-1 text-sm text-slate-900">{h.name}</span>
                        <span className="text-xs text-slate-500">🔥 {streak(log[h.id])} day streak</span>
                      </button>
                      <div className="mt-1 flex gap-[3px] pl-8">
                        {log[h.id].slice(-21).map((v, i) => (
                          <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: v ? '#56603A' : '#E2E8F0' }} />
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Panel>
          </div>
          <Panel title="How are you feeling?" subtitle="A quick check-in helps you spot patterns with sleep and activity">
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m, i) => (
                <button key={m} type="button" onClick={() => setMood(i)} className={cn('h-12 w-12 rounded-xl border text-2xl transition-colors', mood === i ? 'border-slate-900 bg-slate-100' : 'border-slate-200 hover:bg-slate-50')} aria-label={`Mood ${i + 1} of 5`}>
                  {m}
                </button>
              ))}
              {mood != null && <p className="self-center text-sm text-slate-600">Saved. On days you slept 7+ hours your average mood was {avg(data.daily.filter((d) => d.sleep > 7), 'mood').toFixed(1)}/5.</p>}
            </div>
          </Panel>
        </>
      )}

      {view === 'trends' && (
        <>
          <KpiRow>
            <StatTile label="Average steps" value={fmt.int(avg(cur, 'steps'))} hint={`${cur.filter((d) => d.steps >= g.steps).length} days hit goal`} spark={cur.slice(-14).map((d) => d.steps)} />
            <StatTile label="Average sleep" value={`${avg(cur, 'sleep').toFixed(1)} h`} />
            <StatTile label="Active minutes" value={fmt.int(cur.reduce((a, d) => a + d.activeMin, 0))} />
            <StatTile label="Average mood" value={`${avg(cur, 'mood').toFixed(1)} / 5`} />
          </KpiRow>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Daily steps" table={{ columns: ['Date', 'Steps'], rows: cur.map((d) => [fmt.date(d.date), fmt.int(d.steps)]) }}>
              <BarChart data={cur} xKey="date" xFormat={fmt.date} series={[{ key: 'steps', label: 'Steps' }]} format={fmt.compact} />
            </ChartCard>
            <ChartCard title="Sleep" table={{ columns: ['Date', 'Hours'], rows: cur.map((d) => [fmt.date(d.date), d.sleep.toFixed(1)]) }}>
              <LineChart data={cur} series={[{ key: 'sleep', label: 'Sleep (hours)', color: SERIES[6] }]} format={(v) => `${v.toFixed(0)}h`} yMax={10} threshold={{ value: g.sleep, label: `Goal ${g.sleep}h` }} />
            </ChartCard>
          </div>
          <ChartCard title="Mood calendar" subtitle="Last 5 weeks · darker = better mood">
            <div className="grid grid-cols-7 gap-1.5 sm:max-w-md">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} className="text-center text-[10px] text-slate-400">{d}</div>)}
              {[...Array((new Date(`${moodGrid[0].date}T00:00:00`).getDay() + 6) % 7)].map((_, i) => <div key={`pad${i}`} />)}
              {moodGrid.map((d) => (
                <div key={d.date} title={`${fmt.date(d.date)}: ${d.mood}/5`} className="flex aspect-square items-center justify-center rounded-md text-xs" style={{ background: seqColor((d.mood - 1) / 4) }}>
                  <span className={d.mood >= 4 ? 'text-white' : 'text-slate-700'}>{MOODS[d.mood - 1]}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </>
      )}

      {view === 'workouts' && (
        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <Panel title="Log a workout">
            <div className="space-y-3">
              <label className="block text-sm">
                <span className="text-slate-600">Type</span>
                <select className="field mt-1" value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
                  {['Run', 'Walk', 'HIIT', 'Yoga flow', 'Strength – upper', 'Strength – lower', 'Cycling'].map((k) => <option key={k}>{k}</option>)}
                </select>
              </label>
              <label className="block text-sm">
                <span className="text-slate-600">Minutes</span>
                <input className="field mt-1" inputMode="numeric" value={form.minutes} onChange={(e) => setForm({ ...form, minutes: e.target.value.replace(/\D/g, '') })} />
              </label>
              <Btn size="md" className="w-full" onClick={addWorkout}>Save workout</Btn>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-xl font-semibold">{workouts.length}</div><div className="text-xs text-slate-500">Workouts (4 weeks)</div></div>
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-xl font-semibold">{fmt.int(workouts.reduce((a, w) => a + w.calories, 0))}</div><div className="text-xs text-slate-500">Calories</div></div>
            </div>
          </Panel>
          <Panel title="Recent workouts">
            <ul className="max-h-[420px] divide-y divide-slate-100 overflow-y-auto">
              {workouts.map((w) => (
                <li key={w.id} className={cn('flex items-center gap-3 py-2', w.fresh && 'bg-surface-alt/60')}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100"><Dumbbell className="h-4 w-4 text-slate-600" /></span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">{w.kind}</div>
                    <div className="text-xs text-slate-500">{fmt.date(w.date)} · {w.minutes} min · effort {w.effort}/10</div>
                  </div>
                  <span className="text-sm tabular-nums text-slate-700">{w.calories} kcal</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}

      {view === 'challenge' && (
        <Panel title="October step challenge" subtitle="You vs friends · resets on the 1st" actions={<Btn onClick={() => setMySteps((s) => s + 2500)}>Sync a 2,500-step walk</Btn>}>
          <ol className="space-y-3">
            {board.map((c, i) => (
              <li key={c.name} className="flex items-center gap-3">
                <span className="w-6 text-right text-sm font-semibold text-slate-500">{i + 1}</span>
                <div className="flex-1">
                  <Meter label={c.name === 'You' ? 'You' : c.name} right={fmt.int(c.value)} value={c.value} max={board[0].value} tone={c.name === 'You' ? 'good' : undefined} />
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      )}
    </DashShell>
  );
}
