import { AlertTriangle, Check, Clock } from "lucide-react";

export interface Transaction {
  id: string;
  amount: number;
  sender: string;
  recipient: string;
  timestamp: Date;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  riskScore: number;
}

interface TransactionFeedProps {
  transactions: Transaction[];
  selectedId: string | null;
  onSelect: (transaction: Transaction) => void;
}

export function TransactionFeed({ transactions, selectedId, onSelect }: TransactionFeedProps) {
  const getRiskStyles = (level: string) => {
    switch (level) {
      case "HIGH":
        return "border-l-risk-high bg-risk-high/5";
      case "MEDIUM":
        return "border-l-risk-medium bg-risk-medium/5";
      default:
        return "border-l-risk-low bg-risk-low/5";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "HIGH":
        return <AlertTriangle className="h-4 w-4 text-risk-high" />;
      case "MEDIUM":
        return <Clock className="h-4 w-4 text-risk-medium" />;
      default:
        return <Check className="h-4 w-4 text-risk-low" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-lg font-semibold">Live Transaction Feed</h2>
        <p className="text-sm text-muted-foreground">Real-time monitoring</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p className="text-sm">No transactions yet.</p>
            <p className="text-xs mt-1">Simulate a transaction to begin.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {transactions.map((tx) => (
              <button
                key={tx.id}
                onClick={() => onSelect(tx)}
                className={`w-full text-left p-4 border-l-4 transition-all duration-200 hover:bg-secondary/30 ${getRiskStyles(tx.riskLevel)} ${
                  selectedId === tx.id ? "bg-secondary/50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getRiskIcon(tx.riskLevel)}
                      <span className="font-mono text-sm font-medium truncate">
                        {tx.id}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p className="truncate">{tx.sender} → {tx.recipient}</p>
                      <p>{tx.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono font-semibold">
                      ₹{tx.amount.toLocaleString()}
                    </div>
                    <div className={`text-xs font-medium ${
                      tx.riskLevel === "HIGH" 
                        ? "text-risk-high" 
                        : tx.riskLevel === "MEDIUM" 
                        ? "text-risk-medium" 
                        : "text-risk-low"
                    }`}>
                      {tx.riskLevel}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
