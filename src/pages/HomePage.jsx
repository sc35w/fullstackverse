import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Zap, Globe, Play, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import { asset } from '@/lib/utils';

const HomePage = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false); // New state for video modal

  const stats = [
    { label: 'Clients Served', value: '500+', icon: Users },
    { label: 'Team Members', value: '25+', icon: Users },
    { label: 'AI Models Deployed', value: '100+', icon: Zap },
    { label: 'Solutions Delivered', value: '1000+', icon: BarChart },
  ];

  const services = [
    {
      title: 'AI Development Services',
      description: 'Cutting-edge AI solutions and machine learning models',
      href: '/ai-services',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications',
      href: '/app-development',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      title: 'Software Development',
      description: 'Custom software solutions for your business',
      href: '/software-development',
      gradient: 'from-green-600 to-blue-600'
    },
    {
      title: 'Web App Development',
      description: 'Modern, responsive web applications',
      href: '/web-development',
      gradient: 'from-orange-600 to-red-600'
    },
    {
      title: 'Website Development',
      description: 'Professional websites that convert',
      href: '/web-development',
      gradient: 'from-pink-600 to-purple-600'
    },
    {
      title: 'Game App Development',
      description: 'Engaging games for all platforms',
      href: '/game-development',
      gradient: 'from-indigo-600 to-purple-600'
    },
  ];

  const brands = [
    'Entrepreneur', 'Economic Times', 'Vedic Exquise', 'Deloitte', 
    'TechCrunch', 'Forbes', 'Business Insider', 'Wired'
  ];

  return (
    <>
      <Helmet>
        <title>Fullstackverse – Your End-to-End Digital Partner</title>
        <meta name="description" content="Innovating the Future with AI, Apps & Automation. Professional web development, mobile apps, AI solutions, and digital transformation services." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="left">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Innovating the Future with
            <span className="text-gradient">AI, Apps & Automation</span>
          </motion.h1>
          
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your End-to-End Digital Partner for transformative technology solutions
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <Button className="btn btn-primary">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ContactForm />
              </DialogContent>
            </Dialog>
            
            <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
              <DialogTrigger asChild>
                <Button className="btn btn-ghost">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="relative aspect-video">
                  <video
                    className="w-full h-full rounded-lg"
                    controls // Adds play/pause controls
                    autoPlay // Auto-plays the video (optional)
                    muted // Mutes the video (required for autoPlay in some browsers)
                  >
                    <source src={asset('videos/demo.mp4')} type="video/mp4" /> {/* Path to your video */}
                    Your browser does not support the video tag.
                  </video>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        <div className="right">
          {/* Creative Dashboard View */}
          <div className="hero-visual">
            <div className="hero-visual-inner">
              {/* Dashboard Mockup */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-bold text-sm truncate">Fullstackverse Dashboard</span>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-4 space-y-3">
                  {/* Stats Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                      <div className="text-xs text-blue-600 font-semibold">Revenue</div>
                      <div className="text-lg font-bold text-blue-800">₹2.4M</div>
                      <div className="text-xs text-green-600">+23%</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
                      <div className="text-xs text-purple-600 font-semibold">Projects</div>
                      <div className="text-lg font-bold text-purple-800">156</div>
                      <div className="text-xs text-green-600">+12%</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 rounded-lg border border-emerald-200">
                      <div className="text-xs text-emerald-600 font-semibold">Clients</div>
                      <div className="text-lg font-bold text-emerald-800">89</div>
                      <div className="text-xs text-green-600">+8%</div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">AI Projects</span>
                        <span className="text-gray-800 font-semibold">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Mobile Apps</span>
                        <span className="text-gray-800 font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Web Solutions</span>
                        <span className="text-gray-800 font-semibold">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Recent Activity</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">AI Chatbot deployed for Client X</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">Mobile app launched on App Store</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600">Website redesign completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="hero-cube blue">
                <div className="hero-cube-line"></div>
                <div className="hero-cube-line"></div>
                <div className="hero-cube-line dark"></div>
              </div>
              <div className="hero-cube red">
                <div className="hero-cube-line"></div>
                <div className="hero-cube-line dark"></div>
              </div>
              <div className="hero-cube white">
                <div className="hero-cube-line dark"></div>
                <div className="hero-cube-line dark"></div>
              </div>
              <div className="hero-cube small">
                <div className="hero-cube-line dark"></div>
              </div>
            </div>
          </div>
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
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by businesses worldwide for delivering exceptional digital solutions
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
                "Fullstackverse transformed our entire digital presence. Their AI solutions increased our efficiency by 300%!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Rajesh Kumar</div>
                  <div className="text-gray-500 text-xs">CEO, TechStart Inc.</div>
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
                "The mobile app they built for us has over 50k downloads. Professional team with cutting-edge technology."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Sarah Johnson</div>
                  <div className="text-gray-500 text-xs">Founder, AppVenture</div>
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
                "Outstanding web development! Our e-commerce site now converts 40% better. Highly recommend their services."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  M
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Michael Chen</div>
                  <div className="text-gray-500 text-xs">Director, EcomPlus</div>
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
                "Their AI integration saved us countless hours. The team's expertise in automation is unmatched."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                  L
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Lisa Rodriguez</div>
                  <div className="text-gray-500 text-xs">CTO, InnovateCorp</div>
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
                "Game development expertise is top-notch. Our mobile game reached top charts within weeks of launch."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  D
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">David Park</div>
                  <div className="text-gray-500 text-xs">CEO, GameForge Studios</div>
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
                "From concept to deployment in record time. Their agile methodology and communication were exceptional."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Anna Thompson</div>
                  <div className="text-gray-500 text-xs">Product Manager, TechFlow</div>
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
                "Comprehensive software solutions that perfectly fit our enterprise needs. ROI was evident within months."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  J
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">James Wilson</div>
                  <div className="text-gray-500 text-xs">VP Operations, EnterpriseCo</div>
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
                "Their attention to detail and innovative approach sets them apart. Best development partner we've worked with."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  E
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Emma Davis</div>
                  <div className="text-gray-500 text-xs">Founder, StartupHub</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-center text-gray-600 text-lg mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Trusted by leading brands worldwide
          </motion.h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                className="brand-logo text-2xl font-bold text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions to transform your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="service-card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={service.href}>
                  <div className={`bg-gradient-to-br ${service.gradient} rounded-2xl p-8 text-white h-full`}>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-white/90 mb-6">{service.description}</p>
                    <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                      <span className="font-semibold">Learn More</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  </div>
                </Link>
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
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's discuss your project and bring your vision to life
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn btn-ghost">
                  Get Started Today
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

export default HomePage;