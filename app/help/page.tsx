"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactForm } from "@/components/contact-form";
import { FAQAccordion } from "@/components/faq-accordion";
import { Search, ChevronRight } from "lucide-react";

const categories = [
  "Getting Started",
  "Payment & Billing",
  "Bot Setup",
  "Trading & Performance",
  "Referral Program",
  "Security",
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Getting Started");

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient dot-pattern" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              How Can We Help You?
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions or contact our support team.
            </p>
            <div className="relative max-w-xl mx-auto mb-8">
              <Input
                type="text"
                placeholder="Search FAQ topics..."
                className="pl-12 pr-4 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <FAQAccordion category={activeCategory} searchQuery={searchQuery} />
          </div>
        </div>
      </section>

      {/* Setup Guides Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">
              Step-by-Step Setup Guides
            </h2>
            <p className="text-lg text-muted-foreground">
              Detailed guides to help you get started quickly and easily.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {["Binance", "Bybit", "KuCoin"].map((exchange) => (
              <Card key={exchange} className="feature-card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {exchange} Setup
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Learn how to create and configure API keys for {exchange}.
                  </p>
                  <Button variant="outline" className="w-full">
                    View Guide <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-heading mb-4">
                Still Need Help?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our support team is ready to assist you.
              </p>
            </div>
            <Card className="feature-card">
              <div className="p-8">
                <ContactForm />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
