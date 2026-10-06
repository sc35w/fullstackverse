// src/pages/WebDevelopmentPage.jsx
import React from 'react';
import { Code, Globe, Smartphone, Zap } from 'lucide-react';
import ServicePage from '@/components/site/ServicePage';
import { webDemos } from '@/lib/demos';

const WebDevelopmentPage = () => (
  <ServicePage
    meta={{
      title: 'Web Development Services - Fullstackverse',
      description:
        'Professional web development services including responsive websites, web applications, and e-commerce platforms. Modern, fast, and SEO-optimized solutions.',
    }}
    hero={{
      title: 'Web Development',
      highlight: 'Excellence',
      lead: 'Creating stunning, responsive websites and powerful web applications that drive business growth',
      cta: 'Discuss Your Project',
    }}
    features={{
      title: 'Our Capabilities',
      lead: 'Full-stack development expertise',
      columns: 4,
      items: [
        { icon: Code, title: 'Frontend Development', description: 'React, Vue.js, Angular, and modern JavaScript frameworks' },
        { icon: Globe, title: 'Backend Development', description: 'Node.js, Python, PHP, and scalable server architectures' },
        { icon: Smartphone, title: 'Responsive Design', description: 'Mobile-first approach ensuring perfect display on all devices' },
        { icon: Zap, title: 'Performance Optimization', description: 'Fast loading times and optimized user experiences' },
      ],
    }}
    portfolio={{
      title: 'Our Portfolio',
      lead: '20+ successful web projects delivered',
      items: webDemos,
      shape: 'landscape',
      fallbackImage: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1460&q=80',
    }}
    testimonials={{
      title: 'Web Development Success Stories',
      lead: 'Discover how our websites have transformed businesses and delivered exceptional results',
      items: [
        { quote: '"E-commerce site with 300% increase in conversions. Revenue doubled in 6 months!"', name: 'Sarah Mitchell', role: 'CEO, ShopSmart' },
        { quote: '"Corporate website that improved brand perception and lead generation by 250%."', name: 'Michael Roberts', role: 'Marketing Director, TechCorp' },
        { quote: '"SaaS platform with seamless user experience. Customer retention improved by 180%."', name: 'Jennifer Lee', role: 'Product Manager, CloudTech' },
        { quote: '"Healthcare portal that\'s HIPAA compliant and user-friendly. Patient satisfaction at 98%."', name: 'Dr. Amanda Chen', role: 'Medical Director, HealthFirst' },
        { quote: '"Education platform with interactive learning tools. Student engagement increased by 320%."', name: 'Prof. David Kim', role: 'Dean, Online University' },
        { quote: '"Real estate website with virtual tours. Property inquiries increased by 400%."', name: 'Robert Taylor', role: 'Owner, Prime Properties' },
        { quote: '"News portal with lightning-fast load times. Daily visitors grew from 5K to 50K."', name: 'Lisa Wong', role: 'Editor-in-Chief, DailyNews' },
        { quote: '"Job portal with advanced matching algorithms. Placement rate improved by 250%."', name: 'Tom Anderson', role: 'CEO, CareerConnect' },
      ],
    }}
    cta={{
      title: 'Ready to Build Your Website?',
      lead: "Let's create a stunning web presence for your business",
    }}
  />
);

export default WebDevelopmentPage;
