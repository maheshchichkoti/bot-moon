"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Shield, Lock, Key } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function RegisterSecurity() {
  const [isOpen, setIsOpen] = useState(false);

  const securityPoints = [
    {
      icon: Lock,
      title: "Bank-Grade Encryption",
      description:
        "Your API keys are encrypted using AES-256 encryption before storage.",
    },
    {
      icon: Key,
      title: "Limited Permissions",
      description:
        "Set up API keys with trading-only permissions. Never enable withdrawals.",
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description:
        "Keys are stored in isolated, encrypted storage with strict access controls.",
    },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
        <Shield className="w-4 h-4" />
        <span>Security Information</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4 space-y-6">
        <div className="grid gap-4">
          {securityPoints.map(({ icon: Icon, title, description }, index) => (
            <div key={index} className="flex items-start gap-3">
              <Icon className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          <Link href="/security" className="text-primary hover:underline">
            Learn more about our security measures →
          </Link>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
