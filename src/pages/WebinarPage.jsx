import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { asset } from "@/lib/utils";

// Simple local registration record type for now. In production,
// wire this to your backend / Supabase `webinar` table.
const WEBINAR_SLUG = "ai-agent-human-intern";
const WEBINAR_DATETIME = new Date("2025-12-10T14:30:00+05:30");

const WebinarPage = () => {
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

  const diff = Math.max(0, WEBINAR_DATETIME.getTime() - now.getTime());
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

      // Insert into webinar table (no auth required for now)
      const { error: insertError } = await supabase
        .from('webinar')
        .insert({
          webinar_slug: WEBINAR_SLUG,
          name,
          email,
          phone,
        });

      if (insertError) {
        throw insertError;
      }

      setSuccessMessage("Registration successful! Your data has been submitted. Scan the QR code to pay.");
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
      {/* Hero + full-width countdown */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.6),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.5),transparent_55%)]" />
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />

        <div className="relative container pt-12 pb-16 lg:pt-16 lg:pb-20">
          {/* Countdown bar */}
          <div className="mb-8 rounded-2xl bg-slate-900/90 px-6 py-4 shadow-xl shadow-slate-900/30 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-700/60">
            <div className="flex items-center gap-3 text-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold">
                ⏱
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Live AI Agents Webinar Starts In
                </p>
                <p className="text-sm text-slate-100">
                  {WEBINAR_DATETIME.toLocaleString(undefined, {
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

          {/* Hero content */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
            <div className="space-y-6">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-xl border-2 border-white/20">
                <span className="h-3 w-3 rounded-full bg-white animate-pulse shadow-lg"></span>
                <span className="uppercase tracking-wider">LIVE WEBINAR</span>
                <span className="h-1 w-1 rounded-full bg-white/60"></span>
                <span className="uppercase tracking-wider">LIMITED SEATS</span>
                <span className="h-1 w-1 rounded-full bg-white/60"></span>
                <span className="uppercase tracking-wider">STARTS SOON</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-none">
                  Build Your First
                  <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text">
                    AI Agent
                  </span>
                </h1>
                <div className="flex items-center gap-4">
                  <div className="text-3xl lg:text-4xl font-bold text-slate-700">in 120 Minutes</div>
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    No Coding Needed
                  </div>
                </div>
              </div>

              {/* Enhanced Sub-headline */}
              <div className="space-y-4">
                <p className="text-xl text-slate-700 font-medium leading-relaxed">
                  Join <span className="font-bold text-blue-600">500+ professionals</span> who've already automated their workflow with AI agents.
                  Whether you're a <span className="font-semibold text-purple-600">complete beginner</span> or an <span className="font-semibold text-indigo-600">experienced developer</span>,
                  you'll walk away with a working AI agent that thinks, learns, and executes like a human assistant.
                </p>

                {/* Approach Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🎯</span>
                      <span className="font-bold text-blue-800">No-Code Approach</span>
                    </div>
                    <p className="text-sm text-blue-700">Perfect for entrepreneurs, managers, and business owners who want AI power without technical complexity.</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">💻</span>
                      <span className="font-bold text-purple-800">Developer Approach</span>
                    </div>
                    <p className="text-sm text-purple-700">For programmers who want to customize, extend, and integrate AI agents into their existing systems.</p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-200">
                    <span className="text-lg">✅</span>
                    Zero Coding Required
                  </span>
                  <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200">
                    <span className="text-lg">🎯</span>
                    Step-by-Step Guidance
                  </span>
                  <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold border border-purple-200">
                    <span className="text-lg">🚀</span>
                    Production-Ready Results
                  </span>
                  <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold border border-orange-200">
                    <span className="text-lg">🎓</span>
                    FREE Certificate Included
                  </span>
                </div>
              </div>

              {/* Comprehensive Benefits Section */}
              <div className="bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50 p-6 rounded-2xl border border-slate-200 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎁</span>
                  What You'll Get (Worth ₹2,51,500+)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 text-xl mt-0.5">✓</span>
                      <div>
                        <div className="font-semibold text-slate-900">Working AI Agent</div>
                        <div className="text-sm text-slate-600">Complete system that automates your workflow</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 text-xl mt-0.5">✓</span>
                      <div>
                        <div className="font-semibold text-slate-900">100+ Website Templates</div>
                        <div className="text-sm text-slate-600">Professional business websites ready to launch</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 text-xl mt-0.5">✓</span>
                      <div>
                        <div className="font-semibold text-slate-900">50+ SaaS Applications</div>
                        <div className="text-sm text-slate-600">Complete software solutions with source code</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 text-xl mt-0.5">✓</span>
                      <div>
                        <div className="font-semibold text-slate-900">50+ Web Apps</div>
                        <div className="text-sm text-slate-600">Production-ready web applications</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 text-xl mt-0.5">✓</span>
                      <div>
                        <div className="font-semibold text-slate-900">50+ Mobile Apps</div>
                        <div className="text-sm text-slate-600">Native and cross-platform mobile solutions</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 text-xl mt-0.5">✓</span>
                      <div>
                        <div className="font-semibold text-slate-900">AI Agent Blueprints</div>
                        <div className="text-sm text-slate-600">Templates for building custom AI systems</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-slate-900">🏆</div>
                      <div className="text-sm font-semibold text-slate-700">Certificate</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-900">♾️</div>
                      <div className="text-sm font-semibold text-slate-700">Lifetime Access</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-900">👥</div>
                      <div className="text-sm font-semibold text-slate-700">Private Community</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-900">📞</div>
                      <div className="text-sm font-semibold text-slate-700">30-Day Support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webinar Details Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="card text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">DATE</div>
                  <div className="text-lg font-bold text-slate-900">
                    {WEBINAR_DATETIME.toLocaleDateString()}
                  </div>
                </div>
                <div className="card text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">DURATION</div>
                  <div className="text-lg font-bold text-slate-900">120 Minutes</div>
                </div>
                <div className="card text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">FORMAT</div>
                  <div className="text-lg font-bold text-slate-900">Live Online</div>
                </div>
                <div className="card text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">INVESTMENT</div>
                  <div className="text-2xl font-bold text-slate-900">₹399</div>
                  <div className="text-sm text-slate-500 line-through">₹2,999</div>
                  <div className="text-xs font-bold text-emerald-600">83% OFF</div>
                </div>
              </div>

              {/* Enhanced CTA Section */}
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <button
                    className="btn btn-primary text-xl px-10 py-5 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-bold rounded-2xl"
                    onClick={handleRegisterClick}
                    disabled={hasEnded}
                  >
                    {hasEnded ? "Webinar Ended" : "🚀 Secure Your Spot Now - ₹399"}
                  </button>

                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-2 text-red-800 font-bold text-lg mb-1">
                      <span className="animate-pulse">⚠️</span>
                      Only 47 seats left!
                    </div>
                    <div className="text-red-700 font-semibold">⏰ Offer ends in 24 hours</div>
                    <div className="text-red-600 text-sm mt-1">Don't miss this ₹2,51,500 value for ₹399</div>
                  </div>
                </div>

                {/* Enhanced Social Proof */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200 shadow-lg">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 border-3 border-white shadow-md"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 border-3 border-white shadow-md"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 border-3 border-white shadow-md"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 border-3 border-white flex items-center justify-center text-white text-sm font-bold">500+</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-900 text-lg">Join 500+ developers who've already registered</div>
                    <div className="text-slate-600 text-sm mt-1">From startups to Fortune 500 companies</div>
                  </div>
                </div>

                {/* Career Transformation Value */}
                <div className="text-center bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-4 border border-purple-200 shadow-lg">
                  <div className="flex items-center justify-center gap-2 text-purple-800 font-bold text-lg mb-2">
                    {/* Expert team overview */}
                    <section className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-10 lg:py-14 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-200/20 to-transparent rounded-full blur-3xl"></div>

                      <div className="container relative">
                        <div className="max-w-6xl mx-auto space-y-12">
                          <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50 mb-4">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span className="text-sm font-semibold text-slate-700">Built by Specialists</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-3">Fullstackverse AI Delivery Team</h2>
                            <p className="text-slate-600 max-w-3xl mx-auto">
                              The masterclass is delivered by a cross-functional group of AI strategists, product engineers, and growth consultants who ship production agent stacks for clients every day.
                            </p>
                          </div>

                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                              {
                                title: "AI Solution Architects",
                                description: "Model workflows, multi-agent orchestration, and guardrails used across Fortune 500 engagements.",
                              },
                              {
                                title: "Product Engineers",
                                description: "Build fullstack interfaces, automations, and integrations that turn agents into finished products.",
                              },
                              {
                                title: "Growth Advisors",
                                description: "Map positioning, pricing, and go-to-market plans so you monetise your agent services faster.",
                              },
                              {
                                title: "Data Operations Leads",
                                description: "Establish prompt libraries, evaluation loops, and governance playbooks for reliable deployments.",
                              },
                              {
                                title: "Client Success Coaches",
                                description: "Provide post-session office hours, community feedback, and accountability to keep you shipping.",
                              },
                              {
                                title: "Compliance Specialists",
                                description: "Share policy frameworks, audit trails, and risk controls demanded by enterprise buyers.",
                              },
                            ].map(({ title, description }) => (
                              <div
                                key={title}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 shadow-lg shadow-slate-200/30"
                              >
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
                              </div>
                            ))}
                          </div>

                          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 text-center">
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">What This Means for You</h3>
                            <p className="text-sm text-slate-700 max-w-3xl mx-auto">
                              Every template, automation, and business workflow shared in the session is validated by client launches, so you shortcut months of experimentation.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Deployment Guides */}
                    <div className="group rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 p-2 hover:bg-green-400/30 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <div className="text-2xl mb-0.5">🚀</div>
                        <div className="text-lg font-bold text-white">Complete</div>
                        <div className="text-sm text-green-100 leading-tight">Deployment Guides</div>
                      </div>
                    </div>

                    {/* Premium Certificate - Enhanced */}
                    <div className="group rounded-xl bg-gradient-to-br from-yellow-400/25 to-orange-500/25 backdrop-blur-sm border-2 border-yellow-400/40 p-3 hover:bg-yellow-400/35 transition-all duration-300 hover:scale-105 col-span-3 shadow-lg">
                      <div className="text-center">
                        <div className="text-6xl mb-1 animate-bounce">🏆</div>
                        <div className="text-2xl font-black text-white mb-1">PREMIUM CERTIFICATE</div>
                        <div className="text-base font-bold text-yellow-200 mb-1">AI Agent Builder Certification</div>
                        <div className="text-sm text-yellow-100 bg-yellow-500/20 rounded-full px-2 py-1 inline-block font-semibold">
                          Industry Recognized • Lifetime Valid
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Agent Features - Optimized */}
                  <div className="relative space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 p-2">
                      <div className="text-2xl">🧠</div>
                      <div>
                        <div className="text-base font-bold text-white">AI Agent Training</div>
                        <div className="text-sm text-emerald-100">Custom model training guides</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 p-2">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <div className="text-base font-bold text-white">No-Code Builder</div>
                        <div className="text-sm text-blue-100">Drag & drop AI agent creation</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 p-2">
                      <div className="text-2xl">💰</div>
                      <div>
                        <div className="text-base font-bold text-white">Monetization Strategies</div>
                        <div className="text-sm text-purple-100">Turn AI agents into income</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 p-2">
                      <div className="text-2xl">🚀</div>
                      <div>
                        <div className="text-base font-bold text-white">Deployment Ready</div>
                        <div className="text-sm text-orange-100">Launch in minutes, not hours</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500/20 to-green-500/20 border border-teal-400/30 p-2">
                      <div className="text-2xl">👥</div>
                      <div>
                        <div className="text-base font-bold text-white">AI Builder Community</div>
                        <div className="text-sm text-teal-100">Connect with 500+ builders</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 p-2">
                      <div className="text-2xl">📞</div>
                      <div>
                        <div className="text-base font-bold text-white">30-Day Expert Support</div>
                        <div className="text-sm text-indigo-100">Personal AI agent guidance</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="relative text-center mt-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-base font-bold text-white border border-white/20">
                      <span className="animate-spin text-xl">⚡</span>
                      Build Your First AI Agent Today
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-3 -right-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-bounce">
                  🔥 HOT
                </div>
                <div className="absolute -bottom-3 -left-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                  FREE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 lg:py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.2),transparent_50%),radial-gradient(circle_at_40%_70%,rgba(120,219,226,0.2),transparent_50%)]" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />

        <div className="container relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-6">
                <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-lg"></span>
                <span className="text-sm font-bold text-white uppercase tracking-wider">Success Stories</span>
                <span className="h-3 w-3 rounded-full bg-blue-400 animate-pulse shadow-lg" style={{animationDelay: '0.5s'}}></span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                What Our <span className="text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text">AI Builders</span> Say
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto font-medium">
                Join 500+ professionals who've transformed their careers with AI agent expertise
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Testimonial 1 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "This webinar completely changed my perspective on AI development. Built my first AI agent in just 90 minutes - no coding experience needed!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    A
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Arjun Mehta</div>
                    <div className="text-blue-200 text-xs">Startup Founder</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "As a non-technical entrepreneur, I was skeptical. But the no-code approach made it so simple. My AI agent now handles customer inquiries 24/7!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                    S
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Sneha Patel</div>
                    <div className="text-emerald-200 text-xs">Business Owner</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "The AI agent templates are incredible! Saved me weeks of development time. The premium certificate also boosted my LinkedIn profile significantly."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    R
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Rahul Sharma</div>
                    <div className="text-purple-200 text-xs">Full-Stack Developer</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "From zero to AI agent expert in 120 minutes! The step-by-step guidance was perfect. Now offering AI solutions to my clients."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                    P
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Priya Singh</div>
                    <div className="text-orange-200 text-xs">Freelance Consultant</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "The community support is amazing! Got help deploying my first AI agent and now it's generating revenue. Best investment ever."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    V
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Vikram Joshi</div>
                    <div className="text-cyan-200 text-xs">AI Entrepreneur</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 6 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "As a marketing manager, I never thought I'd build AI agents. The no-code platform made it possible. Now automating my entire workflow!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
                    K
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Kavita Rao</div>
                    <div className="text-pink-200 text-xs">Marketing Manager</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 7 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "The deployment guides are worth the price alone! Got my AI agent live in under an hour. The certificate opened new job opportunities."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    M
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Mohit Kumar</div>
                    <div className="text-indigo-200 text-xs">Software Engineer</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 8 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "Started as a complete beginner, now building AI agents for clients. The 30-day support was crucial for my learning journey."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                    N
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Neha Gupta</div>
                    <div className="text-teal-200 text-xs">AI Developer</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 9 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "The AI agent I built increased my productivity by 300%! From manual tasks to automated workflows - game changer for my business."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    D
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Deepak Verma</div>
                    <div className="text-amber-200 text-xs">Operations Manager</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 10 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "Beautiful UI/UX on the platform! Made learning enjoyable. The chatbot blueprint I created now handles 1000+ conversations daily."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    I
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Ishita Jain</div>
                    <div className="text-rose-200 text-xs">Product Designer</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 11 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "As a CTO, I was impressed by the technical depth. The API integrations and deployment strategies are production-ready."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    A
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Ankit Agarwal</div>
                    <div className="text-violet-200 text-xs">CTO</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 12 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "Launched my AI SaaS business using the templates! The monetization strategies helped me reach profitability in month 1."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-lime-400 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                    T
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Tarun Malhotra</div>
                    <div className="text-lime-200 text-xs">SaaS Founder</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 13 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "The mobile apps I built with the templates are getting 50k+ downloads! Never thought AI development could be this accessible."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    L
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Lavanya Krishnan</div>
                    <div className="text-sky-200 text-xs">Mobile Developer</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 14 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-fuchsia-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "From data analyst to AI solutions provider! The skills I learned here increased my consulting rates by 5x."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    R
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Riya Choudhury</div>
                    <div className="text-fuchsia-200 text-xs">Data Analyst</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 15 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "The website templates are stunning! Built my AI agency's site in hours. Clients love the professional look."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    S
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Sanjay Tiwari</div>
                    <div className="text-emerald-200 text-xs">Agency Owner</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 16 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 font-medium">
                  "90 minutes that changed my career trajectory! The automation scripts I built save me 20 hours per week. Pure gold!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                    Y
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Yashvardhan Singh</div>
                    <div className="text-orange-200 text-xs">Business Analyst</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-blue-600 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-blue-500/30 hover:shadow-3xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <span className="animate-pulse">⭐</span>
                Join 500+ Successful AI Builders
                <span className="animate-pulse">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="bg-white/80 border-y border-slate-100 py-10 lg:py-14">
        <div className="container">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">
            What You Will Learn
          </h2>
          <p className="text-sm text-slate-600 mb-6 max-w-2xl">
            A practical, engineer-friendly breakdown of how to design, build,
            and ship your first AI agent that behaves like a human intern —
            from architecture to live demo and deployment roadmap.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {["Core concepts behind AI agents that read, think, and act","Designing an agent that works like a human intern","Connecting agents to your tools, data, and APIs","Picking a practical tech stack for your first agent","Live walkthrough of an end-to-end AI agent build","A roadmap to go from prototype to production-ready agents"].map(
              (item) => (
                <div key={item} className="service-card flex items-start gap-3">
                  <span className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-[12px] text-blue-600 font-semibold">
                    ✓
                  </span>
                  <p className="text-sm text-slate-800">{item}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Who should attend & Agenda */}
      <section className="container py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-2">
              Who Should Attend
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              This webinar is ideal for builders and decision-makers who want to
              ship real AI agents, not just chatbots or slideware.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Founders & business owners exploring AI-powered operations</li>
              <li>• Product managers and tech leads owning automation roadmaps</li>
              <li>• Developers who want to build and ship AI agents at work</li>
              <li>• Robotics, embedded, or full-stack engineers curious about agents</li>
              <li>• Anyone who wants a clear, practical agent-building blueprint</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-2">
              Agenda (90 Minutes)
            </h2>
            <ol className="space-y-3 text-sm text-slate-700">
              <li>
                <span className="font-semibold text-slate-900">1. Welcome & context (10 min)</span>
                <br />
                Why AI agents and full-stack systems are reshaping modern
                businesses.
              </li>
              <li>
                <span className="font-semibold text-slate-900">2. AI agents deep dive (20 min)</span>
                <br />
                How agents think, decide, and act across your tools.
              </li>
              <li>
                <span className="font-semibold text-slate-900">3. Live demo (20 min)</span>
                <br />
                A realistic workflow built with FullStackverse patterns.
              </li>
              <li>
                <span className="font-semibold text-slate-900">4. Tech stack breakdown (20 min)</span>
                <br />
                What we use for web, mobile, desktop, and infra.
              </li>
              <li>
                <span className="font-semibold text-slate-900">5. Roadmap & Q&A (20 min)</span>
                <br />
                Concrete next steps and open questions.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Why FullStackverse / credibility */}
      <section className="bg-white py-10 lg:py-14">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">
              Why FullStackverse
            </h2>

            {/* Pricing Banner */}
            <div className="relative mb-8">
              <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 rounded-2xl p-6 text-center text-white shadow-xl">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold animate-bounce">
                    🔥 LIMITED TIME
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div>
                    <div className="text-4xl font-bold">₹399</div>
                    <div className="text-sm opacity-90">One-time payment</div>
                  </div>
                  <div className="h-12 w-px bg-white/30"></div>
                  <div>
                    <div className="text-xl line-through opacity-70">₹2,999</div>
                    <div className="text-lg font-bold text-yellow-300">83% OFF</div>
                  </div>
                </div>
                <p className="text-sm opacity-90">
                  Worth ₹50,000+ in assets • Pay once, own forever • Instant access after payment
                </p>
              </div>
            </div>

            <p className="text-lg text-slate-700 mb-8">
              Because this is not a theory session. You walk away with real assets, real tools, and real opportunities.
            </p>

            <div className="space-y-8">
              <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  🔥 🎁 You Get 100+ Ready-Made Website Templates
                </h3>
                <p className="text-slate-700 mb-4">
                  Professional, modern, business-grade websites you can:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>launch,</li>
                  <li>customize,</li>
                  <li>sell to clients,</li>
                  <li>study for learning,</li>
                  <li>or use as full projects.</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  Perfect for students, freelancers, and entrepreneurs.
                </p>
              </div>

              <div className="card bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  🔥 🚀 You Get 50+ Ready-to-Use SaaS Softwares & Applications
                </h3>
                <p className="text-slate-700 mb-4">
                  During the webinar, you get access to fully built, deployable SaaS products like:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>CRM systems</li>
                  <li>Billing apps</li>
                  <li>Inventory & POS</li>
                  <li>Task management</li>
                  <li>AI tools</li>
                  <li>Business dashboards</li>
                  <li>Productivity platforms</li>
                  <li>And many more.</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  You can learn from them, modify them, or use them to start your own agency/SaaS business.
                </p>
              </div>

              <div className="card bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  🔥 🌐 You Get 50+ Production-Ready Web Apps (Source Code Included)
                </h3>
                <p className="text-slate-700 mb-4">
                  Complete web applications ready for deployment:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>Business dashboards</li>
                  <li>E-commerce platforms</li>
                  <li>Admin panels</li>
                  <li>Customer portals</li>
                  <li>Analytics tools</li>
                  <li>And many more web solutions</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  Launch your own SaaS business or use as client projects.
                </p>
              </div>

              <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  🔥 📱 You Get 50+ Mobile Apps (Source Code Included)
                </h3>
                <p className="text-slate-700 mb-4">
                  Native and cross-platform mobile applications:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>Android apps</li>
                  <li>iOS apps</li>
                  <li>Cross-platform solutions</li>
                  <li>Mobile commerce apps</li>
                  <li>Productivity tools</li>
                  <li>Social & utility apps</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  Build your mobile app portfolio or start a mobile development agency.
                </p>
              </div>

              <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  🔥 📚 Building AI Agent Ebook (₹1500 Value - FREE!)
                </h3>
                <p className="text-slate-700 mb-4">
                  Comprehensive 200+ page guide covering:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>AI Agent Architecture Fundamentals</li>
                  <li>Step-by-step Implementation Guides</li>
                  <li>Real-world Case Studies</li>
                  <li>Integration Patterns & Best Practices</li>
                  <li>Deployment & Scaling Strategies</li>
                  <li>Troubleshooting & Optimization</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  Your complete reference manual for AI agent development - normally ₹1500, included FREE!
                </p>
              </div>

              <div className="card bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  🔥 🤖 Learn How to Build AI Agents That Work Like Real Employees
                </h3>
                <p className="text-slate-700 mb-4">
                  We break down the exact systems used in real companies:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>AI agents</li>
                  <li>Automation workflows</li>
                  <li>Autonomous tools</li>
                  <li>Business decision bots</li>
                  <li>Integration scripts</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  You'll understand the blueprint behind real-world AI systems.
                </p>
              </div>

              <div className="card bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  🔥 🧩 Proven Roadmap to Build & Launch Your Own Software or SaaS
                </h3>
                <p className="text-slate-700 mb-4">
                  You'll learn:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>How to convert any idea into a working product</li>
                  <li>Architecture for apps, websites, and full-stack systems</li>
                  <li>How to build fast using templates + AI</li>
                  <li>How to turn software into income</li>
                </ul>
              </div>

              <div className="card bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  🔥 💼 Perfect for Students, Professionals & Founders
                </h3>
                <p className="text-slate-700 mb-4">
                  This webinar gives you:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>Ready projects for resumes</li>
                  <li>Fully working products for freelancing</li>
                  <li>SaaS ideas you can launch</li>
                  <li>A real head start in AI + app development</li>
                  <li>The exact tools to begin earning immediately</li>
                </ul>
              </div>

              <div className="card bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  🌟 The Goal of This Webinar
                </h3>
                <p className="text-slate-700 mb-4">
                  Not just learning.<br />
                  Not just motivation.<br />
                  Not just slides.
                </p>
                <p className="text-slate-700 mb-4">
                  You will walk away with:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>✔ 100+ Website Templates</li>
                  <li>✔ 50+ SaaS Applications</li>
                  <li>✔ 50+ Web Apps (Source Code)</li>
                  <li>✔ 50+ Mobile Apps (Source Code)</li>
                  <li>✔ AI Agent Blueprints</li>
                  <li>✔ Building AI Agent Ebook (₹1500 value)</li>
                  <li>✔ Full Development Roadmap</li>
                  <li>✔ Templates You Can Launch Today</li>
                  <li>✔ FREE AI Agent Builder Certificate</li>
                  <li>✔ Lifetime Access to All Materials</li>
                  <li>✔ Private Community Access</li>
                  <li>✔ 30 Days of Personal Support</li>
                </ul>
                <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ Limited Time: ₹399 (Regular ₹2,999)</h4>
                  <p className="text-sm text-red-700">
                    This special pricing ends soon. Don't miss out on ₹2,51,500+ worth of assets for just ₹399.
                    Seats are limited and filling up fast!
                  </p>
                </div>
                <p className="text-lg font-semibold text-slate-900 mt-4">
                  This is the highest-value tech webinar you will attend this year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Showcase Section */}
      <section className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-10 lg:py-14 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-orange-200/30 to-transparent rounded-full blur-2xl"></div>

        <div className="container relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full border border-amber-200 mb-4">
              <span className="text-amber-600">🏆</span>
              <span className="text-sm font-semibold text-amber-800">FREE Certificate Included</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Earn Your AI Agent Builder Certification
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Complete the webinar and receive an industry-recognized certificate that validates your AI agent building skills
            </p>
          </div>

          {/* Certificate Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Certificate Design */}
              <div className="bg-gradient-to-br from-white via-amber-50/50 to-orange-50/50 rounded-3xl border-4 border-gradient-to-r from-amber-300 to-orange-300 p-8 shadow-2xl shadow-amber-500/20 relative overflow-hidden">
                {/* Decorative border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-amber-300/50"></div>

                {/* Certificate Content */}
                <div className="relative text-center space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      <span>🎓</span>
                      OFFICIAL CERTIFICATE
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">AI Agent Builder Certification</h3>
                    <p className="text-amber-700 font-medium">Presented by FullStackverse</p>
                  </div>

                  {/* Certificate Body */}
                  <div className="bg-white/60 rounded-2xl p-6 border border-amber-200">
                    <p className="text-slate-700 mb-4">This is to certify that</p>
                    <div className="text-2xl font-bold text-slate-900 mb-2">[Your Name]</div>
                    <p className="text-slate-700 mb-4">has successfully completed the comprehensive training in</p>
                    <div className="text-xl font-semibold text-amber-700 mb-4">Building AI Agents That Work Like Human Interns</div>
                    <p className="text-sm text-slate-600">
                      Demonstrating proficiency in AI agent architecture, implementation, and deployment
                      using modern full-stack technologies and industry best practices.
                    </p>
                  </div>

                  {/* Skills & Competencies */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                      <div className="text-blue-600 font-semibold mb-2">🤖 AI Agent Development</div>
                      <div className="text-sm text-slate-600">Architecture & Implementation</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                      <div className="text-emerald-600 font-semibold mb-2">⚡ Full-Stack Integration</div>
                      <div className="text-sm text-slate-600">Web, Mobile & Backend</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                      <div className="text-purple-600 font-semibold mb-2">🚀 Production Deployment</div>
                      <div className="text-sm text-slate-600">Launch & Scale</div>
                    </div>
                  </div>

                  {/* Signature & Date */}
                  <div className="flex justify-between items-end pt-6">
                    <div className="text-left">
                      <div className="border-b border-slate-400 w-32 mb-1"></div>
                      <div className="text-sm text-slate-600">Fullstackverse Team Lead</div>
                      <div className="text-xs text-slate-500">Authorized Signatory</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600">Date Issued</div>
                      <div className="text-lg font-semibold text-slate-900">[Completion Date]</div>
                    </div>
                  </div>

                  {/* Certificate ID */}
                  <div className="pt-4 border-t border-amber-200">
                    <div className="text-xs text-slate-500">Certificate ID: FSV-AI-2025-[YourID]</div>
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20"></div>
              </div>

              {/* Benefits of Certificate */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-amber-500">💼</span>
                    Career Advancement
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Showcase AI expertise on LinkedIn</li>
                    <li>• Stand out in job applications</li>
                    <li>• Validate your skills to employers</li>
                    <li>• Open doors to AI-focused roles</li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-amber-500">🚀</span>
                    Business Opportunities
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Build credibility with clients</li>
                    <li>• Charge premium rates for AI services</li>
                    <li>• Start your AI consulting business</li>
                    <li>• Attract high-value partnerships</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency & Social Proof Section */}
      <section className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="animate-pulse">⏰</span>
              <span className="font-semibold">LIMITED TIME OFFER</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Don't Miss Out on ₹2,51,500+ Worth of Assets
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">₹399</div>
                <div className="text-sm opacity-90">Today Only</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">₹2,600</div>
                <div className="text-sm opacity-90">You Save</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">83%</div>
                <div className="text-sm opacity-90">Discount</div>
              </div>
            </div>
            <p className="text-lg mb-6 opacity-90">
              Join 500+ developers who have already transformed their careers with FullStackverse
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="bg-white text-red-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                onClick={handleRegisterClick}
                disabled={hasEnded}
              >
                {hasEnded ? "Webinar Ended" : "🔥 Claim Your Spot Now"}
              </button>
              <div className="text-sm opacity-75">
                ⏰ Offer ends in: <span className="font-bold">24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-10 lg:py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">
          Frequently Asked Questions
        </h2>

        {/* Pricing FAQ */}
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
            💰 Webinar Pricing & Value
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Webinar Fee:</span>
                <span className="font-bold text-slate-900">₹399</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Original Value:</span>
                <span className="line-through text-slate-500">₹2,999</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">You Save:</span>
                <span className="font-bold text-emerald-600">₹2,600 (83%)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Duration:</span>
                <span className="font-semibold text-slate-900">90 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Access:</span>
                <span className="font-semibold text-slate-900">Lifetime</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Assets Value:</span>
                <span className="font-semibold text-slate-900">₹50,000+</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700">
          <details className="card bg-white/90">
            <summary className="cursor-pointer list-none font-medium text-slate-900">
              Do I get a replay recording?
            </summary>
            <p className="mt-2 text-sm">
              We plan this as a live, action-focused session. A replay may be
              shared with registered participants depending on the final
              format. Join live to get the most value.
            </p>
          </details>
          <details className="card bg-white/90">
            <summary className="cursor-pointer list-none font-medium text-slate-900">
              When do I see the payment QR code?
            </summary>
            <p className="mt-2 text-sm">
              First you register with your name, email, and phone. Once
              registration is successful, we immediately show you the QR code
              so you can complete payment.
            </p>
          </details>
          <details className="card bg-white/90">
            <summary className="cursor-pointer list-none font-medium text-slate-900">
              What tools or setup do I need?
            </summary>
            <p className="mt-2 text-sm">
              A laptop or desktop with a stable internet connection is
              recommended. You can also join from mobile, but for note-taking
              and demos a bigger screen helps.
            </p>
          </details>
          <details className="card bg-white/90">
            <summary className="cursor-pointer list-none font-medium text-slate-900">
              Is this session only for technical people?
            </summary>
            <p className="mt-2 text-sm">
              No. We keep the content understandable for founders and
              business leaders while still going deep enough for engineers and
              product folks.
            </p>
          </details>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white/90 border-t border-slate-100 py-8 lg:py-10">
        <div className="container flex flex-col items-center gap-3 text-center">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Ready to build AI-powered systems for your business?
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Reserve your seat for this paid, high-signal session and walk away
            with a concrete roadmap for AI agents, apps, and automation.
          </p>
          <button
            className="btn btn-primary mt-1"
            onClick={handleRegisterClick}
            disabled={hasEnded}
          >
            {hasEnded ? "Webinar Ended" : "Register & Pay"}
          </button>
        </div>
      </section>

      {/* Registration modal */}
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
              Enter your details to reserve your seat. Once registration is
              successful, you&apos;ll see the QR code to complete payment.
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

      {/* Confirmation + QR modal */}
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
              <p>
                • Make sure the receiver name matches your official webinar
                partner before confirming payment.
              </p>
              <p>
                • Seats are allotted on a first-come, first-served basis once
                payment is received.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Final Conversion Booster - Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-4 shadow-2xl border-t-4 border-yellow-400 z-50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-2">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <div className="font-bold text-lg">₹399 Webinar + ₹2,51,500 Assets</div>
                <div className="text-sm opacity-90">FREE Certificate • Lifetime Access • Private Community</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                🔥 83% OFF - Limited Time
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

      {/* Add bottom padding to account for fixed element */}
      <div className="h-20"></div>
    </div>
  );
};

export default WebinarPage;
