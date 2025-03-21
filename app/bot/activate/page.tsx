"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Shield,
  Lock,
  Info,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RegisterProgress } from "@/components/register-progress";
import { RegisterSecurity } from "@/components/register-security";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth";
import { routes } from "@/lib/navigation";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { setHasCompletedSetup } = useAuth();
  const { toast } = useToast();
  const [showSecret, setShowSecret] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    apiKey: "",
    apiSecret: "",
    telegramId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for connecting exchange
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Set setup as completed
      setHasCompletedSetup(true);

      toast({
        title: "Exchange Connected",
        description: "Your exchange has been successfully connected.",
      });

      // Redirect to dashboard
      router.push(routes.auth.dashboard);
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect exchange. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow py-16 lg:py-20">
        <div className="container max-w-4xl">
          <RegisterProgress currentStep={2} />

          <div className="mb-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Connect Your Exchange Account
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <p>Your API keys are encrypted and securely stored</p>
              </div>
              <p className="text-muted-foreground">
                We never have access to your funds. Only trading permissions are
                required.
              </p>
            </motion.div>
          </div>

          <Card className="feature-card p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* API Key Field */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Find this in your exchange's API management section
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="relative">
                    <Input
                      id="apiKey"
                      name="apiKey"
                      placeholder="Enter your API key"
                      className="pr-10"
                      value={formData.apiKey}
                      onChange={handleInputChange}
                      required
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your API key is encrypted using AES-256 encryption
                  </p>
                </div>

                {/* API Secret Field */}
                <div>
                  <Label htmlFor="apiSecret">API Secret</Label>
                  <div className="relative">
                    <Input
                      id="apiSecret"
                      name="apiSecret"
                      type={showSecret ? "text" : "password"}
                      placeholder="Enter your API secret"
                      className="pr-10"
                      value={formData.apiSecret}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showSecret ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your API secret is encrypted and never stored in plain text
                  </p>
                </div>

                {/* Telegram ID Field */}
                <div>
                  <Label htmlFor="telegramId">Telegram ID</Label>
                  <Input
                    id="telegramId"
                    name="telegramId"
                    placeholder="Enter your Telegram ID"
                    value={formData.telegramId}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    <Link
                      href="/telegram-guide"
                      className="text-primary hover:underline"
                    >
                      How to find your Telegram ID
                    </Link>
                  </p>
                </div>

                {/* Security Information */}
                <RegisterSecurity />

                {/* Terms Agreement */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    I understand that this bot will trade on my behalf using my
                    API keys. I confirm that I have set up read-only API keys
                    with trading permissions only.
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!agreed || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      Connect Exchange
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Need help?{" "}
                  <Link
                    href={routes.public.help}
                    className="text-primary hover:underline"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </form>
          </Card>

          {/* Next Steps Preview */}
          <div className="mt-8 text-center text-muted-foreground">
            <p className="mb-2">What happens next?</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-start">
              {[
                "Bot activation within 5 minutes",
                "Access your dashboard",
                "Receive Telegram notifications",
              ].map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2",
                    index < 2 &&
                      "md:after:content-['→'] md:after:ml-4 after:hidden"
                  )}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
