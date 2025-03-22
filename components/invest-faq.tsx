"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How secure are my API keys?",
    answer:
      "Your API keys are encrypted using bank-grade encryption and are stored securely. We only require trading permissions, not withdrawal access, ensuring your funds remain safe.",
  },
  {
    question: "What exchanges are supported?",
    answer:
      "We currently support Binance, Bybit, and KuCoin. More exchanges will be added based on user demand and security verification.",
  },
  {
    question: "How do I top up my fee balance?",
    answer:
      "You can top up your fee balance at any time by sending USDT to your dedicated fee wallet address. The minimum top-up amount is 10 USDT.",
  },
  {
    question: "What trading pairs does the bot trade?",
    answer:
      "The bot primarily trades major cryptocurrency pairs like BTC/USDT, ETH/USDT, and other high-liquidity pairs. The selection is optimized based on market conditions.",
  },
  {
    question: "How does the referral program work?",
    answer:
      "You earn $5 USDT for every new user who purchases lifetime access using your referral link. Earnings are credited to your fee balance automatically.",
  },
  {
    question: "What if I want to stop the bot?",
    answer:
      "You can pause or stop the bot at any time through your dashboard. When stopped, the bot will safely close any open positions based on your preferences.",
  },
];

export function InvestFAQ() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We've got answers.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
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
