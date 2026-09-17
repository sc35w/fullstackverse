import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code2, Database, Cloud, Shield, ArrowRight, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import { softwareDemos } from '@/lib/demos';

const SoftwareDevelopmentPage = () => {
  const services = [
    {
      icon: Code2,
      title: 'Custom Software Development',
      description: 'Tailored software solutions built to your exact specifications'
    },
    {
      icon: Database,
      title: 'Database Design & Management',
      description: 'Robust database architecture and optimization services'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud-based applications and infrastructure'
    },
    {
      icon: Shield,
      title: 'Security Implementation',
      description: 'Enterprise-grade security and data protection measures'
    },
    {
      icon: Settings,
      title: 'System Integration',
      description: 'Seamless integration with existing business systems'
    },
    {
      icon: Code2,
      title: 'API Development',
      description: 'RESTful APIs and microservices architecture'
    },
  ];

  const technologies = [
    'Python', 'Java', 'C#', 'Node.js', 'React', 'Angular',
    'Vue.js', 'Django', 'Spring Boot', '.NET', 'PostgreSQL',
    'MongoDB', 'AWS', 'Azure', 'Docker', 'Kubernetes'
  ];

  const DEFAULT_IMAGE =
    'https://images.unsplash.com/photo-1648134859182-98df6e93ef58';

  const projects = softwareDemos;

  return (
    <>
      <Helmet>
        <title>Software Development Services - Fullstackverse</title>
        <meta
          name="description"
          content="Custom software development services including enterprise applications, cloud solutions, database design, and system integration. Scalable and secure software solutions."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">
              Software Development
              <span className="text-gradient">Solutions</span>
            </h1>
            <p className="hero-sub">
              Custom software solutions that streamline operations and drive business growth
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn btn-primary">
                  Start Your Software Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ContactForm />
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
        <div className="right">
          {/* Creative Software Screens Grid */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-3 max-w-md w-full mx-auto">
              {/* Screen 1 - Analytics Dashboard */}
              <motion.div
                className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-xs text-blue-600 font-medium mb-1">Analytics</div>
                  <div className="text-sm font-bold text-blue-900">₹2.4M</div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div className="bg-blue-500 h-1 rounded-full w-3/4"></div>
                  </div>
                </div>
              </motion.div>

              {/* Screen 2 - CRM Interface */}
              <motion.div
                className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-green-600 to-teal-600 p-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-xs text-green-600 font-medium mb-1">CRM</div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">J</div>
                    <div className="text-xs">John Doe</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-green-500 h-1 rounded-full w-3/4"></div>
                  </div>
                </div>
              </motion.div>

              {/* Screen 3 - Code Editor */}
              <motion.div
                className="bg-gray-900 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="bg-gray-800 p-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-2 font-mono text-xs">
                  <div className="text-blue-400">def calc():</div>
                  <div className="text-white">  return</div>
                  <div className="text-green-400">  # AI</div>
                </div>
              </motion.div>

              {/* Screen 4 - Database Interface */}
              <motion.div
                className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-xs text-orange-600 font-medium mb-1">Database</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Users</span>
                      <span className="font-bold">15.2K</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Tables</span>
                      <span className="font-bold">89</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Screen 5 - API Interface */}
              <motion.div
                className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-xs text-purple-600 font-medium mb-1">API</div>
                  <div className="space-y-1">
                    <div className="text-xs bg-gray-100 rounded px-1 py-0.5">GET /api/users</div>
                    <div className="text-xs bg-green-100 text-green-800 rounded px-1 py-0.5">200 OK</div>
                  </div>
                </div>
              </motion.div>

              {/* Screen 6 - Cloud Dashboard */}
              <motion.div
                className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-xs text-cyan-600 font-medium mb-1">Cloud</div>
                  <div className="flex items-center gap-1 mb-1">
                    <Cloud className="h-3 w-3 text-cyan-600" />
                    <span className="text-xs">AWS</span>
                  </div>
                  <div className="text-xs text-green-600">● Running</div>
                </div>
              </motion.div>
            </div>

            {/* Floating Tech Icons */}
            <motion.div
              className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Code2 className="h-6 w-6 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Database className="h-5 w-5 text-white" />
            </motion.div>

            <motion.div
              className="absolute top-1/2 -left-8 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="h-4 w-4 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Software Development Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our custom software solutions have transformed businesses and delivered exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Testimonial 1 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "ERP system streamlined our operations, reducing manual work by 70% and improving efficiency dramatically."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                  M
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Maria Garcia</div>
                  <div className="text-gray-500 text-xs">COO, TechManufacturing</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "Custom CRM increased our sales team's productivity by 150%. The ROI was evident within 3 months."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Robert Chen</div>
                  <div className="text-gray-500 text-xs">Sales Director, GlobalSales Inc.</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "Inventory management system reduced stockouts by 80% and improved our supply chain visibility."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Sarah Johnson</div>
                  <div className="text-gray-500 text-xs">Operations Manager, RetailChain</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 4 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "HR management system automated our payroll and benefits administration. Saved us 200+ hours monthly."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  D
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">David Park</div>
                  <div className="text-gray-500 text-xs">HR Director, CorpSolutions</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 5 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "Financial dashboard provides real-time insights. Our decision-making improved by 300% with accurate data."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  J
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Jennifer Liu</div>
                  <div className="text-gray-500 text-xs">CFO, FinanceCorp</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 6 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "Project management tool increased our team's collaboration and delivery speed by 200%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                  T
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Tom Anderson</div>
                  <div className="text-gray-500 text-xs">Project Manager, DevAgency</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 7 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "Document management system with AI search capabilities. Finding documents is now instantaneous."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Anna Rodriguez</div>
                  <div className="text-gray-500 text-xs">Legal Counsel, LawFirm Pro</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 8 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "Analytics platform transformed our data into actionable insights. Revenue increased by 180%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  L
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Lisa Thompson</div>
                  <div className="text-gray-500 text-xs">Data Director, AnalyticsCo</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Development Services</h2>
            <p className="text-xl text-gray-600">Comprehensive software development capabilities</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technologies We Use</h2>
            <p className="text-xl text-gray-600">Modern tech stack for robust solutions</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <span className="text-gray-700 font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Software Solutions</h2>
            <p className="text-xl text-gray-600">Live software applications we've developed</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
              >
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative">
                    <img
                      className="w-full h-full object-cover"
                      alt={project.media?.alt || `${project.title} interface`}
                      src={project.media?.src || DEFAULT_IMAGE}
                    />
                    {project.status && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          {project.status}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                    {project.category && (
                      <p className="text-sm text-gray-500">{project.category}</p>
                    )}
                    {project.description && (
                      <p className="mt-2 text-sm text-gray-600">{project.description}</p>
                    )}
                    {project.badges?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Build Your Software?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's create custom software that perfectly fits your business needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn btn-ghost">
                  Discuss Your Business Requirement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ContactForm />
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SoftwareDevelopmentPage;
