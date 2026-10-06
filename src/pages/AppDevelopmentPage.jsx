import React from 'react';
import { Gauge, Layers, Server, Smartphone } from 'lucide-react';
import ServicePage from '@/components/site/ServicePage';

const AppDevelopmentPage = () => (
  <ServicePage
    meta={{
      title: 'App Development Services - Fullstackverse',
      description:
        'Professional mobile app development services for iOS and Android. Native and cross-platform apps that are fast, secure and built to grow with your business.',
    }}
    hero={{
      title: 'App Development',
      highlight: 'Excellence',
      lead: 'Building native and cross-platform mobile apps that users love and that drive business growth',
      cta: 'Discuss Your Project',
    }}
    features={{
      title: 'Our Capabilities',
      lead: 'End-to-end mobile app expertise',
      columns: 4,
      items: [
        { icon: Smartphone, title: 'Native iOS & Android', description: 'SwiftUI, Kotlin and platform-native experiences for each app store' },
        { icon: Layers, title: 'Cross-Platform Apps', description: 'React Native, Flutter and Kotlin Multiplatform from a single codebase' },
        { icon: Server, title: 'Backend & APIs', description: 'Secure APIs, real-time data, payments and cloud services powering your app' },
        { icon: Gauge, title: 'Performance Optimization', description: 'Fast launch times, smooth interactions and reliable offline support' },
      ],
    }}
    portfolio={{
      title: 'Our Portfolio',
      lead: 'Mobile apps we have designed',
      projects: [
        'bazaarly-classifieds-marketplace',
        'buildbridge-contractor-network-app',
        'paynest-digital-wallet-app',
        'dashdrop-same-day-courier-app',
        'tradelink-distributor-ordering-app',
        'nestfinder-rental-property-platform',
      ],
    }}
    testimonials={{
      title: 'App Development Success Stories',
      lead: 'See how our mobile apps have transformed businesses and delighted users worldwide',
      items: [
        { quote: '"Our e-commerce app reached 500K downloads in 6 months. The user experience is phenomenal!"', name: 'Alex Chen', role: 'CEO, ShopMobile' },
        { quote: '"Healthcare app with telemedicine features. Patient engagement increased by 400%!"', name: 'Dr. Sarah Kim', role: 'Medical Director, HealthTech' },
        { quote: '"Fitness tracking app with gamification. User retention improved by 250% after launch."', name: 'Mike Johnson', role: 'Founder, FitLife Apps' },
        { quote: '"Corporate communication app for 10K+ employees. Productivity increased by 35%."', name: 'Rachel Wong', role: 'CTO, CorpTech Solutions' },
        { quote: '"Food delivery app with real-time tracking. Order volume increased 300% in first quarter."', name: 'James Liu', role: 'CEO, QuickEats' },
        { quote: '"Educational app for K-12 students. 95% positive reviews and featured in App Store."', name: 'Lisa Thompson', role: 'Founder, EduLearn Mobile' },
        { quote: '"Social networking app for professionals. Community grew to 50K users in 8 months."', name: 'Priya Patel', role: 'CEO, ProConnect' },
        { quote: '"Travel booking app with AI recommendations. Revenue per user increased by 180%."', name: 'Tom Anderson', role: 'Founder, WanderSmart' },
      ],
    }}
    cta={{
      title: 'Ready to Build Your App?',
      lead: "Let's create a mobile app your customers will love",
    }}
  />
);

export default AppDevelopmentPage;
