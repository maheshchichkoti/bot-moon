import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, ChartLine, Shield, Zap, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";
import { PerformanceChart } from "@/components/performance-chart";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const LiveTicker = () => (
  <div className="w-full overflow-hidden bg-card/50 backdrop-blur-sm py-2">
    <div className="ticker-item flex items-center gap-8 text-sm">
      <span className="flex items-center gap-2">
        BTC/USDT <span className="text-accent">+2.4%</span>
      </span>
      <span className="flex items-center gap-2">
        ETH/USDT <span className="text-accent">+3.8%</span>
      </span>
      <span className="flex items-center gap-2">
        SOL/USDT <span className="text-accent">+5.2%</span>
      </span>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="feature-card">
    <Icon className="w-12 h-12 mb-4 text-primary" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient dot-pattern" />
        <div className="container relative">
          <LiveTicker />
          <div className="max-w-3xl mx-auto text-center mt-12">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Automated Crypto Trading
              <span className="gradient-text block">Made Simple</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Our advanced trading bot leverages AI algorithms to maximize your profits while you sleep.
              Set it up once and watch your portfolio grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-button" asChild>
                <Link href="/invest">Buy Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Why Choose Our Trading Bot?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our bot combines advanced algorithms with security features to deliver consistent results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Secure & Reliable"
              description="Bank-grade encryption and secure infrastructure to protect your assets"
            />
            <FeatureCard
              icon={Bot}
              title="Fully Automated"
              description="24/7 automated trading with advanced AI algorithms"
            />
            <FeatureCard
              icon={ChartLine}
              title="Profitable Strategy"
              description="Proven track record of consistent profits in various market conditions"
            />
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Exceptional Trading Performance
            </h2>
            <p className="text-lg text-muted-foreground">
              Our bot's historical performance speaks for itself
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <Card className="p-6 feature-card">
              <PerformanceChart />
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Referral Program */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Earn While You Share
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our referral program lets you earn 10% of the purchase price for every new user who signs up using your unique referral link.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="feature-card text-center">
              <Share2 className="w-12 h-12 mb-4 mx-auto text-primary" />
              <h3 className="text-xl font-semibold mb-2">Share Your Link</h3>
              <p className="text-muted-foreground">Share your unique referral link with friends and followers</p>
            </div>
            <div className="feature-card text-center">
              <Zap className="w-12 h-12 mb-4 mx-auto text-accent" />
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-muted-foreground">When they purchase, you earn $5 USDT per referral</p>
            </div>
            <div className="feature-card text-center">
              <ArrowRight className="w-12 h-12 mb-4 mx-auto text-warning" />
              <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
              <p className="text-muted-foreground">Withdraw your earnings once you reach the $2 USDT minimum threshold</p>
            </div>
          </div>
          <div className="text-center">
            <Button size="lg" className="glow-button" asChild>
              <Link href="/invest">Start Earning Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Ready to Start Automated Trading?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              For just $50 USDT, you can get lifetime access to our trading bot and start generating profits today.
            </p>
            <Button size="lg" className="glow-button" asChild>
              <Link href="/invest">Buy Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}