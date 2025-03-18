"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, CheckCircle2, Users, Gift, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

export function ReferralStats() {
  const [copied, setCopied] = useState(false);
  const referralLink = `https://cryptobotpro.com/ref/${Math.random().toString(36).substring(7)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = {
    totalReferrals: 12,
    activeReferrals: 8,
    pendingReferrals: 4,
    totalEarnings: 60,
    pendingEarnings: 20,
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Referral Link</h3>
        <div className="flex gap-2">
          <Input value={referralLink} readOnly className="font-mono text-sm" />
          <Button variant="outline" onClick={handleCopy}>
            {copied ? (
              <CheckCircle2 className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
              <p className="text-2xl font-bold">{stats.totalReferrals}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Gift className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-2xl font-bold">
                {formatCurrency(stats.totalEarnings, 'USDT')}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <ArrowUpRight className="h-8 w-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Active Referrals</p>
              <p className="text-2xl font-bold">{stats.activeReferrals}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Gift className="h-8 w-8 text-warning" />
            <div>
              <p className="text-sm text-muted-foreground">Pending Earnings</p>
              <p className="text-2xl font-bold">
                {formatCurrency(stats.pendingEarnings, 'USDT')}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">How It Works</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Share Your Link",
              description: "Share your unique referral link with friends and followers",
            },
            {
              title: "They Join",
              description: "When they purchase lifetime access, they become your referral",
            },
            {
              title: "Earn Rewards",
              description: "Earn $5 USDT for each successful referral",
            },
          ].map((step, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </div>
                <h4 className="font-semibold">{step.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}