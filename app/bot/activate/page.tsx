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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setHasCompletedSetup(true);

      toast({
        title: "Exchange Connected",
        description: "Your exchange has been successfully connected.",
      });

      router.push(routes.auth.dashboard);
    } catch {
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

      <main className="flex-grow py-12 md:py-16 lg:py-20">
        <div className="container max-w-3xl space-y-10 px-4">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Connect Your Exchange
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-1">
              <Shield className="w-4 h-4 text-primary" />
              <span>Your keys are securely encrypted</span>
            </div>
            <p className="text-muted-foreground text-sm">
              We require trading access only — never withdrawal rights.
            </p>
          </motion.div>

          {/* Form Card */}
          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* API Key */}
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

              {/* API Secret */}
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

              {/* Telegram ID */}
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

              {/* Security info component */}
              <RegisterSecurity />

              {/* Terms checkbox */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to allow this bot to trade on my behalf using the
                  above API keys.
                </Label>
              </div>

              {/* Submit button */}
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

              {/* Help link */}
              <div className="text-center text-sm text-muted-foreground">
                Need help?{" "}
                <Link
                  href={routes.public.help}
                  className="text-primary hover:underline"
                >
                  Contact Support
                </Link>
              </div>
            </form>
          </Card>

          {/* What's Next Section */}
          <div className="text-center text-muted-foreground space-y-2">
            <p className="text-sm font-medium">What happens next?</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
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
