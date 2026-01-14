import { ArrowRight, Send, Brain, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Send,
    title: "Send Transaction Events",
    description: "Banks send transaction events via a simple REST API. Each event contains transaction metadata and user behavioral signals.",
    step: "01",
  },
  {
    icon: Brain,
    title: "Real-Time Analysis",
    description: "MuleShield analyzes behavioral patterns, network relationships, and transaction anomalies using advanced ML models in real-time.",
    step: "02",
  },
  {
    icon: ShieldCheck,
    title: "Risk Score & Action",
    description: "A risk score with explainable signals is returned within 50ms, along with recommended actions to block or flag the transaction.",
    step: "03",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple integration, powerful protection. Get fraud detection running in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative"
            >
              <div className="relative p-8 rounded-xl border border-border/50 bg-card hover:bg-surface-elevated transition-all duration-300 h-full hover-lift">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                  <span className="text-xs font-mono font-medium text-primary">{step.step}</span>
                </div>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary mb-6 group-hover:bg-primary/10 transition-colors">
                  <step.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
