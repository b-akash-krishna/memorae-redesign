'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Brain, Calendar, MessageSquare, Sparkles, CheckCircle2, Zap, Lock, Globe, ArrowRight, Star, Users, TrendingUp } from 'lucide-react'
import { useRef } from 'react'

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated Background Gradient Mesh */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
      </div>

      {/* Navigation with Glassmorphism */}
      <motion.nav 
        className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Memorae
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-green-400 transition">Features</a>
            <a href="#how" className="hover:text-green-400 transition">How It Works</a>
            <a href="#pricing" className="hover:text-green-400 transition">Pricing</a>
          </div>

          <motion.button 
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          style={{ y, opacity }}
          className="container mx-auto text-center z-10"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm">Trusted by 50,000+ users worldwide</span>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Your AI Brain
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent inline-flex items-center gap-4 justify-center">
                <MessageSquare className="w-16 h-16 md:w-20 md:h-20 inline text-green-400" />
                On WhatsApp
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Never forget anything again. Transform your WhatsApp into an{' '}
            <span className="text-green-400 font-semibold">intelligent personal assistant</span> that remembers, reminds, and organizes your entire life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button 
              className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl shadow-green-500/50 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>

            <motion.button 
              className="px-10 py-5 rounded-full text-lg font-semibold border-2 border-white/30 hover:border-white/50 hover:bg-white/5 transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-sm text-gray-500"
          >
            ✓ No credit card required  •  ✓ 14-day free trial  •  ✓ Cancel anytime
          </motion.p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-20 h-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-10 w-16 h-16"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/10"></div>
        </motion.div>
      </section>

      {/* Stats with Glass Cards */}
      <section className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Users, number: "50K+", label: "Active Users", color: "from-blue-500 to-cyan-500" },
            { icon: TrendingUp, number: "1M+", label: "Tasks Completed", color: "from-purple-500 to-pink-500" },
            { icon: Star, number: "4.9/5", label: "User Rating", color: "from-yellow-500 to-orange-500" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl from-green-500/30 to-emerald-500/30"></div>
              <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid - Enhanced */}
      <section id="features" className="relative z-10 container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to stay organized, accessible right where you chat every day
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              icon: MessageSquare, 
              title: "WhatsApp Native", 
              desc: "Works directly in your WhatsApp. No app downloads, no context switching. Just chat naturally.",
              gradient: "from-green-500 to-emerald-600"
            },
            { 
              icon: Brain, 
              title: "AI-Powered", 
              desc: "Advanced AI understands natural language, voice notes, and learns from your conversations.",
              gradient: "from-purple-500 to-pink-600"
            },
            { 
              icon: Calendar, 
              title: "Calendar Sync", 
              desc: "Seamlessly syncs with Google Calendar, Outlook, and Apple Calendar in real-time.",
              gradient: "from-blue-500 to-cyan-600"
            },
            { 
              icon: Zap, 
              title: "Instant Reminders", 
              desc: "Set reminders in seconds using voice or text. Get notified exactly when you need.",
              gradient: "from-yellow-500 to-orange-600"
            },
            { 
              icon: Lock, 
              title: "Privacy First", 
              desc: "End-to-end encryption. Your data stays private and secure, always on your device.",
              gradient: "from-red-500 to-pink-600"
            },
            { 
              icon: Globe, 
              title: "50+ Languages", 
              desc: "Use Memorae in the language you're most comfortable with. Truly global support.",
              gradient: "from-indigo-500 to-purple-600"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity rounded-3xl blur-xl`}></div>
              <div className="relative h-full bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works - Timeline Style */}
      <section id="how" className="relative z-10 container mx-auto px-6 py-32">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          How It Works
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-16">
          {[
            { 
              step: "01", 
              title: "Add Memorae to WhatsApp", 
              desc: "Simply save our number and send a message. Get started in under 30 seconds.",
              icon: MessageSquare
            },
            { 
              step: "02", 
              title: "Chat Naturally", 
              desc: "Tell Memorae what you need to remember, just like talking to a friend. No commands to learn.",
              icon: Brain
            },
            { 
              step: "03", 
              title: "Let AI Handle the Rest", 
              desc: "Memorae organizes, reminds, and keeps you on track automatically. Focus on what matters.",
              icon: Sparkles
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 blur-xl opacity-50"></div>
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                  <div className="text-6xl font-black text-white/10 mb-2">{item.step}</div>
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA - Bold */}
      <section id="pricing" className="relative z-10 container mx-auto px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="relative px-12 py-20 text-center">
            <motion.h2 
              className="text-5xl md:text-7xl font-black mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Never Forget Again?
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl mb-10 text-green-50 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join 50,000+ users who trust Memorae to keep their lives organized
            </motion.p>
            <motion.button 
              className="bg-black text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-900 transition shadow-2xl inline-flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Start Your Free Trial
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            <p className="mt-6 text-green-100">No credit card required • 14-day free trial</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 py-12 text-center text-gray-500 border-t border-white/10">
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Memorae</span>
          </div>
        </div>
        <p className="text-sm">© 2025 Memorae. Redesigned for Nexora Infotech Hackathon.</p>
        <p className="mt-2 text-sm">Crafted with ❤️ by <span className="text-green-400 font-semibold">B Akash Krishna</span></p>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
