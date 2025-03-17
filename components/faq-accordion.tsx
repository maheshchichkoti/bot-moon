"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQAccordionProps {
  category: string;
  searchQuery: string;
}

const faqData = {
  "Getting Started": [
    {
      question: "How do I set up the bot after purchase?",
      answer:
        "After purchase, you'll receive access to connect your exchange API keys. Follow our step-by-step guide to create API keys with trading permissions (no withdrawal access needed) and connect them to your account.",
    },
    {
      question: "Which exchanges are supported?",
      answer:
        "We currently support Binance, Bybit, and KuCoin. More exchanges will be added based on user demand and security verification.",
    },
    {
      question: "How do I create API keys on my exchange?",
      answer:
        "Each exchange has a different process. We provide detailed guides with screenshots for each supported exchange in our Setup Guides section.",
    },
  ],
  "Payment & Billing": [
    {
      question: "How does the payment process work?",
      answer:
        "We accept payment in USDT. After completing the one-time payment of $50 USDT, you'll receive lifetime access to the trading bot.",
    },
    {
      question: "What are the ongoing fees?",
      answer:
        "We only charge a 20% fee on profitable trades. There are no monthly subscriptions or hidden costs.",
    },
  ],
  "Bot Setup": [
    {
      question: "How do I configure trading pairs?",
      answer:
        "The bot automatically selects optimal trading pairs based on market conditions and liquidity. You can customize your preferences in the dashboard settings.",
    },
    {
      question: "Can I set trading limits?",
      answer:
        "Yes, you can set maximum position sizes, stop-loss levels, and other risk management parameters in your dashboard.",
    },
  ],
  "Trading & Performance": [
    {
      question: "What is the average monthly return?",
      answer:
        "Our bot has achieved an average monthly return of 28.8% over the past 6 months. However, past performance does not guarantee future results.",
    },
    {
      question: "How does risk management work?",
      answer:
        "The bot employs multiple risk management strategies including position sizing, stop-loss orders, and market condition analysis.",
    },
  ],
  "Referral Program": [
    {
      question: "How does the referral program work?",
      answer:
        "You earn $5 USDT for every new user who purchases lifetime access using your referral link. Earnings are credited to your fee balance automatically.",
    },
    {
      question: "When do I receive my referral rewards?",
      answer:
        "Referral rewards are credited immediately after the referred user completes their purchase.",
    },
  ],
  Security: [
    {
      question: "How secure are my API keys?",
      answer:
        "Your API keys are encrypted using bank-grade encryption and stored securely. We only require trading permissions, not withdrawal access.",
    },
    {
      question: "What security measures are in place?",
      answer:
        "We use military-grade encryption, secure infrastructure, and regular security audits to protect your data and API keys.",
    },
  ],
};

export function FAQAccordion({ category, searchQuery }: FAQAccordionProps) {
  const filteredFAQs = faqData[category as keyof typeof faqData]?.filter(
    (faq) =>
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      {filteredFAQs?.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
