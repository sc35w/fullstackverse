import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../components/ui/use-toast";
import { supabase } from "../../lib/supabaseClient";
import {
  Rocket,
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Target,
  Globe,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";

const courses = [
  {
    title: "Artificial Intelligence",
    instructor: "Shruthi Ganta",
    rating: 4.7,
    reviews: 4143,
    trending: true,
    description:
      "AI focuses on creating smart systems that mimic human intelligence. Dive into neural networks, deep learning to lead in the AI revolution",
  },
  {
    title: "Web Development",
    instructor: "Amrit Raj",
    rating: 4.9,
    reviews: 3897,
    trending: true,
    description:
      "Web Development focuses on designing and building websites using modern technologies. Learn to create responsive, user-friendly web applications",
  },
  {
    title: "Data Science",
    instructor: "Meghana Gowda V",
    rating: 4.5,
    reviews: 2465,
    trending: true,
    description:
      "Data Science blends programming with analytical skills to extract insights from data. Learn to manipulate, visualize, and model data effectively",
  },
  {
    title: "Cyber Security",
    instructor: "Rohit Mukherjee",
    rating: 4.8,
    reviews: 1675,
    trending: true,
    description:
      "Cyber Security focuses on protecting systems from digital threats. Gain expertise in encryption, ethical hacking, and risk management",
  },
  {
    title: "Data Analytics",
    instructor: "Meghana Gowda V",
    rating: 4.9,
    reviews: 2626,
    trending: true,
    description:
      "Data Analytics combines programming and statistics to extract insights. Master Python, SQL, and visualization tools",
  },
  {
    title: "Machine Learning",
    instructor: "Shruthi Ganta",
    rating: 4.4,
    reviews: 2376,
    trending: true,
    description:
      "Machine Learning combines programming and AI to develop intelligent systems. Master Python libraries and algorithms",
  },
];

const testimonials = [
  {
    name: "Megha T",
    role: "AI Automation Graduate",
    text: "SkillVerse's AI Automation program helped me streamline workflows and boost efficiency. I now lead automation projects at my company.",
  },
  {
    name: "Aditya R",
    role: "AI Graduate",
    text: "The AI program gave me a strong foundation in machine learning and NLP. I landed an AI research role after completing it.",
  },
  {
    name: "Neha S",
    role: "Web Development Graduate",
    text: "SkillVerse's web dev course taught me full-stack skills through real projects. I'm now working as a front-end developer.",
  },
  {
    name: "Siddharth M",
    role: "Machine Learning Graduate",
    text: "The ML program covered model building, tuning, and deployment. I used it to land an ML engineer role.",
  },
  {
    name: "Ritika D",
    role: "Data Science Graduate",
    text: "From data wrangling to predictive models, the course covered it all. I'm now a data scientist making real impact.",
  },
];

const stats = [
  { number: "22K+", label: "Students Assisted" },
  { number: "30+", label: "Years of Combined Experience" },
  { number: "100+", label: "Industry Experts" },
  { number: "500+", label: "Universities" },
];

export default function SkillVerseHomePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          full_name: formData.fullName,
          contact_number: formData.phone,
          email: formData.email,
          project_description: `Service interested: ${formData.service}`,
          budget: "To be discussed",
          type: "SkillVerse Quick Apply",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your application has been submitted successfully.",
      });

      setFormData({ fullName: "", phone: "", email: "", service: "" });
    } catch (error) {
      console.error("Supabase error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="h-8 w-8" />
            <span className="text-xl font-semibold">Exclusively Curated Programs</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            India's #1
            <br />
            Career Accelerator
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            We offer industry-leading & career-focused training to enhance your skill, secure a meaningful career, and bring your study-abroad dream to reality.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/skillverse/courses">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <GraduationCap className="mr-2 h-5 w-5" />
                Explore Courses
              </Button>
            </Link>
            <Link to="/skillverse/workshops">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <BookOpen className="mr-2 h-5 w-5" />
                View Workshops
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">{stat.number}</div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mentorship Courses</h2>
            <p className="text-xl text-gray-600">Unlock your potential with the right mentor</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="bg-gradient-to-br from-red-500 to-red-700 h-40 flex items-center justify-center">
                  <GraduationCap className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  {course.trending && (
                    <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      Trending 2025
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-gray-500 text-sm">({course.reviews.toLocaleString()})</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <Users className="h-4 w-4 inline mr-1" />
                    {course.instructor}
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Enroll Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose SkillVerse?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Target className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Career Launchpad</h3>
              <p className="text-gray-600">Mentorship and tools to fast-track your growth</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <BookOpen className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Professional Courses</h3>
              <p className="text-gray-600">Industry-aligned curriculum with hands-on projects</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Globe className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Study Abroad</h3>
              <p className="text-gray-600">500+ Universities across the globe</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Award className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Industry Experts</h3>
              <p className="text-gray-600">100+ experienced mentors from top companies</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <TrendingUp className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Placement Support</h3>
              <p className="text-gray-600">100% job assistance and interview preparation</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <CheckCircle2 className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Certification</h3>
              <p className="text-gray-600">Industry-recognized certificates upon completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Loved by thousands of students
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Apply Form */}
      <section className="py-16 px-6 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Quick Apply</h2>
          <p className="text-xl text-center mb-8">Your journey starts here!</p>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 text-gray-900">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Id *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="service">Service you are interested in *</Label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select a service</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Study Abroad">Study Abroad</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8">
            Join 22,000+ students who have already started their journey with SkillVerse
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="mr-2 h-5 w-5" />
              Call: 9398165155
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
