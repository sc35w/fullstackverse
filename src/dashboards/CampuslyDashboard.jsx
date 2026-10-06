import React, { useMemo, useState } from 'react';
import { CalendarDays, ClipboardCheck, GraduationCap, IndianRupee } from 'lucide-react';
import data from '@/data/dashboards/campusly-school-erp.json';
import { BarChart, ChartCard, HBars, Heatmap } from '@/components/dash/charts';
import { Btn, DashShell, DataTable, KpiRow, Meter, Panel, Select, StatTile, StatusPill } from '@/components/dash/ui';
import { SERIES, avg, fmt, sum } from '@/components/dash/theme';
import { cn } from '@/lib/utils';

const SUBJECT_COLOR = { Maths: SERIES[0], Science: SERIES[2], English: SERIES[1], Social: SERIES[3], Hindi: SERIES[4], Computer: SERIES[6], PT: '#CBD5E1', Library: '#E2E8F0' };
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CampuslyDashboard({ project }) {
  const [view, setView] = useState('attendance');
  const [cls, setCls] = useState('All classes');
  const [subject, setSubject] = useState('Maths');
  const [students, setStudents] = useState(data.students);
  const [ttClass, setTtClass] = useState(Object.keys(data.timetable)[0]);

  const inClass = (s) => cls === 'All classes' || s.class === cls;
  const classIdx = data.classes.map((c, i) => ({ c, i })).filter(({ c }) => cls === 'All classes' || c === cls);
  const todayAtt = avg(classIdx.map(({ i }) => data.attendance[i].at(-1)));
  const low = students.filter((s) => inClass(s) && s.attendance < 75);
  const dues = students.filter((s) => inClass(s) && s.feeDue > 0);
  const remind = (ids) => setStudents((ss) => ss.map((s) => (ids.includes(s.id) ? { ...s, reminded: true } : s)));
  const subjectAvg = useMemo(() => data.subjects.map((sub) => ({ label: sub, value: Math.round(avg(students.filter(inClass).map((s) => s.scores[sub]))) })).sort((a, b) => b.value - a.value), [students, cls]); // eslint-disable-line react-hooks/exhaustive-deps
  const bands = ['<40', '40–49', '50–59', '60–69', '70–79', '80–89', '90+'];
  const dist = bands.map((b, i) => ({
    label: b,
    value: students.filter((s) => inClass(s)).filter((s) => {
      const v = s.scores[subject];
      return i === 0 ? v < 40 : i === 6 ? v >= 90 : v >= 30 + i * 10 && v < 40 + i * 10;
    }).length,
  }));

  const views = [
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck, badge: low.length },
    { id: 'fees', label: 'Fees', icon: IndianRupee, badge: dues.filter((s) => !s.reminded).length },
    { id: 'exams', label: 'Exam results', icon: GraduationCap },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays },
  ];

  return (
    <DashShell
      name={project.name}
      accent={project.accent}
      views={views}
      view={view}
      onView={setView}
      filters={
        view === 'timetable' ? (
          <Select label="Class" value={ttClass} onChange={setTtClass} options={Object.keys(data.timetable)} />
        ) : (
          <>
            <Select label="Class" value={cls} onChange={setCls} options={['All classes', ...data.classes]} />
            {view === 'exams' && <Select label="Subject" value={subject} onChange={setSubject} options={data.subjects} />}
          </>
        )
      }
    >
      {view === 'attendance' && (
        <>
          <KpiRow>
            <StatTile label="Attendance today" value={fmt.pct(todayAtt)} />
            <StatTile label="20-day average" value={fmt.pct(avg(classIdx.map(({ i }) => avg(data.attendance[i]))))} />
            <StatTile label="Students below 75%" value={low.length} hint="Parents notified automatically" />
            <StatTile label="Classes" value={classIdx.length} />
          </KpiRow>
          <ChartCard title="Attendance by class" subtitle="Last 20 school days · darker = higher attendance">
            <Heatmap rows={classIdx.map(({ c }) => `Class ${c}`)} cols={[...Array(20).keys()]} values={classIdx.map(({ i }) => data.attendance[i])} format={(v) => `${Number(v).toFixed(1)}%`} colFormat={(c) => (c % 5 === 0 ? `D${c + 1}` : '')} />
          </ChartCard>
          <Panel title="Students needing attention" subtitle="Attendance below 75% this term">
            <DataTable
              rows={low}
              searchKeys={['name', 'class']}
              empty="Everyone is above 75%."
              columns={[
                { key: 'name', label: 'Student' },
                { key: 'class', label: 'Class' },
                { key: 'attendance', label: 'Attendance', render: (s) => <div className="w-40"><Meter value={s.attendance} max={100} right={fmt.pct(s.attendance)} tone="critical" /></div> },
                { key: 'parent', label: 'Parent' },
                { key: 'phone', label: 'Phone' },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'fees' && (
        <>
          <KpiRow>
            <StatTile label="Collected this year" value={fmt.inr(data.feePlan.collected)} hint={`of ${fmt.inr(data.feePlan.total)}`} />
            <StatTile label="Outstanding (filtered)" value={fmt.inr(sum(dues, 'feeDue'))} />
            <StatTile label="Students with dues" value={dues.length} />
            <StatTile label="Overdue > 60 days" value={dues.filter((s) => s.dueDays > 60).length} />
          </KpiRow>
          <Panel title="Collection progress">
            <Meter value={data.feePlan.collected} max={data.feePlan.total} label="Annual fees collected" right={fmt.pct((data.feePlan.collected / data.feePlan.total) * 100, 0)} tone="good" />
          </Panel>
          <Panel
            title="Pending fees"
            subtitle="Reminders go to the parent app and by SMS"
            actions={<Btn onClick={() => remind(dues.map((s) => s.id))} disabled={!dues.some((s) => !s.reminded)}>Remind all ({dues.filter((s) => !s.reminded).length})</Btn>}
          >
            <DataTable
              rows={dues}
              searchKeys={['name', 'class', 'parent']}
              columns={[
                { key: 'name', label: 'Student' },
                { key: 'class', label: 'Class' },
                { key: 'parent', label: 'Parent' },
                { key: 'feeDue', label: 'Due', align: 'right', render: (s) => fmt.inrFull(s.feeDue) },
                { key: 'dueDays', label: 'Overdue', render: (s) => <StatusPill tone={s.dueDays > 60 ? 'critical' : s.dueDays > 30 ? 'warning' : 'neutral'}>{s.dueDays} days</StatusPill> },
                { key: 'act', label: '', sort: false, render: (s) => (s.reminded ? <StatusPill tone="good">Reminder sent</StatusPill> : <Btn variant="outline" onClick={() => remind([s.id])}>Send reminder</Btn>) },
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'exams' && (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Average score by subject" subtitle="Term 1 · click a subject to see its distribution">
              <HBars items={subjectAvg} format={(v) => `${v}%`} active={subject} onClick={setSubject} />
            </ChartCard>
            <ChartCard title={`${subject}: score distribution`} subtitle="Number of students in each band" table={{ columns: ['Band', 'Students'], rows: dist.map((d) => [d.label, d.value]) }}>
              <BarChart data={dist} series={[{ key: 'value', label: 'Students', color: SUBJECT_COLOR[subject] }]} format={fmt.int} />
            </ChartCard>
          </div>
          <Panel title="Student results" subtitle={`Sorted by ${subject}`}>
            <DataTable
              rows={[...students.filter(inClass)].sort((a, b) => b.scores[subject] - a.scores[subject])}
              searchKeys={['name', 'class']}
              columns={[
                { key: 'name', label: 'Student' },
                { key: 'class', label: 'Class' },
                ...data.subjects.map((sub) => ({ key: sub, label: sub, align: 'right', sortValue: (s) => s.scores[sub], render: (s) => <span className={cn(s.scores[sub] < 40 && 'font-semibold text-[#8E2A1C]', sub === subject && 'font-semibold text-slate-900')}>{s.scores[sub]}</span> })),
              ]}
            />
          </Panel>
        </>
      )}

      {view === 'timetable' && (
        <Panel title={`Class ${ttClass} · weekly timetable`} subtitle="Built clash-free from teacher availability">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate border-spacing-1 text-xs">
              <thead>
                <tr>
                  <th />
                  {data.periods.map((p, i) => <th key={p} className="font-medium text-slate-500">P{i + 1} · {p}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.timetable[ttClass].map((row, d) => (
                  <tr key={d}>
                    <td className="pr-2 font-semibold text-slate-700">{DAYS[d]}</td>
                    {row.map((sub, p) => (
                      <td key={p} className="rounded-md border-l-[3px] bg-slate-50 px-2 py-1.5" style={{ borderLeftColor: SUBJECT_COLOR[sub] }}>
                        <div className="font-semibold text-slate-900">{sub}</div>
                        <div className="truncate text-[10px] text-slate-500">{data.teachers[sub] || (sub === 'PT' ? 'PE coach' : 'Librarian')}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}
    </DashShell>
  );
}
