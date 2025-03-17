"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the trading bot work?",
    answer: "Our bot uses advanced algorithms to analyze market trends, execute trades automatically, and manage risk. It operates 24/7, monitoring multiple indicators to identify profitable trading opportunities.",
  },
  {
    question: "Is my investment safe?",
    answer: "Security is our top priority. We use bank-grade encryption for all data, and your API keys are stored with military-grade protection. The bot only has trading permissions and cannot withdraw funds.",
  },
  {
    question: "What are the fees?",
    answer: "We charge a one-time license fee of $50 USDT and take 20% of profitable trades. There are no monthly subscriptions or hidden fees. You only pay when you profit.",
  },
];

export function FAQ() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}