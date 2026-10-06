import React from 'react';
import { Bot, Brain, Cpu, Target, Zap } from 'lucide-react';
import ServicePage from '@/components/site/ServicePage';

const AIServicesPage = () => (
  <ServicePage
    meta={{
      title: 'AI Development Services - Fullstackverse',
      description:
        'Professional AI and machine learning development services. Custom AI solutions, chatbots, computer vision, and intelligent automation for your business.',
    }}
    hero={{
      title: 'AI Development',
      highlight: 'Services',
      lead: 'Harness the power of artificial intelligence to transform your business with Claude Sonnet 4.5 enablement, custom agentic workflows, and production-ready delivery playbooks.',
      note: 'Claude Sonnet 4.5 is now enabled for every Fullstackverse client environment.',
      cta: 'Explore AI Solutions',
    }}
    features={{
      title: 'AI Services',
      lead: 'Comprehensive artificial intelligence solutions',
      items: [
        { icon: Brain, title: 'Machine Learning Models', description: 'Custom ML models for prediction, classification, and data analysis' },
        { icon: Bot, title: 'AI Chatbots', description: 'Intelligent conversational AI for customer service and support' },
        { icon: Cpu, title: 'Computer Vision', description: 'Image recognition, object detection, and visual AI solutions' },
        { icon: Target, title: 'Predictive Analytics', description: 'Data-driven insights and forecasting for business decisions' },
        { icon: Zap, title: 'Process Automation', description: 'AI-powered workflow automation and intelligent task management' },
        { icon: Brain, title: 'Natural Language Processing', description: 'Text analysis, sentiment analysis, and language understanding' },
      ],
    }}
    portfolio={{
      title: 'AI Solutions Portfolio',
      lead: 'AI products we have designed',
      projects: [
        'vigilo-ai-safety-monitoring',
        'framewise-video-annotation-platform',
        'respira-ai-respiratory-screening',
      ],
    }}
    stats={[
      { value: '100+', label: 'AI Models Deployed' },
      { value: '95%', label: 'Accuracy Rate' },
      { value: '50+', label: 'AI Projects' },
      { value: '24/7', label: 'AI Support' },
    ]}
    testimonials={{
      title: 'AI Success Stories',
      lead: 'Discover how our AI solutions have revolutionized businesses across industries',
      items: [
        { quote: '"AI chatbot reduced customer service costs by 60% while improving response quality significantly."', name: 'Rachel Green', role: 'CTO, ServiceCorp' },
        { quote: '"Predictive analytics increased our sales forecasting accuracy from 75% to 94%. Game-changer!"', name: 'Marcus Johnson', role: 'VP Sales, RetailMax' },
        { quote: '"Computer vision system automated quality control, reducing defects by 85% in manufacturing."', name: 'Sarah Chen', role: 'Operations Director, ManuTech' },
        { quote: '"NLP-powered content analysis helped us understand customer sentiment 10x better than before."', name: 'David Park', role: 'Head of Analytics, BrandCo' },
        { quote: '"Fraud detection AI saved us ₹50M in prevented fraudulent transactions. ROI in first month!"', name: 'Jennifer Liu', role: 'CFO, FinSecure Bank' },
        { quote: '"Automated document processing reduced manual work by 80%. Team can focus on strategic tasks."', name: 'Tom Anderson', role: 'Operations Manager, DocuFlow' },
        { quote: '"Recommendation engine increased user engagement by 250%. Users love personalized experiences."', name: 'Anna Rodriguez', role: 'Product Manager, StreamApp' },
        { quote: '"Voice AI assistant handles 70% of customer inquiries 24/7. Customer satisfaction at 98%."', name: 'Lisa Thompson', role: 'Customer Success Lead, VoiceTech' },
      ],
    }}
    cta={{
      title: 'Ready to Implement AI?',
      lead: 'Transform your business with intelligent AI solutions tailored to your needs',
    }}
  />
);

export default AIServicesPage;
