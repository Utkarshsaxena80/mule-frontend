import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { TransactionFeed, Transaction } from "@/components/TransactionFeed";
import { RiskPanel } from "@/components/RiskPanel";
import { Button } from "@/components/ui/button";
import { Play, AlertTriangle, Check } from "lucide-react";

const normalSignals = [
  "account_age_verified",
  "consistent_transaction_pattern",
  "known_recipient",
];

const muleSignals = [
  "new_account_high_velocity",
  "network_cluster_match",
  "rapid_fund_movement",
  "dormant_to_active_pattern",
  "geographic_anomaly",
];

const generateTransactionId = () => {
  return `txn_${Math.random().toString(36).substring(2, 10)}`;
};

const senderNames = ["Alice Chen", "Bob Johnson", "Carol Smith", "David Lee", "Emma Davis"];
const recipientNames = ["FastPay Corp", "Secure Transfers", "Quick Send Ltd", "GlobalRemit", "SwiftMoney"];

export default function Demo() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [signals, setSignals] = useState<string[]>([]);

  const simulateNormal = () => {
    const newTransaction: Transaction = {
      id: generateTransactionId(),
      amount: Math.floor(Math.random() * 5000) + 100,
      sender: senderNames[Math.floor(Math.random() * senderNames.length)],
      recipient: recipientNames[Math.floor(Math.random() * recipientNames.length)],
      timestamp: new Date(),
      riskLevel: "LOW",
      riskScore: Math.random() * 0.3,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setSelectedTransaction(newTransaction);
    setSignals(normalSignals.slice(0, Math.floor(Math.random() * 2) + 1));
  };

  const simulateMule = () => {
    const newTransaction: Transaction = {
      id: generateTransactionId(),
      amount: Math.floor(Math.random() * 50000) + 10000,
      sender: `Mule Account ${Math.floor(Math.random() * 1000)}`,
      recipient: `Shell Corp ${Math.floor(Math.random() * 100)}`,
      timestamp: new Date(),
      riskLevel: Math.random()>0.3?"HIGH":"MEDIUM",
      riskScore: Math.random()*0.4+0.6,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setSelectedTransaction(newTransaction);
    setSignals(muleSignals.slice(0, Math.floor(Math.random() * 3) + 2));
  };

  const handleSelectTransaction = (tx: Transaction) => {
    setSelectedTransaction(tx);
    if (tx.riskLevel === "LOW") {
      setSignals(normalSignals.slice(0, Math.floor(Math.random() * 2) + 1));
    } else {
      setSignals(muleSignals.slice(0, Math.floor(Math.random() * 3) + 2));
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Header */}
        <div className="border-b border-border/50 bg-card/50">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Live Demo Dashboard</h1>
                <p className="text-muted-foreground text-sm">
                  Simulate transactions to see real-time fraud detection in action
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="success"
                  size="lg"
                  onClick={simulateNormal}
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  Simulate Normal
                </Button>
                <Button
                  variant="warning"
                  size="lg"
                  onClick={simulateMule}
                  className="gap-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Simulate Mule
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 container mx-auto px-6 py-6">
          <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-220px)]">
            {/* Transaction Feed Panel */}
            <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <TransactionFeed
                transactions={transactions}
                selectedId={selectedTransaction?.id || null}
                onSelect={handleSelectTransaction}
              />
            </div>

            {/* Risk Analysis Panel */}
            <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <RiskPanel transaction={selectedTransaction} signals={signals} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
