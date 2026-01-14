import { AlertTriangle, Check, Clock, Shield, Activity } from "lucide-react";
import { Transaction } from "./TransactionFeed";

interface RiskPanelProps {
  transaction: Transaction | null;
  signals: string[];
}

export function RiskPanel({ transaction, signals }: RiskPanelProps) {
  if (!transaction) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border/50">
          <h2 className="text-lg font-semibold">Risk Analysis</h2>
          <p className="text-sm text-muted-foreground">Select a transaction</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              Select a transaction from the feed to view risk analysis
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getRiskColor = () => {
    switch (transaction.riskLevel) {
      case "HIGH":
        return "text-risk-high";
      case "MEDIUM":
        return "text-risk-medium";
      default:
        return "text-risk-low";
    }
  };

  const getRiskBg = () => {
    switch (transaction.riskLevel) {
      case "HIGH":
        return "bg-risk-high/10 border-risk-high/30";
      case "MEDIUM":
        return "bg-risk-medium/10 border-risk-medium/30";
      default:
        return "bg-risk-low/10 border-risk-low/30";
    }
  };

  const getGaugeRotation = () => {
    // Convert 0-1 to 0-180 degrees
    return transaction.riskScore * 180;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-lg font-semibold">Risk Analysis</h2>
        <p className="text-sm text-muted-foreground font-mono">{transaction.id}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Risk Score Gauge */}
        <div className="text-center py-4">
          <div className="relative w-48 h-24 mx-auto mb-4">
            {/* Gauge background */}
            <div className="absolute inset-0 rounded-t-full border-8 border-secondary overflow-hidden">
              <div 
                className={`absolute inset-0 rounded-t-full origin-bottom transition-transform duration-500 ${
                  transaction.riskLevel === "HIGH" 
                    ? "bg-risk-high/30" 
                    : transaction.riskLevel === "MEDIUM" 
                    ? "bg-risk-medium/30" 
                    : "bg-risk-low/30"
                }`}
                style={{
                  clipPath: `polygon(0 100%, 50% 0, 50% 100%)`,
                  transform: `rotate(${getGaugeRotation()}deg)`,
                }}
              />
            </div>
            {/* Gauge needle */}
            <div 
              className="absolute bottom-0 left-1/2 w-1 h-20 origin-bottom -translate-x-1/2 transition-transform duration-500"
              style={{ transform: `translateX(-50%) rotate(${getGaugeRotation() - 90}deg)` }}
            >
              <div className={`w-full h-full rounded-full ${getRiskColor().replace('text-', 'bg-')}`} />
            </div>
            {/* Center circle */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-card border-4 border-border" />
          </div>
          
          <div className={`text-5xl font-bold font-mono ${getRiskColor()}`}>
            {(transaction.riskScore * 100).toFixed(0)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">Risk Score</p>
        </div>

        {/* Risk Level Badge */}
        <div className={`p-4 rounded-lg border ${getRiskBg()}`}>
          <div className="flex items-center gap-3">
            {transaction.riskLevel === "HIGH" ? (
              <AlertTriangle className="h-6 w-6 text-risk-high" />
            ) : transaction.riskLevel === "MEDIUM" ? (
              <Clock className="h-6 w-6 text-risk-medium" />
            ) : (
              <Check className="h-6 w-6 text-risk-low" />
            )}
            <div>
              <div className={`text-lg font-bold ${getRiskColor()}`}>
                {transaction.riskLevel} RISK
              </div>
              <div className="text-sm text-muted-foreground">
                {transaction.riskLevel === "HIGH"
                  ? "Block recommended"
                  : transaction.riskLevel === "MEDIUM"
                  ? "Review recommended"
                  : "Allow transaction"}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Transaction Details
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-muted-foreground text-xs mb-1">Amount</p>
              <p className="font-mono font-semibold">${transaction.amount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-muted-foreground text-xs mb-1">Time</p>
              <p className="font-mono text-sm">{transaction.timestamp.toLocaleTimeString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 col-span-2">
              <p className="text-muted-foreground text-xs mb-1">Sender</p>
              <p className="font-mono text-sm truncate">{transaction.sender}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 col-span-2">
              <p className="text-muted-foreground text-xs mb-1">Recipient</p>
              <p className="font-mono text-sm truncate">{transaction.recipient}</p>
            </div>
          </div>
        </div>

        {/* Detection Signals */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Detection Signals
          </h3>
          <div className="space-y-2">
            {signals.length > 0 ? (
              signals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 text-sm"
                >
                  <div className={`h-2 w-2 rounded-full ${
                    transaction.riskLevel === "HIGH" 
                      ? "bg-risk-high" 
                      : transaction.riskLevel === "MEDIUM" 
                      ? "bg-risk-medium" 
                      : "bg-risk-low"
                  }`} />
                  <span className="font-mono text-xs">{signal}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm p-3">
                No suspicious signals detected
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
