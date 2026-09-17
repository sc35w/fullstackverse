import React from 'react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../../components/ui/dialog';
import ContactForm from '../../components/ContactForm';
import { asset } from '@/lib/utils';
import {
  Clock,
  Video,
  Globe,
  Award,
  Briefcase,
  Download,
  CheckCircle2,
  Code,
  Cpu,
  Radio,
  Zap,
  FileText,
  TrendingUp,
} from 'lucide-react';

const programHighlights = [
  { icon: Clock, label: 'Duration', value: '3 Months' },
  { icon: Video, label: 'Live Sessions', value: '40' },
  { icon: Globe, label: 'Mode', value: 'Remote (Live + Mentored)' },
  { icon: Code, label: 'Projects', value: 'Real Industry Use-Cases' },
  { icon: Award, label: 'Certificate', value: 'MSME Certified' },
  { icon: Briefcase, label: 'Career Support', value: 'Resume + Placement Guide' },
];

const skills = [
  'Robotics fundamentals',
  'Sensors & actuators',
  'Arduino / Raspberry Pi basics',
  'Robot kinematics',
  'ROS fundamentals',
  'Industrial automation overview',
];

const projects = [
  'Line follower / obstacle avoidance robot (simulation)',
  'Sensor-based automation system',
  'Mini robotics capstone project',
];

const outcomes = [
  'Project-based portfolio',
  'Internship certificate',
  'Industry-ready robotics exposure',
];

const careerSupport = [
  'Resume template (ATS-friendly)',
  'LinkedIn profile optimization guide',
  'Interview preparation sessions',
  'Placement roadmap (how to apply, where to apply)',
];

const comparison = [
  { platform: 'Internshala Trainings', duration: '6–8 weeks', price: '₹6k–₹10k', live: 'Mostly recorded', projects: 'Limited', cert: 'Private', placement: '❌' },
  { platform: 'Verzeo', duration: '1–3 months', price: '₹8k–₹12k', live: 'Mixed', projects: 'Yes', cert: 'Private', placement: '⚠️' },
  { platform: 'SkillVertex', duration: '3 months', price: '₹10k+', live: 'Limited live', projects: 'Yes', cert: 'Private', placement: '⚠️' },
  { platform: 'Coursera / edX', duration: '2–6 months', price: '₹3k–₹15k', live: 'Recorded', projects: 'Yes', cert: 'University', placement: '❌' },
  { platform: 'Skill Verse (YOU)', duration: '3 months', price: '₹9,999', live: '40 Live', projects: 'Industry Projects', cert: 'MSME', placement: '✅ Yes', highlight: true },
];

export default function RoboticsInternshipPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-6xl mx-auto z-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              {/* MSME Logo - Top */}
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white rounded-lg p-2 shadow-xl">
                  <img src={asset('msme-official-logo.jpg')} alt="MSME Government of India" className="h-10 w-auto" />
                </div>
                <p className="text-xs font-semibold text-white">An MSME certified Organisation</p>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">3 Months Industry Internship Program</h1>
              <p className="text-2xl md:text-3xl font-semibold mb-4">Robotics – ₹9,999 Only</p>
              <p className="text-xl mb-6 text-blue-100">Remote | Live Classes | Training Certification | Industry Projects</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">Apply Now</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <ContactForm title="Apply for Robotics Internship" type="robotics internship" />
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                  <Download className="mr-2 h-5 w-5" />
                  Download Curriculum
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>MSME Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>100% Remote</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Industry Projects</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6">
              {/* Robotics Internship Video */}
              <div className="w-full aspect-video rounded-xl shadow-2xl overflow-hidden border-4 border-blue-400 bg-black">
                <video 
                  width="100%" 
                  height="100%" 
                  controls
                  className="w-full h-full object-contain"
                >
                  <source src={asset('Robotics Internship_ Skill Verse.mp4')} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Program Highlights</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {programHighlights.map((item, i) => (
              <div key={i} className="bg-blue-50 rounded-lg p-6 text-center">
                <item.icon className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                <div className="font-bold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Skills Covered */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-800">Key Skills Covered</h2>
              <ul className="space-y-3">
                {skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-800">Hands-On Projects</h2>
              <ul className="space-y-3">
                {projects.map((project, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Cpu className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{project}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Outcome</h3>
                <ul className="space-y-2">
                  {outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">3-Month Industry Internship Program – Robotics</h2>
          
          {/* Sample Certificate */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-xl p-8 mb-8 border-8 border-double border-blue-800 shadow-2xl">
            <div className="bg-white p-8 rounded-lg">
              {/* Certificate Header */}
              <div className="flex items-center justify-between mb-6">
                <img src={asset('msme-official-logo.jpg')} alt="MSME" className="h-12 w-auto" />
                <div className="text-center flex-1">
                  <h3 className="text-3xl font-bold text-blue-800 mb-1">CERTIFICATE OF COMPLETION</h3>
                  <p className="text-sm text-gray-600">Robotics Internship Program</p>
                </div>
                <img src={asset('skillverse-logo.svg')} alt="SkillVerse" className="h-16 w-auto" />
              </div>
              
              {/* Certificate Body */}
              <div className="border-t-2 border-b-2 border-blue-300 py-6 my-6">
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  This is to certify that <span className="font-bold text-blue-800">[Student Name]</span> has successfully completed a <span className="font-semibold">3-Month Remote Robotics Internship Program</span> at <span className="font-semibold">Skill Verse</span>, involving live technical sessions, hands-on robotics projects, and practical exposure to robotics fundamentals.
                </p>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-blue-800 mb-2">Skills & Exposure:</p>
                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
                    <div>• Robotics fundamentals</div>
                    <div>• Sensors & actuators</div>
                    <div>• Robot programming</div>
                  </div>
                </div>
              </div>
              
              {/* Certificate Footer */}
              <div className="flex items-end justify-between mt-6">
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">Certificate ID: SV-ROB-2025-XXXX</p>
                  <p className="text-xs text-gray-500">Verifiable online</p>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=https://skillverse.fullstackverse.com/verify/SV-ROB-2025-XXXX" alt="QR Code" className="w-16 h-16 mt-2" />
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-2">
                    <div className="w-full h-full rounded-full border-4 border-blue-800 flex items-center justify-center bg-blue-50">
                      <span className="text-xs font-bold text-blue-800">OFFICIAL<br/>SEAL</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="border-t-2 border-gray-800 pt-1 mb-1">
                    <p className="text-sm font-semibold">Authorized Signatory</p>
                  </div>
                  <p className="text-xs text-gray-600">Skill Verse</p>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-6 italic">
                Issued under MSME-recognized training & skill development framework.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 mb-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src={asset('msme-official-logo.jpg')} alt="MSME Government of India" className="h-16 w-auto" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-800">MSME certified Organisation</span>
              </div>
            </div>
            <div className="space-y-3 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Internship Completion Certificate</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Issued by MSME Certified Organization</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Verifiable & Resume Valid</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">What Our Students Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"The live sessions were incredibly helpful! I learned robot programming from scratch and built my own line-following robot. The mentors were always available to help. Highly recommend for anyone interested in robotics!"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-blue-800">Rahul Sharma</p>
                <p className="text-sm text-gray-600">B.Tech ECE, 3rd Year</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"Amazing internship program! The curriculum covers everything from basics to advanced concepts. The MSME certificate adds great value to my resume. Worth every penny!"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-blue-800">Priya Desai</p>
                <p className="text-sm text-gray-600">Diploma in Robotics</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"Best decision I made! Got hands-on experience with Arduino and ROS. The projects were industry-relevant and the career support helped me prepare for placements."</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-blue-800">Arjun Patel</p>
                <p className="text-sm text-gray-600">B.E Mechanical, Final Year</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"The remote learning format was perfect for me. Could attend from home while managing college. The instructors explained complex robotics concepts in simple terms. Great value for money!"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-blue-800">Sneha Reddy</p>
                <p className="text-sm text-gray-600">B.Tech CSE, 2nd Year</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"Excellent program with practical focus. Built 3 real projects and got MSME-certified. The certificate verification feature is impressive. Definitely boosted my confidence and skills!"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-blue-800">Karthik Kumar</p>
                <p className="text-sm text-gray-600">B.Tech EEE, 3rd Year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Support */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Career Support Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {careerSupport.map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 flex items-start gap-4">
                <Briefcase className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Block */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Internship Fee: ₹9,999</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>Live Classes</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>Industry Projects</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>MSME Certificate</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>Career Support</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>Remote Access</span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  Enroll Now
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ContactForm title="Enroll in Robotics Internship" type="robotics internship" />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Why Choose Skill Verse?</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Platform</th>
                  <th className="px-4 py-3 text-left">Duration</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Live Classes</th>
                  <th className="px-4 py-3 text-left">Projects</th>
                  <th className="px-4 py-3 text-left">Certificate</th>
                  <th className="px-4 py-3 text-left">Placement</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className={row.highlight ? 'bg-blue-50 font-bold border-2 border-blue-600' : 'border-b'}>
                    <td className="px-4 py-3">{row.platform}</td>
                    <td className="px-4 py-3">{row.duration}</td>
                    <td className="px-4 py-3">{row.price}</td>
                    <td className="px-4 py-3">{row.live}</td>
                    <td className="px-4 py-3">{row.projects}</td>
                    <td className="px-4 py-3">{row.cert}</td>
                    <td className="px-4 py-3">{row.placement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Ready to Start Your Robotics Journey?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of students building their career in robotics</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                Apply Now
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ContactForm title="Apply for Robotics Internship" type="robotics internship" />
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
