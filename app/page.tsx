'use client'
import { motion } from 'framer-motion'
import { Brain, Calendar, MessageSquare, Sparkles, CheckCircle2, Zap, Lock, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center backdrop-blur-sm bg-white/5">
        <motion.h1 
          className="text-2xl font-bold flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Brain className="text-green-400" />
          Memorae
        </motion.h1>
        <motion.button 
          className="bg-white text-purple-900 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition transform hover:scale-105"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Free
        </motion.button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your AI Memory on<br />
            <span className="text-green-400 inline-flex items-center gap-3">
              <MessageSquare className="inline w-12 h-12 md:w-16 md:h-16" />
              WhatsApp
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Never forget anything again. Memorae transforms your WhatsApp into an intelligent personal assistant that remembers, reminds, and organizes your entire life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button 
              className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition shadow-lg shadow-green-500/50"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free 14-Day Trial
            </motion.button>
            <motion.button 
              className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </div>
          
          <p className="mt-6 text-sm text-gray-400">No credit card required • Cancel anytime</p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { number: "50K+", label: "Active Users" },
            { number: "1M+", label: "Reminders Set" },
            { number: "99.9%", label: "Uptime" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-400">{stat.number}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Powerful Features, Zero Learning Curve
        </motion.h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Everything you need to stay organized, right where you chat every day
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: MessageSquare, 
              title: "WhatsApp Native", 
              desc: "Works directly in your WhatsApp. No app downloads, no switching. Just chat naturally.",
              color: "green"
            },
            { 
              icon: Brain, 
              title: "AI-Powered Intelligence", 
              desc: "Advanced AI understands natural language, voice notes, and context from your conversations.",
              color: "purple"
            },
            { 
              icon: Calendar, 
              title: "Calendar Sync", 
              desc: "Seamlessly syncs with Google Calendar, Outlook, and Apple Calendar in real-time.",
              color: "blue"
            },
            { 
              icon: Zap, 
              title: "Instant Reminders", 
              desc: "Set reminders in seconds using voice or text. Get notified exactly when you need to.",
              color: "yellow"
            },
            { 
              icon: Lock, 
              title: "Privacy First", 
              desc: "End-to-end encryption. Your data stays private and secure, always.",
              color: "red"
            },
            { 
              icon: Globe, 
              title: "Multi-Language", 
              desc: "Supports 50+ languages. Use Memorae in the language you're most comfortable with.",
              color: "indigo"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/15 transition border border-white/10"
            >
              <feature.icon className={`w-12 h-12 mb-4 text-${feature.color}-400`} />
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">How It Works</h2>
        <div className="max-w-4xl mx-auto space-y-12">
          {[
            { step: "01", title: "Add Memorae to WhatsApp", desc: "Simply save our number and start chatting" },
            { step: "02", title: "Chat Naturally", desc: "Tell Memorae what you need to remember, just like talking to a friend" },
            { step: "03", title: "Let AI Handle the Rest", desc: "Memorae organizes, reminds, and keeps you on track automatically" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="text-6xl font-bold text-white/10">{item.step}</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div 
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-center shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Never Forget Again?</h2>
          <p className="text-xl mb-8 text-green-100">Join 50,000+ users who trust Memorae every day</p>
          <motion.button 
            className="bg-white text-green-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center text-gray-400 border-t border-white/10">
        <p>© 2025 Memorae. Redesigned for Nexora Infotech Hackathon.</p>
        <p className="mt-2 text-sm">Created by Akash Krishna</p>
      </footer>
    </div>
  )
}
