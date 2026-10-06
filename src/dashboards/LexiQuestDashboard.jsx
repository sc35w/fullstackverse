import React, { useState } from 'react';
import { BookOpen, LayoutDashboard, ListChecks } from 'lucide-react';
import data from '@/data/dashboards/lexiquest-learning-game.json';
import { ChartCard, Heatmap, LineChart } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, Drawer, Field, KpiRow, Meter, Panel, Select, StatTile, StatusPill, delta, useRange } from '@/components/dash/ui';
import { avg, fmt, sum } from '@/components/dash/theme';

export default function LexiQuestDashboard({ project }) {
  const [view, setView] = useState('class');
  const [range, setRange] = useState(30);
  const [grade, setGrade] = useState('All grades');
  const [lists, setLists] = useState(data.lists);
  const [sel, setSel] = useState(null);
  const { cur, prev } = useRange(data.daily, range);

  const kids = data.students.filter((s) => grade === 'All grades' || `Grade ${s.grade}` === grade);
  const kid = data.students.find((s) => s.id === sel);
  const weakest = data.skills.map((sk) => ({ sk, v: avg(kids.map((k) => k.skills[sk])) })).sort((a, b) => a.v - b.v)[0];
  const overLimit = kids.filter((k) => k.minutesWeek / 7 > data.dailyLimit);

  const views = [
    { id: 'class', label: 'My class', icon: LayoutDashboard },
    { id: 'skills', label: 'Skills', icon: BookOpen },
    { id: 'lists', label: 'Word lists', icon: ListChecks },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      range={range}
      onRange={view === 'class' ? setRange : undefined}
      filters={view !== 'lists' ? <Select label="Grade" value={grade} onChange={setGrade} options={['All grades', 'Grade 2', 'Grade 3', 'Grade 4']} /> : null}
    >
      {view === 'class' && (
        <>
          <KpiRow>
            <StatTile label="Reading minutes" value={fmt.int(sum(cur, 'minutes'))} deltaPct={delta(sum(cur, 'minutes'), sum(prev, 'minutes'))} spark={cur.slice(-14).map((d) => d.minutes)} />
            <StatTile label="Words learned" value={fmt.int(sum(cur, 'wordsLearned'))} deltaPct={delta(sum(cur, 'wordsLearned'), sum(prev, 'wordsLearned'))} />
            <StatTile label="Average accuracy" value={fmt.pct(avg(cur, 'accuracy'))} deltaPct={avg(cur, 'accuracy') - avg(prev, 'accuracy')} deltaUnit="pts" />
            <StatTile label="Above daily time limit" value={overLimit.length} hint={`Limit set by parents: ${data.dailyLimit} min/day`} />
          </KpiRow>
          <ChartCard title="Class reading minutes per day" subtitle="School days are busier; weekends dip" table={{ columns: ['Date', 'Minutes', 'Words', 'Accuracy'], rows: cur.map((d) => [fmt.date(d.date), d.minutes, d.wordsLearned, fmt.pct(d.accuracy)]) }}>
            <LineChart data={cur} series={[{ key: 'minutes', label: 'Minutes' }]} format={fmt.int} area height={200} />
          </ChartCard>
          <Panel title="Students" subtitle="Click a student for their skill profile">
            <DataTable
              rows={kids}
              searchKeys={['name']}
              onRowClick={(k) => setSel(k.id)}
              columns={[
                { key: 'name', label: 'Student' },
                { key: 'grade', label: 'Grade', align: 'right' },
                { key: 'level', label: 'Reading level', render: (k) => <div className="w-28"><Meter value={k.level} max={6} right={`L${k.level}`} /></div> },
                { key: 'words', label: 'Words mastered', align: 'right' },
                { key: 'minutesWeek', label: 'Min / week', align: 'right' },
                { key: 'streak', label: 'Streak', align: 'right', render: (k) => (k.streak ? `🔥 ${k.streak}` : '—') },
                { key: 'lastActive', label: 'Last active', render: (k) => fmt.dateTime(k.lastActive) },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'skills' && (
        <>
          <div className="grid gap-3 md:grid-cols-3">
            <StatTile label="Weakest class skill" value={weakest.sk} hint={`Class average ${Math.round(weakest.v)}%`} />
            <StatTile label="Students below 50% in it" value={kids.filter((k) => k.skills[weakest.sk] < 50).length} />
            <StatTile label="Suggested word list" value={weakest.sk === 'Phonics' || weakest.sk === 'Spelling' ? 'Long vowel sounds' : 'Silent letters'} />
          </div>
          <ChartCard title="Skill mastery by student" subtitle="% mastery · darker = stronger · click a cell to open the student">
            <Heatmap
              rows={kids.map((k) => k.name)}
              cols={data.skills}
              values={kids.map((k) => data.skills.map((sk) => k.skills[sk]))}
              format={(v) => `${v}%`}
              onCellClick={(i) => setSel(kids[i].id)}
            />
          </ChartCard>
        </>
      )}

      {view === 'lists' && (
        <Panel title="Word lists" subtitle="Assigned lists appear as new quests in every student's game">
          <div className="grid gap-3 md:grid-cols-2">
            {lists.map((l) => (
              <div key={l.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{l.name}</div>
                  <div className="text-xs text-slate-500">{l.words} words</div>
                </div>
                {l.assigned ? (
                  <div className="flex items-center gap-2">
                    <StatusPill tone="good">Assigned</StatusPill>
                    <Btn variant="ghost" onClick={() => setLists((ls) => ls.map((x) => (x.id === l.id ? { ...x, assigned: false } : x)))}>Unassign</Btn>
                  </div>
                ) : (
                  <Btn onClick={() => setLists((ls) => ls.map((x) => (x.id === l.id ? { ...x, assigned: true } : x)))}>Assign to class</Btn>
                )}
              </div>
            ))}
          </div>
        </Panel>
      )}

      <Drawer open={!!kid} title={kid ? `${kid.name} · Grade ${kid.grade}` : ''} onClose={() => setSel(null)}>
        {kid && (
          <div>
            <Field label="Reading level">Level {kid.level} of 6</Field>
            <Field label="Words mastered">{kid.words}</Field>
            <Field label="Time this week">{kid.minutesWeek} min</Field>
            <Field label="Streak">{kid.streak ? `${kid.streak} days` : 'No current streak'}</Field>
            <div className="mt-5 space-y-3">
              {data.skills.map((sk) => (
                <Meter key={sk} label={sk} right={`${kid.skills[sk]}%`} value={kid.skills[sk]} max={100} tone={kid.skills[sk] < 50 ? 'critical' : kid.skills[sk] >= 80 ? 'good' : undefined} />
              ))}
            </div>
          </div>
        )}
      </Drawer>
    </DashShell>
  );
}
