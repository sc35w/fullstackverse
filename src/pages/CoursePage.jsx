import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { supabase } from "@/lib/supabaseClient";
import { asset } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Briefcase,
  CalendarRange,
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  Shield,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const COURSE_SLUG = "data-science-course";
const DEFAULT_VIDEO_ID = "rHux0gMZ3Eg";

const CoursePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [playerError, setPlayerError] = useState(false);

  const videoId = useMemo(
    () => import.meta.env.VITE_DATA_SCIENCE_VIDEO_ID || DEFAULT_VIDEO_ID,
    []
  );

  const embeddedVideoUrl = useMemo(() => {
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      enablejsapi: "1",
    });

    if (typeof window !== "undefined") {
      params.set("origin", window.location.origin);
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }, [videoId]);

  const youtubeWatchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId]
  );

  useEffect(() => {
    setPlayerError(false);
  }, [embeddedVideoUrl]);

  const highlights = [
    {
      icon: Sparkles,
      label: "3-Month Industry Internship",
      description:
        "Train as a data science intern with weekly mentor Sessions and live client-style deliverables.",
    },
    {
      icon: Users,
      label: "Live Industry Projects",
      description:
        "Collaborate in small squads to ship analytics, ML, and agentic AI use cases across industries.",
    },
    {
      icon: Shield,
      label: "Year-long LMS Access",
      description:
        "Keep learning for 12 months with 50+ guided projects, templates, and certifications on demand.",
    },
  ];

  const stats = [
    { label: "Internship Duration", value: "3 months", icon: CalendarRange },
    { label: "Weekly Mentor Sessions", value: "12", icon: Users },
    { label: "Live Industry Projects", value: "10+", icon: Briefcase },
    { label: "LMS Access", value: "12 months", icon: BookOpen },
    { label: "Portfolio Assets", value: "50+", icon: Video },
  ];

  const credentialBadges = [
    { value: "10M+", label: "Learners Upskilled" },
    { value: "400+", label: "Hiring Partners" },
    { value: "500+", label: "Enterprise Clients" },
    { value: "55%", label: "Average Salary Hike" },
  ];

  const facultyFocusAreas = [
    {
      title: "Lead Data Scientists",
      description:
        "Design real-world analytics roadmaps, architect ML systems, and share case studies across finance, SaaS, and consumer businesses.",
    },
    {
      title: "Applied AI Engineers",
      description:
        "Build and deploy production-grade pipelines, agent workflows, and automation layers that mirror enterprise environments.",
    },
    {
      title: "Product Analytics Coaches",
      description:
        "Review dashboards, experimentation frameworks, and stakeholder storytelling so your deliverables drive decisions.",
    },
    {
      title: "Career Mentors",
      description:
        "Host weekly critique sessions, resume walkthroughs, and mock interviews tailored for data science, analytics, and AI roles.",
    },
    {
      title: "Data Operations Specialists",
      description:
        "Provide templates for data governance, documentation, and collaboration rituals used by high-performing analytics teams.",
    },
    {
      title: "Client Delivery Advisors",
      description:
        "Teach consulting playbooks, requirement mapping, and stakeholder management so you can operate like a high-trust practitioner.",
    },
  ];

  const marketSignals = [
    "Paid internships now demand deployable data science skills from day one.",
    "Product teams want interns who can ship end-to-end analytics and AI workflows.",
    "Candidates with hands-on portfolios outpace peers by 55% in offer conversion.",
    "Hybrid programs with LMS support create the fastest pathway to billable projects.",
  ];

  const dataScienceKit = [
    {
      icon: "📘",
      title: "50+ Guided Notebooks",
      description:
        "Hands-on Python, SQL, statistics, and machine learning labs aligned to weekly sprints with mentor commentary for real-world clarity.",
    },
    {
      icon: "🗂️",
      title: "Industry Dataset Vault",
      description:
        "Access curated datasets from finance, retail, healthcare, logistics, and mobility—exactly what data teams use in production environments.",
    },
    {
      icon: "🎓",
      title: "Full LMS Access (12 Weeks)",
      description: "Structured learning inside a dedicated LMS so you stay on track.",
      bullets: [
        "Recorded core lectures",
        "Weekly assignments & evaluations",
        "Progress tracking with mentor feedback",
      ],
      footer: "Lifetime access to anything you complete during the program.",
    },
    {
      icon: "📚",
      title: "20+ Data Science eBooks & Playbooks",
      description: "A premium library covering end-to-end data careers.",
      bullets: [
        "Python & SQL mastery",
        "Machine learning and AI fundamentals",
        "Analytics case studies",
        "Interview prep and career growth",
      ],
    },
    {
      icon: "🏭",
      title: "10+ Live Industry Projects",
      description: "Work on active, mentor-led problems that mirror real companies.",
      bullets: [
        "Data cleaning and feature engineering",
        "Business KPI analysis",
        "Predictive modeling and dashboards",
        "AI-assisted data workflows",
      ],
      footer: "These challenges simulate billable work, not classroom exercises.",
    },
    {
      icon: "🚀",
      title: "Interview Accelerator",
      description: "Comprehensive placement preparation for analytics, ML, and product roles.",
      bullets: [
        "Curated DS, SQL, ML, and case-study question banks",
        "Evaluation rubrics used by hiring teams",
        "Mock interviews with detailed scorecards",
      ],
    },
    {
      icon: "🧾",
      title: "Tailored Resume Creation Assistance",
      description:
        "Pair with mentors to craft outcome-first resumes that translate your internship deliverables into hire-ready narratives.",
      bullets: [
        "ATS-friendly formatting with impact statements",
        "Role-specific resume variants for DS, ML, and analytics",
        "Mentor reviews to sharpen phrasing and positioning",
      ],
    },
    {
      icon: "🎤",
      title: "20+ Live Bootcamps",
      description:
        "Weekly live intensives covering tooling deep dives, system design for data teams, and rapid-fire interview drills.",
      bullets: [
        "Hands-on tooling labs across Python, SQL, and MLOps",
        "Guest sessions with hiring managers and lead data scientists",
        "Live Q&A and whiteboarding critiques to build confidence",
      ],
    },
  ];

  const programFit = {
    ideal: [
      "College students and fresh grads ready to invest tuition plus 10-12 hours weekly.",
      "Working professionals or switchers who want guided accountability and live feedback.",
      "Builders who learn by shipping and want mentors critiquing every deliverable.",
    ],
    notIdeal: [
      "Anyone expecting a stipend, refunds, or passive video watching.",
      "Learners chasing certificates without putting code and insights into production.",
      "People unwilling to demo work-in-progress to mentors and peers every sprint.",
    ],
  };

  const handsOnOutcomes = [
    "Translate briefs into supervised ML pipelines, from data wrangling to deployment.",
    "Automate workflows with agentic AI—LangChain-style tools, evaluators, and guardrails.",
    "Ship analytics dashboards that surface KPIs, cohorts, and ROI narratives for stakeholders.",
    "Document experiment logs, model cards, and Loom walkthroughs for every release.",
  ];

  const hiringProofPoints = [
    "Portfolio-ready GitHub repos, demo videos, and stakeholder decks reviewed by mentors.",
    "Weekly interview drills, role-based Q&A banks, and recruiter outreach templates.",
    "Career story frameworks anchored on real deliverables instead of generic certificates.",
  ];

  const modules = [
    {
      title: "Module 1 • Preparatory Sessions – Python & Linux",
      points: [
        "Set up IDEs, explore Python syntax, and practise object-oriented programming fundamentals.",
        "Master Linux commands, permissions, and scripting for analytics environments.",
        "Complete hands-on assignments to cement core programming workflows.",
      ],
    },
    {
      title: "Module 2 • Inferential Analytics",
      points: [
        "Use Python for descriptive, diagnostic, and inferential statistics.",
        "Translate business questions into statistical hypotheses and models.",
        "Apply prescriptive analytics to recommend data-driven decisions.",
      ],
    },
    {
      title: "Module 3 • Data Transformation Using SQL",
      points: [
        "Refresh SQL fundamentals and write performant analytical queries.",
        "Create user-defined functions for complex business logic.",
        "Optimise SQL workloads for scale across enterprise datasets.",
      ],
    },
    {
      title: "Module 4 • Machine Learning Foundations",
      points: [
        "Understand supervised vs. unsupervised paradigms and core algorithms.",
        "Frame regression, classification, and clustering problems from raw datasets.",
        "Evaluate models with business-aligned metrics and diagnostic tools.",
      ],
    },
    {
      title: "Module 5 • Supervised Learning",
      points: [
        "Implement regression models including linear, logistic, and time-series forecasting.",
        "Apply decision trees, random forests, SVMs, and k-nearest neighbours to production briefs.",
        "Interpret confusion matrices and performance reports for stakeholders.",
      ],
    },
    {
      title: "Module 6 • Unsupervised Learning",
      points: [
        "Execute clustering techniques such as k-means and hierarchical methods.",
        "Use dimensionality reduction with PCA and LDA to simplify feature spaces.",
        "Deploy segmentation strategies that power marketing and CX programs.",
      ],
    },
    {
      title: "Module 7 • Advanced Machine Learning Algorithms",
      points: [
        "Boost model accuracy with ensemble patterns including bagging and boosting.",
           
        "Explore cognitive analytics and ML-driven predictive intelligence.",
        "Design experimentation roadmaps for continuous model improvement.",
      ],
    },
    {
      title: "Module 8 • Data Science at Scale with Spark",
      points: [
        "Ingest and process big data pipelines using Spark core abstractions.",
        "Optimise resilient distributed datasets (RDDs) for performance.",
        "Integrate Spark with Hive for downstream analytics and reporting.",
      ],
    },
    {
      title: "Module 9 • Deep Learning Using TensorFlow",
      points: [
        "Build neural networks and tune them for classification and regression.",
        "Leverage TensorFlow to operationalise deep learning workflows.",
        "Connect AI fundamentals to real-world automation scenarios.",
      ],
    },
    {
      title: "Module 10 • Natural Language Processing",
      points: [
        "Clean, tokenise, and engineer textual datasets for analytics.",
        "Develop sentiment analysis, classification, and recommendation systems.",
        "Prototype chatbots and conversational agents using modern NLP stacks.",
      ],
    },
    {
      title: "Module 11 • Fundamentals of Generative AI Frameworks",
      points: [
        "Experiment with transformers, LSTMs, VAEs, BERT, and GPT architectures.",
        "Understand LangChain-style orchestration for enterprise AI products.",
        "Evaluate model outputs with autonomous agentic evaluators.",
      ],
    },
    {
      title: "Module 12 • Prompt Engineering & Applied Generative AI",
      points: [
        "Design prompts for text, image, and audio generation use-cases.",
        "Deploy retrieval-augmented workflows that ground LLM responses.",
        "Prototype branded AI copilots aligned with compliance guardrails.",
      ],
    },
    {
      title: "Module 13 • Agentic Foundations for ML Workflows",
      points: [
        "Blend reasoning, memory, and tool integration to design AI agents.",
        "Implement ReAct and toolformer inspired patterns for automation.",
        "Ship LangChain or Agno agents for data preparation and model selection.",
      ],
    },
    {
      title: "Module 14 • Intelligent Agent-Driven Modelling & Evaluation",
      points: [
        "Automate hyperparameter suggestion using agent loops.",
        "Capture intermediate reasoning to refine model diagnostics.",
        "Operationalise experimentation with reproducible agent checklists.",
      ],
    },
    {
      title: "Module 15 • Power BI for Decision Intelligence",
      points: [
        "Model business-ready dashboards using Power BI.",
        "Write DAX expressions that translate analytics into impact.",
        "Craft executive visuals combining KPIs, trends, and predictive insights.",
      ],
    },
    {
      title: "Module 16 • MLOps",
      points: [
        "Package and deploy machine learning models with modern pipelines.",
        "Instrument monitoring, alerting, and rollback strategies.",
        "Collaborate with engineering to align infra, security, and governance.",
      ],
    },
    {
      title: "Module 17 • Data Science Capstone",
      points: [
        "Deliver a production-grade project with mentor checkpoints.",
        "Document experiments, ROI, and stakeholder communication.",
        "Present outcomes during a live demo and interview simulation.",
      ],
    },
    {
      title: "Module 18 • Business Case Studies",
      points: [
        "Solve recommendation, forecasting, and risk analytics briefs end-to-end.",
        "Translate ambiguous business goals into measurable AI outcomes.",
        "Benchmark solutions against industry expectations.",
      ],
    },
    {
      title: "Module 19 • Excel Analytics",
      points: [
        "Use Excel to prototype analytics with power tools and data models.",
        "Tackle regression, classification, and information metrics inside Excel.",
        "Create executive dashboards that complement BI platforms.",
      ],
    },
    {
      title: "Module 20 • Career Readiness and Portfolio",
      points: [
        "Participate in mock interviews and placement readiness tests.",
        "Craft resumes, LinkedIn profiles, and pitch decks with mentor feedback.",
        "Leverage 3 guaranteed interviews through the Fullstackverse employer network.",
      ],
    },
  ];

  const cohortTimeline = [
    {
      phase: "Weeks 1-2 • Onboarding Sprint",
      focus: "Kick off Python, Linux, and statistics refreshers while aligning internship goals.",
    },
    {
      phase: "Weeks 3-4 • Analytics Foundations",
      focus: "Ship SQL automation, BI dashboards, and interpret key business metrics.",
    },
    {
      phase: "Weeks 5-6 • Machine Learning Lab",
      focus: "Deliver supervised and unsupervised ML projects with mentor-led code reviews.",
    },
    {
      phase: "Weeks 7-8 • Deep & Generative AI",
      focus: "Prototype TensorFlow, NLP, and agentic workflows for live client briefs.",
    },
    {
      phase: "Weeks 9-10 • Deployment & Ops",
      focus: "Operationalise models with MLOps playbooks and integrate into stakeholder flows.",
    },
    {
      phase: "Weeks 11-12 • Demo Day & Offers",
      focus: "Pitch capstones, present ROI trackers, and transition into full-time conversations.",
    },
  ];

  const programPedagogy = [
    {
      title: "Live Mentor Bootcamps",
      description: "Join weekly bootcamps led by industry mentors who review deliverables and unblock you in real time.",
    },
    {
      title: "Dedicated Internship Advisor",
      description: "A success partner tracks sprint burndown charts, nudges milestones, and coordinates stakeholder feedback.",
    },
    {
      title: "Self-paced Mastery",
      description: "Use bite-sized LMS sprints to reinforce lab work and prep for upcoming releases.",
    },
    {
      title: "Projects, Hackathons & Labs",
      description: "Practice across 50+ guided projects, hackathons, and sandbox labs with feedback loops.",
    },
    {
      title: "Peer Networking",
      description: "Work with cross-functional squads, mirror real-world stand-ups, and expand your network.",
    },
    {
      title: "1:1 Personalized Guidance",
      description: "Book mentor hours for project escalation, interview prep, and stakeholder communication.",
    },
  ];

  const whoCanApply = [
    "Final-year students or recent graduates eager to launch a data science career.",
    "Junior analysts, engineers, or developers transitioning into applied AI roles.",
    "Professionals seeking a hands-on bridge between academics and full-time offers.",
    "Builders interested in agentic AI, automation, and data product development.",
  ];

  const applicationSteps = [
    {
      title: "Submit Application",
      detail: "Share your background, availability, and internship goals in our short form.",
    },
    {
      title: "Assessment & Interview",
      detail: "Complete a skills review and meet mentors to align expectations.",
    },
    {
      title: "Offer & Onboarding",
      detail: "Receive your internship offer letter and confirm onboarding with the admission fee.",
    },
  ];

  const projectShowcase = [
    {
      title: "Stock Price Forecasting",
      level: "Intermediate",
      description:
        "Blend ARIMA, seasonal models, and deep learning nets to predict market movements.",
    },
    {
      title: "Real Estate Analytics",
      level: "Beginner",
      description:
        "Optimise property pricing with ensemble regressors and feature engineering playbooks.",
    },
    {
      title: "Recommendation Engines",
      level: "Beginner",
      description:
        "Use matrix factorisation and SVD to personalise music or media catalogues.",
    },
    {
      title: "Weather Forecasting",
      level: "Intermediate",
      description:
        "Deploy supervised ensembles and hyperparameter tuning to enhance accuracy.",
    },
    {
      title: "Gesture Recognition",
      level: "Advanced",
      description:
        "Build real-time computer vision pipelines to classify human gestures using CNNs.",
    },
    {
      title: "ASL Translator",
      level: "Advanced",
      description:
        "Combine deep learning and speech synthesis to convert sign language into audio cues.",
    },
    {
      title: "Sentiment Analysis",
      level: "Advanced",
      description:
        "Process textual corpora with transformers to classify sentiment at scale.",
    },
    {
      title: "Solar Power Efficiency",
      level: "Beginner",
      description:
        "Model energy output across conditions using regression and feature optimisation.",
    },
  ];

  const careerSupport = [
    {
      title: "Career-Oriented Sessions",
      detail: "Join 10+ mentor-led workshops to map your transition plan and negotiate offers.",
    },
    {
      title: "Profile & Portfolio Building",
      detail: "Craft outcome-focused resumes, LinkedIn profiles, and pitch decks with expert edits.",
    },
    {
      title: "Job Portal Access",
      detail: "Unlock 200+ curated job postings each month via the Fullstackverse network.",
    },
    {
      title: "1:1 Mentorship",
      detail: "Schedule coaching sessions before interviews or manager conversations.",
    },
    {
      title: "Job Fairs & Hackathons",
      detail: "Showcase your work to hiring partners through invite-only career events.",
    },
    {
      title: "Mock Interviews",
      detail: "Practise technical and behavioural rounds aligned with top employer playbooks.",
    },
  ];

  const internshipAssets = [
    "Paid internship certificate co-signed by Fullstackverse leadership.",
    "Access to executive LMS with 200+ templates, datasets, and playbooks for 12 months.",
    "Weekly mentor pod recordings and annotated project walkthroughs.",
    "Capstone pitch assets including decks, ROI models, and stakeholder scripts.",
    "Career toolkit covering resume revamps, outreach scripts, and negotiation frameworks.",
  ];

  const liveProjectTracks = [
    {
      title: "E-commerce Revenue Analytics",
      detail: "Build customer segmentation, churn scoring, and marketing attribution pipelines.",
    },
    {
      title: "FinTech Risk & Compliance",
      detail: "Detect fraud patterns, automate KYC checks, and monitor portfolio risk in real time.",
    },
    {
      title: "Healthcare Agentic Assistants",
      detail: "Design LangChain agents that summarise diagnostics and coordinate care workflows.",
    },
    {
      title: "Manufacturing Predictive Maintenance",
      detail: "Forecast equipment failures and automate alerts using sensor data pipelines.",
    },
    {
      title: "GenAI Content Studio",
      detail: "Ship branded copilots that generate insights, reports, and marketing collateral on demand.",
    },
  ];

  const lmsResources = [
    "Foundational video sprints mapped to each weekly mentor lab.",
    "Downloadable notebooks and starter repos for all 50+ guided projects.",
    "AI prompt vault to accelerate analytics storytelling and executive reporting.",
    "Assessment bank with quizzes, hackathons, and interview-style challenges.",
    "Monthly masterclasses archived for on-demand refreshers.",
  ];

  const enrolmentPerks = [
    "Tuition includes live mentor Sessions, sandbox infrastructure, and the resource vault for 12 months.",
    "Flexible payment plans plus GST invoices for L&D reimbursements.",
    "No stipend—your investment buys guided industry experience and recruiter-ready proof.",
    "Portfolio review unlocks invitations to partner hiring day and demo showcases.",
  ];

  // Show QR directly for all payment CTAs
  const [showQrDirect, setShowQrDirect] = useState(false);
  const handleShowQrDirect = () => {
    setShowQrDirect(true);
    setIsDialogOpen(false);
  };
  const handleRegisterClick = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setShowConfirmation(false);
    setName("");
    setEmail("");
    setPhone("");
    setIsDialogOpen(true);
    setShowQrDirect(false);
  };

  const handleDialogOpenChange = (open) => {
    setIsDialogOpen(open);
    if (!open) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Please fill in name, email, and phone.");
      return;
    }

    try {
      setIsSubmitting(true);

      const { error: insertError } = await supabase.from("webinar").insert({
        webinar_slug: COURSE_SLUG,
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
      <Helmet>
        <title>Paid Data Science Internship Program - Fullstackverse</title>
        <meta
          name="description"
          content="Invest in Fullstackverse’s 12-week mentor-led Data Science & AI internship program. Pay for expert coaching, ship production-grade projects, and graduate with a recruiter-ready portfolio."
        />
      </Helmet>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.6),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.5),transparent_55%)]" />
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />

        <div className="relative container pt-10 pb-16 lg:pt-14 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start">
            <div className="space-y-8 order-1 lg:order-1">
              <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-xl border-2 border-white/20">
                <span className="h-3 w-3 rounded-full bg-white animate-pulse shadow-lg" />
                <span className="uppercase tracking-[0.22em] text-xs lg:text-sm">Certificate Program</span>
                <span className="h-1 w-1 rounded-full bg-white/60" />
                <span className="uppercase tracking-[0.22em] text-xs lg:text-sm">Data Science & AI</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-slate-900 leading-tight">
                  Build Industry-Ready Data Science Skills in 12 Weeks
                  <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text">
                    Invest in mentor-led mastery
                  </span>
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="inline-block bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full border border-green-300 text-lg animate-bounce shadow">All-Inclusive Fee: ₹17,990</span>
                  <span className="text-xs text-slate-500 font-semibold">(No hidden charges)</span>
                </div>
                <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed max-w-3xl">
                  Pay for mentor-grade training, earn production-grade experience—ship AI agents,
                  dashboards, and ML models that hiring managers can trust from week one on the job.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={handleRegisterClick}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span>Apply for the next cohort</span>
                  <svg
                    className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-emerald-100 text-emerald-600 font-semibold">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <span>Intensive Industry Training • Sprint-based mentorship • Production-grade deliverables</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/40 bg-white/70 backdrop-blur shadow-sm shadow-slate-200/70 px-4 py-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <stat.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                        <div className="text-xs uppercase tracking-wide text-slate-500">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div className="relative space-y-8 order-3 lg:order-2">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
                {!playerError ? (
                  <iframe
                    key={embeddedVideoUrl}
                    src={embeddedVideoUrl}
                    title="Fullstackverse Data Science Course Overview"
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    onError={() => setPlayerError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900 text-white p-6 text-center">
                    <h3 className="text-xl font-semibold">Unable to load the YouTube preview here.</h3>
                    <p className="text-sm text-slate-200">
                      Please open the video directly on YouTube to watch the course overview.
                    </p>
                    <a
                      href={youtubeWatchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>
              <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl overflow-hidden border border-slate-700/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.3),transparent_60%)]" />
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div>
                    <div className="text-white/80 text-xs uppercase tracking-[0.28em] mb-6">
                      Cohort Outcomes
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Launch your Data Science career with a mentor-backed portfolio.
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Unlock Fullstackverse mentor support, mock interviews, and job-matching support
                      tailored for AI-driven product teams.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {highlights.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 rounded-2xl bg-white/10 border border-white/10 px-4 py-3"
                      >
                        <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-blue-200">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-white font-semibold">{item.label}</div>
                          <p className="text-slate-200/80 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-2 lg:order-3 lg:col-span-2 bg-gradient-to-br from-slate-50 via-blue-50/60 to-purple-50/60 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60 p-6 space-y-8">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-500 shadow-sm">
                  🎁 Included Toolkit
                </span>
                <span className="inline-block bg-green-50 text-green-700 font-bold px-3 py-1 rounded-full border border-green-200 animate-pulse text-base">
                  Internship Fee: ₹17,990
                </span>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">Data Science Internship Kit</h3>
                  <div className="text-sm text-slate-600 text-left sm:text-right">
                    <div className="font-semibold text-blue-600">Worth ₹1,85,000+</div>
                    <div>Included with enrollment</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {dataScienceKit.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/70 bg-white/85 px-5 py-4 shadow-sm space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl" aria-hidden="true">
                        {item.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">{item.title}</div>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    {item.bullets ? (
                      <ul className="space-y-2 pl-1">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {item.footer ? (
                      <p className="text-xs text-slate-500 leading-relaxed">{item.footer}</p>
                    ) : null}
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Toolkit access unlocks right after your payment is confirmed, with ongoing drops of datasets, agentic workflows, and mentor-reviewed assets throughout the cohort.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-[0.9fr_1.2fr] items-center">
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-blue-200 overflow-hidden relative">
                <div className="h-3 w-full bg-gradient-to-r from-blue-900 via-blue-500 to-orange-400" />
                <div className="flex flex-col gap-0 px-10 pt-8 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <img src={asset('logo (1).png')} alt="Fullstackverse Logo" className="h-14 w-auto" />
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-sm line-through text-slate-400">₹39,990</span>
                        <span className="text-2xl font-extrabold text-green-600 animate-pulse drop-shadow">₹17,990</span>
                        <span className="ml-2 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-300 animate-bounce">LIMITED TIME OFFER</span>
                      </div>
                      <button
                        onClick={handleRegisterClick}
                        className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow hover:scale-105 transition text-base"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h2 className="font-extrabold text-3xl md:text-4xl text-slate-900 mb-1">Certificate of Completion</h2>
                    <div className="text-base font-semibold text-blue-700 mb-2">Awarded by Fullstackverse</div>
                  </div>
                  <div className="text-center mt-2">
                    <div className="text-lg text-slate-700">This is to certify that</div>
                    <div className="name font-extrabold text-2xl md:text-3xl text-blue-900 my-2">[Your Name]</div>
                    <div className="statement text-lg text-slate-700">has successfully completed the <span className="font-extrabold text-blue-900">Data Science & AI Internship and Training</span>.</div>
                  </div>
                  <div className="flex flex-row items-center justify-between mt-6 mb-2">
                    <div className="validation text-xs text-slate-500">
                      Validate at <a href="https://www.fullstackverse.com" target="_blank" className="text-blue-600 underline">fullstackverse.com</a>
                    </div>
                    {/* QR code will be shown after payment form submission */}
                  </div>
                  <div className="flex flex-row items-end justify-between mt-4">
                    <div className="sig-block border-t border-slate-200 pt-2">
                      <div className="sig-name font-extrabold text-base text-slate-900">Program Director</div>
                      <div className="sig-role text-xs text-slate-500">Fullstackverse Training Division</div>
                    </div>
                    <div className="seal w-20 h-20 rounded-full border-2 border-blue-200 bg-blue-50 flex flex-col items-center justify-center text-blue-900 font-extrabold text-base shadow">
                      Fullstackverse
                      <span className="block text-xs text-blue-500 font-bold">Official Credential</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 mt-2">Issued: December 14, 2025</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
                Program Snapshot
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Invest in industry readiness, not another certificate
                <span className="block mt-2 text-green-700 text-2xl font-extrabold animate-pulse">
                  Now only ₹17,990 for the full internship!
                </span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                You pay to work like a billable consultant: agile rituals, mentor reviews, and
                production deployments. Every sprint ends with artefacts recruiters can open, assess,
                and remember.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 mb-2">
                    Built For
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {programFit.ideal.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-red-500 mb-2">
                    Not Ideal For
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {programFit.notIdeal.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-0.5 h-4 w-4 rounded-full border border-red-400 text-red-400 flex items-center justify-center text-[10px]">
                          -
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  What you’ll ship in sprint reviews
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {handsOnOutcomes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-600">
                  Why this converts to offers
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {hiringProofPoints.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {credentialBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm shadow-slate-100"
                >
                  <div className="text-3xl font-black text-slate-900">{badge.value}</div>
                  <div className="text-xs uppercase tracking-wide text-slate-500 mt-1">
                    {badge.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white shadow-lg">
            <div className="text-sm font-semibold uppercase tracking-[0.32em] text-white/80 mb-4">
              Why Data Science & AI now
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {marketSignals.map((signal) => (
                <div key={signal} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-200" />
                  <span className="text-sm leading-relaxed text-white/90">{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              Program Curriculum
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
              Master 20 sprints that mirror real product lifecycles
            </h2>
            <p className="text-lg text-slate-600">
              Every module feeds into your internship backlog—spanning analytics, ML, generative AI,
              dashboards, and deployment. Graduate with the skills to own deliverables end to end.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {modules.map((module) => (
              <div
                key={module.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-100"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Layers className="h-5 w-5" />
                  </span>
                  {module.title}
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                  {module.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              Learning Experience
            </span>
            <h2 className="text-4xl font-bold text-slate-900">
              A blended pedagogy designed for sprint-ready interns
            </h2>
            <p className="text-lg text-slate-600">
              Combine live mentor Sessions, self-paced sprints, and collaborative labs. Every intern is
              paired with a success advisor and mentors who keep your backlog on track.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programPedagogy.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100"
              >
                <div className="text-lg font-semibold text-slate-900 mb-2">{item.title}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.28),transparent_65%)]" />
        <div className="relative container">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
                Cohort Journey
              </span>
              <h2 className="text-4xl font-bold leading-tight">
                Map your 12-week transformation with structured mentor checkpoints
              </h2>
              <p className="text-slate-200 text-lg">
                Each phase blends live Sessions, async labs, and project presentations. The timeline is
                engineered to mirror agency delivery cycles while keeping momentum toward offer
                conversion.
              </p>
            </div>
            <div className="space-y-4">
              {cohortTimeline.map((item) => (
                <div
                  key={item.phase}
                  className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur px-6 py-5 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3 text-sm uppercase tracking-wide text-blue-200">
                    <CalendarRange className="h-5 w-5" />
                    {item.phase}
                  </div>
                  <p className="text-white/90 text-base">{item.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              Portfolio Projects
            </span>
            <h2 className="text-4xl font-bold text-slate-900">
              Build a portfolio that spans predictive analytics to generative AI applications
            </h2>
            <p className="text-lg text-slate-600">
              Apply every concept through real-world projects sourced from industry briefs. Each
              submission is reviewed during mentor checkpoints so you know how to iterate toward
              production-ready standards.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectShowcase.map((project) => (
              <div
                key={project.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {project.level}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
              Live Industry Projects
            </span>
            <h2 className="text-4xl font-bold">
              Rotate across client-style projects that mirror agency delivery cycles
            </h2>
            <p className="text-lg text-white/80">
              Ship outcomes that hiring managers can validate instantly—each track ends with a
              stakeholder presentation, evaluator feedback, and assets you can showcase.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {liveProjectTracks.map((track) => (
              <div key={track.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-xl font-semibold mb-2 text-white">{track.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{track.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-5">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
                Internship Assets
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                Leave with proof of work, playbooks, and interview-ready collateral
              </h2>
              <p className="text-base text-slate-600">
                Every sprint delivers tangible artefacts—use them to impress stakeholders, ace
                interviews, and accelerate your first 90 days on the job.
              </p>
              <ul className="space-y-3 text-slate-600">
                {internshipAssets.map((asset) => (
                  <li key={asset} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                    <span>{asset}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5 bg-white border border-slate-200 rounded-3xl p-8 shadow-lg shadow-slate-100">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
                LMS & Resource Vault
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                12 months of guided practice beyond the internship
              </h3>
              <ul className="space-y-3 text-slate-600">
                {lmsResources.map((resource) => (
                  <li key={resource} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                    <span>{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-52 h-52 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-3xl" />

        <div className="container relative">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-2">
                <span className="inline-block bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full border border-green-300 text-lg animate-bounce shadow">
                  Internship Fee: ₹17,990
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/60">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-slate-700">Meet Your Faculty Team</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Fullstackverse Data Science Faculty</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                A multidisciplinary bench of lead data scientists, applied AI engineers, and analytics strategists coach you through the internship. Every sprint review mirrors how production teams collaborate and ship results.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[2fr,3fr] items-center bg-white/85 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-xl shadow-slate-200/30 p-6 lg:p-10">
              <div className="space-y-6">
                <div className="relative mx-auto h-56 w-56 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-[4px] shadow-2xl shadow-blue-500/30">
                  <div className="h-full w-full rounded-3xl bg-slate-950/95 flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center gap-3 text-center text-white px-6">
                      <span className="text-5xl">🤝</span>
                      <p className="text-sm font-semibold leading-snug">
                        Dedicated mentors rotate across analytics, ML engineering, career prep, and client consulting each week.
                      </p>
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    12+ Experts
                  </div>
                  <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Global Experience
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="text-2xl font-bold text-blue-600">200+</div>
                    <div className="text-xs text-slate-600">Mentor Hours</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <div className="text-2xl font-bold text-emerald-600">10+</div>
                    <div className="text-xs text-slate-600">Hiring Partners</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="text-2xl font-bold text-purple-600">Portfolio</div>
                    <div className="text-xs text-slate-600">Offer Coaching</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                  <blockquote className="text-slate-800 italic">
                    "Ship projects that hiring managers can evaluate — not just assignments. We coach you to demonstrate impact, not just write code."
                  </blockquote>
                  <cite className="text-sm text-slate-600 mt-2 block">— Fullstackverse Faculty Team</cite>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-indigo-500">🎯</span>
                    What Your Mentors Deliver
                  </h4>
                  <p className="text-sm text-slate-700">
                    Weekly portfolio reviews, 1:1 critique on your capstone, live mock interviews, and direct feedback to make your projects interview-ready and recruiter-friendly.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {facultyFocusAreas.map(({ title, description }) => (
                    <div key={title} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-5 shadow-lg shadow-slate-200/30">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1.5">{title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Focus Areas</div>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 mt-1" /><span>Feature engineering & model diagnostics</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 mt-1" /><span>End-to-end ML pipelines & MLOps</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 mt-1" /><span>Data product storytelling & dashboards</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 mt-1" /><span>Interview prep: system design & case studies</span></li>
                  </ul>
                </div>

                <div className="flex items-center justify-center lg:justify-start">
                  <button onClick={handleRegisterClick} className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow hover:scale-105 transition">
                    Apply & Book a Mentor Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-5">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
                Who Can Apply
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                Built for emerging talent ready to deliver real client outcomes
              </h2>
              <p className="text-base text-slate-600">
                Whether you are wrapping up college, pivoting from another role, or doubling down on
                applied AI, this internship adapts to your experience level with mentor feedback and
                personalised learning paths.
              </p>
              <ul className="space-y-3 text-slate-600">
                {whoCanApply.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 bg-white border border-slate-200 rounded-3xl p-8 shadow-lg shadow-slate-100">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
                Application Process
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                Three steps to secure your internship offer
              </h2>
              <div className="space-y-4">
                {applicationSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{step.title}</div>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              Career Support
            </span>
            <h2 className="text-4xl font-bold text-slate-900">
              Go-to-market with dedicated placement support and interview preparation
            </h2>
            <p className="text-lg text-slate-600">
              Your success team guides you through profile building, job discovery, and interview
              prep. Graduate with a referral-ready portfolio and match into partner hiring tracks as
              you convert full-time offers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {careerSupport.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100"
              >
                <div className="text-lg font-semibold text-slate-900 mb-2">{item.title}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Limited Cohort Seats
              </span>
              <h2 className="text-4xl font-bold">
                30 learners per batch. Interviews close when seats fill.
              </h2>
              <p className="text-white/80 text-lg">
                Cohort launch is three weeks away. Admissions run on rolling interviews—once the
                mentor Sessions hit capacity, we pause applications.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                "Weekly interview windows to keep cohorts balanced across skills.",
                "Foundational prep work unlocked immediately after confirmation.",
                "Payment links shared only after you clear the mentor conversation.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-300" />
                  <span className="text-white/85">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
              <button
                onClick={handleRegisterClick}
                className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-8 py-3 font-semibold shadow-lg shadow-blue-500/30 hover:bg-slate-100 transition"
              >
                Book your interview slot
              </button>
              <p className="text-sm text-white/70">
                Need more time? Join the waitlist and we’ll call you before the next intake.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start">
            <div className="space-y-6">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
                Enrollment Benefits
              </span>
              <h2 className="text-4xl font-bold text-slate-900">
                Confirm your cohort seat after the mentor interview and payment
              </h2>
              <p className="text-lg text-slate-600">
                <span className="inline-block bg-green-50 text-green-700 font-bold px-3 py-1 rounded-full mr-2 border border-green-200 animate-bounce">All-inclusive fee: ₹17,990</span>
                Submit the quick form to book your interview. Once you are cleared, settle the
                program fee via QR to unlock onboarding, pre-work, and resource access. Seats remain
                on hold for 48 hours after invoice.
              </p>
              <ul className="space-y-3 text-slate-600">
                {enrolmentPerks.map((perk) => (
                  <li key={perk} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10">
              {showConfirmation ? (
                <div className="text-center space-y-5">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900">Registration Successful!</h3>
                    <p className="text-slate-600">{successMessage}</p>
                    <p className="text-sm text-slate-500">
                      Complete the payment using the QR code below. Your seat will be confirmed as
                      soon as the transaction is received.
                    </p>
                  </div>
                  <div className="bg-slate-100 rounded-2xl p-5 inline-block mx-auto">
                    <img
                      src={asset('QR-COURSE.jpeg')}
                      alt="Fullstackverse Data Science Course payment QR"
                      className="h-60 w-60 object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                      type="button"
                      onClick={handleRegisterClick}
                      className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                    >
                      Submit Another Response
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDialogOpenChange(false)}
                      className="w-full sm:w-auto rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3 text-center">
                    <h3 className="text-2xl font-bold text-slate-900">Reserve Your Seat</h3>
                    <p className="text-slate-600">
                      Complete the quick application popup to share your intent. We will invite you to
                      a mentor interview and send onboarding only after payment is received.
                    </p>
                  </div>
                  <button
                    onClick={handleRegisterClick}
                    className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-800 transition"
                  >
                    Start Registration
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              Still Thinking?
            </span>
            <h2 className="text-4xl font-bold text-slate-900">
              Launch with a portfolio, mentors, and an offer pipeline that stays active
            </h2>
            <p className="text-lg text-slate-600">
              Join a community of 10M+ learners and 400+ hiring partners. Invest now, claim one of
              30 seats, and work with us through interviews, negotiations, and onboarding until you
              convert offers with confidence.
            </p>
          </div>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-w-xl bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-blue-200 shadow-2xl rounded-3xl">
          {showConfirmation ? (
            <div className="space-y-6 text-center">
              <DialogHeader>
                <DialogTitle>Registration Successful</DialogTitle>
                <DialogDescription>
                  {successMessage ||
                    "Your registration is confirmed. Complete the payment using the QR code to secure your program seat."}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center">
                <div className="rounded-2xl bg-slate-100 p-5">
                  <img
                    src={asset('QR-COURSE.jpeg')}
                    alt="Fullstackverse Data Science Internship payment QR"
                    className="h-56 w-56 object-contain"
                  />
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-500">
                <p>
                  Scan the QR code, complete the payment, and reply to the confirmation email with
                  the transaction screenshot to lock your seat.
                </p>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleShowQrDirect}>
                  Pay Now
                </Button>
                <Button type="button" variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  Close
                </Button>
                <div className="mt-4 flex flex-col items-center gap-2">
                  <span className="text-xs text-slate-500">Facing financial hardship?</span>
                  <a
                    href="https://wa.me/918296548156?text=Hi%20Fullstackverse%2C%20I%20would%20like%20to%20apply%20for%20a%20scholarship%20for%20the%20Data%20Science%20Internship%20due%20to%20financial%20hardship."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 5.385 4.365 9.75 9.75 9.75 1.7 0 3.3-.425 4.7-1.225l3.025.8a1.125 1.125 0 0 0 1.375-1.375l-.8-3.025A9.708 9.708 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75h.008v.008h-.008V9.75Zm3.375 0h.008v.008h-.008V9.75Zm3.375 0h.008v.008h-.008V9.75Z" />
                    </svg>
                    Request Scholarship on WhatsApp
                  </a>
                </div>
              </DialogFooter>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <DialogHeader>
                <DialogTitle>Start Your Internship Application</DialogTitle>
                <DialogDescription>
                  Share your details so our team can schedule the assessment and onboarding call.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Include country code"
                    required
                  />
                </div>
                {errorMessage ? (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                ) : null}
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursePage;