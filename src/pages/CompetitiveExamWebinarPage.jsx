import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { asset } from "@/lib/utils";
import { COMPETITIVE_EXAM_WEBINAR_DATETIME } from "@/lib/workshopDates";

const WORKSHOP_SLUG = "competitive-exam-masterclass";
const WORKSHOP_DATETIME = COMPETITIVE_EXAM_WEBINAR_DATETIME;

const CompetitiveExamWebinarPage = () => {
  const [now, setNow] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const registrationRef = useRef(null);

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
    setShowConfirmation(false);
    setShowForm(true);
    requestAnimationFrame(() => {
      if (registrationRef.current) {
        registrationRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
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

      const { error: insertError } = await supabase.from("webinar").insert({
        webinar_slug: WORKSHOP_SLUG,
        name,
        email,
        phone,
      });

      if (insertError) {
        throw insertError;
      }

      setSuccessMessage(
        "Registration successful! Your data has been submitted. Scan the QR code to pay."
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(254,240,138,0.35),transparent_55%),radial-gradient(circle_at_bottom,_rgba(96,165,250,0.4),transparent_55%)]" />
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-yellow-200/40 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative container pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="mb-8 rounded-2xl bg-slate-900/90 px-5 py-4 shadow-xl shadow-slate-900/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-700/60">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-slate-100 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 text-sm font-semibold">
                ⏱
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Competitive Exam Webinar Starts In
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
            <div className="flex flex-wrap justify-center gap-3 text-slate-100">
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Minutes", value: minutes },
                { label: "Seconds", value: seconds },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center rounded-xl bg-slate-800/80 px-3 py-2 min-w-[64px]"
                >
                  <span className="text-xl font-semibold tabular-nums">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {["Limited Seats", "Recording Included", "Exclusive Tips"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold border border-amber-200"
                  >
                    <span className="text-lg">🔥</span>
                    {badge}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 leading-tight">
                  Master Competitive Exams
                  <span className="block text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text">
                    Learn from a Multi-Qualified Topper
                  </span>
                </h1>
                <div className="text-xl sm:text-2xl font-semibold text-slate-700">
                  Live: 7 PM – 9 PM | Online Interactive Session
                </div>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
                  Saket Choudhary has cracked IIT JEE, SSC CGL, SBI PO, SEBI Grade A, and more. He shares the exact playbooks, schedules, and mindset shifts that helped him convert India&apos;s toughest exams.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
                  <div className="text-sm font-semibold text-amber-700 uppercase tracking-[0.14em] mb-1">
                    Featured Mentor
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Saket Choudhary</h2>
                  <p className="text-sm text-slate-600">Competitive Exam Expert • Multi-Qualified Topper</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                  <div className="text-sm font-semibold text-emerald-700 uppercase tracking-[0.14em] mb-1">
                    Seats Filling Fast
                  </div>
                  <p className="text-sm text-slate-600">
                    Secure your access now and claim recorded replay for seven days.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition w-full sm:w-auto text-center"
                  onClick={handleRegisterClick}
                  disabled={hasEnded}
                >
                  {hasEnded ? "Webinar Ended" : "Reserve Your Seat – ₹399"}
                </button>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                    ✓
                  </span>
                  Secure Payment • Instant Confirmation
                </div>
              </div>
            </div>

            <div className="relative lg:h-[520px] flex items-center justify-center">
              <div className="absolute -top-8 -left-6 h-24 w-24 rounded-full bg-amber-300/30 blur-2xl" />
              <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-blue-300/30 blur-2xl" />
              <div className="relative w-full max-w-xl lg:max-w-none space-y-6">
                <div className="overflow-hidden rounded-[32px] border border-amber-100 shadow-2xl"> 
                  <div className="aspect-[4/5] w-full lg:h-[520px] lg:aspect-auto">
                    <img
                      src={asset('saket_1.jpeg')}
                      alt="Saket Choudhary"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 text-center space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    Featured Mentor
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">Saket Choudhary</h3>
                    <p className="text-sm text-slate-600">Competitive Exam Strategist • Mentor to 1,000+ Aspirants</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {["IIT JEE Qualified", "SSC CGL (3x)", "SBI PO & Clerk", "SEBI Grade A Prelims"].map((highlight) => (
                      <div
                        key={highlight}
                        className="bg-slate-900 text-white text-sm font-semibold px-3 py-2 rounded-xl text-center"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 lg:py-20" ref={registrationRef}>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700 border border-amber-200">
              Why Learn From Saket Choudhary?
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              A proven system forged across India&apos;s toughest exams
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Saket blends precision schedules, layered revision, and mindset conditioning. You uncover shortcuts, frameworks, and routines that helped him shatter multiple competitive exams while mentoring hundreds of aspirants.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { exam: "IIT JEE", detail: "Rank 9700" },
                { exam: "WBJEE", detail: "Rank 544" },
                { exam: "Jharkhand Combined", detail: "Rank 96" },
                { exam: "SSC CGL", detail: "CBI SI & GST Inspector" },
                { exam: "SBI PO & Clerk", detail: "2017 Qualified" },
                { exam: "SEBI Grade A", detail: "Prelims Qualified" },
              ].map(({ exam, detail }) => (
                <div
                  key={exam}
                  className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="text-sm uppercase tracking-[0.16em] text-slate-500 mb-1">{exam}</div>
                  <div className="text-xl font-semibold text-slate-900">{detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">What You&apos;ll Gain From This Webinar</h3>
              <ul className="space-y-3 text-slate-600 text-sm">
                {[
                  "The secret framework Saket uses to crack multiple exams",
                  "Daily & weekly planning techniques for busy aspirants",
                  "Balancing multi-exam prep across SSC, Banking, and UPSC",
                  "Time management hacks for prep and exam day",
                  "Mindset shifts to overcome failures and stay motivated",
                  "Most efficient resources — books, websites, mocks",
                  "Live Q&A: get your doubts answered directly",
                ].map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span className="text-emerald-500">✔</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Your Journey to Success</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Before Webinar", caption: "Confused strategies, wasted time" },
                  { title: "During Webinar", caption: "Learn proven frameworks" },
                  { title: "After Webinar", caption: "Clear roadmap to success" },
                ].map(({ title, caption }, index) => (
                  <div key={title} className="rounded-2xl bg-white p-4 border border-slate-200 text-center">
                    <div className="text-lg font-semibold text-amber-500 mb-1">{index + 1}</div>
                    <h4 className="font-semibold text-slate-900">{title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="container relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs uppercase tracking-[0.22em]">
                <span>VALUE STACK</span>
                <span className="text-amber-300">LIMITED TIME</span>
              </div>
              <h2 className="text-3xl font-bold">Limited Seats! Secure Your Spot Now!</h2>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/15 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-4xl font-black text-amber-300">₹399</div>
                    <div className="text-sm text-white/80">₹999 <span className="text-emerald-400 font-semibold">Save ₹600 Today!</span></div>
                  </div>
                  <div className="text-sm text-white/80 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎁</span>
                      2-hour live interactive session
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💾</span>
                      Access to recorded session (7 days)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">❓</span>
                      Live Q&A with Saket
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📚</span>
                      Exclusive study resources
                    </div>
                  </div>
                </div>
                <button
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-slate-900 font-semibold hover:bg-amber-300 transition"
                  onClick={handleRegisterClick}
                  disabled={hasEnded}
                >
                  {hasEnded ? "Webinar Ended" : "Book Your Seat"}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white/70">
                {[
                  "Secure Payment",
                  "Instant Confirmation",
                  "Seats Filling Fast",
                  "Recording Included",
                ].map((point) => (
                  <div key={point} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/90 text-slate-900 rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4">
              <h3 className="text-xl font-semibold">What Aspirants Say About Saket&apos;s Guidance</h3>
              <p className="text-sm text-slate-600">Join 1,000+ students who have benefited from Saket&apos;s advice.</p>
              <div className="space-y-4">
                {[
                  {
                    quote: "Saket sir's tips helped me clear my banking exam on the first attempt!",
                    name: "Priya S.",
                    badge: "SBI PO Qualified",
                  },
                  {
                    quote: "His strategy made my SSC CGL prep so much easier and focused.",
                    name: "Rahul M.",
                    badge: "SSC CGL Cleared",
                  },
                  {
                    quote: "The mindset coaching was a game-changer for my preparation.",
                    name: "Anjali K.",
                    badge: "UPSC Aspirant",
                  },
                ].map(({ quote, name, badge }) => (
                  <div key={name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-700 font-medium">"{quote}"</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>{name}</span>
                      <span className="text-amber-500 font-semibold">{badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-6">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  {
                    question: "Is the webinar live?",
                    answer:
                      "Yes, it's a live, interactive online session where you can ask questions directly.",
                  },
                  {
                    question: "Will I get access to the recording?",
                    answer: "Yes, registered users get the recording for 7 days after the webinar.",
                  },
                  {
                    question: "Can I get a refund?",
                    answer:
                      "Since seats are limited and reserved for you, registrations are non-refundable. We make sure the session delivers high value!",
                  },
                  {
                    question: "How do I join after payment?",
                    answer:
                      "You will receive the webinar link instantly via email and WhatsApp after registration and payment.",
                  },
                ].map(({ question, answer }) => (
                  <div key={question} className="rounded-2xl border border-slate-200 p-4 bg-white">
                    <h4 className="font-semibold text-slate-900">{question}</h4>
                    <p className="text-sm text-slate-600 mt-1">{answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900 text-white p-6 border border-slate-800 shadow-lg">
              <div className="text-sm uppercase tracking-[0.22em] text-amber-300 mb-3">Session Logistics</div>
              <div className="text-xl font-semibold">7 PM - 9 PM Live Session</div>
              <p className="text-sm text-white/80 mt-2">Limited Seats Available</p>
              <div className="mt-4 space-y-2 text-xs text-white/70">
                <p>For queries: support@webinar.com | WhatsApp: +91 8296548156</p>
                <p className="flex flex-wrap gap-2">
                  <span>Privacy Policy</span>
                  <span>Terms & Conditions</span>
                  <span>Refund Policy</span>
                </p>
                <p>© 2024 Saket Choudhary Webinar. All rights reserved.</p>
              </div>
            </div>
          </div>

          <div className="lg:sticky top-20 space-y-5">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-lg p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Secure Your Seat</h3>
                <p className="text-sm text-slate-600">
                  Reserve your spot in Saket&apos;s live webinar. You&apos;ll unlock the payment QR code immediately after submitting the registration form.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><span className="text-amber-500">•</span> 2-hour live, interactive session</li>
                <li className="flex gap-2"><span className="text-amber-500">•</span> 7-day recording access</li>
                <li className="flex gap-2"><span className="text-amber-500">•</span> Exclusive study frameworks and resources</li>
                <li className="flex gap-2"><span className="text-amber-500">•</span> Live Q&amp;A with Saket</li>
              </ul>
              <button
                className="btn btn-primary w-full"
                onClick={handleRegisterClick}
                disabled={hasEnded}
              >
                {hasEnded ? "Webinar Ended" : "Register & Pay - ₹399"}
              </button>
              <p className="text-xs text-slate-500">
                Need help? Email support@webinar.com or WhatsApp +91 8296548156.
              </p>
            </div>
            <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 space-y-3">
              <h4 className="text-lg font-semibold text-slate-900">How Registration Works</h4>
              <ol className="space-y-2 text-sm text-slate-600">
                <li><span className="font-semibold text-amber-600">Step 1:</span> Click register and enter your name, email, and phone.</li>
                <li><span className="font-semibold text-amber-600">Step 2:</span> Scan the QR code displayed to complete payment.</li>
                <li><span className="font-semibold text-amber-600">Step 3:</span> Receive the webinar link instantly via email and WhatsApp.</li>
              </ol>
              <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
                Seats are limited. Confirmation is shared once payment reflects—don&apos;t wait till the last minute!
              </div>
            </div>
          </div>
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
            <h2 className="text-xl font-semibold mb-2 text-slate-900">
              Register for the Webinar
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Enter your details to reserve your seat. Once registration is successful, you&apos;ll see the QR code to complete payment.
            </p>
            {errorMessage && (
              <div className="mb-3 rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-700 border border-rose-200">
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
                <label className="block text-slate-700" htmlFor="saket-name">
                  Full Name
                </label>
                <input
                  id="saket-name"
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block text-slate-700" htmlFor="saket-email">
                  Email
                </label>
                <input
                  id="saket-email"
                  type="email"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block text-slate-700" htmlFor="saket-phone">
                  Phone
                </label>
                <input
                  id="saket-phone"
                  type="tel"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full"
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
            <h2 className="text-xl font-semibold mb-2 text-slate-900">
              Registration Confirmed!
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Once the payment is completed, the webinar meeting link will be sent to your email instantly.
            </p>
            <div className="flex justify-center mb-4">
              <img
                src={asset('payment.jpeg')}
                alt="Webinar payment QR"
                className="max-h-80 rounded-lg border border-slate-200 shadow-md"
              />
            </div>
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <p>• Confirm the receiver name matches the official webinar partner before paying.</p>
              <p>• Seats are allotted on a first-come, first-served basis once payment is received.</p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-4 shadow-2xl border-t-4 border-yellow-400 z-50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-2">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <div className="font-bold text-lg">₹399 Webinar + Bonus Study System</div>
                <div className="text-sm opacity-90">Recording Included • Live Q&A • Proven Frameworks</div>
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
                {hasEnded ? "Webinar Ended" : "Register Now - ₹399"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default CompetitiveExamWebinarPage;
