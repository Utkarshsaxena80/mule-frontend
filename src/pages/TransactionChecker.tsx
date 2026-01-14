import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  Check,
  Shield,
  DollarSign,
  User,
  ArrowRight,
} from "lucide-react";

interface FraudCheckResult {
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  riskScore: number;
  signals: string[];
  message: string;
}

export default function TransactionChecker() {
  const [formData, setFormData] = useState({
    amount: "",
    sender: "",
    recipient: "",
  });
  const [result, setResult] = useState<FraudCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - Replace with actual API call later
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock response based on amount (for demonstration)
    const amount = parseFloat(formData.amount);
    const mockResult: FraudCheckResult =
      amount > 5000
        ? {
            riskLevel: "HIGH",
            riskScore: 0.85,
            signals: [
              "High-value transaction detected",
              "New recipient pattern",
              "Rapid fund movement suspected",
              "Geographic anomaly detected",
            ],
            message:
              "This transaction shows multiple red flags. Review carefully before proceeding.",
          }
        : amount > 2000
        ? {
            riskLevel: "MEDIUM",
            riskScore: 0.45,
            signals: [
              "Moderate transaction amount",
              "Limited transaction history with recipient",
            ],
            message: "This transaction requires additional verification.",
          }
        : {
            riskLevel: "LOW",
            riskScore: 0.15,
            signals: [
              "Normal transaction pattern",
              "Known recipient",
              "Transaction amount within limits",
            ],
            message: "This transaction appears safe to proceed.",
          };

    setResult(mockResult);
    setIsLoading(false);
  };

  const isFormValid = formData.amount && formData.sender && formData.recipient;

  const getRiskColor = (level: string) => {
    switch (level) {
      case "HIGH":
        return "text-risk-high";
      case "MEDIUM":
        return "text-risk-medium";
      default:
        return "text-risk-low";
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case "HIGH":
        return "bg-risk-high/10 border-risk-high/30";
      case "MEDIUM":
        return "bg-risk-medium/10 border-risk-medium/30";
      default:
        return "bg-risk-low/10 border-risk-low/30";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "HIGH":
        return <AlertTriangle className="h-5 w-5" />;
      case "MEDIUM":
        return <Shield className="h-5 w-5" />;
      default:
        return <Check className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Header Section */}
        <div className="border-b border-border/50 bg-card/50">
          <div className="container mx-auto px-6 py-6">
            <h1 className="text-2xl font-bold">Transaction Fraud Checker</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Analyze transactions in real-time for potential fraud indicators
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form Card */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
                <CardDescription>
                  Enter the transaction information to check for fraud
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      Transaction Amount
                    </Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="Enter amount (e.g., 1000)"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="font-mono"
                    />
                  </div>

                  {/* Sender */}
                  <div className="space-y-2">
                    <Label htmlFor="sender" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Sender Address
                    </Label>
                    <Input
                      id="sender"
                      name="sender"
                      type="text"
                      placeholder="Enter sender wallet/account address"
                      value={formData.sender}
                      onChange={handleInputChange}
                      required
                      className="font-mono text-sm"
                    />
                  </div>

                  {/* Recipient */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="recipient"
                      className="flex items-center gap-2"
                    >
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      Recipient Address
                    </Label>
                    <Input
                      id="recipient"
                      name="recipient"
                      type="text"
                      placeholder="Enter recipient wallet/account address"
                      value={formData.recipient}
                      onChange={handleInputChange}
                      required
                      className="font-mono text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Shield className="mr-2 h-4 w-4 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Check for Fraud
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Card */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>
                  {result
                    ? "Fraud detection results"
                    : "Submit a transaction to see results"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-6">
                    <div className="text-center py-6">
                      <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-6 w-24 mx-auto" />
                    </div>
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                ) : result ? (
                  <div className="space-y-6 animate-fade-in-up">
                    {/* Risk Score Display */}
                    <div className="text-center py-6">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-secondary"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className={getRiskColor(result.riskLevel)}
                            strokeDasharray={`${
                              result.riskScore * 351.86
                            } 351.86`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div
                              className={`text-2xl font-bold ${getRiskColor(
                                result.riskLevel
                              )}`}
                            >
                              {Math.round(result.riskScore * 100)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Risk Score
                            </div>
                          </div>
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className={`${getRiskBg(
                          result.riskLevel
                        )} ${getRiskColor(
                          result.riskLevel
                        )} border px-4 py-1.5 text-sm font-semibold`}
                      >
                        <span className="flex items-center gap-2">
                          {getRiskIcon(result.riskLevel)}
                          {result.riskLevel} RISK
                        </span>
                      </Badge>
                    </div>

                    {/* Message */}
                    <div
                      className={`p-4 rounded-lg border ${getRiskBg(
                        result.riskLevel
                      )}`}
                    >
                      <p className="text-sm">{result.message}</p>
                    </div>

                    {/* Transaction Summary */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Transaction Summary
                      </h3>
                      <div className="bg-secondary/50 rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-mono font-semibold">
                            ${formData.amount}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Sender:</span>
                          <span className="font-mono text-xs truncate max-w-[200px]">
                            {formData.sender}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">
                            Recipient:
                          </span>
                          <span className="font-mono text-xs truncate max-w-[200px]">
                            {formData.recipient}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Detection Signals */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Detection Signals
                      </h3>
                      <div className="space-y-2">
                        {result.signals.map((signal, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg"
                          >
                            <div
                              className={`mt-0.5 ${getRiskColor(
                                result.riskLevel
                              )}`}
                            >
                              {getRiskIcon(result.riskLevel)}
                            </div>
                            <span className="text-sm flex-1">{signal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Shield className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground text-sm">
                        Enter transaction details and click "Check for Fraud"
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
