import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              MuleShield<span className="text-primary">.ai</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Real-time money mule detection. Stop fraud before it happens.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-4">
            © {new Date().getFullYear()} MuleShield.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
