import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../components/ui/use-toast';
import { supabase } from '../../lib/supabaseClient';
import {
  Award,
  Gift,
  FileText,
  DollarSign,
  GraduationCap,
  Briefcase,
  Clock,
  Share2,
  Lightbulb,
  MessageSquare,
  Users,
  Target,
  ChevronRight,
  Download,
  Play,
  CheckCircle2,
  TrendingUp,
  Globe,
  BookOpen,
  Phone,
  Mail,
} from 'lucide-react';
import { downloadDataAnalyticsBrochure } from '../../lib/brochure';

const perks = [
  { icon: Gift, title: 'Exclusive SkillVerse Merchandise', description: 'Referral rewards included' },
  { icon: FileText, title: 'Official Internship Certificate', description: 'Certificate & Offer Letter' },
  { icon: DollarSign, title: 'Stipend', description: 'Up to ₹25,000' },
  { icon: GraduationCap, title: 'Free Crash Courses', description: 'Power BI, Tableau, Product Mgmt' },
  { icon: Briefcase, title: 'Lifetime Job Assistance', description: 'For your career' },
  { icon: Clock, title: 'Fully Flexible', description: 'No fixed hours, work from anywhere' },
];

const steps = [
  { number: '1', title: 'Register', description: 'Fill the application form' },
  { number: '2', title: 'Shortlist', description: 'Eligibility & profile screening' },
  { number: '3', title: 'Selection', description: "You're an official Ambassador 🎉" },
];

const dailyActivities = [
  { icon: Share2, title: 'Spread the word', description: 'Share SkillVerse brochures, posters, and reels in your college' },
  { icon: Lightbulb, title: 'Educate & Inspire', description: 'Introduce friends to our programs and workshops.' },
  { icon: MessageSquare, title: 'Invite & Connect', description: 'Send invites to students via WhatsApp link.' },
  { icon: Users, title: 'Collect & Contribute', description: 'Gather leads & feedback with SkillVerse support.' },
  { icon: Target, title: 'Collaborate & Create', description: 'Work with SkillVerse on events & campaigns.' },
  { icon: Award, title: 'Lead the Way', description: 'Be the go-to contact for SkillVerse on your campus.' },
];

const stats = [
  { number: '22K+', label: 'Students Assisted' },
  { number: '30+', label: 'Years of Combined Experience' },
  { number: '100+', label: 'Industry Experts' },
  { number: '500+', label: 'Universities' },
];

const testimonials = [
  {
    name: 'Ananya Sharma',
    role: 'B.Tech, Bangalore',
    text: 'Being a Campus Ambassador gave me so much confidence. I got to talk to students across my college, learned leadership, and even earned while studying. The goodies were a bonus!',
  },
  {
    name: 'Rohit Verma',
    role: 'Mechanical Engg., Pune',
    text: 'This was my first proper internship experience. The stipend, the certificate, and the flexible hours made it perfect for me as a student. It actually helped me land my next opportunity.',
  },
  {
    name: 'Megha Nair',
    role: 'Computer Science, Delhi',
    text: "I loved being the point of contact for my friends. It felt great when juniors asked me about programs and I could guide them. Plus, adding this to my resume made me stand out.",
  },
  {
    name: 'Saurabh Patil',
    role: 'MBA Student, Mumbai',
    text: "The training sessions and mentorship were super useful. I learned Power BI basics and project management skills that I never thought I'd get in college.",
  },
  {
    name: 'Priya Reddy',
    role: 'B.Com Student, Hyderabad',
    text: 'Joining as a Campus Ambassador gave me both exposure and a community. I met other ambassadors from different colleges, and it turned into a fun learning journey.',
  },
];

const faqs = [
  { question: 'Who can apply for the Campus Ambassador program?', answer: 'Any college student from any discipline can apply. We welcome students from all years and backgrounds.' },
  { question: 'Is there any registration fee?', answer: 'No, the program is completely free. You just need to submit your application.' },
  { question: 'How much time do I need to dedicate?', answer: 'The program is fully flexible. You can work according to your schedule and availability. There are no fixed hours.' },
  { question: 'How will I receive the stipend?', answer: 'Stipend is performance-based and will be transferred directly to your bank account based on your contributions.' },
  { question: 'What kind of support will I get?', answer: 'You will get complete training, marketing materials, dedicated support team, and access to our resources.' },
];

const CampusAmbassadorPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    contact_number: '',
    email: '',
    college: '',
    course: '',
    year: '',
    why_join: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          full_name: formData.full_name,
          contact_number: formData.contact_number,
          email: formData.email,
          project_description: `Campus Ambassador Application - College: ${formData.college}, Course: ${formData.course}, Year: ${formData.year}, Why: ${formData.why_join}`,
          budget: 'Campus Ambassador',
          type: 'Campus Ambassador Application',
        },
      ]);

      if (error) throw error;

      toast({
        title: 'Application Submitted! 🎉',
        description: 'We will review your application and get back to you soon.',
      });

      setFormData({
        full_name: '',
        contact_number: '',
        email: '',
        college: '',
        course: '',
        year: '',
        why_join: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: 'Submission Failed',
        description: 'Please try again later or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">SkillVerse Campus Ambassador Program</h1>
            <p className="text-2xl md:text-3xl mb-8 font-light">Earn. Lead. Influence. #LaunchYourCareer</p>
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100"
              onClick={(e) => { e.preventDefault(); downloadDataAnalyticsBrochure(); }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Brochure
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">What is a Campus Ambassador?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A Campus Ambassador is a student who represents SkillVerse in their college and acts as a bridge between us and the campus community. In this role, you'll share posters, videos, and updates, introduce your classmates to new opportunities, and guide them whenever needed.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                It's like being the face of SkillVerse in your college – helping others while also gaining skills, rewards, and real-world experience.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative">
              <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-12 flex items-center justify-center">
                <Play className="h-24 w-24 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Perks & Incentives</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Unlock exclusive benefits and rewards as a Campus Ambassador</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <perk.icon className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-900">{perk.title}</h3>
                <p className="text-gray-600">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Application Process</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Four simple steps to become an Ambassador</p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {i < steps.length - 1 && <ChevronRight className="hidden md:block absolute top-8 -right-4 h-8 w-8 text-red-300" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">A Day in the Life</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Experience the daily journey of a SkillVerse Ambassador</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyActivities.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <activity.icon className="h-10 w-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-900">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8"
            >
              <Globe className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Study Abroad</h3>
              <p className="text-gray-700 mb-4">
                Embark on your global education journey with expert support at every step. From university selection to application strategy and visa assistance, we ensure you're prepared to succeed in top international academic destinations.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-red-600" />Real-world application and SOP writing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-red-600" />Country-specific admission guidance</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-red-600" />Support with scholarships and post-study work options</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8"
            >
              <BookOpen className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Mentorship Programs</h3>
              <p className="text-gray-700 mb-4">
                Accelerate your professional growth by learning directly from experienced mentors across industries. Get personalized feedback, career roadmap planning, and guidance on making smart career decisions.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-red-600" />Industry-relevant projects</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-red-600" />Portfolio-worthy capstone</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-red-600" />Guided project development</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Ambassadors Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                    {testimonial.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Ready to Become an Ambassador? 🚀</h2>
          <p className="text-center text-lg mb-8">Join thousands of students who are already making an impact</p>
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl p-8 shadow-2xl"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name" className="text-gray-900">Full Name *</Label>
                <Input id="full_name" name="full_name" type="text" required value={formData.full_name} onChange={handleInputChange} className="mt-1" placeholder="Your full name" />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-900">Email *</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="mt-1" placeholder="your.email@example.com" />
              </div>
              <div>
                <Label htmlFor="contact_number" className="text-gray-900">Contact Number *</Label>
                <Input id="contact_number" name="contact_number" type="tel" required value={formData.contact_number} onChange={handleInputChange} className="mt-1" placeholder="9876543210" />
              </div>
              <div>
                <Label htmlFor="college" className="text-gray-900">College/University *</Label>
                <Input id="college" name="college" type="text" required value={formData.college} onChange={handleInputChange} className="mt-1" placeholder="Your college name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course" className="text-gray-900">Course *</Label>
                  <Input id="course" name="course" type="text" required value={formData.course} onChange={handleInputChange} className="mt-1" placeholder="B.Tech, MBA, etc." />
                </div>
                <div>
                  <Label htmlFor="year" className="text-gray-900">Year *</Label>
                  <select
                    id="year"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Post Graduate">Post Graduate</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="why_join" className="text-gray-900">Why do you want to join? *</Label>
                <Textarea id="why_join" name="why_join" required value={formData.why_join} onChange={handleInputChange} className="mt-1" placeholder="Tell us why you'd be a great Campus Ambassador..." rows={4} />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white">
                {loading ? 'Submitting...' : 'Apply Now'}
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Have Questions? We're Here to Help!</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="tel:9398165155" className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Phone className="h-5 w-5 text-red-600" />
              <span className="text-gray-900">9398165155</span>
            </a>
            <a href="mailto:contact@fullstackverse.com" className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Mail className="h-5 w-5 text-red-600" />
              <span className="text-gray-900">contact@fullstackverse.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampusAmbassadorPage;
