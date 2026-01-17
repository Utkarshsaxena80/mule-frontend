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
  IndianRupee,
  User,
  ArrowRight,
} from "lucide-react";

interface FraudCheckResult {
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  riskScore: number;
  signals: string[];
  message: string;
}

/* INR formatter */
const formatINR = (amount: number | string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount));

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

    await new Promise((resolve) => setTimeout(resolve, 1500));

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
        <div className="border-b border-border/50 bg-card/50">
          <div className="container mx-auto px-6 py-6">
            <h1 className="text-2xl font-bold">Transaction Fraud Checker</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Analyze transactions in real-time for potential fraud indicators
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
                <CardDescription>
                  Enter the transaction information to check for fraud
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      Transaction Amount
                    </Label>
                    <Input
                      name="amount"
                      type="number"
                      placeholder="Enter amount (e.g., 1000)"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Sender Address
                    </Label>
                    <Input
                      name="sender"
                      value={formData.sender}
                      onChange={handleInputChange}
                      required
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      Recipient Address
                    </Label>
                    <Input
                      name="recipient"
                      value={formData.recipient}
                      onChange={handleInputChange}
                      required
                      className="font-mono text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? "Analyzing..." : "Check for Fraud"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>
                  {result ? "Fraud detection results" : "Submit to see results"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-40 w-full" />
                ) : result ? (
                  <div className="space-y-4">
                    <Badge
                      variant="outline"
                      className={`${getRiskBg(
                        result.riskLevel
                      )} ${getRiskColor(result.riskLevel)}`}
                    >
                      {result.riskLevel} RISK
                    </Badge>

                    <div className="bg-secondary/50 rounded-lg p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-mono font-semibold">
                          {formatINR(formData.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sender:</span>
                        <span className="font-mono text-xs truncate max-w-[200px]">
                          {formData.sender}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recipient:</span>
                        <span className="font-mono text-xs truncate max-w-[200px]">
                          {formData.recipient}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm text-center">
                    Enter details to analyze transaction
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
