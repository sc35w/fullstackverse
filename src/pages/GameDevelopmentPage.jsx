import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, Users, Trophy, ArrowRight, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import { gameDemos } from '@/lib/demos';

const GameDevelopmentPage = () => {
  const demos = gameDemos;

  const features = [
    {
      icon: Gamepad2,
      title: 'Multi-Platform Games',
      description: 'Develop for mobile, web, PC, and console platforms'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized gameplay with smooth 60fps performance'
    },
    {
      icon: Users,
      title: 'Multiplayer Support',
      description: 'Real-time multiplayer and social gaming features'
    },
    {
      icon: Trophy,
      title: 'Engaging Gameplay',
      description: 'Addictive mechanics and compelling user experiences'
    },
  ];

  return (
    <>
      <Helmet>
        <title>Game Development Services - Fullstackverse</title>
        <meta name="description" content="Professional game development services for mobile, web, and PC platforms. Creating engaging, high-performance games with stunning graphics and addictive gameplay." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">
              Game Development
              <span className="text-gradient">Studio</span>
            </h1>
            <p className="hero-sub">
              Creating immersive gaming experiences that captivate players across all platforms
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn btn-primary">
                  Start Your Game Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ContactForm />
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
        <div className="right">
          {/* Creative Dashboard View */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-lg w-full">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                      <Gamepad2 className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold truncate">Game Analytics</h3>
                      <p className="text-indigo-100 text-sm truncate">Live player metrics</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm">Live</span>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Players Card */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-indigo-600 text-xs font-medium">Active Players</div>
                      <Users className="h-3 w-3 text-indigo-600" />
                    </div>
                    <div className="text-lg font-bold text-indigo-900">12.5K</div>
                    <div className="text-indigo-600 text-xs">+15% today</div>
                  </div>

                  {/* Revenue Card */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-emerald-600 text-xs font-medium">Revenue</div>
                      <Trophy className="h-3 w-3 text-emerald-600" />
                    </div>
                    <div className="text-lg font-bold text-emerald-900">₹850K</div>
                    <div className="text-emerald-600 text-xs">+22% this month</div>
                  </div>
                </div>

                {/* Performance Bars */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Avg. Session</span>
                      <span className="text-gray-900 font-medium">24min</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Retention Rate</span>
                      <span className="text-gray-900 font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="border-t border-gray-200 pt-3">
                  <h4 className="text-gray-900 font-semibold text-sm mb-2">Recent Activity</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">New high score: 2.1M</span>
                      <span className="text-gray-400 ml-auto">3m ago</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      <span className="text-gray-600">Level 50 unlocked</span>
                      <span className="text-gray-400 ml-auto">8m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Game Development Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our games have achieved massive success and delighted millions of players
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
                "Mobile racing game reached #1 in App Store. Over 2M downloads in first month!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Alex Rodriguez</div>
                  <div className="text-gray-500 text-xs">CEO, SpeedGames Inc.</div>
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
                "Educational game for kids with 4.9 stars. Used by 500+ schools worldwide."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Sarah Johnson</div>
                  <div className="text-gray-500 text-xs">Founder, EduPlay Studios</div>
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
                "Strategy game with 1M+ active players. Monthly revenue of ₹2.5M from in-app purchases."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                  M
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Mike Chen</div>
                  <div className="text-gray-500 text-xs">CEO, StrategyMasters</div>
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
                "Card battle game featured in Google Play. 95% positive reviews and growing community."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  L
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Lisa Park</div>
                  <div className="text-gray-500 text-xs">Founder, CardQuest Games</div>
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
                "RPG game with stunning graphics. Reached top 10 grossing games with 5M downloads."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  D
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">David Kim</div>
                  <div className="text-gray-500 text-xs">CEO, EpicQuest Studios</div>
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
                "Arcade classic remake with modern twists. Nostalgic gameplay loved by millions."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Ryan Thompson</div>
                  <div className="text-gray-500 text-xs">Founder, RetroGames Co.</div>
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
                "Multiplayer battle royale game. 3M concurrent players at peak, massive esports potential."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  J
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Jake Wilson</div>
                  <div className="text-gray-500 text-xs">CEO, BattleArena Games</div>
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
                "Puzzle game with brain-training elements. Featured in Apple App Store 'Games of the Year'."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  E
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Emma Davis</div>
                  <div className="text-gray-500 text-xs">Founder, BrainGames Lab</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Game Development Features</h2>
            <p className="text-xl text-gray-600">Cutting-edge technology for modern gaming</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Playable Games</h2>
            <p className="text-xl text-gray-600">Try our games directly in your browser</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demos.map((game, index) => (
              <motion.div
                key={game.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                onClick={() => game.url && window.open(game.url, '_blank')}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center relative">
                    <img
                      className="w-full h-full object-cover"
                      alt={game.media?.alt || `${game.title} screenshot`}
                      src={game.media?.src || 'https://images.unsplash.com/photo-1549500379-1938ee1fc6a8?auto=format&fit=crop&w=1200&q=80'}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <Play className="h-16 w-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{game.title}</h3>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{game.genre}</span>
                      <span>{game.platform}</span>
                    </div>
                    {game.description && (
                      <p className="mt-2 text-sm text-gray-600">{game.description}</p>
                    )}
                    {game.badges?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {game.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700"
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
      <section className="py-20 bg-gray-50">
        <div className="container text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Create Your Game?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's build an engaging game that players will love
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn btn-ghost">
                  Discuss Your Business Requirement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
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

export default GameDevelopmentPage;