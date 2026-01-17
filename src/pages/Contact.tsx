import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MapPin, Phone, Building2, FileText, Copy, Check, Code } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBankRegistering, setIsBankRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredBankName, setRegisteredBankName] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const handleBankRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bankName = formData.get("bankName") as string;
    
    setIsBankRegistering(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setRegisteredBankName(bankName);
    setIsRegistered(true);

    toast({
      title: "Registration Successful!",
      description: "Your bank has been registered. API credentials are now available.",
    });

    setIsBankRegistering(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard.",
    });
  };

  const apiEndpoint = "https://api.muleshield.ai/v1/transactions/validate";
  const exampleCurl = `curl -X POST ${apiEndpoint} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transaction_id": "txn_123456",
    "amount": 5000,
    "sender": "John Doe",
    "recipient": "Jane Smith",
    "timestamp": "2024-01-16T10:30:00Z"
  }'`;

  const exampleJavaScript = `const validateTransaction = async (transaction) => {
  const response = await fetch('${apiEndpoint}', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  });
  
  return await response.json();
};

// Usage
const result = await validateTransaction({
  transaction_id: 'txn_123456',
  amount: 5000,
  sender: 'John Doe',
  recipient: 'Jane Smith',
  timestamp: new Date().toISOString()
});`;

  const examplePython = `import requests

api_key = "YOUR_API_KEY"
endpoint = "${apiEndpoint}"

transaction = {
    "transaction_id": "txn_123456",
    "amount": 5000,
    "sender": "John Doe",
    "recipient": "Jane Smith",
    "timestamp": "2024-01-16T10:30:00Z"
}

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

response = requests.post(endpoint, json=transaction, headers=headers)
result = response.json()
print(result)`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to protect your institution from mule fraud? Let's talk.
            </p>
          </div>

          {/* Tabs */}
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="register">Bank Registration</TabsTrigger>
              </TabsList>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Contact Form */}
                  <div className="rounded-xl border border-border/50 bg-card p-8">
                    <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@company.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your Bank Name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your fraud detection needs..."
                          rows={4}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="hero"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Email</p>
                            <a
                              href="mailto:sales@muleshield.ai"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              sales@muleshield.ai
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Phone</p>
                            <a
                              href="tel:+91-8923812515"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              +1 (888) 555-0123
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Office</p>
                            <p className="text-muted-foreground">
                             NOIDA,SECTOR 128 
                              <br />
                              INDIA
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="p-6 rounded-xl bg-secondary/30 border border-border/50">
                      <h3 className="font-semibold mb-2">Enterprise Support</h3>
                      <p className="text-sm text-muted-foreground">
                        For existing enterprise customers, please contact your dedicated 
                        account manager or reach out to our 24/7 support line.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Bank Registration Tab */}
              <TabsContent value="register" className="space-y-6">
                {isRegistered ? (
                  // After Registration - Show API Details
                  <div className="space-y-6">
                    {/* Success Message */}
                    <div className="rounded-xl border border-green-200 bg-green-50/50 p-8 lg:col-span-2">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-green-900 mb-2">Bank Registration Successful!</h2>
                          <p className="text-green-800">
                            {registeredBankName} has been successfully registered. Your API credentials are ready for use.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* API Documentation */}
                    <div className="grid lg:grid-cols-2 gap-12">
                      {/* API Details */}
                      <div className="rounded-xl border border-border/50 bg-card p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Code className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold">API Integration</h3>
                        </div>

                        <div className="space-y-6">
                          {/* API Endpoint */}
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">API Endpoint</Label>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 p-3 rounded-lg bg-muted text-sm font-mono text-muted-foreground overflow-auto">
                                {apiEndpoint}
                              </code>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCopyCode(apiEndpoint)}
                                className="gap-2"
                              >
                                {copiedCode ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* API Key Info */}
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">API Key</Label>
                            <div className="p-3 rounded-lg bg-muted border border-border/50">
                              <p className="text-sm text-muted-foreground">
                                Your unique API key has been sent to your registered email address.
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                Keep your API key secure and never share it publicly.
                              </p>
                            </div>
                          </div>

                          {/* Request Method */}
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">Request Method</Label>
                            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono">
                              POST
                            </div>
                          </div>

                          {/* Headers Required */}
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">Required Headers</Label>
                            <div className="bg-muted rounded-lg p-3 text-sm font-mono space-y-1">
                              <div className="text-muted-foreground">
                                <span className="text-primary">Authorization</span>: Bearer YOUR_API_KEY
                              </div>
                              <div className="text-muted-foreground">
                                <span className="text-primary">Content-Type</span>: application/json
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Request Body Schema */}
                      <div className="rounded-xl border border-border/50 bg-card p-8">
                        <h3 className="text-lg font-semibold mb-6">Request Body Schema</h3>

                        <div className="space-y-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono text-primary">transaction_id</code>
                              <span className="text-xs text-muted-foreground">(required)</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Unique transaction identifier</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono text-primary">amount</code>
                              <span className="text-xs text-muted-foreground">(required)</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Transaction amount in decimal format</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono text-primary">sender</code>
                              <span className="text-xs text-muted-foreground">(required)</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Sender name or identifier</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono text-primary">recipient</code>
                              <span className="text-xs text-muted-foreground">(required)</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Recipient name or identifier</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono text-primary">timestamp</code>
                              <span className="text-xs text-muted-foreground">(required)</span>
                            </div>
                            <p className="text-sm text-muted-foreground">ISO 8601 formatted timestamp</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Code Examples */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Implementation Examples</h3>

                      {/* cURL Example */}
                      <div className="rounded-xl border border-border/50 bg-card p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold">cURL</h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyCode(exampleCurl)}
                            className="gap-2"
                          >
                            {copiedCode ? (
                              <>
                                <Check className="h-4 w-4" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                        <pre className="bg-muted rounded-lg p-4 text-sm overflow-auto text-muted-foreground">
                          <code>{exampleCurl}</code>
                        </pre>
                      </div>

                      {/* JavaScript Example */}
                      <div className="rounded-xl border border-border/50 bg-card p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold">JavaScript</h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyCode(exampleJavaScript)}
                            className="gap-2"
                          >
                            {copiedCode ? (
                              <>
                                <Check className="h-4 w-4" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                        <pre className="bg-muted rounded-lg p-4 text-sm overflow-auto text-muted-foreground">
                          <code>{exampleJavaScript}</code>
                        </pre>
                      </div>

                      {/* Python Example */}
                      <div className="rounded-xl border border-border/50 bg-card p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold">Python</h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyCode(examplePython)}
                            className="gap-2"
                          >
                            {copiedCode ? (
                              <>
                                <Check className="h-4 w-4" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                        <pre className="bg-muted rounded-lg p-4 text-sm overflow-auto text-muted-foreground">
                          <code>{examplePython}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="flex justify-center pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsRegistered(false)}
                      >
                        Register Another Bank
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Registration Form (Before Registration)
                  <div className="grid lg:grid-cols-2 gap-12">
                  <div className="rounded-xl border border-border/50 bg-card p-8 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold">Bank Registration</h2>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Register your bank to get started with MuleShield's fraud detection platform
                    </p>

                    <form onSubmit={handleBankRegistration} className="space-y-6">
                      {/* Bank Information */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-foreground">Bank Information</h3>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name *</Label>
                          <Input
                            id="bankName"
                            name="bankName"
                            placeholder="e.g., First National Bank"
                            required
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bankCode">Bank Code / SWIFT Code *</Label>
                            <Input
                              id="bankCode"
                              name="bankCode"
                              placeholder="e.g., FNBAUS33"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="routingNumber">Routing Number *</Label>
                            <Input
                              id="routingNumber"
                              name="routingNumber"
                              placeholder="e.g., 021000021"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bankAddress">Bank Address *</Label>
                          <Input
                            id="bankAddress"
                            name="bankAddress"
                            placeholder="Street address"
                            required
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              name="city"
                              placeholder="City"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province *</Label>
                            <Input
                              id="state"
                              name="state"
                              placeholder="State"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP / Postal Code *</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              placeholder="ZIP code"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country *</Label>
                            <Input
                              id="country"
                              name="country"
                              placeholder="Country"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Person Information */}
                      <div className="space-y-4 pt-4 border-t border-border/50">
                        <h3 className="font-semibold text-sm text-foreground">Contact Person</h3>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="contactFirstName">First Name *</Label>
                            <Input
                              id="contactFirstName"
                              name="contactFirstName"
                              placeholder="John"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactLastName">Last Name *</Label>
                            <Input
                              id="contactLastName"
                              name="contactLastName"
                              placeholder="Doe"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Work Email *</Label>
                          <Input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            placeholder="john.doe@bank.com"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contactPhone">Phone Number *</Label>
                          <Input
                            id="contactPhone"
                            name="contactPhone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="position">Job Title *</Label>
                          <Input
                            id="position"
                            name="position"
                            placeholder="e.g., Compliance Officer"
                            required
                          />
                        </div>
                      </div>

                      {/* Bank Details */}
                      <div className="space-y-4 pt-4 border-t border-border/50">
                        <h3 className="font-semibold text-sm text-foreground">Bank Details</h3>
                        
                        <div className="space-y-2">
                          <Label htmlFor="transactionVolume">Average Monthly Transaction Volume *</Label>
                          <Input
                            id="transactionVolume"
                            name="transactionVolume"
                            type="number"
                            placeholder="e.g., 50000"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="primaryCurrency">Primary Currency *</Label>
                          <Input
                            id="primaryCurrency"
                            name="primaryCurrency"
                            placeholder="e.g., INR"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="registryNumber">Business Registration Number *</Label>
                          <Input
                            id="registryNumber"
                            name="registryNumber"
                            placeholder="e.g., Tax ID / Registration Number"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="additionalInfo">Additional Information</Label>
                          <Textarea
                            id="additionalInfo"
                            name="additionalInfo"
                            placeholder="Any additional details about your institution..."
                            rows={3}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          variant="hero"
                          className="flex-1"
                          disabled={isBankRegistering}
                          //yha pe ek backend ko call dena hai for registering 
                        >
                          {isBankRegistering ? "Registering..." : "Register Bank"}
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* Registration Info */}
                  <div className="lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="rounded-xl border border-border/50 bg-card/50 p-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="font-semibold">Documentation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ensure you have your bank's registration documents and business details ready before submitting.
                        </p>
                      </div>

                      <div className="rounded-xl border border-border/50 bg-card/50 p-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <Phone className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="font-semibold">Questions?</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Contact our partnership team at <a href="mailto:partnerships@muleshield.ai" className="text-primary hover:underline">partnerships@muleshield.ai</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
