import React from 'react';
import { Cloud, Code2, Database, Settings, Shield } from 'lucide-react';
import ServicePage from '@/components/site/ServicePage';
import { softwareDemos } from '@/lib/demos';

const SoftwareDevelopmentPage = () => (
  <ServicePage
    meta={{
      title: 'Software Development Services - Fullstackverse',
      description:
        'Custom software development services including enterprise applications, cloud solutions, database design, and system integration. Scalable and secure software solutions.',
    }}
    hero={{
      title: 'Software Development',
      highlight: 'Solutions',
      lead: 'Custom software solutions that streamline operations and drive business growth',
      cta: 'Start Your Software Project',
    }}
    features={{
      title: 'Development Services',
      lead: 'Comprehensive software development capabilities',
      items: [
        { icon: Code2, title: 'Custom Software Development', description: 'Tailored software solutions built to your exact specifications' },
        { icon: Database, title: 'Database Design & Management', description: 'Robust database architecture and optimization services' },
        { icon: Cloud, title: 'Cloud Solutions', description: 'Scalable cloud-based applications and infrastructure' },
        { icon: Shield, title: 'Security Implementation', description: 'Enterprise-grade security and data protection measures' },
        { icon: Settings, title: 'System Integration', description: 'Seamless integration with existing business systems' },
        { icon: Code2, title: 'API Development', description: 'RESTful APIs and microservices architecture' },
      ],
    }}
    technologies={{
      title: 'Technologies We Use',
      lead: 'Modern tech stack for robust solutions',
      items: [
        'Python', 'Java', 'C#', 'Node.js', 'React', 'Angular', 'Vue.js', 'Django',
        'Spring Boot', '.NET', 'PostgreSQL', 'MongoDB', 'AWS', 'Azure', 'Docker', 'Kubernetes',
      ],
    }}
    portfolio={{
      title: 'Software Solutions',
      lead: "Live software applications we've developed",
      items: softwareDemos,
      shape: 'landscape',
      fallbackImage: 'https://images.unsplash.com/photo-1648134859182-98df6e93ef58',
    }}
    testimonials={{
      title: 'Software Development Success Stories',
      lead: 'See how our custom software solutions have transformed businesses and delivered exceptional results',
      items: [
        { quote: '"ERP system streamlined our operations, reducing manual work by 70% and improving efficiency dramatically."', name: 'Maria Garcia', role: 'COO, TechManufacturing' },
        { quote: '"Custom CRM increased our sales team\'s productivity by 150%. The ROI was evident within 3 months."', name: 'Robert Chen', role: 'Sales Director, GlobalSales Inc.' },
        { quote: '"Inventory management system reduced stockouts by 80% and improved our supply chain visibility."', name: 'Sarah Johnson', role: 'Operations Manager, RetailChain' },
        { quote: '"HR management system automated our payroll and benefits administration. Saved us 200+ hours monthly."', name: 'David Park', role: 'HR Director, CorpSolutions' },
        { quote: '"Financial dashboard provides real-time insights. Our decision-making improved by 300% with accurate data."', name: 'Jennifer Liu', role: 'CFO, FinanceCorp' },
        { quote: '"Project management tool increased our team\'s collaboration and delivery speed by 200%."', name: 'Tom Anderson', role: 'Project Manager, DevAgency' },
        { quote: '"Document management system with AI search capabilities. Finding documents is now instantaneous."', name: 'Anna Rodriguez', role: 'Legal Counsel, LawFirm Pro' },
        { quote: '"Analytics platform transformed our data into actionable insights. Revenue increased by 180%."', name: 'Lisa Thompson', role: 'Data Director, AnalyticsCo' },
      ],
    }}
    cta={{
      title: 'Ready to Build Your Software?',
      lead: "Let's create custom software that perfectly fits your business needs",
    }}
  />
);

export default SoftwareDevelopmentPage;
