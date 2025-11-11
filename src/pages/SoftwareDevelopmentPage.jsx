import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code2, Database, Cloud, Shield, ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';

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

  const projects = [
    { title: 'ERP System', category: 'Enterprise', status: 'Live', image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a' },
    { title: 'CRM Platform', category: 'Business', status: 'Live', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c' },
    { title: 'Inventory Management', category: 'Logistics', status: 'Live', image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b' },
    { title: 'HR Management System', category: 'Human Resources', status: 'Live', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' },
    { title: 'Financial Dashboard', category: 'Finance', status: 'Live', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296' },
    { title: 'Project Management Tool', category: 'Productivity', status: 'Live', image: 'https://images.unsplash.com/photo-1551281044-8d8f3227ae79' },
    { title: 'Document Management', category: 'Enterprise', status: 'Live', image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d' },
    { title: 'Analytics Platform', category: 'Data', status: 'Live', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' },
    { title: 'Quiz Platform', category: 'EdTech', status: 'Live', gif: '/web-development/gif/quizgif.gif' }
  ];

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
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Software Development
              <span className="block text-gradient">Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Custom software solutions that streamline operations and drive business growth
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg"
                >
                  Start Your Software Project
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

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Development Services</h2>
            <p className="text-xl text-gray-600">Comprehensive software development capabilities</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      alt={`${project.title} software interface`}
                      src={project.image || project.gif || DEFAULT_IMAGE}
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Build Your Software?
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-8"
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
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black border-white px-8 py-4 text-lg"
                >
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

export default SoftwareDevelopmentPage;
