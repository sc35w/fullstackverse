import React from 'react';
import { Gamepad2, Trophy, Users, Zap } from 'lucide-react';
import ServicePage from '@/components/site/ServicePage';
import { gameDemos } from '@/lib/demos';

const GameDevelopmentPage = () => (
  <ServicePage
    meta={{
      title: 'Game Development Services - Fullstackverse',
      description:
        'Professional game development services for mobile, web, and PC platforms. Creating engaging, high-performance games with stunning graphics and addictive gameplay.',
    }}
    hero={{
      title: 'Game Development',
      highlight: 'Studio',
      lead: 'Creating immersive gaming experiences that captivate players across all platforms',
      cta: 'Start Your Game Project',
    }}
    features={{
      title: 'Game Development Features',
      lead: 'Cutting-edge technology for modern gaming',
      columns: 4,
      items: [
        { icon: Gamepad2, title: 'Multi-Platform Games', description: 'Develop for mobile, web, PC, and console platforms' },
        { icon: Zap, title: 'High Performance', description: 'Optimized gameplay with smooth 60fps performance' },
        { icon: Users, title: 'Multiplayer Support', description: 'Real-time multiplayer and social gaming features' },
        { icon: Trophy, title: 'Engaging Gameplay', description: 'Addictive mechanics and compelling user experiences' },
      ],
    }}
    portfolio={{
      title: 'Playable Games',
      lead: 'Try our games directly in your browser',
      items: gameDemos,
      shape: 'square',
      fallbackImage: 'https://images.unsplash.com/photo-1549500379-1938ee1fc6a8?auto=format&fit=crop&w=1200&q=80',
    }}
    testimonials={{
      title: 'Game Development Success Stories',
      lead: 'See how our games have achieved massive success and delighted millions of players',
      items: [
        { quote: '"Mobile racing game reached #1 in App Store. Over 2M downloads in first month!"', name: 'Alex Rodriguez', role: 'CEO, SpeedGames Inc.' },
        { quote: '"Educational game for kids with 4.9 stars. Used by 500+ schools worldwide."', name: 'Sarah Johnson', role: 'Founder, EduPlay Studios' },
        { quote: '"Strategy game with 1M+ active players. Monthly revenue of ₹2.5M from in-app purchases."', name: 'Mike Chen', role: 'CEO, StrategyMasters' },
        { quote: '"Card battle game featured in Google Play. 95% positive reviews and growing community."', name: 'Lisa Park', role: 'Founder, CardQuest Games' },
        { quote: '"RPG game with stunning graphics. Reached top 10 grossing games with 5M downloads."', name: 'David Kim', role: 'CEO, EpicQuest Studios' },
        { quote: '"Arcade classic remake with modern twists. Nostalgic gameplay loved by millions."', name: 'Ryan Thompson', role: 'Founder, RetroGames Co.' },
        { quote: '"Multiplayer battle royale game. 3M concurrent players at peak, massive esports potential."', name: 'Jake Wilson', role: 'CEO, BattleArena Games' },
        { quote: '"Puzzle game with brain-training elements. Featured in Apple App Store \'Games of the Year\'."', name: 'Emma Davis', role: 'Founder, BrainGames Lab' },
      ],
    }}
    cta={{
      title: 'Ready to Create Your Game?',
      lead: "Let's build an engaging game that players will love",
    }}
  />
);

export default GameDevelopmentPage;
