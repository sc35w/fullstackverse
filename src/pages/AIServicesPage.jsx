import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Brain, Bot, Zap, Target, ArrowRight, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import { aiDemos } from '@/lib/demos';

const AIServicesPage = () => {
  const services = [
    {
      icon: Brain,
      title: 'Machine Learning Models',
      description: 'Custom ML models for prediction, classification, and data analysis'
    },
    {
      icon: Bot,
      title: 'AI Chatbots',
      description: 'Intelligent conversational AI for customer service and support'
    },
    {
      icon: Cpu,
      title: 'Computer Vision',
      description: 'Image recognition, object detection, and visual AI solutions'
    },
    {
      icon: Target,
      title: 'Predictive Analytics',
      description: 'Data-driven insights and forecasting for business decisions'
    },
    {
      icon: Zap,
      title: 'Process Automation',
      description: 'AI-powered workflow automation and intelligent task management'
    },
    {
      icon: Brain,
      title: 'Natural Language Processing',
      description: 'Text analysis, sentiment analysis, and language understanding'
    },
  ];

  const solutions = aiDemos;

  return (
    <>
      <Helmet>
        <title>AI Development Services - Fullstackverse</title>
        <meta name="description" content="Professional AI and machine learning development services. Custom AI solutions, chatbots, computer vision, and intelligent automation for your business." />
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
              AI Development
              <span className="block text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Harness the power of artificial intelligence to transform your business with Claude Sonnet 4.5 enablement, custom agentic workflows, and production-ready delivery playbooks.
            </p>
            <div className="mx-auto mb-8 flex max-w-3xl items-center justify-center gap-3 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              Claude Sonnet 4.5 is now enabled for every Fullstackverse client environment.
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn btn-primary">
                  Explore AI Solutions
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
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-semibold truncate">AI Performance Dashboard</h3>
                        <p className="text-cyan-100 text-sm truncate">Real-time AI metrics & insights</p>
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
                    {/* Models Deployed Card */}
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-cyan-600 text-sm font-medium">AI Models Active</div>
                        <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                          <Brain className="h-4 w-4 text-cyan-600" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-cyan-900">127</div>
                      <div className="text-cyan-600 text-sm">+12 this month</div>
                    </div>

                    {/* Accuracy Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-blue-600 text-sm font-medium">Avg. Accuracy</div>
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">96.4%</div>
                      <div className="text-blue-600 text-sm">+2.1% improvement</div>
                    </div>

                    {/* Processing Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-purple-600 text-sm font-medium">Data Processed</div>
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Zap className="h-4 w-4 text-purple-600" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-purple-900">2.8M</div>
                      <div className="text-purple-600 text-sm">Records per day</div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Chatbot Response Time</span>
                        <span className="text-gray-900 font-medium">0.3s</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Computer Vision Accuracy</span>
                        <span className="text-gray-900 font-medium">94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">NLP Sentiment Analysis</span>
                        <span className="text-gray-900 font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-gray-900 font-semibold mb-3">Recent AI Activity</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">New ML model deployed for fraud detection</span>
                        <span className="text-gray-400 ml-auto">2m ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <span className="text-gray-600">Chatbot processed 1,247 conversations</span>
                        <span className="text-gray-400 ml-auto">15m ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">Computer vision accuracy improved to 96%</span>
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
      <section className="py-16 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how our AI solutions have revolutionized businesses across industries
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
                "AI chatbot reduced customer service costs by 60% while improving response quality significantly."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Rachel Green</div>
                  <div className="text-gray-500 text-xs">CTO, ServiceCorp</div>
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
                "Predictive analytics increased our sales forecasting accuracy from 75% to 94%. Game-changer!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  M
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Marcus Johnson</div>
                  <div className="text-gray-500 text-xs">VP Sales, RetailMax</div>
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
                "Computer vision system automated quality control, reducing defects by 85% in manufacturing."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Sarah Chen</div>
                  <div className="text-gray-500 text-xs">Operations Director, ManuTech</div>
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
                "NLP-powered content analysis helped us understand customer sentiment 10x better than before."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  D
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">David Park</div>
                  <div className="text-gray-500 text-xs">Head of Analytics, BrandCo</div>
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
                "Fraud detection AI saved us ₹50M in prevented fraudulent transactions. ROI in first month!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  J
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Jennifer Liu</div>
                  <div className="text-gray-500 text-xs">CFO, FinSecure Bank</div>
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
                "Automated document processing reduced manual work by 80%. Team can focus on strategic tasks."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                  T
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Tom Anderson</div>
                  <div className="text-gray-500 text-xs">Operations Manager, DocuFlow</div>
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
                "Recommendation engine increased user engagement by 250%. Users love personalized experiences."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Anna Rodriguez</div>
                  <div className="text-gray-500 text-xs">Product Manager, StreamApp</div>
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
                "Voice AI assistant handles 70% of customer inquiries 24/7. Customer satisfaction at 98%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  L
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Lisa Thompson</div>
                  <div className="text-gray-500 text-xs">Customer Success Lead, VoiceTech</div>
                </div>
              </div>
            </motion.div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Services</h2>
            <p className="text-xl text-gray-600">Comprehensive artificial intelligence solutions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Solutions Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Solutions Portfolio</h2>
            <p className="text-xl text-gray-600">Interactive demos of our AI implementations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                onClick={() => solution.url && window.open(solution.url, '_blank')}
              >
                <div className="card overflow-hidden group-hover:shadow-xl">
                  <div className="aspect-video bg-gradient-to-br from-cyan-100 to-blue-100 relative">
                    <img
                      className="h-full w-full object-cover"
                      alt={solution.media?.alt || `${solution.title} interface`}
                      src={solution.media?.src || 'https://images.unsplash.com/photo-1678995635432-d9e89c7a8fc5?auto=format&fit=crop&w=1460&q=80'}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        {solution.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{solution.title}</h3>
                    <p className="text-sm text-gray-500">{solution.category}</p>
                    {solution.description && (
                      <p className="mt-2 text-sm text-gray-600">{solution.description}</p>
                    )}
                    {solution.badges?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        {solution.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center rounded-full border border-cyan-100 bg-cyan-50 px-2.5 py-0.5 font-medium text-cyan-700"
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

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl font-bold text-cyan-600 mb-2">100+</div>
              <div className="text-gray-600">AI Models Deployed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">AI Projects</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">AI Support</div>
            </motion.div>
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
            Ready to Implement AI?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transform your business with intelligent AI solutions tailored to your needs
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

export default AIServicesPage;