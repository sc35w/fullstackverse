// Lazy loaders for the interactive portfolio dashboards, keyed by project slug.
// Each dashboard (and its sample-data JSON) is a separate chunk, loaded only
// when its project page is opened.
import { lazy } from 'react';

const modules = import.meta.glob('./*Dashboard.jsx');

const SLUG_TO_FILE = {
  'sparesphere-industrial-parts-marketplace': 'SpareSphere',
  'vigilo-ai-safety-monitoring': 'Vigilo',
  'framewise-video-annotation-platform': 'Framewise',
  'respira-ai-respiratory-screening': 'Respira',
  'gridmind-energy-automation-website': 'GridMind',
  'bazaarly-classifieds-marketplace': 'Bazaarly',
  'buildbridge-contractor-network-app': 'BuildBridge',
  'casaloom-home-decor-store': 'Casaloom',
  'pipetrack-sales-activity-tracker': 'PipeTrack',
  'kalaghar-artisan-jewellery-store': 'Kalaghar',
  'paynest-digital-wallet-app': 'PayNest',
  'gatepass-visitor-management': 'GatePass',
  'dashdrop-same-day-courier-app': 'DashDrop',
  'fieldpro-service-operations': 'FieldPro',
  'tradelink-distributor-ordering-app': 'TradeLink',
  'nestfinder-rental-property-platform': 'NestFinder',
  'campusly-school-erp': 'Campusly',
  'portlane-freight-forwarding-website': 'PortLane',
  'floodwatch-rainfall-monitoring-dashboard': 'FloodWatch',
  'atelier-nine-interior-studio-website': 'AtelierNine',
  'mindmove-fitness-mindfulness-app': 'MindMove',
  'rangoli-rush-puzzle-game': 'RangoliRush',
  'gully-strikers-cricket-game': 'GullyStrikers',
  'lexiquest-learning-game': 'LexiQuest',
};

const cache = {};

export function getDashboard(slug) {
  const name = SLUG_TO_FILE[slug];
  const loader = name && modules[`./${name}Dashboard.jsx`];
  if (!loader) return null;
  if (!cache[slug]) cache[slug] = lazy(loader);
  return cache[slug];
}
