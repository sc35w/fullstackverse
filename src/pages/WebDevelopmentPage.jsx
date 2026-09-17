// src/pages/WebDevelopmentPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, Zap, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import { webDemos } from '@/lib/demos';

const WebDevelopmentPage = () => {
  const demos = webDemos;

  const capabilities = [
    { icon: Code,       title: 'Frontend Development',      description: 'React, Vue.js, Angular, and modern JavaScript frameworks' },
    { icon: Globe,      title: 'Backend Development',       description: 'Node.js, Python, PHP, and scalable server architectures' },
    { icon: Smartphone, title: 'Responsive Design',         description: 'Mobile-first approach ensuring perfect display on all devices' },
    { icon: Zap,        title: 'Performance Optimization',  description: 'Fast loading times and optimized user experiences' },
  ];

  return (
    <>
      <Helmet>
        <title>Web Development Services - Fullstackverse</title>
        <meta
          name="description"
          content="Professional web development services including responsive websites, web applications, and e-commerce platforms. Modern, fast, and SEO-optimized solutions."
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
              Web Development
              <span className="text-gradient">Excellence</span>
            </h1>
            <p className="hero-sub">
              Creating stunning, responsive websites and powerful web applications that drive business growth
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn btn-primary">
                  Discuss Your Project
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
          {/* Creative Dashboard View */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-lg w-full">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold truncate">Website Analytics</h3>
                      <p className="text-blue-100 text-sm truncate">Real-time performance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm">Live</span>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Traffic Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-blue-600 text-xs font-medium">Traffic</div>
                      <Globe className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="text-lg font-bold text-blue-900">45.2K</div>
                    <div className="text-blue-600 text-xs">+12% today</div>
                  </div>

                  {/* Conversions Card */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-emerald-600 text-xs font-medium">Conversions</div>
                      <Zap className="h-3 w-3 text-emerald-600" />
                    </div>
                    <div className="text-lg font-bold text-emerald-900">1,247</div>
                    <div className="text-emerald-600 text-xs">+8% this week</div>
                  </div>
                </div>

                {/* Performance Bars */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Page Speed</span>
                      <span className="text-gray-900 font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">SEO Score</span>
                      <span className="text-gray-900 font-medium">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="border-t border-gray-200 pt-3">
                  <h4 className="text-gray-900 font-semibold text-sm mb-2">Recent Activity</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">New lead captured</span>
                      <span className="text-gray-400 ml-auto">5m ago</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Page optimized</span>
                      <span className="text-gray-400 ml-auto">12m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Web Development Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how our websites have transformed businesses and delivered exceptional results
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
                "E-commerce site with 300% increase in conversions. Revenue doubled in 6 months!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Sarah Mitchell</div>
                  <div className="text-gray-500 text-xs">CEO, ShopSmart</div>
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
                "Corporate website that improved brand perception and lead generation by 250%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  M
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Michael Roberts</div>
                  <div className="text-gray-500 text-xs">Marketing Director, TechCorp</div>
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
                "SaaS platform with seamless user experience. Customer retention improved by 180%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                  J
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Jennifer Lee</div>
                  <div className="text-gray-500 text-xs">Product Manager, CloudTech</div>
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
                "Healthcare portal that's HIPAA compliant and user-friendly. Patient satisfaction at 98%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  D
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Dr. Amanda Chen</div>
                  <div className="text-gray-500 text-xs">Medical Director, HealthFirst</div>
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
                "Education platform with interactive learning tools. Student engagement increased by 320%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  P
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Prof. David Kim</div>
                  <div className="text-gray-500 text-xs">Dean, Online University</div>
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
                "Real estate website with virtual tours. Property inquiries increased by 400%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Robert Taylor</div>
                  <div className="text-gray-500 text-xs">Owner, Prime Properties</div>
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
                "News portal with lightning-fast load times. Daily visitors grew from 5K to 50K."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  L
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Lisa Wong</div>
                  <div className="text-gray-500 text-xs">Editor-in-Chief, DailyNews</div>
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
                "Job portal with advanced matching algorithms. Placement rate improved by 250%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  T
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Tom Anderson</div>
                  <div className="text-gray-500 text-xs">CEO, CareerConnect</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Capabilities</h2>
            <p className="text-xl text-gray-600">Full-stack development expertise</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <capability.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{capability.title}</h3>
                <p className="text-gray-600">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section (2 columns, media priority) */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Portfolio</h2>
            <p className="text-xl text-gray-600">20+ successful web projects delivered</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {demos.map((demo, index) => (
              <motion.div
                key={`${demo.title}-${index}`}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 8) * 0.1 }}
                onClick={() => demo.url && window.open(demo.url, '_blank')}
              >
                <div className="card overflow-hidden group-hover:scale-105">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    {demo.media?.type === 'video' ? (
                      <video
                        src={demo.media.src}
                        poster={demo.media.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={demo.media?.src || 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1460&q=80'}
                        alt={demo.media?.alt || `${demo.title} showcase`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {demo.title}
                    </h3>
                    {demo.description && (
                      <p className="mt-2 text-sm text-gray-600">{demo.description}</p>
                    )}
                    {demo.badges?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {demo.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
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
            Ready to Build Your Website?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's create a stunning web presence for your business
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

export default WebDevelopmentPage;
