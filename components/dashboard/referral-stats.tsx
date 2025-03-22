"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, CheckCircle2, Users, Gift, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function ReferralStats() {
  const [copied, setCopied] = useState(false);

  // Keep referralLink stable on each render
  const referralLink = useMemo(
    () =>
      `https://cryptobotpro.com/ref/${Math.random().toString(36).substring(7)}`,
    []
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const stats = {
    totalReferrals: 12,
    activeReferrals: 8,
    pendingReferrals: 4,
    totalEarnings: 60,
    pendingEarnings: 20,
  };

  const summaryCards = [
    {
      label: "Total Referrals",
      value: stats.totalReferrals,
      icon: Users,
      iconColor: "text-primary",
    },
    {
      label: "Total Earnings",
      value: formatCurrency(stats.totalEarnings, "USDT"),
      icon: Gift,
      iconColor: "text-primary",
    },
    {
      label: "Active Referrals",
      value: stats.activeReferrals,
      icon: ArrowUpRight,
      iconColor: "text-accent",
    },
    {
      label: "Pending Earnings",
      value: formatCurrency(stats.pendingEarnings, "USDT"),
      icon: Gift,
      iconColor: "text-warning",
    },
  ];

  const steps = [
    {
      title: "Share Your Link",
      description:
        "Share your unique referral link with friends and followers.",
    },
    {
      title: "They Join",
      description:
        "When they purchase lifetime access, they become your referral.",
    },
    {
      title: "Earn Rewards",
      description: "Earn $5 USDT for each successful referral.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Referral Link Card */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Referral Link</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            value={referralLink}
            readOnly
            className="font-mono text-sm flex-1"
            aria-label="Referral link"
          />
          <Button
            variant="outline"
            onClick={handleCopy}
            aria-label="Copy referral link"
          >
            {copied ? (
              <CheckCircle2 className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        {copied && (
          <p className="mt-2 text-xs text-green-600">Copied to clipboard!</p>
        )}
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map(({ label, value, icon: Icon, iconColor }, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-4">
              <Icon className={`h-8 w-8 ${iconColor}`} />
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* How it Works */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">How It Works</h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </div>
                <h4 className="font-semibold">{step.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
