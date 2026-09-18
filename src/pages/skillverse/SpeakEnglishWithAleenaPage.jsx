import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { asset } from "@/lib/utils";
import { ENGLISH_SPEAKING_WORKSHOP_DATETIME } from "@/lib/workshopDates";
import { Check, Star, Lock, Clock, Minus, Plus, ChevronDown, ChevronUp, Instagram, Linkedin, Youtube, Mail } from "lucide-react";

// Placeholder for images
const INSTRUCTOR_IMAGE = "https://aleenarais.com/english/images/aleena2.webp";
const LOGO_IMAGE = asset('logo (1).png');
const CERTIFICATE_IMAGE = "https://aleenarais.com/english/images/certificate.webp"; // Using the remote one or a placeholder if offline. I will use a local placeholder text div if image fails.

const WORKSHOP_SLUG = "speak-english-confidently";
const WORKSHOP_DATETIME = ENGLISH_SPEAKING_WORKSHOP_DATETIME;

export default function SpeakEnglishPage() {
  const [now, setNow] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Accordion state for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
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

      const { error: insertError } = await supabase
        .from("webinar")
        .insert({
          webinar_slug: WORKSHOP_SLUG,
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
    <div className="font-sans text-gray-200 bg-black min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-black text-white body-font border-b border-gray-800">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
            <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
             <span className="ml-3 text-2xl font-black tracking-tighter">Speak English</span>
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRegisterClick}
              disabled={hasEnded}
              className="inline-flex items-center bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-black font-bold mt-4 md:mt-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hasEnded ? "Enrollment Closed" : "Enroll Now"}
            </button>
             {/* Login button skipped as per typical landing page conversion focus, but 'Enroll' serves the primary purpose */}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="text-gray-200 bg-black py-16 body-font">
          <div className="container mx-auto flex px-5 py-6 items-center justify-center flex-col">
            <div className="text-center w-full">
              <h1 className="title-font sm:text-5xl text-3xl mb-4 font-bold text-white leading-tight">
                India’s Most Comprehensive <br />
                <span className="text-yellow-500">English Speaking Course</span>
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 mb-8 text-sm md:text-base text-yellow-500 font-semibold bg-white/10 py-3 px-6 rounded-full inline-flex mx-auto border border-yellow-500/30 w-fit backdrop-blur-sm">
                  <span className="flex items-center gap-2">🏆 Awarded Best Speaker by Toastmasters International</span>
                  <span className="hidden md:block text-gray-500">|</span>
                  <span className="flex items-center gap-2">🎓 GRE, TOEFL & IELTS Top Scorer</span>
              </div>
              <p className="mb-8 leading-relaxed text-xl text-gray-300">
                Learn from the best. In this course, our expert instructor will teach you <span className="text-yellow-500 font-bold">How to Speak English.</span><br />
                Get access to hours of exclusive video content and unique activities.
              </p>
              
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2 border-2 border-white rounded-2xl px-6 py-2">
                  <span className="font-semibold">1,000+ 5 Star Reviews</span>
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 w-full max-w-5xl mx-auto mt-8">
                {/* Features & Instructor */}
                <div className="bg-[#222] rounded-3xl p-6 md:w-1/2 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      "100+ Videos", "Speaking Partners", "Practice with AI", "Lifetime Access"
                    ].map((feat) => (
                      <div key={feat} className="bg-white rounded-xl p-3 flex items-center gap-3">
                         <div className="hidden sm:block">
                            <Check className="h-5 w-5 text-blue-500" />
                         </div>
                         <span className="text-black font-bold text-sm leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 bg-transparent pl-4">
                    <div className="text-left">
                      <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                        Your Teacher
                      </div>
                      <h3 className="text-2xl font-bold text-white">Expert Instructor</h3>
                      <p className="text-sm text-gray-300 mt-1 leading-snug">
                       Our expert instructor is known for simple English, which he delivers softly and elegantly. He is loved and trusted by millions of people.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Offer & Reserve */}
                <div className="md:w-1/2 flex flex-col justify-between">
                   <div className="flex-grow bg-[#222] rounded-xl mb-4 p-2 relative group cursor-pointer shadow-lg border border-gray-800">
                      {/* Video Embed Placeholder */}
                       <div className="w-full h-full bg-black rounded-lg flex flex-col items-center justify-center min-h-[200px]">
                           <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                             <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                           </div>
                           <p className="mt-4 font-semibold text-gray-400">Preview Course Video</p>
                       </div>
                   </div>
                   
                   <div className="text-left mb-4">
                      <h3 className="text-lg text-white leading-normal">
                         Reserve a seat by <span className="text-yellow-500 font-bold">{WORKSHOP_DATETIME.toLocaleDateString()}</span> to unlock <br/><span className="font-bold">Bonuses worth Rs. 18,000</span>
                      </h3>
                   </div>

                   <button 
                      onClick={handleRegisterClick}
                      disabled={hasEnded}
                      className="w-full bg-[#58a1e6] hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-between text-lg transition-all"
                    >
                      <span className="font-medium text-xl">Reserve Seat for Rs 399</span>
                      <span className="line-through text-xs opacity-80">Rs 20,000</span>
                   </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sections removed as requested */}

        {/* Who is this for */}
        <section className="bg-[#f3f9ff] pb-16 text-gray-600 body-font">
           <div className="container px-5 mx-auto">
              <h2 className="sm:text-4xl text-2xl font-bold text-center mb-8 text-black">Who is this course for?</h2>
              <div className="flex flex-wrap mx-auto md:max-w-[90%] justify-center">
                 {[
                    "Working Professionals", "Students", "Solopreneurs and Freelancers", "Entrepreneurs", "Sales Executives", "Managers and Team Leaders"
                 ].map((item) => (
                    <div key={item} className="p-3 md:w-1/2 w-full">
                       <div className="bg-white rounded-xl flex p-6 px-8 h-full items-center shadow-sm">
                          <span className="text-black mr-5 rounded-full inline-flex items-center justify-center">
                             <Check className="w-6 h-6 text-[#099ac3]" strokeWidth={3} />
                          </span>
                          <span className="font-medium text-lg text-black">{item}</span>
                       </div>
                    </div>
                 ))}
                 <div className="p-3 w-full">
                    <div className="bg-white rounded-xl flex p-6 px-8 h-full items-center justify-center shadow-sm">
                       <span className="text-black mr-5 rounded-full inline-flex items-center justify-center">
                          <Check className="w-6 h-6 text-[#099ac3]" strokeWidth={3} />
                       </span>
                       <span className="font-medium text-lg text-black">Anyone who is interested in improving English Speaking Skills</span>
                    </div>
                 </div>
              </div>

              <div className="text-center mt-8">
                <button 
                  onClick={handleRegisterClick}
                  disabled={hasEnded}
                  className="bg-[#58a1e6] text-white text-xl md:text-2xl font-medium py-5 px-16 rounded-2xl hover:bg-blue-600 transition-all shadow-lg mx-auto w-full md:w-auto"
                >
                    Join Speak English course for just Rs 399
                    <span className="block text-sm line-through mt-1 opacity-80">Rs 20,000</span>
                </button>
                <p className="mt-6 font-medium text-gray-800">
                    Enroll in this course by <span className="text-blue-600 font-bold">{WORKSHOP_DATETIME.toLocaleDateString()}</span> to unlock <span className="font-bold">Bonuses worth Rs 18,000</span>
                </p>
              </div>
           </div>
        </section>

        {/* What is included */}
        <section className="bg-black py-16 text-gray-400">
           <div className="container px-5 mx-auto">
              <h2 className="sm:text-4xl text-3xl font-bold text-center mb-10 text-white">What is included in this bundle?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8 max-w-7xl mx-auto">
                 {[
                    { title: "Speak English Course with 100+ Video Lessons", val: "15,000", imageColor: "bg-blue-100" },
                    { title: "English Speaking Partners to improve your communication (AI and Real both)", val: "2,500", imageColor: "bg-green-100" },
                    { title: "300+ Practice Questions workbook with answers", val: "1,500", imageColor: "bg-purple-100" },
                    { title: "PDF eBook to improve your communication skills", val: "1,000", imageColor: "bg-yellow-100" },
                    { title: "Lifetime Access to LMS for all major English exams like TOEFL, GRE, IELTS etc", val: "5,000", imageColor: "bg-red-100" },
                 ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl text-black p-3 flex flex-col h-full shadow-lg">
                       <div className={`rounded-lg w-full h-[100px] object-cover ${item.imageColor} flex items-center justify-center mb-3`}>
                           <span className="text-5xl font-black opacity-10">{idx + 1}</span>
                       </div>
                       <div className="flex-grow flex flex-col justify-between">
                          <h2 className="font-bold text-xs leading-tight mb-2 min-h-[2rem]">{item.title}</h2>
                          <div>
                             <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">worth</span>
                             <h2 className="text-lg font-bold text-black">Rs {item.val}</h2>
                          </div>
                       </div>
                    </div>
                 ))}
                 
                 {/* Locked Bonus */}
                 <div className="relative bg-white rounded-xl text-black p-3 flex flex-col h-full overflow-hidden shadow-lg">
                    <div className="rounded-lg w-full h-[100px] bg-gray-200 flex items-center justify-center mb-3">
                        <Lock className="h-10 w-10 text-gray-400 opacity-50" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between blur-[2px]">
                        <h2 className="font-bold text-xs leading-tight mb-2 min-h-[2rem]">Mystery Bonus Content Unlocked</h2>
                        <div>
                            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">worth</span>
                            <h2 className="text-lg font-bold text-black">Rs 5,000</h2>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 text-center p-2">
                       <div>
                          <Lock className="h-8 w-8 text-white mx-auto mb-1" />
                          <span className="text-sm font-bold text-white leading-tight">Unlocks after <br/> purchase</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="text-white text-2xl text-center mt-5">and a lot more...</div>
              
              <button 
                  onClick={handleRegisterClick}
                  disabled={hasEnded}
                  className="text-white bg-gradient-to-r from-blue-400 to-blue-600 max-w-[90%] md:max-w-[400px] mx-auto flex items-center justify-center gap-2 py-[20px] mt-8 px-14 text-lg font-medium rounded-2xl"
              >
                Reserve your seat now!!!
              </button>

              <div className="border-2 rounded-[14px] border-dashed mt-5 border-[#1291c4] font-medium w-full md:w-2/5 mx-auto text-center p-2 text-gray-100 text-sm">
                ATTENTION: Register before midnight of <span className="font-bold">{WORKSHOP_DATETIME.toLocaleDateString()}</span>, to unlock bonuses.<br/>
                This is a never heard before offer.
              </div>

              {/* Timer */}
              <div className="flex items-center justify-center gap-[10px] md:gap-[30px] py-[30px] w-full md:w-2/3 mx-auto text-center">
                {[
                    { label: "Days", val: days }, { label: "Hours", val: hours }, { label: "Minutes", val: minutes }, { label: "Seconds", val: seconds }
                ].map((t) => (
                    <div key={t.label} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] bg-blue-600 p-2 md:p-4 rounded-2xl text-white flex items-center justify-center flex-col">
                        <span className="text-3xl md:text-6xl font-medium">{String(t.val).padStart(2,'0')}</span>
                        <span className="text-xs md:text-base mt-1 md:mt-2">{t.label}</span>
                    </div>
                ))}
              </div>
              <div className="text-white text-2xl font-semibold text-center mt-4">
                Time Is Running Out. <br/> Grab Your Spot Fast!
              </div>
           </div>
        </section>

        {/* What will you learn */}
        <section className="bg-[#f3f9ff] py-16 text-gray-600">
           <div className="container px-5 mx-auto">
              <h1 className="sm:text-4xl text-3xl font-bold text-center text-black mb-12">What will you learn in the course?</h1>
              <div className="flex flex-wrap gap-4 items-stretch justify-center">
                 {[
                    { t: "Master the Basics", d: "Build a strong foundation with essential English grammar and vocabulary to kickstart your learning journey." },
                    { t: "Polish Your Social Skills", d: "Learn how to greet and introduce yourself confidently in any social or professional setting." },
                    { t: "Engage in Daily Conversations", d: "Gain the confidence to engage in everyday English conversations with ease and fluency." },
                    { t: "Express Yourself", d: "Master the art of expressing your needs, wants, and opinions clearly and persuasively." },
                    { t: "Perfect Your Speech", d: "Identify and correct common pronunciation mistakes to speak English more accurately." },
                    { t: "Stay Updated", d: "Get acquainted with the latest slang and vocabulary used by the younger generation." },
                    { t: "Succeed Professionally", d: "Learn the specific vocabulary and etiquette needed to excel in business environments." },
                    { t: "Elevate Your Skills", d: "Dive into advanced English topics to refine your language skills and boost your proficiency." },
                 ].map((item, i) => (
                    <div key={i} className="min-w-[300px] max-w-[600px] md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] bg-transparent">
                        <div className="p-4 h-full border border-gray-200 rounded-xl bg-white shadow-sm">
                           <h2 className="text-[#09679c] text-2xl font-bold mb-2">{item.t}</h2>
                           <p className="text-base font-medium text-black">{item.d}</p>
                        </div>
                    </div>
                 ))}
              </div>
              <div className="my-8 text-center w-full">
                  <h2 className="text-[#09679c] text-2xl font-bold">and a lot more...</h2>
              </div>
           </div>
        </section>

        {/* Reviews */}
        <section className="bg-black py-16 text-gray-400">
            <div className="container px-5 mx-auto">
                <h1 className="sm:text-4xl text-3xl font-medium text-white text-center mb-8">Reviews from Students</h1>
                <div className="flex flex-wrap md:w-4/5 mx-auto">
                    <div className="p-2 md:w-1/2 flex flex-col gap-4">
                        {[
                            { text: "“The instructor is so natural. I love the course. I have watched every single video and have learned so many things. Hope to meet the instructor some day.”", author: "Akriti" },
                            { text: "“Thank you instructor for helping me with my English. I passed my first job interview just because of the guidance. I will forever be indebted.”", author: "Prachi" },
                            { text: "“The course has been life changing for me. I had lost all hope about ever being fluent in English. This is the only course I think which focuses on speaking ability of the person instead of theory.”", author: "Sohail" },
                        ].map((review, i) => (
                           <div key={i} className="flex rounded-xl bg-[#e3eaec] text-black font-semibold px-8 py-6 flex-col">
                               <p className="text-[17px]">{review.text}</p>
                               <div className="flex items-center justify-between mt-4">
                                   <div className="flex text-yellow-500">
                                       {[1,2,3,4,5].map(s=><Star key={s} className="w-4 h-4 fill-current"/>)}
                                   </div>
                                   <div>-{review.author}</div>
                               </div>
                           </div> 
                        ))}
                    </div>
                    <div className="p-2 md:w-1/2 flex flex-col gap-4">
                        {[
                            { text: "“I have now completed all the activities prescribed in the course. I can see remarkable improvement in my speaking. I still feel a bit nervous but I am definitely much more confident than before :) The quizzes in the course were so fun too. Thank you teacher.”", author: "P. Reddy" },
                            { text: "“I used to hesitate a lot while speaking English and in fact I used to avoid situations requiring me to speak in English. But the instructor gave me tips and a new mindset to improve. The instructor also got me English speaking partners. Thank you. :)”", author: "Neeraj" },
                            { text: "“I have completed half of the course till now and I already feel much more confident in English and otherwise in life too. I am happy.”", author: "Santosh" },
                        ].map((review, i) => (
                           <div key={i} className="flex rounded-xl bg-[#e3eaec] text-black font-semibold px-8 py-6 flex-col">
                               <p className="text-[17px]">{review.text}</p>
                               <div className="flex items-center justify-between mt-4">
                                   <div className="flex text-yellow-500">
                                       {[1,2,3,4,5].map(s=><Star key={s} className="w-4 h-4 fill-current"/>)}
                                   </div>
                                   <div>-{review.author}</div>
                               </div>
                           </div> 
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Checklist: Still Wondering */}
        <section className="bg-gray-100 py-16 text-black">
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-4">
                    <h1 className="sm:text-4xl text-3xl font-bold mb-2">Still Wondering If the Course is for YOU?</h1>
                    <p className="font-medium mb-4 text-xl">Please check all boxes, where your answer is <br/> <b>YES!</b></p>
                </div>
                <div className="flex flex-wrap items-center justify-center md:w-4/5 mx-auto mt-4 gap-y-4">
                    {[
                        "You often hesitate or second guess yourself while speaking english.",
                        "You can understand English when it’s spoken to you but struggle to form your own sentences or express your thoughts.",
                        "You frequently find yourself searching for the right words or relying on a limited set of phrases.",
                        "You’re unsure about how to pronounce certain words or often get corrected on your pronunciation.",
                        "The fear of grammatical errors holds you back from engaging in conversations.",
                        "You feel left out of a conversation or joke among English speakers and wish you could join in with confidence.",
                        "You’ve tried to learn English by yourself, but haven’t been consistent and all the information seems scattered.",
                    ].map((text, i) => (
                        <div key={i} className="p-1 md:w-1/2 w-full flex flex-col">
                            <div className="flex items-center rounded-2xl bg-white text-black font-semibold p-4 px-5 border shadow-sm h-full">
                                <div className="flex-shrink-0 mr-4">
                                    <input type="checkbox" className="w-6 h-6 border-2 border-blue-400 rounded text-blue-500 focus:ring-blue-500" defaultChecked />
                                </div>
                                <p className="text-base leading-snug">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="leading-relaxed text-center font-bold w-full mt-6 text-lg">
                    If you checked ANY of the boxes above, then you’re invited to join Speak English course
                </p>
                <div className="flex flex-col items-center justify-center mx-auto">
                    <button 
                        onClick={handleRegisterClick}
                        disabled={hasEnded}
                        className="text-white bg-[#58a1e6] flex items-center justify-center gap-2 py-[14px] px-16 mx-auto rounded-2xl mt-5 hover:bg-blue-600 transition-colors"
                    >
                        <span className="text-xl font-medium">Join Now</span>
                    </button>
                    <div className="border-2 rounded-[14px] border-dashed border-[#1291c4] font-bold my-8 w-[90%] md:w-[60%] mx-auto text-center p-3 text-black bg-[#e9e8e9] text-sm md:text-base">
                        ATTENTION: Register before midnight of <span className="font-bold">{WORKSHOP_DATETIME.toLocaleDateString()}</span>, to unlock bonuses.<br/>
                        This is a never heard before offer.
                    </div>
                </div>
            </div>
        </section>
        
        {/* Certificate Section */}
        <section className="bg-[#f3f9ff] py-16 text-gray-400">
          <div className="container px-5 mx-auto max-w-6xl">
             <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                    <h1 className="sm:text-4xl text-3xl mb-2 font-bold text-[#1291c4] text-center md:text-left">Get Certified</h1>
                    <p className="mb-8 leading-relaxed text-[20px] font-medium text-[#13181d] text-center md:text-left">
                        Yes! You will be certified for this workshop once you submit your assignment.
                    </p>
                    <div className="space-y-8">
                        {[
                            { t: "Official and Verified", d: "Receive an instructor signed certificate with an institution’s logo to verify your achievements and increase your job prospects." },
                            { t: "Easily shareable", d: "Add the certificate to your CV on your Resume or post it directly on LinkedIn. You can even post it on instagram and twitter." },
                            { t: "Enhances Credibility", d: "Use your certificate to enhance your professional credibility and stand out among your peers." }
                        ].map((item,i) => (
                            <div key={i} className="flex relative">
                                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-cyan-100 flex items-center justify-center text-white relative z-10">
                                    <Check className="w-5 h-5 text-[#099ac3]" />
                                </div>
                                <div className="flex-grow pl-4 text-black">
                                    <h2 className="font-bold text-xl mb-1 text-[#1299d0]">{item.t}</h2>
                                    <p className="leading-relaxed max-w-[360px] font-medium">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <div className="rounded-lg overflow-hidden shadow-2xl border-2 border-gray-200 bg-white">
                        <svg width="100%" height="320" viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
                            {/* Background */}
                            <rect width="600" height="320" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2"/>
                            
                            {/* Border decoration */}
                            <rect x="20" y="20" width="560" height="280" fill="none" stroke="#007bff" strokeWidth="4" rx="10"/>
                            
                            {/* Header */}
                            <text x="300" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#007bff">Certificate of Completion</text>
                            
                            {/* Main text */}
                            <text x="300" y="90" textAnchor="middle" fontSize="16" fill="#495057">This is to certify that</text>
                            <text x="300" y="120" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#000">[Student Name]</text>
                            <text x="300" y="150" textAnchor="middle" fontSize="16" fill="#495057">has successfully completed the course</text>
                            <text x="300" y="180" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#007bff">Speak English</text>
                            
                            {/* Details */}
                            <text x="300" y="210" textAnchor="middle" fontSize="14" fill="#6c757d">Awarded on {new Date().toLocaleDateString()}</text>
                            
                            {/* Signature area */}
                            <line x1="150" y1="250" x2="250" y2="250" stroke="#000" strokeWidth="1"/>
                            <text x="200" y="270" textAnchor="middle" fontSize="12" fill="#495057">Instructor Signature</text>
                            
                            <line x1="350" y1="250" x2="450" y2="250" stroke="#000" strokeWidth="1"/>
                            <text x="400" y="270" textAnchor="middle" fontSize="12" fill="#495057">Director Signature</text>
                            
                            {/* Logo placeholder */}
                            <circle cx="50" cy="50" r="20" fill="#007bff"/>
                            <text x="50" y="56" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">ES</text>
                        </svg>
                    </div>
                </div>
             </div>
          </div>
        </section>

        {/* Final Offer */}
        <section className="bg-[#f3f9ff] py-16 text-gray-600">
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                     <h1 className="sm:text-4xl text-3xl font-bold text-black">Get the offer while it lasts!</h1>
                </div>
                <div className="flex flex-col md:flex-row items-stretch justify-center w-full md:w-[90%] mx-auto gap-12">
                    {/* Offer Left Panel */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-[36px] border-2 p-8 flex flex-col w-full shadow-lg h-full">
                            <div className="pb-4 mb-4 border-b-2">
                                <h2 className="text-gray-900 text-3xl font-bold mb-5 leading-tight">
                                    Speak English Launch Offer <br/>
                                    <span className="text-gray-500 text-xl font-normal">(Save Rs 18,000)</span>
                                </h2>
                                <div>
                                    <span className="font-bold text-5xl text-[#1291c4]">Rs 399</span>
                                    <span className="font-medium text-sm text-[#1291c4] line-through ml-2">Rs 20,000</span>
                                </div>
                            </div>
                            <nav className="flex flex-col space-y-4 mb-8">
                                <div className="flex items-start text-black">
                                    <Check className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                                    <span>Enroll now and get bonuses worth Rs 18,000 absolutely free. There was never a better time to grab this course.</span>
                                </div>
                                <div className="flex items-start text-black">
                                    <Check className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                                    <span>Enjoy the discounted price of Rs 399 and save a total of Rs 18,000.</span>
                                </div>
                                <div className="flex items-start text-black">
                                    <Check className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                                    <span>The launch offer expires on midnight of: <b>{WORKSHOP_DATETIME.toLocaleDateString()}</b></span>
                                </div>
                            </nav>
                            <p className="text-gray-500 my-4 text-sm">
                                Note: No exceptions would be made beyond the offer expiry date. The prices would go up and no free bonuses.
                            </p>
                            <button 
                                onClick={handleRegisterClick}
                                disabled={hasEnded}
                                className="text-white w-full bg-[#58a1e6] flex items-center justify-center gap-2 py-[18px] rounded-2xl mt-auto hover:bg-blue-600 transition-colors"
                            >
                                <span className="text-xl font-medium">Join Now!!!</span>
                            </button>
                        </div>
                    </div>

                    {/* Offer Right Panel - Lists */}
                    <div className="md:w-1/2 pl-0 md:pl-8 flex flex-col justify-center">
                        <div className="p-4">
                            <h2 className="font-bold text-2xl text-[#58a1e6] mb-4">What you’ll get...</h2>
                            <nav className="flex flex-col space-y-3">
                                {[
                                    "Speak English Confidently and Fluently",
                                    "Master the art of articulation",
                                    "Lots of activities and exercises to help you practice",
                                    "Learn by doing from Day 1",
                                    "Learn how to think in english",
                                    "Learn strategies on how to overcome the fear of speaking in English"
                                ].map((item, i) => (
                                    <div key={i} className="pb-2 border-b border-gray-400 w-full text-black font-medium flex items-center">
                                        <span className="text-black mr-2 bg-cyan-100 w-5 h-5 rounded-full inline-flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3" />
                                        </span>
                                        {item}
                                    </div>
                                ))}
                            </nav>
                        </div>
                        <div className="p-4 mt-6">
                            <h2 className="text-[#58a1e6] text-2xl font-bold mb-4">And bonuses too...</h2>
                            <nav className="flex flex-col space-y-3">
                                {[
                                    "English Speaking Partner",
                                    "300+ Practice Questions",
                                    "PDF E-Book",
                                    "Lesson Notes",
                                    "and much more"
                                ].map((item, i) => (
                                    <div key={i} className="pb-2 border-b border-gray-400 w-full text-black font-medium flex items-center">
                                        <span className="text-black mr-2 bg-cyan-100 w-5 h-5 rounded-full inline-flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3" />
                                        </span>
                                        {item}
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQs */}
        <section className="bg-white py-16 text-gray-600">
            <div className="container px-5 mx-auto">
                <div className="md:w-5/6 mx-auto">
                    <h1 className="sm:text-3xl text-2xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h1>
                    <div className="flex flex-col gap-4">
                        {[
                            { q: "What is the validity of this course?", a: "Once you purchase the course, you have lifetime access to it. So you're free to revisit the course material anytime you wish." },
                            { q: "What is the structure of the course?", a: "This course is structured around a \"speaking first\" approach. The primary focus is to get you speaking English from the very start." },
                            { q: "Will there be live sessions?", a: "No, the course is based on pre-recorded videos, allowing you the flexibility to go through the lessons at your own pace. The course offers guidelines and tools to help you find a speaking partner for practicing." },
                            { q: "Does the course come up with a certificate of completion?", a: "Yes, you can download the certificate once you've completed the course, No cheating, ok :)" },
                            { q: "How do I access the course material?", a: "All the course material, including videos, talking partners, worksheets and quizzes are accessible through our online portal once you enroll." },
                            { q: "Which language is the course in?", a: "The primary language is English but there may be some discussion or banter in Hindi. All course videos consists of English subtitles." },
                            { q: "Do I need any prior English knowledge to enroll?", a: "You should understand the very basics of English as the primary language is English." },
                        ].map((faq, i) => (
                            <div key={i} className="bg-white w-full border rounded-xl shadow">
                                <button className="w-full px-6 md:px-10 py-6 font-semibold text-left text-lg md:text-xl focus:outline-none flex justify-between items-center" onClick={() => toggleFaq(i)}>
                                    <span>{faq.q}</span>
                                    {openFaqIndex === i ? <ChevronUp className="text-[#58a1e6]" /> : <ChevronDown className="text-[#58a1e6]" />}
                                </button>
                                {openFaqIndex === i && (
                                    <div className="px-6 md:px-10 pb-5 text-lg font-medium text-gray-700">
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={handleRegisterClick}
                        disabled={hasEnded}
                        className="text-white w-full max-w-[600px] bg-[#58a1e6] flex items-center justify-center gap-2 py-[20px] px-16 mx-auto mt-12 rounded-3xl hover:bg-blue-600 transition-colors"
                    >
                        <span className="text-xl font-semibold">Reserve My Seat Now!!!</span>
                    </button>
                </div>
            </div>
        </section>

        {/* Footer Bar Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-40 md:hidden flex justify-between items-center px-4">
             <div>
                <div className="flex gap-2 items-center">
                    <span className="font-bold text-lg text-black">Rs 399</span>
                    <span className="line-through text-xs text-black">Rs 20,000</span>
                </div>
                <div className="text-xs text-red-500 font-semibold">Offer ends in {hours}:{minutes}:{seconds}</div>
             </div>
             <button 
                onClick={handleRegisterClick}
                disabled={hasEnded}
                className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold"
             >
                Buy Now!!!
             </button>
        </div>

        {/* Footer Main */}
        <footer className="w-full text-white">
            <div className="flex items-center justify-center gap-8 py-8 bg-gradient-to-r from-[#212121] to-[#191919]">
                <div className="w-auto">
                    <span className="text-2xl font-black tracking-tighter text-white">Speak English</span>
                </div>
                <div className="flex items-center gap-4">
                    <a href="#" className="text-2xl hover:text-blue-400"><Youtube /></a>
                    <a href="#" className="text-2xl hover:text-pink-400"><Instagram /></a>
                    <a href="#" className="text-2xl hover:text-blue-600"><Linkedin /></a>
                </div>
            </div>
            <div className="bg-[#141414] text-center px-4 py-4">
                <p className="mb-2 text-base text-gray-400">
                    <a href="#" className="hover:text-white">Contact</a> | <a href="#" className="hover:text-white">Privacy Policy</a>
                </p>
                <div className="text-gray-500">
                    © 2026 All rights reserved <span className="underline font-semibold text-white">SkillVerse</span>
                </div>
            </div>
        </footer>

      </main>
      
        {/* Registration Modal */}
        {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Register for the Course</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter your details to reserve your seat. Once registration is successful, you will see the QR code to complete payment. The webinar link will be shared in 24 hours.
            </p>
            {errorMessage && (
              <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 font-medium">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-0 transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-0 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-0 transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl mt-2 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                    <>Processing...</>
                ) : (
                    <>Complete Registration</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-5xl w-full relative">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-black">Registration Confirmed!</h2>
                <p className="text-black mt-2 text-lg">
                Complete the payment to receive the course dashboard access instantly via email.
                </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Details */}
              <div className="md:w-1/2 space-y-6">
                {/* Payment Details */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-black mb-4">Course Instructor</h3>
                    <h4 className="text-lg font-semibold text-black mb-3">Payment Details</h4>
                    <div className="space-y-3 text-base">
                        <div className="flex justify-between">
                            <span className="font-medium text-black">Amount</span>
                            <span className="font-bold text-black">₹399.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-black">Email</span>
                            <span className="text-black">{email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-black">Phone</span>
                            <span className="text-black">8296548156</span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <span className="text-xl font-bold text-blue-600">Speak English</span>
                    </div>
                    <div className="mt-6">
                        <h5 className="font-semibold text-black mb-3 text-lg">You’ll get instant access to</h5>
                        <ul className="text-base space-y-2 text-black">
                            <li>✅ 100+ Videos</li>
                            <li>✅ English Speaking Partners</li>
                            <li>✅ Talk with AI</li>
                            <li>✅ 300+ Practice Questions</li>
                            <li>✅ PDF chapter notes</li>
                            <li>✅ Lifetime Access</li>
                        </ul>
                    </div>
                </div>
                
                {/* Contact and Terms */}
                <div className="text-center text-sm text-black">
                    <p className="mb-2"><strong>Contact Us:</strong> support@skillverse.com | 8296548156</p>
                    <p><strong>Terms & Conditions:</strong> You agree to share information entered on this page with SkillVerse and Razorpay, adhering to applicable laws.</p>
                </div>
                
                <div className="flex flex-col gap-2 text-sm text-black text-center">
                  <p>• Verify the receiver name before confirming the payment in your UPI app.</p>
                  <p>• Course access is automated once payment is verified.</p>
                </div>
              </div>
              
              {/* Right Column - QR Code */}
              <div className="md:w-1/2 flex items-center justify-center">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <img
                    src={asset('payment.jpeg')}
                    alt="Payment QR"
                    className="w-full max-w-sm rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
