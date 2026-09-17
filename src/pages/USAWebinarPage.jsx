import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { asset } from "@/lib/utils";
import { USA_WEBINAR_DATETIME } from "@/lib/workshopDates";

const WORKSHOP_SLUG = "study-usa-green-card-roadmap";
const WORKSHOP_DATETIME = USA_WEBINAR_DATETIME;
const INTRO_VIDEO_EMBED_URL = "https://www.youtube.com/embed/rpyBZdGOXRU";

const heroHighlights = [
  { icon: "🎓", text: "Study in USA Step-by-Step" },
  { icon: "💼", text: "Job Application Strategy" },
  { icon: "🛂", text: "H1B With/Without Lottery Pathways" },
  { icon: "🟢", text: "Green Card Options & Eligibility" },
  { icon: "💰", text: "Scholarships & Funding Roadmap" },
];

const problemSolutions = [
  {
    problem: "No clarity on Admissions",
    solution: "Framework + Score Requirements + Filters",
  },
  {
    problem: "Fear of Visa Rejection",
    solution: "Proven Interview Strategy",
  },
  {
    problem: "Scholarship Confusion",
    solution: "Template & Scholarship Tracker",
  },
  {
    problem: "No Job Roadmap",
    solution: "Job Application Funnel + Resume Strategy",
  },
  {
    problem: "H1B lottery fear",
    solution: "Alternatives + Backup Visa Routes",
  },
  {
    problem: "Want Green Card",
    solution: "EB, NIW, PERM roadmap",
  },
];

const modules = [
  {
    title: "MODULE 1 - Profile Building & Roadmap",
    points: [
      "CGPA/GPA + GRE/IELTS score matrix",
      "Sample timelines for students and working professionals",
      "Profile gap fixing strategies",
      "LinkedIn and resume setup before applying",
    ],
  },
  {
    title: "MODULE 2 - US Admissions System Explained",
    points: [
      "UG, MS, MBA pathways",
      "Deadlines for Fall, Spring, Summer",
      "University tiers with acceptance probability matrix",
      "How to evaluate beyond rankings",
      "Decision tree for Ivy vs public vs community colleges",
    ],
  },
  {
    title: "MODULE 3 - Funding, Scholarships & Zero Tuition Options",
    points: [
      "Merit, need, GA/TA/RA, fellowship programmes",
      "Universities offering guaranteed scholarships",
      "Hidden funding sources across departments and labs",
    ],
  },
  {
    title: "MODULE 4 - Visa Success Blueprint",
    points: [
      "Why students face rejection and how to avoid it",
      "Visa intent conversation with ties to home country",
      "Mock interview Q&A examples",
      "Documentation checklist and sample DS-160 answers",
    ],
  },
  {
    title: "MODULE 5 - Job Application Strategy",
    points: [
      "US job funnel system to apply for 10 roles per day",
      "Resume ATS optimisation with cover letter hooks",
      "Portfolio, GitHub, and research proof",
      "Target job boards for internships and full-time",
      "Networking outreach framework with LinkedIn scripts",
      "Interview prep with STAR, behavioural, technical rounds",
    ],
  },
  {
    title: "MODULE 8 - Salaries, Taxes & Cost of Living",
    points: [
      "Salary benchmarks by field",
      "State-wise cost of living calculator",
      "Negotiation scripts and red flag offers",
    ],
  },
  {
    title: "MODULE 9 - Course Selection for Job Guarantee",
    points: [
      "Top 2025 courses for H1B and green card odds",
      "High-demand domains such as AI, cloud, robotics, cybersecurity",
      "Courses that reduce H1B success and how to avoid them",
    ],
  },
  {
    title: "MODULE 10 - Action Plan",
    points: [
      "Personalised university shortlisting",
      "Expected scholarship range",
      "Visa preparation checklist",
      "Job funnel action plan",
      "H1B alternative strategy and green card pathway",
    ],
  },
];

const bonuses = [
  "University shortlisting sheet (70+ options)",
  "Scholarship tracking sheet",
  "Visa interview simulation sheet",
  "H1B sponsor employer list (top 700)",
  "Green card eligibility self-assessment",
  "LinkedIn outreach scripts",
  "Email templates to professors for funding",
];

const audienceGroups = [
  {
    title: "Ambitious Students",
    items: [
      "Need a study, job, and settlement roadmap",
      "Want affordable admission strategy",
      "Seek clarity on scholarships and funding",
    ],
  },
  {
    title: "Working Professionals",
    items: [
      "Plan to shift to the USA for work",
      "Prefer to skip the H1B lottery via O1 or NIW",
    ],
  },
  {
    title: "Parents",
    items: [
      "Want a safe investment blueprint",
      "Need proof-backed guidance before funding the journey",
    ],
  },
];

const successStories = [
  {
    name: "Aisha Khan",
    outcome: "Stanford University with 100% research assistantship",
  },
  {
    name: "Rohan Verma",
    outcome: "UIUC admission, H1B cap-exempt first, cap selection later",
  },
  {
    name: "Priya Singh",
    outcome: "UC Berkeley graduate, EB2-NIW eligible within four years",
  },
  {
    name: "Rahul Nair",
    outcome: "Moved via L1B and secured EB1C green card track",
  },
];

const faqs = [
  {
    question: "Can I pursue a green card without an employer?",
    answer: "Yes. EB1A and EB2-NIW allow self-petitioning when you meet evidence requirements.",
  },
  {
    question: "Can I skip the H1B lottery?",
    answer: "O1, L1, TN, and cap-exempt H1B routes let you bypass the regular lottery when used correctly.",
  },
  {
    question: "Can I study without GRE?",
    answer: "You get a curated list of universities waiving GRE along with profile fit criteria.",
  },
  {
    question: "Can I work part time while studying?",
    answer: "Yes. Learn CPT, OPT, and on-campus work rules including the 20 hour per week limit.",
  },
  {
    question: "Do you assist after the session?",
    answer: "Yes. Attendees access a private community for continued support.",
  },
];

const visaAlternatives = [
  {
    category: "Extraordinary ability",
    visa: "O1",
    detail: "For achievements, patents, publications",
  },
  {
    category: "Company transfer",
    visa: "L1A/L1B",
    detail: "Work for an MNC in India for at least one year",
  },
  {
    category: "Investor visa",
    visa: "E2",
    detail: "Available to passport holders of treaty nations",
  },
  {
    category: "Special skills",
    visa: "TN",
    detail: "Designed for Canadian and Mexican professionals",
  },
  {
    category: "Specialty occupation",
    visa: "Cap-exempt H1B",
    detail: "Take roles with universities or research organisations",
  },
];

const greenCardPaths = [
  {
    path: "Employment",
    visa: "EB2 / EB3",
    advantage: "Most common employer sponsored track",
  },
  {
    path: "Exceptional talent",
    visa: "EB1A",
    advantage: "No job offer required once criteria are met",
  },
  {
    path: "National interest",
    visa: "EB2-NIW",
    advantage: "No employer sponsorship when contribution is proven",
  },
  {
    path: "Extraordinary achievement",
    visa: "EB1B / EB1C",
    advantage: "Ideal for professors, researchers, executives",
  },
  {
    path: "Investment",
    visa: "EB5",
    advantage: "Fastest for qualifying investors",
  },
];

const USAWebinarPage = () => {
  const [now, setNow] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = Math.max(0, WORKSHOP_DATETIME.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hasEnded = totalSeconds <= 0;

  const handleRegisterClick = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setShowForm(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Please fill in name, email, and phone.");
      return;
    }

    try {
      setIsSubmitting(true);

      /* 1️⃣ Insert into Supabase */
      const { error: insertError } = await supabase
        .from("webinar")
        .insert({
          webinar_slug: WORKSHOP_SLUG,
          name,
          email,
          phone,
        });

      if (insertError) throw insertError;

      /* 2️⃣ Trigger confirmation email via Google Apps Script */
      const appsScriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
      if (appsScriptUrl) {
        const res = await fetch(appsScriptUrl, {
          method: "POST",
          // text/plain avoids a CORS preflight; Apps Script still parses the JSON body.
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({ action: "send_webinar_email", name, email }),
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Confirmation email failed to send");
        }
      }

      /* 3️⃣ Success */
      setSuccessMessage(
        "Registration successful! Check your email for webinar details."
      );

      setShowForm(false);
      setShowConfirmation(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.5),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.45),transparent_55%)]" />
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />

        <div className="relative container pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="mb-8 rounded-2xl bg-slate-900/90 px-6 py-4 shadow-xl shadow-slate-900/30 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-700/60">
            <div className="flex items-center gap-3 text-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold">
                ⏱
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  USA Study to Green Card Masterclass Starts In
                </p>
                <p className="text-sm text-slate-100">
                  {WORKSHOP_DATETIME.toLocaleString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-3 text-slate-100">
              {[{ label: "Days", value: days }, { label: "Hours", value: hours }, { label: "Minutes", value: minutes }, { label: "Seconds", value: seconds }].map(
                ({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center rounded-xl bg-slate-800/80 px-3 py-2 min-w-[70px]"
                  >
                    <span className="text-xl font-semibold tabular-nums">
                      {String(value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                      {label}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-xl border-2 border-white/20">
                <span className="h-3 w-3 rounded-full bg-white animate-pulse shadow-lg"></span>
                <span className="uppercase tracking-wider">Live Masterclass</span>
                <span className="h-1 w-1 rounded-full bg-white/60"></span>
                <span className="uppercase tracking-wider">Limited Seats</span>
                <span className="h-1 w-1 rounded-full bg-white/60"></span>
                <span className="uppercase tracking-wider">Starts Soon</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                  Study in USA -> Work Full-Time -> Green Card Roadmap
                </h1>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Discover exact strategies to study affordably, secure work visas with or without the H1B lottery, and plan your green card from the very first semester.
                </p>
                <p className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-900 px-4 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
                  <span>💡</span>
                  From admission to H1B to permanent residency - everything you need in one ₹399 masterclass.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {heroHighlights.map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-semibold text-slate-700">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="btn btn-primary text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl"
                  onClick={handleRegisterClick}
                  disabled={hasEnded}
                >
                  {hasEnded ? "Masterclass Ended" : "Register for ₹399"}
                </button>
                <a
                  href="#intro-video"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 border border-slate-900/20 bg-white text-slate-800 text-sm font-semibold shadow-sm hover:border-slate-900/40"
                >
                  <span>▶</span>
                  Watch Host Intro Video
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2 bg-white/80 border border-slate-200 rounded-full px-3 py-1">
                  <span className="text-base">🛡</span>
                  Razorpay Secure - UPI Accepted
                </div>
                <div className="flex items-center gap-2 bg-white/80 border border-slate-200 rounded-full px-3 py-1">
                  <span className="text-base">🎓</span>
                  Alumni from MIT, Stanford, UIUC, UC Berkeley
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-white/90 border border-slate-200 p-6 shadow-2xl backdrop-blur-sm space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Roadmap Snapshot</h3>
                  <p className="text-sm text-slate-600">A single playbook covering what overseas education consultants charge ₹150000 for.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-4">
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Admissions Blueprint</div>
                    <div className="text-base font-bold text-slate-900 mt-1">Profile + Shortlist Matrix</div>
                    <div className="text-xs text-slate-600 mt-1">Scoring rubrics, timelines, SOP and LOR templates</div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-4">
                    <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Funding Stack</div>
                    <div className="text-base font-bold text-slate-900 mt-1">8+ Scholarship Paths</div>
                    <div className="text-xs text-slate-600 mt-1">Merit, need, GA/TA/RA, fellowship outreach trackers</div>
                  </div>
                  <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-4">
                    <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Visa Success Kit</div>
                    <div className="text-base font-bold text-slate-900 mt-1">Interview + Docs Checklist</div>
                    <div className="text-xs text-slate-600 mt-1">DS-160 samples, mock scripts, intent positioning</div>
                  </div>
                  <div className="rounded-xl bg-orange-50 border border-orange-200 px-4 py-4">
                    <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Career Engine</div>
                    <div className="text-base font-bold text-slate-900 mt-1">10 Jobs Per Day System</div>
                    <div className="text-xs text-slate-600 mt-1">ATS resume, outreach templates, interview prep vault</div>
                  </div>
                  <div className="rounded-xl bg-sky-50 border border-sky-200 px-4 py-4">
                    <div className="text-xs font-semibold text-sky-600 uppercase tracking-wide">Visa Alternatives</div>
                    <div className="text-base font-bold text-slate-900 mt-1">H1B + Lottery Bypass</div>
                    <div className="text-xs text-slate-600 mt-1">Cap exempt map, O1, L1, TN, E2 playbooks</div>
                  </div>
                  <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-4">
                    <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Green Card Planner</div>
                    <div className="text-base font-bold text-slate-900 mt-1">2 to 12 Year Timeline</div>
                    <div className="text-xs text-slate-600 mt-1">EB categories, evidence tracker, priority date strategy</div>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-center text-sm text-emerald-700 font-semibold">
                  Masterclass access + downloads replace ₹150000 consultant packages at just ₹399.
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-700 font-semibold">
                  Limited seats. Offer valid until the countdown ends.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14" id="intro-video">
        <div className="container space-y-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">This Webinar Can Transform Your Life</h2>
            <p className="text-sm text-slate-600">
              Identify the blockers slowing your USA dream and plug them with proven playbooks.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {problemSolutions.map(({ problem, solution }) => (
              <div key={problem} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-red-500">Problem</div>
                <div className="text-base font-bold text-slate-900 mt-1">{problem}</div>
                <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-emerald-600">Solution inside the webinar</div>
                <div className="text-sm text-slate-700 mt-1">{solution}</div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
            <div className="relative w-full pt-[56.25%] bg-slate-900/90">
              <iframe
                title="USA roadmap intro"
                className="absolute inset-0 h-full w-full"
                src={INTRO_VIDEO_EMBED_URL}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 py-16">
        <div className="container text-white space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold">What You Will Master</h2>
            <p className="text-sm text-slate-200">
              Ten mega modules convert confusion into a repeatable plan you can execute the same day.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {modules.map(({ title, points }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-3">{title}</h3>
                <ul className="space-y-2 text-sm text-slate-100/90">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="text-emerald-300 mt-0.5">✔</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-semibold">MODULE 6 - H1B Made Simple</h3>
              <p className="text-sm text-slate-200">Understand the lottery odds and build an employer-attractive profile.</p>
              <p className="text-sm text-emerald-200 font-semibold">Breakthrough insight: start with cap-exempt roles, move to cap after securing experience.</p>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-xs text-slate-100/90">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Visa</th>
                      <th className="px-4 py-3">Who can use it</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visaAlternatives.map(({ category, visa, detail }) => (
                      <tr key={visa} className="odd:bg-white/5 even:bg-transparent">
                        <td className="px-4 py-3 font-semibold">{category}</td>
                        <td className="px-4 py-3 text-emerald-200 font-semibold">{visa}</td>
                        <td className="px-4 py-3">{detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-semibold">MODULE 7 - Green Card Pathways</h3>
              <p className="text-sm text-slate-200">Build a twelve-year view from day one and shorten it with strategic evidence.</p>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-xs text-slate-100/90">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="px-4 py-3">Path</th>
                      <th className="px-4 py-3">Visa category</th>
                      <th className="px-4 py-3">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {greenCardPaths.map(({ path, visa, advantage }) => (
                      <tr key={visa} className="odd:bg-white/5 even:bg-transparent">
                        <td className="px-4 py-3 font-semibold">{path}</td>
                        <td className="px-4 py-3 text-emerald-200 font-semibold">{visa}</td>
                        <td className="px-4 py-3">{advantage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="space-y-2 text-sm text-slate-100/90">
                <li>✔ Timeline breakdowns from two to twelve years</li>
                <li>✔ Priority date and PERM explained in plain language</li>
                <li>✔ What to build now so evidence is ready later</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">Bonuses Included</h2>
            <p className="text-sm text-slate-600">Downloadable templates keep you executing long after the session ends.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {bonuses.map((bonus) => (
              <div key={bonus} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm">
                <span className="text-emerald-500 text-xl">🎁</span>
                <span className="text-sm font-semibold text-slate-700">{bonus}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="container space-y-12">
          <div className="grid gap-6 lg:grid-cols-3">
            {audienceGroups.map(({ title, items }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-8 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-emerald-900">Success Stories</h3>
                <p className="text-sm text-emerald-700">Real outcomes from previous cohorts.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:flex lg:flex-wrap lg:gap-4">
                {successStories.map(({ name, outcome }) => (
                  <div key={name} className="rounded-2xl bg-white border border-emerald-200 px-5 py-4 shadow-sm">
                    <div className="text-sm font-bold text-emerald-900">{name}</div>
                    <div className="text-xs text-emerald-700 mt-1">{outcome}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container space-y-10">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 text-white shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-xs font-bold inline-block animate-bounce">Limited Offer</div>
                <h3 className="text-3xl font-bold">Price & Offer</h3>
                <p className="text-sm text-white/80">Actual guidance value over ₹30,000. Today only ₹399.</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-black">₹399</div>
                  <div className="text-xs text-white/70">Valid till seats fill</div>
                </div>
                <div className="h-12 w-px bg-white/40" />
                <div className="text-center">
                  <div className="text-xl line-through text-white/60">₹2,999</div>
                  <div className="text-sm font-semibold text-emerald-200">83% Off</div>
                </div>
              </div>
              <button
                className="btn btn-secondary bg-white text-slate-900 hover:bg-slate-100"
                onClick={handleRegisterClick}
                disabled={hasEnded}
              >
                {hasEnded ? "Masterclass Ended" : "Register Your Seat - ₹399"}
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">FAQ</h3>
              <div className="space-y-3">
                {faqs.map(({ question, answer }) => (
                  <details key={question} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
                    <summary className="cursor-pointer font-semibold text-slate-800">{question}</summary>
                    <p className="mt-2 text-slate-600">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">Legal Disclaimer</h3>
              <p className="text-sm text-slate-600">
                This webinar is for educational purposes only. We do not guarantee visas, jobs, or immigration outcomes. Results depend on your profile, execution, and compliance with US laws and regulations. Always consult a certified immigration attorney for personalised legal advice.
              </p>
              <div className="rounded-2xl bg-slate-100 px-4 py-3 text-xs text-slate-600">
                Your future in the USA is not luck - it is strategy. Use this framework responsibly.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 py-12 text-white">
        <div className="container text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to launch your USA journey the smart way?</h2>
          <p className="text-sm text-white/80 max-w-3xl mx-auto">
            Join the masterclass, execute the roadmap, and stay ahead with our community support.
          </p>
          <button
            className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-slate-100"
            onClick={handleRegisterClick}
            disabled={hasEnded}
          >
            {hasEnded ? "Masterclass Ended" : "Book Your Seat for ₹399"}
          </button>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="modal-panel max-w-md w-[90%] p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-3 top-3 rounded-full px-2 text-xs text-slate-500 hover:bg-slate-100"
              aria-label="Close registration form"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-2 text-slate-900">Register for the Masterclass</h2>
            <p className="text-sm text-slate-600 mb-4">
              Enter your details to reserve your seat. Once registration is successful, you will see the QR code to complete payment.
            </p>
            {errorMessage && (
              <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700 border border-red-200">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-3 rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-700 border border-emerald-200">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1 text-sm">
                <label className="block text-slate-700" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block text-slate-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block text-slate-700" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full mt-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Complete Registration"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="modal-panel max-w-lg w-[90%] p-6 relative">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute right-3 top-3 rounded-full px-2 text-xs text-slate-500 hover:bg-slate-100"
              aria-label="Close confirmation"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-2 text-slate-900">Registration Confirmed!</h2>
            <p className="text-sm text-slate-600 mb-4">
              Complete the payment to receive the masterclass link instantly via email.
            </p>
            <div className="flex justify-center mb-4">
              <img
                src={asset('payment.jpeg')}
                alt="Masterclass payment QR"
                className="max-h-80 rounded-lg border border-slate-200 shadow-md"
              />
            </div>
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <p>- Verify the receiver name before confirming the payment in your UPI app.</p>
              <p>- Seats are allotted on a first-come basis once payment is received.</p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-4 shadow-2xl border-t-4 border-yellow-400 z-50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-2">
                <span className="text-2xl">🌎</span>
              </div>
              <div>
                <div className="font-bold text-lg">₹399 USA Roadmap Masterclass</div>
                <div className="text-sm opacity-90">Scholarships - H1B strategies - Green card planning</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                🔥 Seats Filling Fast
              </div>
              <button
                className="bg-yellow-400 text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg"
                onClick={handleRegisterClick}
                disabled={hasEnded}
              >
                {hasEnded ? "Masterclass Ended" : "Register Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default USAWebinarPage;
