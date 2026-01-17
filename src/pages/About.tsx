import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Users, Target, Lock } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "Every decision we make prioritizes the security and privacy of financial data.",
  },
  {
    icon: Target,
    title: "Precision Focus",
    description: "We obsess over accuracy—catching fraud while minimizing false positives.",
  },
  {
    icon: Users,
    title: "Customer Partnership",
    description: "We work closely with banks to understand their unique fraud challenges.",
  },
  {
    icon: Lock,
    title: "Trust & Transparency",
    description: "Our risk decisions are explainable and auditable for compliance teams.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Fighting Financial Fraud with{" "}
              <span className="gradient-text">Intelligent Detection</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              MuleShield.ai was founded with a singular mission: to stop money mule 
              fraud before it impacts banks and their customers.
            </p>
          </div>

          {/* Story */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Money mules are the hidden infrastructure of financial crime. 
                    Traditional fraud systems, built around rules and known patterns, 
                    consistently fail to detect these sophisticated networks.
                  </p>
                  <p>
                    MuleShield.ai combines behavioral analysis, network intelligence, 
                    and machine learning to detect mule activity in real-time—before 
                    funds are moved and losses occur.
                  </p>
                  <p>
                    Our team brings together expertise from fintech, machine learning, 
                    and financial compliance to build the fraud detection platform 
                    that modern banks need.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-xl bg-card border border-border/50 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold gradient-text mb-2">99.2%</div>
                    <p className="text-muted-foreground">Detection accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 rounded-xl border border-border/50 bg-card hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12 rounded-xl border border-border/50 bg-card">
            <h2 className="text-2xl font-bold mb-2">Ready to stop mule fraud?</h2>
            <p className="text-muted-foreground mb-6">
              See how MuleShield can protect your institution.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              View Live Demo
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
