// Illustrated product preview for a portfolio project, drawn with plain
// markup (no screenshots). The layout depends on `project.mockup` and the
// colour on `project.accent`, so every project gets a distinct preview.
import React from 'react';
import { cn } from '@/lib/utils';

const Bar = ({ w = '100%', h = 6, c = '#E2E8F0', className }) => (
  <div className={cn('rounded-full', className)} style={{ width: w, height: h, background: c }} />
);

function BrowserFrame({ name, accent, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="ml-2 h-3.5 flex-1 rounded bg-white text-[8px] leading-[14px] text-slate-400 px-2 truncate">
          {name.toLowerCase().replace(/\s+/g, '')}.app
        </span>
      </div>
      <div className="relative">{children}</div>
      <span className="sr-only">{name}</span>
      <div className="h-1" style={{ background: accent }} />
    </div>
  );
}

function PhoneFrame({ name, accent, children, className }) {
  return (
    <div className={cn('w-[44%] max-w-[170px] overflow-hidden rounded-[22px] border-[5px] border-slate-900 bg-white shadow-xl', className)}>
      <div className="flex items-center justify-between px-3 py-2 text-white" style={{ background: accent }}>
        <span className="truncate text-[10px] font-bold">{name}</span>
        <span className="h-3 w-3 rounded-full bg-white/40" />
      </div>
      <div className="space-y-2 p-2.5">{children}</div>
    </div>
  );
}

function DashboardScreen({ project }) {
  const { name, accent } = project;
  return (
    <BrowserFrame name={name} accent={accent}>
      <div className="flex">
        <div className="hidden w-1/5 space-y-2 p-3 sm:block" style={{ background: `${accent}10` }}>
          <div className="mb-3 text-[10px] font-bold" style={{ color: accent }}>{name}</div>
          {[70, 85, 60, 75, 55].map((w, i) => (
            <Bar key={i} w={`${w}%`} c={i === 0 ? accent : '#CBD5E1'} />
          ))}
        </div>
        <div className="flex-1 space-y-3 p-3">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-slate-100 p-2">
                <Bar w="50%" h={4} />
                <div className="mt-1.5 text-sm font-bold" style={{ color: i === 0 ? accent : '#0F172A' }}>
                  {['128', '24', '96%'][i]}
                </div>
              </div>
            ))}
          </div>
          <div className="flex h-20 items-end gap-1.5 rounded-lg border border-slate-100 p-2">
            {[40, 65, 50, 80, 60, 90, 70, 85, 55, 75].map((h, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i % 3 === 0 ? accent : `${accent}55` }} />
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full" style={{ background: `${accent}30` }} />
              <Bar w="45%" />
              <Bar w="20%" className="ml-auto" c={i === 1 ? `${accent}80` : '#E2E8F0'} />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function StoreScreen({ project }) {
  const { name, accent } = project;
  return (
    <BrowserFrame name={name} accent={accent}>
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-[11px] font-bold" style={{ color: accent }}>{name}</span>
        <div className="flex gap-2">
          <Bar w={28} />
          <Bar w={28} />
          <span className="h-3 w-3 rounded" style={{ background: accent }} />
        </div>
      </div>
      <div className="mx-3 flex h-16 items-center rounded-lg px-3" style={{ background: `${accent}18` }}>
        <div className="space-y-1.5">
          <Bar w={90} h={7} c={accent} />
          <Bar w={60} h={5} c={`${accent}60`} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 p-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-1">
            <div className="aspect-square rounded-md" style={{ background: i % 2 ? `${accent}25` : '#F1F5F9' }} />
            <Bar w="80%" h={4} />
            <Bar w="40%" h={4} c={`${accent}90`} />
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

function SiteScreen({ project }) {
  const { name, accent } = project;
  return (
    <BrowserFrame name={name} accent={accent}>
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-[11px] font-bold text-slate-900">{name}</span>
        <div className="flex gap-2">{[0, 1, 2, 3].map((i) => <Bar key={i} w={22} h={4} />)}</div>
      </div>
      <div className="relative flex h-28 flex-col justify-center gap-2 px-4" style={{ background: accent }}>
        <Bar w="55%" h={9} c="rgba(255,255,255,.9)" />
        <Bar w="40%" h={9} c="rgba(255,255,255,.9)" />
        <Bar w="30%" h={5} c="rgba(255,255,255,.5)" />
        <span className="mt-1 h-4 w-16 rounded bg-white" />
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5 rounded-md border border-slate-100 p-2">
            <span className="block h-4 w-4 rounded" style={{ background: `${accent}30` }} />
            <Bar w="80%" h={4} />
            <Bar w="60%" h={4} />
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

function VideoScreen({ project }) {
  const { name, accent } = project;
  const boxes = [
    { l: '12%', t: '22%', w: '18%', h: '46%' },
    { l: '48%', t: '30%', w: '16%', h: '42%' },
    { l: '70%', t: '18%', w: '20%', h: '30%' },
  ];
  return (
    <BrowserFrame name={name} accent={accent}>
      <div className="grid grid-cols-[2fr_1fr] gap-2 p-3">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-800">
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-slate-700" />
          {boxes.map((b, i) => (
            <div key={i} className="absolute rounded-sm border-2" style={{ left: b.l, top: b.t, width: b.w, height: b.h, borderColor: i === 1 ? '#F59E0B' : accent }}>
              <span className="absolute -top-3 left-0 rounded-sm px-1 text-[7px] font-bold text-white" style={{ background: i === 1 ? '#F59E0B' : accent }}>
                {['person', 'alert', 'object'][i]}
              </span>
            </div>
          ))}
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/50 px-1.5 text-[7px] text-white">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#EF4444" }} /> LIVE
          </span>
        </div>
        <div className="space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-md border border-slate-100 p-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: i === 0 ? '#F59E0B' : accent }} />
              <Bar w="70%" h={4} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-1 px-3 pb-3">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="h-3 flex-1 rounded-sm" style={{ background: [3, 4, 9].includes(i) ? accent : '#E2E8F0' }} />
        ))}
      </div>
    </BrowserFrame>
  );
}

function ChartScreen({ project }) {
  const { name, accent } = project;
  const pts = [60, 55, 58, 48, 40, 44, 30, 26, 32, 20, 24, 14];
  const d = pts.map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i / (pts.length - 1)) * 300} ${y}`).join(' ');
  return (
    <BrowserFrame name={name} accent={accent}>
      <div className="grid grid-cols-[1.3fr_1fr] gap-2 p-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg" style={{ background: `${accent}12` }}>
          {[['20%', '30%', 46], ['55%', '50%', 30], ['35%', '65%', 22], ['70%', '22%', 18]].map(([l, t, s], i) => (
            <span key={i} className="absolute rounded-full" style={{ left: l, top: t, width: s, height: s, background: i === 0 ? '#F59E0B66' : `${accent}55` }} />
          ))}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <path d="M0 70 C 20 60, 30 80, 50 55 S 80 40, 100 50" fill="none" stroke={accent} strokeWidth="1.5" />
          </svg>
        </div>
        <div className="space-y-2">
          <div className="rounded-lg border border-slate-100 p-2">
            <Bar w="50%" h={4} />
            <svg viewBox="0 0 300 70" className="mt-1 h-12 w-full" preserveAspectRatio="none">
              <path d={d} fill="none" stroke={accent} strokeWidth="3" />
            </svg>
          </div>
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-md border border-slate-100 p-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: i ? accent : '#F59E0B' }} />
              <Bar w="65%" h={4} />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function PhoneScreens({ project }) {
  const { name, accent } = project;
  return (
    <div className="flex items-end justify-center gap-4">
      <PhoneFrame name={name} accent={accent} className="translate-y-3">
        <div className="h-14 rounded-lg" style={{ background: `${accent}20` }} />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-6 w-6 shrink-0 rounded-md" style={{ background: i === 0 ? accent : `${accent}30` }} />
            <div className="flex-1 space-y-1">
              <Bar w="80%" h={4} />
              <Bar w="50%" h={4} />
            </div>
          </div>
        ))}
        <div className="h-5 rounded-md" style={{ background: accent }} />
      </PhoneFrame>
      <PhoneFrame name={name} accent={accent}>
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="aspect-square rounded-md" style={{ background: i === 1 ? `${accent}40` : '#F1F5F9' }} />
          ))}
        </div>
        <Bar w="70%" h={5} />
        <Bar w="45%" h={5} c={`${accent}80`} />
        <div className="flex justify-around border-t border-slate-100 pt-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded" style={{ background: i === 0 ? accent : '#CBD5E1' }} />
          ))}
        </div>
      </PhoneFrame>
    </div>
  );
}

function MapScreens({ project }) {
  const { name, accent } = project;
  return (
    <div className="flex items-end justify-center gap-4">
      <div className="w-[56%] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
        <div className="relative aspect-[4/3] bg-[#EEF2F7]">
          <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full">
            <path d="M0 20 H100 M0 50 H100 M30 0 V75 M70 0 V75" stroke="#fff" strokeWidth="4" />
            <path d="M18 60 C 30 50, 40 40, 52 38 S 70 22, 82 16" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="1 0" />
          </svg>
          <span className="absolute left-[15%] top-[76%] h-3 w-3 rounded-full border-2 border-white" style={{ background: accent }} />
          <span className="absolute left-[79%] top-[17%] h-4 w-4 rounded-full border-2 border-white bg-amber-500" />
        </div>
        <div className="flex items-center gap-2 p-2">
          <span className="text-[10px] font-bold" style={{ color: accent }}>{name}</span>
          <Bar w="40%" h={4} className="ml-auto" />
        </div>
      </div>
      <PhoneFrame name={name} accent={accent} className="w-[34%]">
        <div className="relative h-16 rounded-md bg-[#EEF2F7]">
          <span className="absolute left-1/3 top-1/2 h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
        </div>
        <Bar w="75%" h={4} />
        <Bar w="50%" h={4} />
        <div className="h-5 rounded-md" style={{ background: accent }} />
      </PhoneFrame>
    </div>
  );
}

function GameScreen({ project }) {
  const { name, accent } = project;
  return (
    <div className="mx-auto w-[92%] overflow-hidden rounded-[22px] border-[6px] border-slate-900 bg-slate-900 shadow-xl">
      <div className="relative aspect-[16/9] overflow-hidden" style={{ background: `linear-gradient(180deg, ${accent}55 0%, ${accent}22 55%, #F1F5F9 55%)` }}>
        {/* HUD */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2">
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold" style={{ color: accent }}>{name}</span>
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            ))}
          </span>
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold text-slate-700">1,250</span>
        </div>
        {/* playfield tiles */}
        <div className="absolute left-1/2 top-[22%] grid -translate-x-1/2 grid-cols-6 gap-1">
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              className="h-4 w-4 rounded-md sm:h-5 sm:w-5"
              style={{ background: [accent, '#F59E0B', '#FFFFFF', `${accent}88`][(i * 7) % 4] }}
            />
          ))}
        </div>
        {/* controls */}
        <div className="absolute inset-x-0 bottom-2 flex items-center justify-between px-3">
          <span className="h-7 w-7 rounded-full border-2 border-slate-300 bg-white/80" />
          <span className="h-2 w-1/3 rounded-full bg-slate-300">
            <span className="block h-2 w-2/3 rounded-full" style={{ background: accent }} />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: accent }}>
            GO
          </span>
        </div>
      </div>
    </div>
  );
}

const screens = {
  dashboard: DashboardScreen,
  store: StoreScreen,
  site: SiteScreen,
  video: VideoScreen,
  chart: ChartScreen,
  phone: PhoneScreens,
  map: MapScreens,
  game: GameScreen,
};

export default function ProjectMockup({ project, className }) {
  const Screen = screens[project.mockup] || DashboardScreen;
  return (
    <div
      className={cn('flex items-center justify-center overflow-hidden p-6 sm:p-8', className)}
      style={{ background: `linear-gradient(135deg, ${project.accent}14 0%, #F3F5F9 60%, #FDF1E4 100%)` }}
      role="img"
      aria-label={`${project.name} product preview`}
    >
      <div className="w-full max-w-[460px]">
        <Screen project={project} />
      </div>
    </div>
  );
}
