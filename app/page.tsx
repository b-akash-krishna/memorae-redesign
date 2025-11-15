'use client'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { Brain, Calendar, MessageSquare, Sparkles, Zap, Lock, Globe, ArrowRight, Star, Users, TrendingUp, Play, X } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

/* ---------- Data (outside component) ---------- */
const features = [
  { icon: MessageSquare, title: "WhatsApp Native", desc: "Works directly in your WhatsApp. No app downloads, no context switching. Just chat naturally.", gradient: "from-green-500 to-emerald-600", color: "#10b981" },
  { icon: Brain, title: "AI-Powered", desc: "Advanced AI understands natural language, voice notes, and learns from your conversations.", gradient: "from-purple-500 to-pink-600", color: "#a855f7" },
  { icon: Calendar, title: "Calendar Sync", desc: "Seamlessly syncs with Google Calendar, Outlook, and Apple Calendar in real-time.", gradient: "from-blue-500 to-cyan-600", color: "#3b82f6" },
  { icon: Zap, title: "Instant Reminders", desc: "Set reminders in seconds using voice or text. Get notified exactly when you need.", gradient: "from-yellow-500 to-orange-600", color: "#eab308" },
  { icon: Lock, title: "Privacy First", desc: "End-to-end encryption. Your data stays private and secure, always on your device.", gradient: "from-red-500 to-pink-600", color: "#ef4444" },
  { icon: Globe, title: "50+ Languages", desc: "Use Memorae in the language you're most comfortable with. Truly global support.", gradient: "from-indigo-500 to-purple-600", color: "#6366f1" }
]

const stats = [
  { icon: Users, number: "50K+", label: "Active Users", color: "from-blue-500 to-cyan-500" },
  { icon: TrendingUp, number: "1M+", label: "Tasks Completed", color: "from-purple-500 to-pink-500" },
  { icon: Star, number: "4.9/5", label: "User Rating", color: "from-yellow-500 to-orange-500" }
]

const howItWorks = [
  { step: "01", title: "Add Memorae to WhatsApp", desc: "Simply save our number and send a message. Get started in under 30 seconds.", icon: MessageSquare },
  { step: "02", title: "Chat Naturally", desc: "Tell Memorae what you need to remember, just like talking to a friend. No commands to learn.", icon: Brain },
  { step: "03", title: "Let AI Handle the Rest", desc: "Memorae organizes, reminds, and keeps you on track automatically. Focus on what matters.", icon: Sparkles }
]

const faqs = [
  { q: "How does Memorae work?", a: "Simply add our WhatsApp number and start chatting. Our AI understands your messages and helps you organize, remember, and get reminders." },
  { q: "Is my data secure?", a: "Absolutely! We use end-to-end encryption and never store your data on our servers. Your privacy is our top priority." },
  { q: "Can I try it for free?", a: "Yes! We offer a 14-day free trial with no credit card required. Experience all features risk-free." },
  { q: "What languages are supported?", a: "Memorae supports 50+ languages including English, Spanish, French, German, Hindi, and many more!" }
]

/* ---------- WA link configurable via env, fallback to placeholder ---------- */
const WA_NUMBER = process?.env?.NEXT_PUBLIC_WA_NUMBER ?? '1234567890'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hi%20Memorae`

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const [showVideo, setShowVideo] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const prefersReducedMotionHook = useReducedMotion()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(prefersReducedMotionHook)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const rawMouseX = useMotionValue(0)
  const rawMouseY = useMotionValue(0)
  const mouseX = useSpring(rawMouseX, { stiffness: 300, damping: 30 })
  const mouseY = useSpring(rawMouseY, { stiffness: 300, damping: 30 })

  /* ---------- prefers reduced motion detection with fallback ---------- */
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(!!mq?.matches)
    if (!mq) return
    update()
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', update)
    else if (typeof mq.addListener === 'function') mq.addListener(update)
    return () => {
      try {
        if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', update)
        else if (typeof mq.removeListener === 'function') mq.removeListener(update)
      } catch {}
    }
  }, [])

  /* ---------- mobile detection ---------- */
  useEffect(() => {
    setIsMobile(/Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent))
  }, [])

  /* ---------- mouse tracking with rAF batching for performance ---------- */
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return
    let rafId = 0
    const handler = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        rawMouseX.set(e.clientX)
        rawMouseY.set(e.clientY)
      })
    }
    window.addEventListener('mousemove', handler)
    return () => {
      window.removeEventListener('mousemove', handler)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isMobile, prefersReducedMotion, rawMouseX, rawMouseY])

  /* ---------- auto-rotate features, but pause when tab hidden ---------- */
  useEffect(() => {
    if (prefersReducedMotion) return
    let interval: number | undefined
    const start = () => {
      interval = window.setInterval(() => {
        setActiveFeature(prev => (prev + 1) % features.length)
      }, 3000)
    }
    const stop = () => {
      if (interval) { clearInterval(interval); interval = undefined }
    }
    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }
    start()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [prefersReducedMotion])

  /* ---------- focus management for modal ---------- */
  useEffect(() => {
    if (!showVideo) return
    const prev = document.activeElement as HTMLElement | null
    setTimeout(() => closeButtonRef.current?.focus(), 0)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowVideo(false) }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      try { prev?.focus() } catch {}
    }
  }, [showVideo])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const reducedMotion = prefersReducedMotion || prefersReducedMotionHook

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Cursor trail only on desktop & when motion allowed */}
      {!isMobile && !reducedMotion && (
        <>
          <motion.div
            className="hidden md:block fixed w-6 h-6 rounded-full bg-green-500 pointer-events-none z-50 mix-blend-screen"
            style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
          />
          <motion.div
            className="hidden md:block fixed w-12 h-12 rounded-full border-2 border-green-500/50 pointer-events-none z-50"
            style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </>
      )}

      {/* Background blobs */}
      <div className="fixed inset-0 z-0" aria-hidden>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
      </div>

      {/* Nav */}
      <motion.nav aria-label="Main navigation" className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, type: "spring" }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div className="flex items-center gap-2" whileHover={!reducedMotion ? { scale: 1.05 } : {}} whileTap={{ scale: 0.95 }}>
            <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg"><Brain className="w-6 h-6 text-white" /></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Memorae</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            {[
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQs', href: '#faqs' }
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative hover:text-green-400 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                whileHover={!reducedMotion ? { scale: 1.1 } : {}}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >{item.label}</motion.a>
            ))}
          </div>

          <motion.button type="button" className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold overflow-hidden group focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black" whileHover={!reducedMotion ? { scale: 1.05 } : {}} whileTap={{ scale: 0.95 }}>
            <span className="relative z-10">Get Started Free</span>
          </motion.button>
        </div>
      </motion.nav>

      <main id="main">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
          <motion.div style={!reducedMotion ? { y, opacity } : {}} className="container mx-auto text-center z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-sm">Trusted by 50,000+ users worldwide</span><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">Your AI Brain</span>
                <span className="flex items-center justify-center gap-2 sm:gap-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-green-400" /> On WhatsApp
                </span>
              </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Never forget anything again. Transform your WhatsApp into an <span className="text-green-400 font-semibold">intelligent personal assistant</span> that remembers, reminds, and organizes your entire life.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold overflow-hidden focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black" whileHover={!reducedMotion ? { scale: 1.05 } : {}} whileTap={{ scale: 0.95 }}>
                <span className="relative z-10 flex items-center gap-2">Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              </motion.a>

              <motion.button type="button" onClick={() => setShowVideo(true)} aria-haspopup="dialog" aria-label="Watch demo video" className="group px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold border-2 border-white/30 hover:border-green-400 hover:bg-white/5 transition-all backdrop-blur-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black" whileHover={!reducedMotion ? { scale: 1.05 } : {}} whileTap={{ scale: 0.95 }}>
                <Play className="w-5 h-5 fill-current" /> Watch Demo
              </motion.button>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 text-sm text-gray-500">✓ No credit card required  •  ✓ 14-day free trial  •  ✓ Cancel anytime</motion.p>
          </motion.div>

          {/* Floating elements */}
          {!isMobile && !reducedMotion && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div key={i} className="hidden lg:block absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/10" style={{ top: `${20 + i * 15}%`, left: i % 2 === 0 ? '10%' : '85%' }} animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }} transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }} />
              ))}
            </>
          )}
        </section>

        {/* Stats */}
        <section className="relative z-10 container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }} whileHover={!reducedMotion ? { y: -10, scale: 1.03 } : {}} className="relative group">
                <div className="relative bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 text-center">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}><stat.icon className="w-6 h-6 text-white" /></div>
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm sm:text-base">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="relative z-10 container mx-auto px-6 py-20 sm:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Powerful Features</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">Everything you need to stay organized, accessible right where you chat every day</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }} whileHover={!reducedMotion ? { y: -10, scale: 1.02 } : {}} onMouseEnter={() => !reducedMotion && setActiveFeature(i)} className="group relative cursor-pointer">
                <div className="relative h-full bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}><feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" /></div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature detail panel */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="p-6 rounded-2xl bg-white/6 border border-white/10">
              <div className="flex items-start gap-4">
                {(() => {
                  const ActiveIcon = features[activeFeature]?.icon ?? MessageSquare
                  return (
                    <div className="p-3 rounded-lg flex items-center justify-center" style={{ background: features[activeFeature]?.color ?? '#10b981', minWidth: 56, minHeight: 56 }} aria-hidden="true">
                      <ActiveIcon className="w-6 h-6 text-white" />
                    </div>
                  )
                })()}
                <div>
                  <div className="text-lg font-bold">{features[activeFeature]?.title}</div>
                  <div className="text-sm text-gray-300 mt-1">{features[activeFeature]?.desc}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="relative z-10 container mx-auto px-6 py-20 sm:py-32">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-12 sm:mb-20 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            How It Works
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
            {howItWorks.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
                <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 blur-xl opacity-50"></div>
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                        <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10">
                    <div className="text-5xl sm:text-6xl font-black text-white/10 mb-2">{item.step}</div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-base sm:text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="pricing" className="relative z-10 container mx-auto px-6 py-20 sm:py-32">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
            
            <div className="relative px-6 sm:px-12 py-16 sm:py-20 text-center">
              <motion.h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                Ready to Never Forget Again?
              </motion.h2>
              <motion.p className="text-lg sm:text-xl md:text-2xl mb-10 text-green-50 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                Join 50,000+ users who trust Memorae to keep their lives organized
              </motion.p>
              <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-black text-white px-10 sm:px-12 py-5 sm:py-6 rounded-full text-lg sm:text-xl font-bold hover:bg-gray-900 transition shadow-2xl group focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-green-500" whileHover={!reducedMotion ? { scale: 1.05 } : {}} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                Start Your Free Trial
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.a>
              <p className="mt-6 text-green-100 text-sm">No credit card required • 14-day free trial</p>
            </div>
          </motion.div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="relative z-10 container mx-auto px-6 py-20 sm:py-32">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-12 sm:mb-20 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.details key={i} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                <summary className="cursor-pointer p-4 sm:p-6 text-base sm:text-lg font-semibold hover:bg-white/5 transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-inset" aria-expanded={undefined}>
                  <span>{faq.q}</span>
                  <ArrowRight className="w-5 h-5 text-green-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-gray-400">{faq.a}</div>
              </motion.details>
            ))}
          </div>
        </section>
      </main>

      {/* Video modal */}
      {showVideo && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="video-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6" onClick={() => setShowVideo(false)}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative max-w-4xl w-full aspect-video bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <h2 id="video-title" className="sr-only">Memorae Demo Video</h2>
            <button ref={closeButtonRef} type="button" onClick={() => setShowVideo(false)} aria-label="Close video" className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-green-400">
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" className="w-full h-full" allow="autoplay; encrypted-media" title="Memorae product demo" loading="lazy" />
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="container mx-auto px-6 py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg"><Brain className="w-5 h-5 text-white" /></div>
                <span className="text-xl font-bold text-white">Memorae</span>
              </div>
              <p className="text-gray-400 text-sm">Your AI-powered memory assistant on WhatsApp</p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-green-400 transition focus:outline-none focus:text-green-400">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-green-400 transition focus:outline-none focus:text-green-400">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-green-400 transition focus:outline-none focus:text-green-400">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition focus:outline-none focus:text-green-400">About Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition focus:outline-none focus:text-green-400">Blog</a></li>
                <li><a href="#" className="hover:text-green-400 transition focus:outline-none focus:text-green-400">Careers</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition focus:outline-none focus:text-green-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition focus:outline-none focus:text-green-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-400 transition focus:outline-none focus:text-green-400">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">© 2025 Memorae. Redesigned for Nexora Infotech Hackathon.</p>
            <p className="text-sm text-gray-400">Crafted with ❤️ by <span className="text-green-400 font-semibold">B Akash Krishna</span></p>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <motion.button type="button" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} whileHover={!reducedMotion ? { scale: 1.1 } : {}} whileTap={{ scale: 0.9 }} onClick={scrollToTop} aria-label="Scroll to top" className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 p-3 sm:p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400">
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-[-90deg]" />
      </motion.button>

      {/* CSS */}
      <style jsx>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(30px,-50px) scale(1.1);}66%{transform:translate(-20px,20px) scale(0.9);} }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-blob { animation: none !important; }
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
        ::-webkit-scrollbar{ width: 10px; }
        ::-webkit-scrollbar-track{ background: rgba(0,0,0,0.5); }
        ::-webkit-scrollbar-thumb{ background: linear-gradient(to bottom,#10b981,#059669); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover{ background: linear-gradient(to bottom,#059669,#047857); }
        *:focus-visible{ outline: 2px solid #10b981; outline-offset: 2px; }
        .sr-only{ position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0; }
      `}</style>
    </div>
  )
}
