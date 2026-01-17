import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Activity, Server, BrainCircuit, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, easeInOut } from "framer-motion";
import { useRef } from "react";

// --- ANIMATION VARIANTS ---

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: easeInOut } 
  }
};

const pulseGlow = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 4, repeat: Infinity, ease: easeInOut }
  }
};

const float = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 5, repeat: Infinity, ease: easeInOut }
  }
};

// --- HERO SECTION ---

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* 1. Animated Scanning Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[200%]"
          animate={{ y: ["-50%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* 2. Fluid Background Orbs */}
      <motion.div variants={pulseGlow} animate="animate" className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <motion.div variants={pulseGlow} animate="animate" transition={{ delay: 2 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* Badge with Shimmer */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/50 mb-8 relative overflow-hidden group">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%]"
              animate={{ translateX: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
            />
            <Activity className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground relative z-10">Real-time behavioral fraud detection</span>
          </motion.div>

          {/* Headline with Animated Gradient */}
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Real-Time Money Mule{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient">
              Detection for Banks
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Detect and prevent money mule fraud in real-time using advanced behavioral 
            analysis and network pattern recognition.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo">
              <Button variant="hero" size="xl" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <Shield className="h-5 w-5" /> View Live Demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="heroOutline" size="xl">How It Works</Button>
            </a>
          </motion.div>

          {/* Floating Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-border/50">
            {[
              { val: "<50ms", label: "Response Time" },
              { val: "99.2%", label: "Detection Rate" },
              { val: "0.1%", label: "False Positives" }
            ].map((stat, i) => (
              <motion.div key={i} variants={float} animate="animate" custom={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.val}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --- HOW IT WORKS SECTION (FLUID ANIMATIONS) ---

export function HowItWorks() {
  const containerRef = useRef(null);
  
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-black/40" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <p className="text-muted-foreground">End-to-end protection in three seamless steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Animated Connecting Beam (Visible only on Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border/30 -z-10">
            <motion.div 
              className="h-full bg-gradient-to-r from-transparent via-primary to-transparent w-1/3"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Step 1 */}
          <FeatureCard 
            icon={Server}
            step="01"
            title="Ingest Data"
            desc="We ingest transaction logs, device fingerprints, and behavioral biometrics in real-time."
            delay={0}
          />

          {/* Step 2 */}
          <FeatureCard 
            icon={BrainCircuit}
            step="02"
            title="AI Analysis"
            desc="Our neural network maps relationships to identify mule accounts and anomalies instantly."
            delay={0.2}
            isCenter={true}
          />

          {/* Step 3 */}
          <FeatureCard 
            icon={Lock}
            step="03"
            title="Block Fraud"
            desc="Automated signals trigger blocks or 2FA challenges before funds leave the bank."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

// --- HELPER COMPONENT FOR CARDS ---

function FeatureCard({ icon: Icon, step, title, desc, delay, isCenter = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm group overflow-hidden ${isCenter ? 'border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.1)]' : ''}`}
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating Icon */}
      <div className="mb-6 relative">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        {/* Connecting Dot Animation */}
        <motion.div 
          className="absolute -right-4 top-1/2 w-8 h-[1px] bg-primary/50 md:hidden"
        />
      </div>

      <div className="relative z-10">
        <div className="text-xs font-mono text-primary mb-2 opacity-70">STEP {step}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Animated Border Gradient on Hover */}
      <motion.div 
        className="absolute inset-0 border-2 border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100"
        layoutId="hover-border"
      />
    </motion.div>
  );
}