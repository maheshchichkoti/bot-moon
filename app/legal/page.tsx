"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableOfContents } from "@/components/table-of-contents";
import { PrivacyPolicy } from "@/components/privacy-policy";
import { TermsOfUse } from "@/components/terms-of-use";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function LegalPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient dot-pattern" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Privacy Policy & Terms of Use
            </h1>
            <p className="text-lg text-muted-foreground">
              Your privacy and security are important to us. Learn how we protect your data
              and the terms of using our service.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: June 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex gap-8">
            {/* Sticky Table of Contents */}
            <div className="hidden lg:block w-64 sticky top-20 self-start">
              <TableOfContents />
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <Tabs defaultValue="privacy" className="mb-8">
                <TabsList className="w-full">
                  <TabsTrigger value="privacy" className="flex-1">Privacy Policy</TabsTrigger>
                  <TabsTrigger value="terms" className="flex-1">Terms of Use</TabsTrigger>
                </TabsList>
                <TabsContent value="privacy">
                  <PrivacyPolicy />
                </TabsContent>
                <TabsContent value="terms">
                  <TermsOfUse />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <Button
        variant="outline"
        size="icon"
        className={`fixed bottom-8 right-8 transition-opacity duration-300 ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={scrollToTop}
      >
        <ArrowUp className="w-4 h-4" />
      </Button>

      <Footer />
    </main>
  );
}