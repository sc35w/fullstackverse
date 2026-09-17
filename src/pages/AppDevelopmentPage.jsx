import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import { mobileDemos } from '@/lib/demos';

const AppDevelopmentPage = () => {
  const demos = mobileDemos;

  const capabilities = [
    { icon: Code, title: 'Frontend Development', description: 'React, Vue.js, Angular, and modern JavaScript frameworks' },
    { icon: Globe, title: 'Backend Development', description: 'Node.js, Python, PHP, and scalable server architectures' },
    { icon: Smartphone, title: 'Responsive Design', description: 'Mobile-first approach ensuring perfect display on all devices' },
    { icon: Zap, title: 'Performance Optimization', description: 'Fast loading times and optimized user experiences' },
  ];

  return (
    <>
      <Helmet>
        <title>App Development Services - Fullstackverse</title>
        <meta
          name="description"
          content="Professional web development services including responsive websites, web applications, and e-commerce platforms. Modern, fast, and SEO-optimized solutions."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              App Development
              <span className="block text-gradient">Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Creating stunning, responsive websites and powerful web applications that drive business growth
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn btn-primary">
                  Discuss Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ContactForm />
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Creative Dashboard View */}
          <motion.div
            className="relative mt-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="max-w-6xl mx-auto">
              {/* Dashboard Mockup */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                        <Smartphone className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-semibold truncate">App Analytics Dashboard</h3>
                        <p className="text-blue-100 text-sm truncate">Real-time performance metrics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white text-sm">Live</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Downloads Card */}
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-emerald-600 text-sm font-medium">Total Downloads</div>
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Zap className="h-4 w-4 text-emerald-600" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-emerald-900">2.4M+</div>
                      <div className="text-emerald-600 text-sm">+23% this month</div>
                    </div>

                    {/* Active Users Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-blue-600 text-sm font-medium">Active Users</div>
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Globe className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">890K</div>
                      <div className="text-blue-600 text-sm">Daily active users</div>
                    </div>

                    {/* Revenue Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-purple-600 text-sm font-medium">Revenue Generated</div>
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Code className="h-4 w-4 text-purple-600" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-purple-900">₹1.2M</div>
                      <div className="text-purple-600 text-sm">Monthly recurring</div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">iOS Downloads</span>
                        <span className="text-gray-900 font-medium">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Android Downloads</span>
                        <span className="text-gray-900 font-medium">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-gray-900 font-semibold mb-3">Recent Activity</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">New user registration: +1,247</span>
                        <span className="text-gray-400 ml-auto">2m ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">App update deployed v2.1.4</span>
                        <span className="text-gray-400 ml-auto">15m ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600">Revenue milestone reached</span>
                        <span className="text-gray-400 ml-auto">1h ago</span>
                      </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              App Development Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our mobile apps have transformed businesses and delighted users worldwide
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
                "Our e-commerce app reached 500K downloads in 6 months. The user experience is phenomenal!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Alex Chen</div>
                  <div className="text-gray-500 text-xs">CEO, ShopMobile</div>
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
                "Healthcare app with telemedicine features. Patient engagement increased by 400%!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  D
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Dr. Sarah Kim</div>
                  <div className="text-gray-500 text-xs">Medical Director, HealthTech</div>
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
                "Fitness tracking app with gamification. User retention improved by 250% after launch."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                  M
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Mike Johnson</div>
                  <div className="text-gray-500 text-xs">Founder, FitLife Apps</div>
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
                "Corporate communication app for 10K+ employees. Productivity increased by 35%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Rachel Wong</div>
                  <div className="text-gray-500 text-xs">CTO, CorpTech Solutions</div>
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
                "Food delivery app with real-time tracking. Order volume increased 300% in first quarter."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  J
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">James Liu</div>
                  <div className="text-gray-500 text-xs">CEO, QuickEats</div>
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
                "Educational app for K-12 students. 95% positive reviews and featured in App Store."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  L
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Lisa Thompson</div>
                  <div className="text-gray-500 text-xs">Founder, EduLearn Mobile</div>
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
                "Social networking app for professionals. Community grew to 50K users in 8 months."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  P
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Priya Patel</div>
                  <div className="text-gray-500 text-xs">CEO, ProConnect</div>
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
                "Travel booking app with AI recommendations. Revenue per user increased by 180%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  T
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Tom Anderson</div>
                  <div className="text-gray-500 text-xs">Founder, WanderSmart</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Capabilities</h2>
            <p className="text-xl text-gray-600">Full-stack development expertise</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                  <capability.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{capability.title}</h3>
                <p className="text-gray-600">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section – cards fit to mobile screen (portrait 9:16) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
            <p className="text-xl text-gray-600">Mobile-style cards (9:16)</p>
          </motion.div>

          {/* grid unchanged; only cards are now portrait */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {demos.map((demo, index) => (
              <motion.div
                key={demo.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 8) * 0.1 }}
                onClick={() => demo.url && window.open(demo.url, '_blank')}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  {/* 👇 Phone-like frame */}
                  <div className="p-3">
                    <div className="relative w-full aspect-[9/16] bg-black rounded-3xl overflow-hidden ring-1 ring-black/10">
                      {/* optional small top bar */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 h-1.5 w-16 rounded-full bg-white/20 z-10" />
                      {demo.media?.type === 'video' ? (
                        <video
                          className="absolute inset-0 w-full h-full object-cover"
                          src={demo.media.src}
                          poster={demo.media.poster}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          className="absolute inset-0 w-full h-full object-cover"
                          alt={demo.media?.alt || `${demo.title} mobile experience`}
                          src={demo.media?.src || 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80'}
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>
                  </div>

                  <div className="px-4 pb-4">
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
                            className="inline-flex items-center rounded-full border border-purple-100 bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700"
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
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
                <Button className="btn btn-ghost">
                  Discuss Your Business Requirement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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

export default AppDevelopmentPage;
