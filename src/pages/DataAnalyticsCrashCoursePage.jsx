import React from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import { downloadDataAnalyticsBrochure } from '@/lib/brochure';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Code2, 
  Database, 
  BarChart3,
  FileSpreadsheet,
  Brain,
  Download,
  CheckCircle2,
  Star
} from "lucide-react";

const tools = [
  { name: "SQL", icon: Database },
  { name: "Python", icon: Code2 },
  { name: "Power BI", icon: BarChart3 },
  { name: "NumPy", icon: Brain },
  { name: "Pandas", icon: FileSpreadsheet },
  { name: "Excel", icon: FileSpreadsheet },
  { name: "Tableau", icon: TrendingUp },
  { name: "Spark", icon: Database },
  { name: "AWS", icon: Database }
];

const roles = [
  {
    title: "Data Engineer",
    desc: "Expertise in Python, SQL, Apache Spark, and ETL processes, specializing in building scalable data pipelines and optimizing data infrastructure."
  },
  {
    title: "Data Scientist",
    desc: "Proficient in Python, R, and machine learning, specializing in predictive modeling, data mining, and delivering actionable insights from complex datasets."
  },
  {
    title: "Data Architect",
    desc: "Expertise in AWS, Hadoop, Spark, and SQL, specializing in scalable data architectures and optimized data pipelines."
  },
  {
    title: "Data Analyst",
    desc: "Expertise in SQL, Python, and Excel, skilled in creating impactful dashboards, analyzing trends, and delivering data-driven insights for business growth."
  },
  {
    title: "Database Administrator",
    desc: "Skilled in SQL Server, Oracle, MySQL, and PostgreSQL, focusing on database optimization, security, and high availability."
  }
];

const mentors = [
  {
    name: "Ekta Negi",
    title: "Senior Data Scientist @Fractal, Ex - Deloitte, Capgemini, IBM",
    exp: "5+ Years Work Experience",
    teach: "3+ Years Teaching Experience"
  },
  {
    name: "Ajay Kumar Gupta",
    title: "Senior Data Scientist @ Synopsis, Novartis",
    exp: "4+ Years Work Experience",
    teach: "3+ Years Teaching Experience"
  }
];

const faqs = [
  {
    q: "Is the course available online and offline?",
    a: "This course will be entirely conducted online, and all resources and content will be available on pwskills.com."
  },
  {
    q: "Will I receive a certificate upon completion of the course?",
    a: "Yes, you will receive a certificate upon successful completion of the course. To qualify, you must complete at least 60% of the lectures and assignments and finish at least one medium-level difficulty project on the experience portal."
  },
  {
    q: "What kind of support will I receive during the course?",
    a: "We are here to support you throughout your learning journey with us. If you encounter any issues, please click on 'Support' when you log in to your account at pwskills.com. Most questions are addressed in our FAQs. If you don't find an answer there, feel free to raise a ticket under the appropriate category (Academics, Technical issues, Others, etc.). You can also reach out to us via email at support@pwskills.com."
  },
  {
    q: "What are the prerequisites for enrolling in the Data Analytics course?",
    a: "There are no major prerequisites for the course. You should be familiar with basic mathematical concepts (equivalent to 12th grade) and proficient in basic English to understand the lectures."
  },
  {
    q: "Is this course suitable for students or professionals?",
    a: "This course is suitable for both students and professionals alike. In case you come from a different domain, you will also be benefiitted from the course as it will take you from the very basics to high level application based understanding."
  }
];

export default function DataAnalyticsCrashCoursePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-12 max-w-6xl mx-auto">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Data Analytics Certification Program by Skillverse</h1>
          <p className="text-lg text-gray-700">Data Analytics Course with 100% Placement Support | Perfect for Working Professionals & Freshers</p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Master Data Analytics with Skillverse's comprehensive training program</li>
            <li>Key tools: SQL, Python, Power BI, NumPy, and more</li>
            <li>Industry Relevant Projects, Skillverse Lab, Career Guidance, Doubt Clearing, Assignment Evaluation</li>
          </ul>
          <div className="flex gap-4 mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-800">Register Now</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ContactForm title="Register for Data Analytics Course" type="data analytics crash course" />
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              className="border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50"
              onClick={(e) => { e.preventDefault(); downloadDataAnalyticsBrochure(); }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Brochure
            </Button>
          </div>
          <div className="mt-4 text-green-700 font-semibold">Get Free Career Counseling by our experts</div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-xl w-full max-w-md h-80 flex items-center justify-center">
            <BarChart3 className="h-32 w-32 text-white" />
          </div>
        </div>
      </section>

      {/* Tools Covered */}
      <section className="bg-white py-10 px-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Data Analytics Tools Covered</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div key={i} className="bg-blue-50 rounded-lg shadow p-4 w-28 h-28 flex flex-col items-center justify-center">
                <Icon className="h-10 w-10 text-blue-700 mb-2" />
                <span className="text-sm font-semibold text-blue-700">{tool.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-10 px-6 bg-gradient-to-r from-blue-100 to-blue-50">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Why Get Data Analytics Certification From Skillverse?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
            <span className="font-semibold text-blue-700">Industry Experts Led Live Sessions</span>
            <span>Email Support</span>
            <span>Job Assistance Program</span>
            <span>Aptitude Training</span>
            <span>Soft Skills Sessions</span>
            <span>Resume Building Sessions</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
            <span>Mock Interviews</span>
            <span>LinkedIn Profile Building</span>
            <span>Job Assistance</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
            <span>Industry Relevant Projects</span>
            <span>Skillverse Lab For Your Code Practice</span>
            <span>3+ Career Guidance Sessions</span>
            <span>Doubt Clearing Sessions</span>
            <span>Assignment Evaluation & Solution</span>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-800">Register Now</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ContactForm title="Register for Data Analytics Course" type="data analytics crash course" />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-10 px-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">What Roles Can A Data Analytics Professional Pursue?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {roles.map((role, i) => (
            <div key={i} className="bg-blue-50 rounded-lg shadow p-6">
              <h3 className="font-semibold text-blue-700 text-lg mb-2">{role.title}</h3>
              <p className="text-gray-700">{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Advantages of Skillverse Data Analytics Program</h2>
        <ul className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto list-disc ml-6 text-gray-700">
          <li>Practice Exercises</li>
          <li>Diverse Project Portfolio + Capstone</li>
          <li>Doubt Clearing Session</li>
          <li>Industry Oriented Curriculum</li>
          <li>Skillverse Lab For Coding</li>
          <li>Industry Recognized Certificate</li>
          <li>Peer Networking</li>
          <li>Module Level Assignments</li>
          <li>Email Support</li>
        </ul>
      </section>

      {/* Market & Salary Section */}
      <section className="py-10 px-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Data Analytics Certification Benefits</h2>
        <div className="max-w-3xl mx-auto text-center text-lg text-gray-700 mb-6">
          The global Data Analytics market size was valued at <span className="font-bold text-blue-700">USD 154.2 billion in 2023</span> and is anticipated to reach <span className="font-bold text-blue-700">USD 495.2 billion by 2030</span>, exhibiting a compound annual growth rate (CAGR) of <span className="font-bold text-blue-700">16.4%</span> during the forecast period (2023-2030).
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6 w-60 h-32 flex flex-col items-center justify-center">
            <Users className="h-8 w-8 text-blue-700 mb-2" />
            <span className="font-bold text-blue-700">Hiring Companies</span>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow p-6 w-60 h-32 flex flex-col items-center justify-center">
            <TrendingUp className="h-8 w-8 text-green-700 mb-2" />
            <span className="font-bold text-green-700">Annual Salary</span>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow p-6 w-60 h-32 flex flex-col items-center justify-center">
            <Award className="h-8 w-8 text-purple-700 mb-2" />
            <span className="font-bold text-purple-700">Sample Certificate</span>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-10 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Meet Your Mentors</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {mentors.map((mentor, i) => (
            <div key={i} className="bg-blue-50 rounded-lg shadow p-6 flex flex-col items-center w-72">
              <div className="w-24 h-24 rounded-full mb-4 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="font-semibold text-blue-700 text-lg">{mentor.name}</h3>
              <div className="text-gray-700 text-center text-sm mt-2">{mentor.title}</div>
              <div className="mt-2 text-sm text-gray-600">{mentor.exp}</div>
              <div className="text-sm text-gray-600">{mentor.teach}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-10 px-6 bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-3xl font-bold text-blue-800 mb-2">₹ 25,000</div>
          <div className="text-lg text-gray-700 mb-2">No Cost EMI starting from 4999/month</div>
          <div className="text-red-600 font-semibold mb-2">Hurry! Batch Starting Soon</div>
          <div className="text-gray-700 mb-4">Starts From</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-800">Register Now!</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ContactForm title="Register for Data Analytics Course" type="data analytics crash course" />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">You Are One Step Closer To Building A Thriving Career As Data Analyst!</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-800">Register Now!</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ContactForm title="Register for Data Analytics Course" type="data analytics crash course" />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Frequently Asked Questions (FAQs)</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-blue-50 rounded-lg shadow p-4">
              <div className="font-semibold text-blue-700">Q: {faq.q}</div>
              <div className="text-gray-700 mt-1">A: {faq.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
