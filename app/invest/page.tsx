"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  Lock,
  Zap,
  LineChart,
  RefreshCw,
} from "lucide-react";
import { InvestPerformanceChart } from "@/components/invest-performance-chart";
import { InvestFAQ } from "@/components/invest-faq";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation"; // ✅ Ensure this is present
import { Footer } from "@/components/footer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const features = [
  "Lifetime access to the trading bot",
  "20% fee on profitable trades only",
  "24/7 automated trading",
  "Real-time trade monitoring",
  "Referral program access",
];

const benefits = [
  {
    title: "Profit-Sharing Model",
    description:
      "We only make money when you do. Pay 20% fee only on profitable trades.",
    icon: LineChart,
  },
  {
    title: "Secure API Connection",
    description:
      "Bank-grade encryption for your API keys with read-only trading permissions.",
    icon: Lock,
  },
  {
    title: "Referral Rewards",
    description:
      "Earn $5 USDT for every new user who signs up using your referral link.",
    icon: RefreshCw,
  },
];

const steps = [
  {
    title: "Purchase Lifetime Access",
    description: "Make a one-time payment of $50 USDT to get started.",
  },
  {
    title: "Connect Your Exchange",
    description:
      "Securely connect your preferred crypto exchange using API keys.",
  },
  {
    title: "Start Trading",
    description:
      "Watch as our bot automatically trades and generates profits for you.",
  },
];

export default function InvestPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient dot-pattern" />
        <div className="container relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Invest in Your
              <span className="gradient-text block">Crypto Future</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Our trading bot uses advanced algorithms to maximize your profits
              in any market condition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="feature-card overflow-visible">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Lifetime Access</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-5xl font-bold">$50</span>
                  <span className="text-2xl text-muted-foreground">USDT</span>
                </div>
                <p className="text-muted-foreground">
                  One-time payment, lifetime access
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="w-full glow-button" asChild>
                <Link href="/checkout">
                  Buy Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                <Lock className="inline-block w-4 h-4 mr-1" />
                Secure payment via NowPayments
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Performance Overview
            </h2>
            <p className="text-lg text-muted-foreground">
              Track record of consistent profits across market conditions
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 feature-card">
              <InvestPerformanceChart />
              <div className="mt-8 text-center">
                <div className="text-2xl font-bold mb-2">
                  Average Monthly Profit:{" "}
                  <span className="text-accent">28.8%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Past performance does not guarantee future results
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Key Benefits
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Getting started with our trading bot is simple and straightforward
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative text-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Transparent Fee Structure
            </h2>
            <p className="text-lg text-muted-foreground">
              We only make money when you do. Our fee structure is designed to
              align our interests with yours.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="feature-card p-8 mb-8">
              <div className="text-center mb-8">
                <div className="text-3xl font-bold mb-2">
                  20% Fee on Profitable Trades
                </div>
                <p className="text-muted-foreground">
                  No monthly fees, no hidden costs
                </p>
              </div>
              <div className="space-y-6">
                {[
                  {
                    title: "Bot buys BTC at $50,000",
                    subtitle: "Initial investment",
                  },
                  {
                    title: "Bot sells BTC at $55,000",
                    subtitle: "Exit position",
                  },
                  { title: "Profit: $5,000", subtitle: "Gross profit" },
                  { title: "Fee: $1,000", subtitle: "20% of $5,000" },
                  { title: "Your Net Profit: $4,000", subtitle: "After fees" },
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{step.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <InvestFAQ />

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Ready to Start Automated Trading?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of traders who are already profiting with our bot.
            </p>
            <Button size="lg" className="glow-button" asChild>
              <Link href="/checkout">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
  );
}
