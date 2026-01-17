import { Check, Shield, Zap, Eye, Code } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Stops fraud before money leaves the system",
    description: "Real-time detection means you can block suspicious transactions before they complete.",
  },
  {
    icon: Zap,
    title: "Works on user-authorized transactions",
    description: "Detect mule accounts even when transactions appear legitimate and authorized by the user.",
  },
  {
    icon: Eye,
    title: "Explainable risk decisions",
    description: "Every risk score comes with clear, auditable reasons that compliance teams can review.",
  },
  {
    icon: Code,
    title: "Simple API integration",
    description: "Get started with a single REST endpoint. Full integration in hours, not weeks.",
  },
];

export function WhyMuleShieldSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Why <span className="gradient-text">MuleShield.ai</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Traditional fraud detection fails against sophisticated mule networks. 
              MuleShield uses behavioral analysis and network intelligence to catch 
              what rules-based systems miss.
            </p>

            <div className="space-y-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl border border-border/50 bg-card p-8 relative overflow-hidden">
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Code-like visual */}
              <div className="relative space-y-4 font-mono text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-primary">POST</span>
                  <span>/api/v1/analyze</span>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <pre className="text-xs text-muted-foreground overflow-hidden">
{`{
  "transaction_id": "txn_abc123",
  "amount": 15000,
  "sender_id": "usr_sender",
  "recipient_id": "usr_recipient",
  "behavioral_signals": {...}
}`}
                  </pre>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground">Analyzing...</span>
                </div>
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-4 w-4 text-destructive" />
                    <span className="font-semibold text-destructive">HIGH RISK</span>
                  </div>
                  <pre className="text-xs text-muted-foreground overflow-hidden">
{`{
  "risk_score": 0.94,
  "action": "BLOCK",
  "signals": [
    "new_account_high_velocity",
    "network_cluster_match"
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
